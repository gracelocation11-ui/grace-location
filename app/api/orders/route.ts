import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, generateReference, TABLES } from '@/lib/supabase'
import { sendOrderConfirmationEmail } from '@/lib/email'
import { sendWhatsAppNotification, buildOrderWhatsAppMessage } from '@/lib/whatsapp'
import type { Order, OrderItem } from '@/types'

interface OrderRequestBody {
  clientName: string
  clientEmail: string
  clientPhone: string
  clientAddress?: string
  companyName?: string
  items: Array<{
    serviceId: string
    serviceName: string
    serviceCategory: string
    quantity: number
    unitPrice: number
    details?: string
  }>
  eventDate?: string
  eventLocation?: string
  eventType?: string
  notes?: string
}

export async function POST(req: NextRequest) {
  try {
    const body: OrderRequestBody = await req.json()

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
    if (!body.items?.length) {
      return NextResponse.json({ error: 'Au moins un service requis' }, { status: 400 })
    }

    /* ── BUILD ORDER ITEMS ── */
    const items: OrderItem[] = body.items.map(item => ({
      serviceId: item.serviceId,
      serviceName: item.serviceName,
      serviceCategory: item.serviceCategory as OrderItem['serviceCategory'],
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      total: item.quantity * item.unitPrice,
      currency: 'FCFA',
      details: item.details,
    }))

    const totalAmount = items.reduce((sum, i) => sum + i.total, 0)

    const order: Order = {
      id: crypto.randomUUID(),
      reference: generateReference('CMD'),
      status: 'pending',
      clientName: body.clientName.trim(),
      clientEmail: body.clientEmail.trim().toLowerCase(),
      clientPhone: body.clientPhone.trim(),
      clientAddress: body.clientAddress?.trim(),
      companyName: body.companyName?.trim(),
      items,
      totalAmount,
      currency: 'FCFA',
      paymentMethod: 'cash_on_delivery',
      paymentStatus: 'pending',
      eventDate: body.eventDate,
      eventLocation: body.eventLocation?.trim(),
      eventType: body.eventType,
      notes: body.notes?.trim(),
      createdAt: new Date().toISOString(),
    }

    /* ── INSERT TO SUPABASE ── */
    const db = supabaseAdmin
    if (db) {
      const { error: dbError } = await db.from(TABLES.ORDERS).insert({
        id: order.id,
        reference: order.reference,
        status: order.status,
        client_name: order.clientName,
        client_email: order.clientEmail,
        client_phone: order.clientPhone,
        client_address: order.clientAddress,
        company_name: order.companyName,
        items: order.items,
        total_amount: order.totalAmount,
        currency: order.currency,
        payment_method: order.paymentMethod,
        payment_status: order.paymentStatus,
        event_date: order.eventDate,
        event_location: order.eventLocation,
        event_type: order.eventType,
        notes: order.notes,
        created_at: order.createdAt,
      })

      if (dbError) {
        console.error('[orders API] Supabase insert error:', dbError)
      }
    }

    /* ── NOTIFICATIONS ── */
    await Promise.allSettled([
      sendOrderConfirmationEmail(order),
      sendWhatsAppNotification(buildOrderWhatsAppMessage(order)),
    ])

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        reference: order.reference,
        totalAmount: order.totalAmount,
        currency: order.currency,
        paymentMethod: order.paymentMethod,
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('[orders API] Unexpected error:', err)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}
