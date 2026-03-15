import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, generateReference, TABLES } from '@/lib/supabase'
import { sendAppointmentEmail } from '@/lib/email'
import { sendWhatsAppNotification, buildAppointmentWhatsAppMessage } from '@/lib/whatsapp'
import type { Appointment, BookingType, BookingChannel } from '@/types'

const VALID_TIMES = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

/* ─── GET — return booked times for a given date ─────────── */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: 'Paramètre date invalide (YYYY-MM-DD requis)' },
      { status: 400 }
    )
  }

  const db = supabaseAdmin
  if (!db) {
    // Admin client not configured — all slots appear available
    return NextResponse.json({ bookedTimes: [], availableTimes: VALID_TIMES })
  }

  const { data, error } = await db
    .from(TABLES.APPOINTMENTS)
    .select('time')
    .eq('date', date)
    .neq('status', 'cancelled')

  if (error) {
    console.error('[appointments GET] DB error:', error)
    return NextResponse.json({ bookedTimes: [], availableTimes: VALID_TIMES })
  }

  const bookedTimes = (data ?? []).map((row: { time: string }) => row.time)
  return NextResponse.json({ bookedTimes, availableTimes: VALID_TIMES })
}

/* ─── POST — create appointment ──────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    /* ── VALIDATION ── */
    if (!body.clientName?.trim()) {
      return NextResponse.json({ error: 'clientName est requis' }, { status: 400 })
    }
    if (!body.clientPhone?.trim()) {
      return NextResponse.json({ error: 'clientPhone est requis' }, { status: 400 })
    }
    if (!body.clientEmail?.trim() || !body.clientEmail.includes('@')) {
      return NextResponse.json({ error: 'clientEmail invalide' }, { status: 400 })
    }
    if (!body.preferredDate || !/^\d{4}-\d{2}-\d{2}$/.test(body.preferredDate)) {
      return NextResponse.json({ error: 'preferredDate invalide (YYYY-MM-DD)' }, { status: 400 })
    }
    if (!body.preferredTime || !VALID_TIMES.includes(body.preferredTime)) {
      return NextResponse.json(
        { error: `preferredTime invalide. Valeurs acceptées : ${VALID_TIMES.join(', ')}` },
        { status: 400 }
      )
    }

    // Reject bookings in the past
    const bookingDateTime = new Date(`${body.preferredDate}T${body.preferredTime}:00`)
    if (bookingDateTime < new Date()) {
      return NextResponse.json(
        { error: 'Impossible de réserver dans le passé' },
        { status: 400 }
      )
    }

    /* ── DOUBLE-BOOKING CHECK ── */
    const db = supabaseAdmin
    if (db) {
      const { data: existing, error: checkError } = await db
        .from(TABLES.APPOINTMENTS)
        .select('id')
        .eq('date', body.preferredDate)
        .eq('time', body.preferredTime)
        .neq('status', 'cancelled')
        .maybeSingle()

      if (checkError) {
        console.error('[appointments POST] Conflict check error:', checkError)
        // Non-fatal — continue with best-effort check
      }

      if (existing) {
        return NextResponse.json(
          { error: 'Ce créneau est déjà réservé. Veuillez choisir un autre horaire.' },
          { status: 409 }
        )
      }
    }

    /* ── BUILD APPOINTMENT OBJECT ── */
    const BOOKING_TYPE_LABELS: Record<string, string> = {
      discovery_call:         'Appel découverte',
      consultation:           'Coaching gratuit',
      wedding_consultation:   'Coaching mariage',
      site_visit:             'Visite de site',
      political_consultation: 'Coaching politique',
    }
    const bookingType  = (body.type as BookingType) ?? 'discovery_call'
    const serviceLabel = BOOKING_TYPE_LABELS[bookingType] ?? bookingType

    // Merge topic + notes into a single text for the simplified DB column
    const combinedNotes = [body.topic?.trim(), body.notes?.trim()]
      .filter(Boolean)
      .join(' — ') || undefined

    const appt: Appointment = {
      id:              crypto.randomUUID(),
      reference:       generateReference('RDV'),
      type:            bookingType,
      status:          'pending',
      channel:         (body.channel as BookingChannel) ?? 'whatsapp',
      clientName:      body.clientName.trim(),
      clientEmail:     body.clientEmail.trim().toLowerCase(),
      clientPhone:     body.clientPhone.trim(),
      preferredDate:   body.preferredDate,
      preferredTime:   body.preferredTime,
      timezone:        body.timezone ?? 'Africa/Libreville',
      durationMinutes: Number(body.durationMinutes) || 60,
      topic:           body.topic?.trim(),
      notes:           body.notes?.trim(),
      createdAt:       new Date().toISOString(),
    }

    /* ── INSERT TO SUPABASE ── */
    let dbInserted = false

    if (db) {
      const { error: dbError } = await db
        .from(TABLES.APPOINTMENTS)
        .insert({
          id:         appt.id,
          reference:  appt.reference,
          service:    serviceLabel,        // e.g. "Coaching gratuit"
          date:       appt.preferredDate,  // e.g. "2025-06-15"
          time:       appt.preferredTime,  // e.g. "10:00"
          name:       appt.clientName,
          phone:      appt.clientPhone,
          email:      appt.clientEmail,
          notes:      combinedNotes,
          channel:    appt.channel,
          status:     appt.status,
          created_at: appt.createdAt,
        })

      if (dbError) {
        console.error('[appointments POST] DB insert error:', dbError)
        // DB is configured but insert failed → surface the error to the client
        // so the UI never shows a false-positive success
        return NextResponse.json(
          {
            error: 'Erreur lors de l\'enregistrement du rendez-vous. Veuillez réessayer ou nous contacter directement via WhatsApp.',
          },
          { status: 500 }
        )
      }

      dbInserted = true
    }
    // If supabaseAdmin is null (not yet configured) we still proceed:
    // notifications are sent and admin sees the request via WhatsApp / Vercel logs.

    /* ── NOTIFICATIONS ── */
    const [emailResult, waResult] = await Promise.allSettled([
      sendAppointmentEmail(appt),
      sendWhatsAppNotification(buildAppointmentWhatsAppMessage(appt)),
    ])

    const emailSent = emailResult.status === 'fulfilled'

    if (!emailSent) {
      console.error(
        '[appointments POST] Email notification failed:',
        (emailResult as PromiseRejectedResult).reason
      )
    }
    if (waResult.status === 'rejected') {
      console.warn('[appointments POST] WhatsApp notification failed (non-critical):', waResult.reason)
    }

    return NextResponse.json(
      {
        success:       true,
        appointmentId: appt.id,
        reference:     appt.reference,
        confirmedDate: appt.preferredDate,
        confirmedTime: appt.preferredTime,
        service:       serviceLabel,
        emailSent,
        dbInserted,
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('[appointments POST] Unexpected error:', err)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}
