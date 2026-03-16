'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const WHATSAPP = 'https://wa.me/24106203965'

const CONTACT_CARDS = [
  {
    icon: '📞',
    label: 'Téléphone',
    value: '+241 06 20 39 65',
    value2: '+241 077 68 70 85',
    href: 'tel:+24106203965',
  },
  {
    icon: '💬',
    label: 'WhatsApp',
    value: '+241 06 20 39 65',
    value2: null,
    href: WHATSAPP,
    highlight: true,
  },
  {
    icon: '✉️',
    label: 'Email',
    value: 'gracelocation11@gmail.com',
    value2: null,
    href: 'mailto:gracelocation11@gmail.com',
  },
  {
    icon: '📍',
    label: 'Adresse',
    value: 'Libreville, Gabon',
    value2: 'Disponible partout au Gabon',
    href: null,
  },
  {
    icon: '🌐',
    label: 'Site web',
    value: 'e-shepha.com',
    value2: null,
    href: 'https://e-shepha.com',
  },
]

interface ContactFormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const SERVICE_OPTIONS = [
  'Planification Événements',
  'Mariage de Luxe',
  'Catering Gastronomique',
  'Location de Véhicules',
  'E-Shepha Platform',
  'Wedding Coaching',
  'Political Coaching',
  'Autre',
]

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true)
    const toastId = toast.loading('Envoi en cours...')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Erreur serveur')

      toast.success('Message envoyé ! Nous vous répondrons sous 24h.', { id: toastId })
      reset()
    } catch {
      toast.error('Erreur lors de l\'envoi. Contactez-nous via WhatsApp.', { id: toastId })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      style={{ padding: '7rem 1.5rem', background: '#0A0A0A', position: 'relative' }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        {/* ── LEFT — CONTACT INFO ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-label" style={{ marginBottom: '1rem' }}>
            Nous Contacter
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 500,
              color: '#F5F5F5',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Créons Quelque Chose d&apos;Exceptionnel
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9375rem',
              color: 'rgba(245,245,245,0.55)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
            }}
          >
            Prêt à élever votre prochain événement à Libreville ? Notre équipe
            est disponible pour concrétiser votre vision.
          </p>

          {/* Contact cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {CONTACT_CARDS.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                {card.href ? (
                  <a
                    href={card.href}
                    target={card.href.startsWith('http') ? '_blank' : undefined}
                    rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1.125rem 0',
                      borderBottom: '1px solid #1A1A1A',
                      textDecoration: 'none',
                      transition: 'padding-left 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.paddingLeft = '0.375rem'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.paddingLeft = '0'
                    }}
                  >
                    <ContactCardContent card={card} />
                  </a>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1.125rem 0',
                      borderBottom: '1px solid #1A1A1A',
                    }}
                  >
                    <ContactCardContent card={card} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              marginTop: '2rem',
              padding: '0.875rem 1.75rem',
              background: 'rgba(37,211,102,0.1)',
              border: '1px solid rgba(37,211,102,0.3)',
              color: '#25D366',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(37,211,102,0.18)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(37,211,102,0.1)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.855L0 24l6.335-1.509A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-4.964-1.347l-.356-.211-3.763.896.953-3.671-.232-.374A9.786 9.786 0 012.182 12c0-5.42 4.398-9.818 9.818-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
            </svg>
            Discuter sur WhatsApp
          </a>
        </motion.div>

        {/* ── RIGHT — FORM ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          id="devis"
        >
          <div
            style={{
              background: '#0f0f0f',
              border: '1px solid #1A1A1A',
              padding: '2.5rem',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.625rem',
                fontWeight: 500,
                color: '#F5F5F5',
                marginBottom: '0.5rem',
              }}
            >
              Demande de devis gratuit
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8125rem',
                color: 'rgba(245,245,245,0.55)',
                marginBottom: '2rem',
              }}
            >
              Réponse garantie sous 24 heures ouvrables.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {/* Name + Phone row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <input
                    {...register('name', { required: 'Nom requis' })}
                    className="input-dark"
                    placeholder="Nom complet *"
                    disabled={submitting}
                  />
                  {errors.name && (
                    <span style={{ color: '#EF4444', fontSize: '0.6875rem', marginTop: '0.25rem', display: 'block' }}>
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    {...register('phone', { required: 'Téléphone requis' })}
                    className="input-dark"
                    placeholder="Téléphone *"
                    type="tel"
                    disabled={submitting}
                  />
                  {errors.phone && (
                    <span style={{ color: '#EF4444', fontSize: '0.6875rem', marginTop: '0.25rem', display: 'block' }}>
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <input
                  {...register('email', {
                    required: 'Email requis',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email invalide' },
                  })}
                  className="input-dark"
                  placeholder="Email *"
                  type="email"
                  disabled={submitting}
                />
                {errors.email && (
                  <span style={{ color: '#EF4444', fontSize: '0.6875rem', marginTop: '0.25rem', display: 'block' }}>
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Service select */}
              <div>
                <select
                  {...register('service', { required: 'Choisissez un service' })}
                  className="input-dark"
                  disabled={submitting}
                  style={{ appearance: 'none', cursor: 'pointer' }}
                >
                  <option value="">Service souhaité *</option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s} style={{ background: '#1A1A1A' }}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <span style={{ color: '#EF4444', fontSize: '0.6875rem', marginTop: '0.25rem', display: 'block' }}>
                    {errors.service.message}
                  </span>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  {...register('message', { required: 'Message requis', minLength: { value: 20, message: '20 caractères minimum' } })}
                  className="input-dark"
                  placeholder="Décrivez votre projet, date, lieu, nombre d'invités... *"
                  rows={5}
                  disabled={submitting}
                  style={{ resize: 'vertical', minHeight: '120px' }}
                />
                {errors.message && (
                  <span style={{ color: '#EF4444', fontSize: '0.6875rem', marginTop: '0.25rem', display: 'block' }}>
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-gold"
                disabled={submitting}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  opacity: submitting ? 0.7 : 1,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                }}
              >
                {submitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
              </button>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  color: 'rgba(245,245,245,0.55)',
                  textAlign: 'center',
                  opacity: 0.6,
                }}
              >
                🔒 Vos données sont confidentielles et ne sont jamais partagées.
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #contact > div {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
        @media (max-width: 480px) {
          #contact form > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

function ContactCardContent({
  card,
}: {
  card: { icon: string; label: string; value: string; value2?: string | null; highlight?: boolean }
}) {
  return (
    <>
      <span
        style={{
          fontSize: '1.25rem',
          flexShrink: 0,
          marginTop: '2px',
        }}
      >
        {card.icon}
      </span>
      <div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(245,245,245,0.55)',
            marginBottom: '0.25rem',
          }}
        >
          {card.label}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9375rem',
            fontWeight: 500,
            color: card.highlight ? '#25D366' : '#F5F5F5',
          }}
        >
          {card.value}
        </div>
        {card.value2 && (
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8125rem',
              color: 'rgba(245,245,245,0.55)',
              marginTop: '2px',
            }}
          >
            {card.value2}
          </div>
        )}
      </div>
    </>
  )
}
