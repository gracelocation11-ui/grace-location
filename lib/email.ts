import { Resend } from 'resend'
import type { Quote, Order, Appointment } from '@/types'
import { formatPrice } from '@/lib/services-data'

// Lazy-initialize so missing key during build doesn't throw at module level
function getResend(): Resend {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    // Return a no-op-compatible instance — calls will fail at runtime,
    // but build/tsc will succeed without the key set in CI.
    return new Resend('re_placeholder_build_only')
  }
  return new Resend(key)
}

const FROM = process.env.EMAIL_FROM ?? 'E-Shepha Event <noreply@gracelocation.online>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'gracelocation11@gmail.com'

/* ═══════════════════════════════════════════════════════════
   HTML TEMPLATE HELPERS
   ═══════════════════════════════════════════════════════════ */

function baseTemplate(content: string, title: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:#111;border:1px solid #2a2a2a;border-bottom:2px solid #C9A84C;padding:32px 40px;text-align:center;">
              <div style="font-size:22px;font-weight:700;letter-spacing:0.06em;color:#C9A84C;text-transform:uppercase;margin-bottom:4px;">
                E-Shepha Event
              </div>
              <div style="font-size:10px;letter-spacing:0.2em;color:#BDB8AD;text-transform:uppercase;">
                Grâce Location · Libreville, Gabon
              </div>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:#111;border:1px solid #2a2a2a;border-top:none;padding:40px;">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#0a0a0a;border:1px solid #1a1a1a;border-top:none;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:#BDB8AD;">
                E-Shepha Event / Grâce Location — Libreville, Gabon
              </p>
              <p style="margin:0;font-size:11px;color:#3a3a3a;">
                +241 06 20 39 65 · gracelocation11@gmail.com · e-shepha.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function goldBadge(text: string): string {
  return `<span style="display:inline-block;background:#C9A84C;color:#080808;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 12px;">${text}</span>`
}

function infoRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#BDB8AD;width:40%;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#F7F4EE;font-weight:500;">${value}</td>
  </tr>`
}

function sectionTitle(text: string): string {
  return `<h2 style="margin:32px 0 16px;font-size:18px;font-weight:600;color:#C9A84C;letter-spacing:0.04em;border-bottom:1px solid #2a2a2a;padding-bottom:10px;">${text}</h2>`
}

/* ═══════════════════════════════════════════════════════════
   1. QUOTE EMAIL
   ═══════════════════════════════════════════════════════════ */

function buildQuoteEmailHtml(quote: Quote, isAdmin: boolean): string {
  const itemsHtml = quote.items.map(item => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#F7F4EE;">${item.description}</td>
      <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#BDB8AD;text-align:center;">${item.quantity}</td>
      <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#BDB8AD;text-align:right;">${formatPrice(item.unitPrice, item.currency)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#C9A84C;text-align:right;font-weight:600;">${formatPrice(item.total, item.currency)}</td>
    </tr>`).join('')

  const intro = isAdmin
    ? `<p style="color:#F7F4EE;font-size:15px;margin:0 0 24px;">📋 Nouveau devis créé — action requise.</p>`
    : `<p style="color:#F7F4EE;font-size:15px;margin:0 0 24px;">Bonjour <strong>${quote.clientName}</strong>,<br><br>Nous avons bien reçu votre demande de devis. Voici le récapitulatif :</p>`

  const content = `
    <div style="margin-bottom:20px;">${goldBadge('Devis · ' + quote.reference)}</div>
    ${intro}

    ${sectionTitle('Informations Client')}
    <table width="100%" cellpadding="0" cellspacing="0">
      ${infoRow('Nom', quote.clientName)}
      ${infoRow('Email', quote.clientEmail)}
      ${infoRow('Téléphone', quote.clientPhone)}
      ${quote.companyName ? infoRow('Société', quote.companyName) : ''}
    </table>

    ${sectionTitle('Détail du Devis')}
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <th style="padding:8px 0;font-size:11px;color:#BDB8AD;text-align:left;letter-spacing:0.1em;text-transform:uppercase;">Désignation</th>
        <th style="padding:8px 0;font-size:11px;color:#BDB8AD;text-align:center;letter-spacing:0.1em;text-transform:uppercase;">Qté</th>
        <th style="padding:8px 0;font-size:11px;color:#BDB8AD;text-align:right;letter-spacing:0.1em;text-transform:uppercase;">P.U.</th>
        <th style="padding:8px 0;font-size:11px;color:#BDB8AD;text-align:right;letter-spacing:0.1em;text-transform:uppercase;">Total</th>
      </tr>
      ${itemsHtml}
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#BDB8AD;text-align:right;">Sous-total</td>
        <td style="padding:8px 0;font-size:13px;color:#F7F4EE;text-align:right;width:160px;">${formatPrice(quote.subtotal, quote.currency)}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#BDB8AD;text-align:right;">TVA (${quote.taxRate}%)</td>
        <td style="padding:8px 0;font-size:13px;color:#F7F4EE;text-align:right;">${formatPrice(quote.taxAmount, quote.currency)}</td>
      </tr>
      <tr>
        <td style="padding:12px 0;font-size:16px;font-weight:700;color:#C9A84C;text-align:right;border-top:1px solid #2a2a2a;">TOTAL TTC</td>
        <td style="padding:12px 0;font-size:16px;font-weight:700;color:#C9A84C;text-align:right;border-top:1px solid #2a2a2a;">${formatPrice(quote.total, quote.currency)}</td>
      </tr>
    </table>

    ${quote.notes ? `${sectionTitle('Notes')}<p style="color:#BDB8AD;font-size:13px;line-height:1.6;">${quote.notes}</p>` : ''}

    <div style="margin-top:32px;padding:16px;background:#0a0a0a;border:1px solid #2a2a2a;border-left:3px solid #C9A84C;">
      <p style="margin:0;font-size:12px;color:#BDB8AD;">
        ⏳ Ce devis est valable jusqu'au <strong style="color:#F7F4EE;">${new Date(quote.validUntil).toLocaleDateString('fr-FR')}</strong>.<br>
        Pour accepter ou modifier ce devis, contactez-nous via WhatsApp : +241 06 20 39 65
      </p>
    </div>
  `

  return baseTemplate(content, `Devis ${quote.reference} — E-Shepha Event`)
}

