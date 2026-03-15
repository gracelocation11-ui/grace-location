import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateReference } from '@/lib/supabase'
import { sendAppointmentEmail } from '@/lib/email'
import { sendWhatsAppNotification, buildAppointmentWhatsAppMessage } from '@/lib/whatsapp'
import type { Appointment, BookingType, BookingChannel } from '@/types'

/* ─── Constants ──────────────────────────────────────────── */
const VALID_TIMES = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

const BOOKING_TYPE_LABELS: Record<string, string> = {
  discovery_call:         'Appel découverte',
  consultation:           'Coaching gratuit',
  wedding_consultation:   'Coaching mariage',
  site_visit:             'Visite de site',
  political_consultation: 'Coaching politique',
}

/**
 * Create a Supabase admin client fresh on each request.
 *
 * Why not module-level singleton?
 * Next.js serverless functions can be cold-started before env vars are
 * injected, making module-level createClient() return a broken/null client.
 * Instantiating inside the handler guarantees we always use the live env.
 */
function getSupabaseAdmin() {
  const url     = process.env.NEXT_PUBLIC_SUPABASE_URL
  const svcKey  = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !svcKey) {
    console.error(
      '[appointments] Supabase env vars missing:',
      { url: Boolean(url), svcKey: Boolean(svcKey) }
    )
    return null
  }

  return createClient(url, svcKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

/* ─── GET — available + booked times for a date ─────────── */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: 'Paramètre date invalide (YYYY-MM-DD requis)' },
      { status: 400 }
    )
  }

  const db = getSupabaseAdmin()
  if (!db) {
    // Supabase not configured yet — surface all slots as available
    return NextResponse.json({ bookedTimes: [], availableTimes: VALID_TIMES })
  }

  const { data, error } = await db
    .from('appointments')
    .select('time')
    .eq('date', date)
    .neq('status', 'cancelled')

  if (error) {
    console.error('[appointments GET] DB query failed:', error)
    return NextResponse.json({ bookedTimes: [], availableTimes: VALID_TIMES })
  }

  const bookedTimes = (data ?? []).map((row: { time: string }) => row.time)
  return NextResponse.json({ bookedTimes, availableTimes: VALID_TIMES })
}

/* ─── POST — create appointment ──────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('[appointments POST] Received body:', JSON.stringify({
      clientName:    body.clientName,
      clientEmail:   body.clientEmail,
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      type:          body.type,
      channel:       body.channel,
    }))

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

    // Reject past bookings
    const bookingDateTime = new Date(`${body.preferredDate}T${body.preferredTime}:00`)
    if (bookingDateTime < new Date()) {
      return NextResponse.json(
        { error: 'Impossible de réserver dans le passé' },
        { status: 400 }
      )
    }

    /* ── SUPABASE CLIENT ── */
    const db = getSupabaseAdmin()

    /* ── DOUBLE-BOOKING CHECK ── */
    if (db) {
      const { data: existing, error: checkError } = await db
        .from('appointments')
        .select('id')
        .eq('date', body.preferredDate)
        .eq('time', body.preferredTime)
        .neq('status', 'cancelled')
        .maybeSingle()

      if (checkError) {
        // Log but don't block — best-effort conflict check
        console.error('[appointments POST] Conflict check error:', checkError)
      } else if (existing) {
        return NextResponse.json(
          { error: 'Ce créneau est déjà réservé. Veuillez choisir un autre horaire.' },
          { status: 409 }
        )
      }
    }

    /* ── BUILD APPOINTMENT ── */
    const bookingType  = (body.type as BookingType) ?? 'discovery_call'
    const serviceLabel = BOOKING_TYPE_LABELS[bookingType] ?? bookingType

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
      console.log('[appointments POST] Inserting into Supabase:', appt.reference)

      const { error: dbError } = await db
        .from('appointments')
        .insert({
          id:         appt.id,
          reference:  appt.reference,
          service:    serviceLabel,
          date:       appt.preferredDate,
          time:       appt.preferredTime,
          name:       appt.clientName,
          phone:      appt.clientPhone,
          email:      appt.clientEmail,
          notes:      combinedNotes ?? null,
          channel:    appt.channel,
          status:     'pending',
          created_at: appt.createdAt,
        })

      if (dbError) {
        // Surface the exact Supabase error code + message for easy debugging
        console.error('[appointments POST] DB insert FAILED:', {
          code:    dbError.code,
          message: dbError.message,
          details: dbError.details,
          hint:    dbError.hint,
        })
        return NextResponse.json(
          {
            error: 'Erreur lors de l\'enregistrement. Veuillez réessayer ou nous contacter via WhatsApp.',
            debug: process.env.NODE_ENV !== 'production'
              ? `DB error ${dbError.code}: ${dbError.message}`
              : undefined,
          },
          { status: 500 }
        )
      }

      dbInserted = true
      console.log('[appointments POST] DB insert OK:', appt.reference)
    } else {
      console.warn('[appointments POST] Supabase admin not available — skipping DB insert')
    }

    /* ── NOTIFICATIONS (non-blocking) ── */
    const [emailResult, waResult] = await Promise.allSettled([
      sendAppointmentEmail(appt),
      sendWhatsAppNotification(buildAppointmentWhatsAppMessage(appt)),
    ])

    const emailSent = emailResult.status === 'fulfilled'

    if (!emailSent) {
      console.error(
        '[appointments POST] Email failed:',
        (emailResult as PromiseRejectedResult).reason
      )
    }
    if (waResult.status === 'rejected') {
      console.warn(
        '[appointments POST] WhatsApp failed (non-critical):',
        waResult.reason
      )
    }

    console.log('[appointments POST] Done:', {
      reference: appt.reference,
      dbInserted,
      emailSent,
    })

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
