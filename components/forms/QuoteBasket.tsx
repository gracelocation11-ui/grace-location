'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { formatPrice } from '@/lib/services-data'
import { EVENT_TYPES } from '@/lib/services-data'

export interface BasketItem {
  id: string
  name: string
  price: number
  unit: string
  quantity: number
}

interface QuoteBasketProps {
  items: BasketItem[]
  onAdd?: (id: string) => void
  onRemove: (id: string) => void
  onUpdateQty: (id: string, delta: number) => void
}

const WHATSAPP = 'https://wa.me/24106203965'

const TAX_RATE = 18

export default function QuoteBasket({ items, onRemove, onUpdateQty }: QuoteBasketProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [submitting, setSubmitting] = useState(false)
  const [quoteRef, setQuoteRef] = useState('')

  const [form, setForm] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    eventType: '',
    eventDate: '',
    eventLocation: '',
    guestCount: '',
    notes: '',
  })

  const [coachingOptions, setCoachingOptions] = useState({
    wedding: false,
    logistics: false,
    discovery: false,
    none: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const tax = Math.round(subtotal * (TAX_RATE / 100))
  const total = subtotal + tax

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.clientName.trim()) e.clientName = 'Requis'
    if (!form.clientPhone.trim()) e.clientPhone = 'Requis'
    if (!form.clientEmail.trim() || !form.clientEmail.includes('@')) e.clientEmail = 'Email invalide'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  const openModal = () => {
    if (items.length === 0) {
      toast.error('Ajoutez au moins un article à votre devis.')
      return
    }
    setStep(1)
    setModalOpen(true)
  }

  const handleStep1Next = () => {
    if (!validate()) return
    setStep(2)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    const tid = toast.loading('Génération du devis...')
    try {
      const coachingNote = Object.entries(coachingOptions)
        .filter(([, v]) => v)
        .map(([k]) => k === 'wedding' ? 'Coaching mariage (gratuit)' : k === 'logistics' ? 'Coaching organisation logistique' : k === 'discovery' ? 'Appel découverte (30 min)' : 'Non merci, juste le devis')
        .join(', ')

      const notesText = [
        form.notes,
        form.eventType ? `Type: ${form.eventType}` : '',
        form.eventDate ? `Date: ${form.eventDate}` : '',
        form.eventLocation ? `Lieu: ${form.eventLocation}` : '',
        form.guestCount ? `Invités: ${form.guestCount}` : '',
        coachingNote ? `Coaching souhaité: ${coachingNote}` : '',
      ].filter(Boolean).join(' | ')

      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: form.clientName,
          clientEmail: form.clientEmail,
          clientPhone: form.clientPhone,
          notes: notesText,
          items: items.map(i => ({
            description: i.name,
            quantity: i.quantity,
            unitPrice: i.price,
          })),
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Erreur')

      toast.success('Devis envoyé !', { id: tid })
      setQuoteRef(json.reference)
      setStep(3)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur'
      toast.error(msg, { id: tid })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div style={{ background: '#0f0f0f', border: '1px solid #1A1A1A' }}>
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1A1A1A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 500, color: '#F7F4EE', margin: 0 }}>
            Votre Devis
          </h3>
          {items.length > 0 && (
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', background: '#C9A84C', color: '#080808', padding: '0.2rem 0.5rem' }}>
              {items.length} article{items.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Items */}
        <div style={{ padding: '1rem 1.5rem', minHeight: '80px' }}>
          <AnimatePresence>
            {items.length === 0 ? (
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: '#BDB8AD', textAlign: 'center', padding: '1rem 0', opacity: 0.6 }}>
                Sélectionnez des articles →
              </p>
            ) : (
              items.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 0', borderBottom: '1px solid #1A1A1A', gap: '0.5rem' }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#F7F4EE', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.625rem', color: '#BDB8AD' }}>
                      {formatPrice(item.price, 'FCFA', { compact: true })} / {item.unit}
                    </div>
                  </div>
                  {/* Qty */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', border: '1px solid #2A2A2A', padding: '0.125rem 0.25rem' }}>
                    <button onClick={() => onUpdateQty(item.id, -1)} style={{ background: 'none', border: 'none', color: '#C9A84C', fontSize: '1rem', cursor: 'pointer', lineHeight: 1, padding: '0 0.125rem', minHeight: '24px', minWidth: '24px' }}>−</button>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#F7F4EE', minWidth: '1.25rem', textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} style={{ background: 'none', border: 'none', color: '#C9A84C', fontSize: '1rem', cursor: 'pointer', lineHeight: 1, padding: '0 0.125rem', minHeight: '24px', minWidth: '24px' }}>+</button>
                  </div>
                  {/* Total */}
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.875rem', fontWeight: 600, color: '#C9A84C', flexShrink: 0 }}>
                    {formatPrice(item.price * item.quantity, 'FCFA', { compact: true })}
                  </div>
                  {/* Remove */}
                  <button onClick={() => onRemove(item.id)} style={{ background: 'none', border: 'none', color: '#2A2A2A', fontSize: '0.875rem', cursor: 'pointer', padding: '0 0.125rem', lineHeight: 1, transition: 'color 0.2s', minHeight: '24px', minWidth: '24px' }} onMouseEnter={e => (e.currentTarget.style.color = '#EF4444')} onMouseLeave={e => (e.currentTarget.style.color = '#2A2A2A')}>
                    ×
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Totals */}
        {items.length > 0 && (
          <div style={{ padding: '0.75rem 1.5rem', borderTop: '1px solid #1A1A1A', background: '#080808' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#BDB8AD' }}>Sous-total</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#F7F4EE' }}>{formatPrice(subtotal, 'FCFA', { compact: true })}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#BDB8AD' }}>TVA (18%)</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#F7F4EE' }}>{formatPrice(tax, 'FCFA', { compact: true })}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #2A2A2A', paddingTop: '0.625rem' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 700, color: '#C9A84C' }}>TOTAL TTC</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#C9A84C' }}>{formatPrice(total, 'FCFA', { compact: true })}</span>
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #1A1A1A' }}>
          <button
            onClick={openModal}
            className="btn-gold"
            disabled={items.length === 0}
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.8125rem', opacity: items.length === 0 ? 0.5 : 1, cursor: items.length === 0 ? 'not-allowed' : 'pointer' }}
          >
            Générer mon devis
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
            onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false) }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              style={{ background: '#111', border: '1px solid #2A2A2A', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflow: 'auto' }}
            >
              {/* Modal Header */}
              <div style={{ padding: '1.5rem', borderBottom: '1px solid #1A1A1A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 500, color: '#F7F4EE', margin: 0 }}>
                  {step === 1 ? 'Vos coordonnées' : step === 2 ? 'Coaching offert' : 'Devis envoyé !'}
                </h3>
                <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: '#BDB8AD', fontSize: '1.25rem', cursor: 'pointer', lineHeight: 1 }}>×</button>
              </div>

              <div style={{ padding: '1.5rem' }}>
                {/* Step 1 */}
                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <input value={form.clientName} onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} className="input-dark" placeholder="Nom complet *" style={{ fontSize: '16px' }} />
                      {errors.clientName && <span style={{ color: '#EF4444', fontSize: '0.625rem', display: 'block', marginTop: '3px' }}>{errors.clientName}</span>}
                    </div>
                    <div>
                      <input value={form.clientPhone} onChange={e => setForm(f => ({ ...f, clientPhone: e.target.value }))} className="input-dark" placeholder="Téléphone *" type="tel" style={{ fontSize: '16px' }} />
                      {errors.clientPhone && <span style={{ color: '#EF4444', fontSize: '0.625rem', display: 'block', marginTop: '3px' }}>{errors.clientPhone}</span>}
                    </div>
                    <div>
                      <input value={form.clientEmail} onChange={e => setForm(f => ({ ...f, clientEmail: e.target.value }))} className="input-dark" placeholder="Email *" type="email" style={{ fontSize: '16px' }} />
                      {errors.clientEmail && <span style={{ color: '#EF4444', fontSize: '0.625rem', display: 'block', marginTop: '3px' }}>{errors.clientEmail}</span>}
                    </div>
                    <select value={form.eventType} onChange={e => setForm(f => ({ ...f, eventType: e.target.value }))} className="input-dark" style={{ fontSize: '16px' }}>
                      <option value="">Type d&apos;événement</option>
                      {EVENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                    <input value={form.eventDate} onChange={e => setForm(f => ({ ...f, eventDate: e.target.value }))} className="input-dark" type="date" placeholder="Date de l'événement" style={{ fontSize: '16px', colorScheme: 'dark' }} />
                    <input value={form.eventLocation} onChange={e => setForm(f => ({ ...f, eventLocation: e.target.value }))} className="input-dark" placeholder="Lieu de l'événement" style={{ fontSize: '16px' }} />
                    <input value={form.guestCount} onChange={e => setForm(f => ({ ...f, guestCount: e.target.value }))} className="input-dark" placeholder="Nombre d'invités" type="number" min="1" style={{ fontSize: '16px' }} />
                    <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="input-dark" placeholder="Notes / précisions..." rows={3} style={{ fontSize: '16px', resize: 'vertical' }} />
                    <button onClick={handleStep1Next} className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                      Suivant →
                    </button>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: '#BDB8AD', lineHeight: 1.6 }}>
                      En plus de votre devis, souhaitez-vous bénéficier d&apos;un accompagnement gratuit ?
                    </p>
                    {[
                      { key: 'wedding', label: 'Coaching mariage (gratuit)' },
                      { key: 'logistics', label: 'Coaching organisation logistique' },
                      { key: 'discovery', label: 'Appel découverte (30 min)' },
                      { key: 'none', label: 'Non merci, juste le devis' },
                    ].map(opt => (
                      <label key={opt.key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.875rem', border: `1px solid ${coachingOptions[opt.key as keyof typeof coachingOptions] ? '#C9A84C' : '#2A2A2A'}`, background: coachingOptions[opt.key as keyof typeof coachingOptions] ? '#0f0f0a' : 'transparent', transition: 'all 0.2s' }}>
                        <input
                          type="checkbox"
                          checked={coachingOptions[opt.key as keyof typeof coachingOptions]}
                          onChange={e => setCoachingOptions(prev => ({ ...prev, [opt.key]: e.target.checked }))}
                          style={{ accentColor: '#C9A84C', width: '16px', height: '16px' }}
                        />
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#F7F4EE' }}>{opt.label}</span>
                      </label>
                    ))}
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                      <button onClick={() => setStep(1)} className="btn-outline" style={{ flex: '0 0 auto', fontSize: '0.8125rem', padding: '0.875rem 1rem' }}>←</button>
                      <button onClick={handleSubmit} disabled={submitting} className="btn-gold" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8125rem', opacity: submitting ? 0.7 : 1 }}>
                        {submitting ? 'Envoi...' : 'Envoyer mon devis'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 - Success */}
                {step === 3 && (
                  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✦</div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 500, color: '#F7F4EE', marginBottom: '0.5rem' }}>
                      Votre devis a été envoyé !
                    </h4>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: '#C9A84C', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
                      Référence : {quoteRef}
                    </p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#BDB8AD', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '36ch', margin: '0 auto 2rem' }}>
                      Notre équipe vous contactera dans les 24h.
                    </p>
                    <a
                      href={WHATSAPP}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
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
                      }}
                    >
                      💬 Discuter sur WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