export async function sendQuoteEmail(quote: Quote): Promise<void> {
  const [clientResult, adminResult] = await Promise.allSettled([
    getResend().emails.send({
      from: FROM,
      to: [quote.clientEmail],
      subject: `Votre devis E-Shepha Event — ${quote.reference}`,
      html: buildQuoteEmailHtml(quote, false),
    }),
    getResend().emails.send({
      from: FROM,
      to: [ADMIN_EMAIL],
      subject: `[DEVIS] ${quote.reference} — ${quote.clientName} · ${formatPrice(quote.total, quote.currency)}`,
      html: buildQuoteEmailHtml(quote, true),
    }),
  ])

  if (clientResult.status === 'rejected') {
    console.error('[email] Quote client email failed:', clientResult.reason)
  }
  if (adminResult.status === 'rejected') {
    console.error('[email] Quote admin email failed:', adminResult.reason)
  }
}

/* ═══════════════════════════════════════════════════════════
   2. ORDER CONFIRMATION EMAIL
   ═══════════════════════════════════════════════════════════ */

function buildOrderEmailHtml(order: Order, isAdmin: boolean): string {
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#F7F4EE;">${item.serviceName}</td>
      <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#BDB8AD;text-align:center;">${item.quantity}</td>
      <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:13px;color:#C9A84C;text-align:right;font-weight:600;">${formatPrice(item.total, item.currency)}</td>
    </tr>`).join('')

  const statusMap: Record<string, string> = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    in_progress: 'En cours',
    ready: 'Prête',
    delivered: 'Livrée',
    cancelled: 'Annulée',
  }

  const intro = isAdmin
    ? `<p style="color:#F7F4EE;font-size:15px;margin:0 0 24px;">🛒 Nouvelle commande reçue.</p>`
    : `<p style="color:#F7F4EE;font-size:15px;margin:0 0 24px;">Bonjour <strong>${order.clientName}</strong>,<br><br>Votre commande a bien été enregistrée. Notre équipe vous contactera sous peu pour confirmer.</p>`

  const content = `
    <div style="margin-bottom:20px;">${goldBadge('Commande · ' + order.reference)}</div>
    ${intro}

    ${sectionTitle('Informations Client')}
    <table width="100%" cellpadding="0" cellspacing="0">
      ${infoRow('Nom', order.clientName)}
      ${infoRow('Téléphone', order.clientPhone)}
      ${infoRow('Email', order.clientEmail)}
      ${order.clientAddress ? infoRow('Adresse', order.clientAddress) : ''}
    </table>

    ${sectionTitle('Détail de la Commande')}
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <th style="padding:8px 0;font-size:11px;color:#BDB8AD;text-align:left;letter-spacing:0.1em;text-transform:uppercase;">Service</th>
        <th style="padding:8px 0;font-size:11px;color:#BDB8AD;text-align:center;letter-spacing:0.1em;text-transform:uppercase;">Qté</th>
        <th style="padding:8px 0;font-size:11px;color:#BDB8AD;text-align:right;letter-spacing:0.1em;text-transform:uppercase;">Total</th>
      </tr>
      ${itemsHtml}
      <tr>
        <td colspan="2" style="padding:14px 0;font-size:16px;font-weight:700;color:#C9A84C;border-top:1px solid #2a2a2a;">TOTAL</td>
        <td style="padding:14px 0;font-size:16px;font-weight:700;color:#C9A84C;text-align:right;border-top:1px solid #2a2a2a;">${formatPrice(order.totalAmount, order.currency)}</td>
      </tr>
    </table>

    ${sectionTitle('Paiement & Statut')}
    <table width="100%" cellpadding="0" cellspacing="0">
      ${infoRow('Mode de paiement', 'Paiement à la livraison')}
      ${infoRow('Statut', statusMap[order.status] ?? order.status)}
      ${order.eventDate ? infoRow('Date événement', new Date(order.eventDate).toLocaleDateString('fr-FR')) : ''}
      ${order.eventLocation ? infoRow('Lieu', order.eventLocation) : ''}
    </table>

    ${order.notes ? `${sectionTitle('Notes')}<p style="color:#BDB8AD;font-size:13px;line-height:1.6;">${order.notes}</p>` : ''}

    <div style="margin-top:32px;padding:16px;background:#0a0a0a;border:1px solid #2a2a2a;border-left:3px solid #C9A84C;">
      <p style="margin:0;font-size:12px;color:#BDB8AD;">
        💬 Pour toute question, contactez-nous : <strong style="color:#F7F4EE;">+241 06 20 39 65</strong>
      </p>
    </div>
  `

  return baseTemplate(content, `Commande ${order.reference} — E-Shepha Event`)
}

export async function sendOrderConfirmationEmail(order: Order): Promise<void> {
  const [clientResult, adminResult] = await Promise.allSettled([
    getResend().emails.send({
      from: FROM,
      to: [order.clientEmail],
      subject: `Confirmation de commande — ${order.reference}`,
      html: buildOrderEmailHtml(order, false),
    }),
    getResend().emails.send({
      from: FROM,
      to: [ADMIN_EMAIL],
      subject: `[COMMANDE] ${order.reference} — ${order.clientName} · ${formatPrice(order.totalAmount, order.currency)}`,
      html: buildOrderEmailHtml(order, true),
    }),
  ])

  if (clientResult.status === 'rejected') {
    console.error('[email] Order client email failed:', clientResult.reason)
  }
  if (adminResult.status === 'rejected') {
    console.error('[email] Order admin email failed:', adminResult.reason)
  }
}

/* ═══════════════════════════════════════════════════════════
   3. APPOINTMENT EMAIL
   ═══════════════════════════════════════════════════════════ */

const BOOKING_TYPE_LABELS: Record<string, string> = {
  discovery_call: 'Appel découverte',
  consultation: 'Consultation',
  site_visit: 'Visite de site',
  wedding_consultation: 'Consultation mariage',
  political_consultation: 'Consultation politique (confidentiel)',
}

const CHANNEL_LABELS: Record<string, string> = {
  whatsapp: 'WhatsApp',
  phone: 'Appel téléphonique',
  video_call: 'Visioconférence',
  in_person: 'En personne',
}

function buildAppointmentEmailHtml(appt: Appointment, isAdmin: boolean): string {
  const intro = isAdmin
    ? `<p style="color:#F7F4EE;font-size:15px;margin:0 0 24px;">📅 Nouvelle demande de rendez-vous.</p>`
    : `<p style="color:#F7F4EE;font-size:15px;margin:0 0 24px;">Bonjour <strong>${appt.clientName}</strong>,<br><br>Votre demande de rendez-vous a été enregistrée. Nous vous confirmerons les détails sous peu.</p>`

  const content = `
    <div style="margin-bottom:20px;">${goldBadge('Rendez-vous · ' + appt.reference)}</div>
    ${intro}

    ${sectionTitle('Détails du Rendez-vous')}
    <table width="100%" cellpadding="0" cellspacing="0">
      ${infoRow('Client', appt.clientName)}
      ${infoRow('Téléphone', appt.clientPhone)}
      ${infoRow('Email', appt.clientEmail)}
      ${infoRow('Type', BOOKING_TYPE_LABELS[appt.type] ?? appt.type)}
      ${infoRow('Canal', CHANNEL_LABELS[appt.channel] ?? appt.channel)}
      ${infoRow('Date souhaitée', new Date(appt.preferredDate).toLocaleDateString('fr-FR'))}
      ${infoRow('Heure souhaitée', appt.preferredTime)}
      ${infoRow('Durée', `${appt.durationMinutes} minutes`)}
      ${appt.topic ? infoRow('Sujet', appt.topic) : ''}
    </table>

    ${appt.notes ? `${sectionTitle('Notes')}<p style="color:#BDB8AD;font-size:13px;line-height:1.6;">${appt.notes}</p>` : ''}

    ${appt.meetingLink ? `
    <div style="margin-top:24px;padding:16px;background:#0a1a0a;border:1px solid #2a4a2a;">
      <p style="margin:0;font-size:12px;color:#BDB8AD;">
        🔗 Lien de réunion : <a href="${appt.meetingLink}" style="color:#C9A84C;">${appt.meetingLink}</a>
      </p>
    </div>` : ''}

    <div style="margin-top:24px;padding:16px;background:#0a0a0a;border:1px solid #2a2a2a;border-left:3px solid #C9A84C;">
      <p style="margin:0;font-size:12px;color:#BDB8AD;">
        Notre équipe vous confirmera ce rendez-vous dans les 24h.<br>
        Contact : <strong style="color:#F7F4EE;">+241 06 20 39 65</strong>
      </p>
    </div>
  `

  return baseTemplate(content, `Rendez-vous ${appt.reference} — E-Shepha Event`)
}

export async function sendAppointmentEmail(appt: Appointment): Promise<void> {
  const [clientResult, adminResult] = await Promise.allSettled([
    getResend().emails.send({
      from: FROM,
      to: [appt.clientEmail],
      subject: `Demande de rendez-vous confirmée — ${appt.reference}`,
      html: buildAppointmentEmailHtml(appt, false),
    }),
    getResend().emails.send({
      from: FROM,
      to: [ADMIN_EMAIL],
      subject: `[RDV] ${appt.reference} — ${appt.clientName} · ${new Date(appt.preferredDate).toLocaleDateString('fr-FR')} ${appt.preferredTime}`,
      html: buildAppointmentEmailHtml(appt, true),
    }),
  ])

  if (clientResult.status === 'rejected') {
    console.error('[email] Appointment client email failed:', clientResult.reason)
  }
  if (adminResult.status === 'rejected') {
    console.error('[email] Appointment admin email failed:', adminResult.reason)
  }
}

/* ═══════════════════════════════════════════════════════════
   4. CONTACT EMAIL (admin only)
   ═══════════════════════════════════════════════════════════ */

interface ContactData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

function buildContactEmailHtml(data: ContactData): string {
  const content = `
    <div style="margin-bottom:20px;">${goldBadge('Nouveau Message')}</div>
    <p style="color:#F7F4EE;font-size:15px;margin:0 0 24px;">📩 Message reçu via le formulaire de contact.</p>

    ${sectionTitle('Contact')}
    <table width="100%" cellpadding="0" cellspacing="0">
      ${infoRow('Nom', data.name)}
      ${infoRow('Email', data.email)}
      ${infoRow('Téléphone', data.phone)}
      ${infoRow('Service intéressé', data.service)}
    </table>

    ${sectionTitle('Message')}
    <div style="background:#0a0a0a;border:1px solid #2a2a2a;border-left:3px solid #C9A84C;padding:16px;">
      <p style="margin:0;font-size:14px;color:#F7F4EE;line-height:1.7;">${data.message.replace(/\n/g, '<br>')}</p>
    </div>

    <div style="margin-top:24px;padding:16px;background:#0a0a0a;border:1px solid #1a1a1a;">
      <p style="margin:0;font-size:12px;color:#BDB8AD;">
        Répondre à : <a href="mailto:${data.email}" style="color:#C9A84C;">${data.email}</a><br>
        Appeler : <a href="tel:${data.phone}" style="color:#C9A84C;">${data.phone}</a>
      </p>
    </div>
  `
  return baseTemplate(content, `Message de ${data.name} — E-Shepha Event`)
}

export async function sendContactEmail(data: ContactData): Promise<boolean> {
  try {
    const result = await getResend().emails.send({
      from: FROM,
      to: [ADMIN_EMAIL],
      replyTo: data.email,
      subject: `[CONTACT] ${data.name} — ${data.service}`,
      html: buildContactEmailHtml(data),
    })

    if (result.error) {
      console.error('[email] Contact email failed:', result.error)
      return false
    }
    return true
  } catch (err) {
    console.error('[email] Contact email exception:', err)
    return false
  }
}
