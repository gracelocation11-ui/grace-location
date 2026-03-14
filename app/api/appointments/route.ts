import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, generateReference, TABLES } from '@/lib/supabase'
import { sendAppointmentEmail } from '@/lib/email'
import { sendWhatsAppNotification, buildAppointmentWhatsAppMessage } from '@/lib/whatsapp'
import type { Appointment, BookingType, BookingChannel } from '@/types'

const VALID_TIMES = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']

/* ─── GET — return booked times for a given date ── */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Paramètre date invalide (YYYY-MM-DD requis)' }, { status: 400 })
  }

  const db = supabaseAdmin
  if (!db) {
    // No admin client — return empty so all slots appear available
    return NextResponse.json({ bookedTimes: [] })
  }

  const { data, error } = await db
    .from(TABLES.APPOINTMENTS)
    .select('preferred_time')
    .eq('preferred_date', date)
    .not('status', 'eq', 'cancelled')

  if (error) {
    console.error('[appointments GET] DB error:', error)
    return NextResponse.json({ bookedTimes: [] })
  }

  const bookedTimes = (data ?? []).map((row: { preferred_time: string }) => row.preferred_time)
  return NextResponse.json({ bookedTimes, availableTimes: VALID_TIMES })
}

/* ─── POST — create appointment ── */
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
      return NextResponse.json({ error: `preferredTime invalide. Valeurs: ${VALID_TIMES.join(', ')}` }, { status: 400 })
    }

    // Prevent booking in the past
    const bookingDate = new Date(`${body.preferredDate}T${body.preferredTime}:00`)
    if (bookingDate < new Date()) {
      return NextResponse.json({ error: 'Impossible de réserver dans le passé' }, { status: 400 })
    }

    /* ── CONFLICT CHECK ── */
    const db = supabaseAdmin
    if (db) {
      const { data: existing } = await db
        .from(TABLES.APPOINTMENTS)
        .select('id')
        .eq('preferred_date', body.preferredDate)
        .eq('preferred_time', body.preferredTime)
        .not('status', 'eq', 'cancelled')
        .maybeSingle()

      if (existing) {
        return NextResponse.json(
          { error: 'Ce créneau est déjà réservé. Veuillez choisir un autre horaire.' },
          { status: 409 }
        )
      }
    }

    /* ── BUILD APPOINTMENT ── */
    const appt: Appointment = {
      id: crypto.randomUUID(),
      reference: generateReference('RDV'),
      type: (body.type as BookingType) ?? 'discovery_call',
      status: 'pending',
      channel: (body.channel as BookingChannel) ?? 'whatsapp',
      clientName: body.clientName.trim(),
      clientEmail: body.clientEmail.trim().toLowerCase(),
      clientPhone: body.clientPhone.trim(),
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      timezone: body.timezone ?? 'Africa/Libreville',
      durationMinutes: Number(body.durationMinutes) || 60,
      serviceCategory: body.serviceCategory,
      topic: body.topic?.trim(),
      notes: body.notes?.trim(),
      createdAt: new Date().toISOString(),
    }

    /* ── INSERT TO SUPABASE ── */
    if (db) {
      const { error: dbError } = await db.from(TABLES.APPOINTMENTS).insert({
        id: appt.id,
        reference: appt.reference,
        type: appt.type,
        status: appt.status,
        channel: appt.channel,
        client_name: appt.clientName,
        client_email: appt.clientEmail,
        client_phone: appt.clientPhone,
        preferred_date: appt.preferredDate,
        preferred_time: appt.preferredTime,
        timezone: appt.timezone,
        duration_minutes: appt.durationMinutes,
        service_category: appt.serviceCategory,
        topic: appt.topic,
        notes: appt.notes,
        created_at: appt.createdAt,
      })

      if (dbError) {
        console.error('[appointments POST] DB insert error:', dbError)
      }
    }

    /* ── NOTIFICATIONS ── */
    await Promise.allSettled([
      sendAppointmentEmail(appt),
      sendWhatsAppNotification(buildAppointmentWhatsAppMessage(appt)),
    ])

    return NextResponse.json(
      {
        success: true,
        appointmentId: appt.id,
        reference: appt.reference,
        confirmedDate: appt.preferredDate,
        confirmedTime: appt.preferredTime,
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('[appointments POST] Unexpected error:', err)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}
