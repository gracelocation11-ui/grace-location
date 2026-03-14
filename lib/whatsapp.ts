import type { Quote, Order, Appointment } from '@/types'
import { formatPrice } from '@/lib/services-data'

const ADMIN_NUMBER = process.env.ADMIN_WHATSAPP ?? '24106203965'
const WA_API_BASE = `https://wa.me/${ADMIN_NUMBER}`

/* ─── LINK BUILDER ───────────────────────────────────────── */
export function getWhatsAppLink(message?: string): string {
  if (!message) return WA_API_BASE
  return `${WA_API_BASE}?text=${encodeURIComponent(message)}`
}

/* ─── SERVER NOTIFICATION ────────────────────────────────── */
/**
 * Sends a WhatsApp notification to the admin via the
 * CallMeBot free API (no subscription needed for personal numbers).
 * Falls back to logging if env vars not set.
 *
 * To activate: send "I allow callmebot to send me messages" to
 * +34 644 88 25 62 on WhatsApp. Then set CALLMEBOT_APIKEY in .env.local
 */
export async function sendWhatsAppNotification(message: string): Promise<void> {
  const apiKey = process.env.CALLMEBOT_APIKEY

  if (!apiKey) {
    // Log the message server-side — admin will see it in Vercel logs
    console.log('[WhatsApp notification]', message)
    return
  }

  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${ADMIN_NUMBER}&text=${encodeURIComponent(message)}&apikey=${apiKey}`
    const res = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(8000) })
    if (!res.ok) {
      console.warn('[WhatsApp] CallMeBot responded with status:', res.status)
    }
  } catch (err) {
    // Non-critical — don't throw, just log
    console.error('[WhatsApp] Notification failed (non-critical):', err)
  }
}

/* ─── MESSAGE BUILDERS ───────────────────────────────────── */
export function buildQuoteWhatsAppMessage(quote: Quote): string {
  const lines = [
    `📋 *NOUVEAU DEVIS — E-Shepha Event*`,
    `Réf: ${quote.reference}`,
    ``,
    `👤 *Client:* ${quote.clientName}`,
    `📞 ${quote.clientPhone}`,
    `✉️ ${quote.clientEmail}`,
    quote.companyName ? `🏢 ${quote.companyName}` : '',
    ``,
    `💰 *Total:* ${formatPrice(quote.total, quote.currency)}`,
    `📅 *Valide jusqu'au:* ${new Date(quote.validUntil).toLocaleDateString('fr-FR')}`,
    ``,
    quote.notes ? `📝 Notes: ${quote.notes}` : '',
    ``,
    `👉 Répondre via l'admin dashboard ou rappeler le client.`,
  ]
  return lines.filter(l => l !== null).join('\n')
}

export function buildOrderWhatsAppMessage(order: Order): string {
  const itemsList = order.items
    .map(i => `  • ${i.serviceName} × ${i.quantity}`)
    .join('\n')

  const lines = [
    `🛒 *NOUVELLE COMMANDE — E-Shepha Event*`,
    `Réf: ${order.reference}`,
    ``,
    `👤 *Client:* ${order.clientName}`,
    `📞 ${order.clientPhone}`,
    `✉️ ${order.clientEmail}`,
    ``,
    `📦 *Services commandés:*`,
    itemsList,
    ``,
    `💰 *Total:* ${formatPrice(order.totalAmount, order.currency)}`,
    `💳 *Paiement:* À la livraison`,
    order.eventDate ? `📅 *Date événement:* ${new Date(order.eventDate).toLocaleDateString('fr-FR')}` : '',
    order.eventLocation ? `📍 *Lieu:* ${order.eventLocation}` : '',
    ``,
    order.notes ? `📝 Notes: ${order.notes}` : '',
    ``,
    `👉 Confirmer la commande dans les 2h.`,
  ]
  return lines.filter(l => l !== null).join('\n')
}

export function buildAppointmentWhatsAppMessage(appt: Appointment): string {
  const typeLabels: Record<string, string> = {
    discovery_call: 'Appel découverte',
    consultation: 'Consultation',
    site_visit: 'Visite de site',
    wedding_consultation: 'Consultation mariage',
    political_consultation: 'Consultation politique',
  }

  const channelLabels: Record<string, string> = {
    whatsapp: 'WhatsApp',
    phone: 'Téléphone',
    video_call: 'Visio',
    in_person: 'En personne',
  }

  const lines = [
    `📅 *NOUVEAU RENDEZ-VOUS — E-Shepha Event*`,
    `Réf: ${appt.reference}`,
    ``,
    `👤 *Client:* ${appt.clientName}`,
    `📞 ${appt.clientPhone}`,
    `✉️ ${appt.clientEmail}`,
    ``,
    `🎯 *Type:* ${typeLabels[appt.type] ?? appt.type}`,
    `📡 *Canal:* ${channelLabels[appt.channel] ?? appt.channel}`,
    `📅 *Date:* ${new Date(appt.preferredDate).toLocaleDateString('fr-FR')}`,
    `⏰ *Heure:* ${appt.preferredTime}`,
    `⏱️ *Durée:* ${appt.durationMinutes} min`,
    appt.topic ? `💬 *Sujet:* ${appt.topic}` : '',
    ``,
    appt.notes ? `📝 Notes: ${appt.notes}` : '',
    ``,
    `👉 Confirmer le rendez-vous sous 24h.`,
  ]
  return lines.filter(l => l !== null).join('\n')
}
