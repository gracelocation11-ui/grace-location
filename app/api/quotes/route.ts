import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendQuoteEmail } from '@/lib/email'
import { sendWhatsAppNotification, buildQuoteWhatsAppMessage } from '@/lib/whatsapp'
import { generateReference, TABLES } from '@/lib/supabase'
import { TAX_RATE } from '@/lib/services-data'
import type { Quote, QuoteItem } from '@/types'

interface QuoteRequestBody {
  clientName: string
  clientEmail: string
  clientPhone: string
  companyName?: string
  clientAddress?: string
  items: Array<{
    description: string
    quantity: number
    unitPrice: number
    note?: string
  }>
  notes?: string
}

export async function POST(req: NextRequest) {
  try {
    const body: QuoteRequestBody = await req.json()

    /* ── VALIDATION ── */
    if (!body.clientName?.trim()) {
      return NextResponse.json({ error: 'clientName est requis' }, { status: 400 })
    }
    if (!body.clientEmail?.trim() || !body.clientEmail.includes('@')) {
      return NextResponse.json({ error: 'clientEmail invalide' }, { status: 400 })
    }
    if (!body.clientPhone?.trim()) {
      return NextResponse.json({ error: 'clientPhone est requis' }, { status: 400 })
    }
    if (!body.items?.length) {
      return NextResponse.json({ error: 'Au moins un article requis' }, { status: 400 })
    }

    /* ── BUILD QUOTE ITEMS ── */
    const items: QuoteItem[] = body.items.map((item, i) => ({
      id: `item-${i + 1}`,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      currency: 'FCFA',
      total: item.quantity * item.unitPrice,
      note: item.note,
    }))

    const subtotal = items.reduce((sum, i) => sum + i.total, 0)
    const taxAmount = Math.round(subtotal * (TAX_RATE / 100))
    const total = subtotal + taxAmount

    const validUntil = new Date()
    validUntil.setDate(validUntil.getDate() + 30)

    const quote: Quote = {
      id: crypto.randomUUID(),
      reference: generateReference('DEV'),
      status: 'draft',
      clientName: body.clientName.trim(),
      clientEmail: body.clientEmail.trim().toLowerCase(),
      clientPhone: body.clientPhone.trim(),
      companyName: body.companyName?.trim(),
      clientAddress: body.clientAddress?.trim(),
      items,
      subtotal,
      taxRate: TAX_RATE,
      taxAmount,
      total,
      currency: 'FCFA',
      validityDays: 30,
      validUntil: validUntil.toISOString(),
      notes: body.notes?.trim(),
      createdAt: new Date().toISOString(),
    }

    /* ── INSERT TO SUPABASE ── */
    const db = supabaseAdmin
    if (db) {
      const { error: dbError } = await db.from(TABLES.QUOTES).insert({
        id: quote.id,
        reference: quote.reference,
        status: quote.status,
        client_name: quote.clientName,
        client_email: quote.clientEmail,
        client_phone: quote.clientPhone,
        company_name: quote.companyName,
        client_address: quote.clientAddress,
        items: quote.items,
        subtotal: quote.subtotal,
        tax_rate: quote.taxRate,
        tax_amount: quote.taxAmount,
        total: quote.total,
        currency: quote.currency,
        validity_days: quote.validityDays,
        valid_until: quote.validUntil,
        notes: quote.notes,
        created_at: quote.createdAt,
      })

      if (dbError) {
        console.error('[quotes API] Supabase insert error:', dbError)
        // Continue even if DB fails — still send emails
      }
    }

    /* ── NOTIFICATIONS (non-blocking) ── */
    await Promise.allSettled([
      sendQuoteEmail(quote),
      sendWhatsAppNotification(buildQuoteWhatsAppMessage(quote)),
    ])

    return NextResponse.json(
      {
        success: true,
        quoteId: quote.id,
        reference: quote.reference,
        total: quote.total,
        currency: quote.currency,
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('[quotes API] Unexpected error:', err)
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}
