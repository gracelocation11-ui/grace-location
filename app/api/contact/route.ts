import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'
import { sendWhatsAppNotification } from '@/lib/whatsapp'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    /* ── VALIDATION ── */
    if (!body.name?.trim()) {
      return NextResponse.json({ error: 'name est requis' }, { status: 400 })
    }
    if (!body.email?.trim() || !body.email.includes('@')) {
      return NextResponse.json({ error: 'email invalide' }, { status: 400 })
    }
    if (!body.phone?.trim()) {
      return NextResponse.json({ error: 'phone est requis' }, { status: 400 })
    }
    if (!body.message?.trim() || body.message.trim().length < 10) {
      return NextResponse.json({ error: 'message trop court (10 caractères minimum)' }, { status: 400 })
    }

    const data = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      service: body.service?.trim() ?? 'Non précisé',
      message: body.message.trim(),
    }

    /* ── WA ADMIN MESSAGE ── */
    const waMessage = [
      `📩 *CONTACT — E-Shepha Event*`,
      ``,
      `👤 *Nom:* ${data.name}`,
      `📞 *Tél:* ${data.phone}`,
      `✉️ *Email:* ${data.email}`,
      `🎯 *Service:* ${data.service}`,
      ``,
      `💬 *Message:*`,
      data.message.substring(0, 300) + (data.message.length > 300 ? '...' : ''),
    ].join('\n')

    /* ── SEND (non-blocking for WA) ── */
    await sendContactEmail(data)
    await sendWhatsAppNotification(waMessage)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[contact API] Error:', err)
    return NextResponse.json({ error: 'Erreur lors de l\'envoi. Veuillez réessayer.' }, { status: 500 })
  }
}
