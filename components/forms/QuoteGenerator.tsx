'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { SERVICES, formatPrice } from '@/lib/services-data'
import type { ServiceCategory } from '@/types'

/* ─── TYPES ─────────────────────────────────────────────── */
interface CartItem {
  serviceId: string
  serviceName: string
  serviceCategory: ServiceCategory
  unitPrice: number
  quantity: number
}

interface ClientFormData {
  clientName: string
  clientEmail: string
  clientPhone: string
  companyName?: string
  notes?: string
}

type TabId = ServiceCategory | 'all'

const TABS: { id: TabId; label: string }[] = [
  { id: 'all', label: 'Tous' },
  { id: 'event_planning', label: 'Événements' },
  { id: 'catering', label: 'Catering' },
  { id: 'vehicle_rental', label: 'Véhicules' },
  { id: 'platform', label: 'Platform' },
  { id: 'coaching', label: 'Coaching' },
]

const TAX_RATE = 18

/* ─── COMPONENT ─────────────────────────────────────────── */
export default function QuoteGenerator() {
  const [activeTab, setActiveTab] = useState<TabId>('all')
  const [cart, setCart] = useState<CartItem[]>([])
  const [step, setStep] = useState<'catalog' | 'form' | 'success'>('catalog')
  const [submitting, setSubmitting] = useState(false)
  const [quoteRef, setQuoteRef] = useState<string>('')

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ClientFormData>()

  /* ── FILTERED SERVICES ── */
  const filteredServices = activeTab === 'all'
    ? SERVICES.filter(s => s.available && s.price)
    : SERVICES.filter(s => s.category === activeTab && s.available && s.price)

  /* ── CART HELPERS ── */
  const getCartItem = (serviceId: string) => cart.find(i => i.serviceId === serviceId)

  const addToCart = (service: typeof SERVICES[0]) => {
    if (!service.price) return
    setCart(prev => {
      const existing = prev.find(i => i.serviceId === service.id)
      if (existing) {
        return prev.map(i => i.serviceId === service.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, {
        serviceId: service.id,
        serviceName: service.name,
        serviceCategory: service.category,
        unitPrice: service.price!.min,
        quantity: 1,
      }]
    })
  }

  const updateQty = (serviceId: string, delta: number) => {
    setCart(prev => prev
      .map(i => i.serviceId === serviceId ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i)
      .filter(i => i.quantity > 0)
    )
  }

  const subtotal = cart.reduce((s, i) => s + i.unitPrice * i.quantity, 0)
  const tax = Math.round(subtotal * (TAX_RATE / 100))
  const total = subtotal + tax

  /* ── SUBMIT ── */
  const onSubmit = async (data: ClientFormData) => {
    if (!cart.length) {
      toast.error('Ajoutez au moins un service à votre devis.')
      return
    }
    setSubmitting(true)
    const tid = toast.loading('Génération du devis...')
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          items: cart.map(i => ({
            description: i.serviceName,
            quantity: i.quantity,
            unitPrice: i.unitPrice,
          })),
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Erreur')

      toast.success('Devis généré et envoyé par email !', { id: tid })
      setQuoteRef(json.reference)
      setStep('success')
      reset()
      setCart([])
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur lors de la génération'
      toast.error(msg, { id: tid })
    } finally {
      setSubmitting(false)
    }
  }

  /* ── SUCCESS SCREEN ── */
  if (step === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', padding: '4rem 2rem' }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>✦</div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 500, color: '#F7F4EE', marginBottom: '0.75rem' }}>
          Devis {quoteRef} Généré
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: '#BDB8AD', maxWidth: '40ch', margin: '0 auto 2rem', lineHeight: 1.7 }}>
          Vous recevrez votre devis détaillé par email sous quelques minutes. Notre équipe vous contactera dans les 24h.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setStep('catalog')}
            className="btn-outline"
            style={{ fontSize: '0.8125rem' }}
          >
            Nouveau devis
          </button>
          <a
            href="https://wa.me/24106203965"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ fontSize: '0.8125rem' }}
          >
            💬 Discuter sur WhatsApp
          </a>
        </div>
      </motion.div>
    )
  }

  return (
    <div data-quote-grid style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: '2rem', alignItems: 'start' }}>
      <style>{`
        @media (max-width: 1024px) {
          [data-quote-grid] { display: flex !important; flex-direction: column !important; }
        }
        .quote-sticky-panel {
          position: sticky;
          top: 80px;
          max-height: calc(100vh - 100px);
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: thin;
          scrollbar-color: #C9A84C44 #111;
          z-index: 5;
        }
        .quote-sticky-panel::-webkit-scrollbar { width: 4px; }
        .quote-sticky-panel::-webkit-scrollbar-track { background: #111; }
        .quote-sticky-panel::-webkit-scrollbar-thumb { background: #C9A84C44; border-radius: 2px; }
        @media (max-width: 1024px) {
          .quote-sticky-panel {
            position: static !important;
            max-height: none !important;
            overflow-y: visible !important;
            z-index: auto !important;
          }
        }
        .mobile-cart-bar {
          display: none;
          position: fixed;
          bottom: 68px;
          left: 0; right: 0;
          background: #0f0f0a;
          border-top: 2px solid #C9A84C;
          padding: 0.75rem 1.25rem;
          z-index: 50;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          box-shadow: 0 -4px 24px rgba(201,168,76,0.12);
        }
        @media (max-width: 1024px) {
          .mobile-cart-bar { display: flex !important; }
        }
        .qty-btn {
          background: none !important;
          border: none !important;
          color: #C9A84C !important;
          font-size: 1.25rem !important;
          cursor: pointer !important;
          line-height: 1 !important;
          padding: 0 0.5rem !important;
          min-height: 44px !important;
          min-width: 36px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
      `}</style>

      {/* ── LEFT PANEL ── */}
      <div>
        {/* Category tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.5rem' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.5rem 1rem',
                border: '1px solid',
                borderColor: activeTab === tab.id ? '#C9A84C' : '#2A2A2A',
                background: activeTab === tab.id ? '#C9A84C' : 'transparent',
                color: activeTab === tab.id ? '#080808' : '#BDB8AD',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Service cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: '1px', background: '#1A1A1A' }}>
          <AnimatePresence mode="popLayout">
            {filteredServices.map(service => {
              const cartItem = getCartItem(service.id)
              const inCart = !!cartItem

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: inCart ? '#0f0f0a' : '#080808',
                    padding: '1.5rem',
                    borderTop: inCart ? '2px solid #C9A84C' : '2px solid transparent',
                    transition: 'background 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.875rem',
                  }}
                >
                  {/* Category chip */}
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C' }}>
                    {service.category.replace('_', ' ')}
                  </span>

                  {/* Name & tagline */}
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 500, color: '#F7F4EE', marginBottom: '0.25rem' }}>
                      {service.name}
                    </h4>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#BDB8AD', lineHeight: 1.5 }}>
                      {service.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.5625rem', color: '#BDB8AD', letterSpacing: '0.08em', marginBottom: '2px' }}>
                      {service.price?.label ?? 'Dès'}
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, color: '#C9A84C' }}>
                      {service.price ? formatPrice(service.price.min, service.price.currency, { compact: true }) : 'Sur demande'}
                    </div>
                  </div>

                  {/* Add / qty controls */}
                  {!inCart ? (
                    <button
                      onClick={() => addToCart(service)}
                      className="btn-outline"
                      style={{ fontSize: '0.6875rem', padding: '0.5rem 1rem', justifyContent: 'center' }}
                    >
                      + Ajouter au devis
                    </button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #C9A84C', padding: '0.25rem 0.5rem' }}>
                      <button
                        onClick={() => updateQty(service.id, -1)}
                        className="qty-btn"
                        aria-label="Diminuer"
                      >−</button>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600, color: '#F7F4EE', minWidth: '1.5rem', textAlign: 'center' }}>
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(service.id, 1)}
                        className="qty-btn"
                        aria-label="Augmenter"
                      >+</button>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {filteredServices.length === 0 && (
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#BDB8AD', padding: '2rem', textAlign: 'center' }}>
            Aucun service dans cette catégorie.
          </p>
        )}
      </div>

      {/* ── MOBILE CART BAR ── */}
      {cart.length > 0 && (
        <div className="mobile-cart-bar">
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.5625rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C' }}>
              {cart.length} service{cart.length > 1 ? 's' : ''}
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 600, color: '#F7F4EE' }}>
              {formatPrice(total, 'FCFA', { compact: true })}
            </div>
          </div>
          <a
            href="#quote-cart"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
              padding: '0.625rem 1.125rem',
              background: 'linear-gradient(135deg, #C9A84C, #E0C068)',
              color: '#080808', fontFamily: 'var(--font-sans)', fontSize: '0.75rem',
              fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              textDecoration: 'none', minHeight: 'auto', whiteSpace: 'nowrap',
            }}
          >
            Compléter →
          </a>
        </div>
      )}

      {/* ── RIGHT PANEL — CART + FORM ── */}
      <div id="quote-cart" className="quote-sticky-panel">
        <div style={{ background: '#0f0f0f', border: '1px solid #1A1A1A' }}>

          {/* Cart header */}
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1A1A1A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 500, color: '#F7F4EE', margin: 0 }}>
              Votre Devis
            </h3>
            {cart.length > 0 && (
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', background: '#C9A84C', color: '#080808', padding: '0.2rem 0.5rem' }}>
                {cart.length} service{cart.length > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Cart items */}
          <div style={{ padding: '1rem 1.5rem', minHeight: '80px' }}>
            <AnimatePresence>
              {cart.length === 0 ? (
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: '#BDB8AD', textAlign: 'center', padding: '1rem 0', opacity: 0.6 }}>
                  Sélectionnez des services →
                </p>
              ) : (
                cart.map(item => (
                  <motion.div
                    key={item.serviceId}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #1A1A1A' }}
                  >
                    <div style={{ flex: 1, marginRight: '0.5rem' }}>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#F7F4EE', fontWeight: 500 }}>{item.serviceName}</div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.625rem', color: '#BDB8AD' }}>× {item.quantity} · {formatPrice(item.unitPrice, 'FCFA', { compact: true })} / u.</div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9375rem', fontWeight: 600, color: '#C9A84C', flexShrink: 0 }}>
                      {formatPrice(item.unitPrice * item.quantity, 'FCFA', { compact: true })}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Totals */}
          {cart.length > 0 && (
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
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 700, color: '#C9A84C' }}>{formatPrice(total, 'FCFA', { compact: true })}</span>
              </div>
            </div>
          )}

          {/* Client form */}
          <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '1.5rem', borderTop: '1px solid #1A1A1A', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', margin: '0 0 0.5rem' }}>
              Vos informations
            </p>

            <div>
              <input {...register('clientName', { required: 'Requis' })} className="input-dark" placeholder="Nom complet *" disabled={submitting} style={{ fontSize: '16px', padding: '0.625rem 0.875rem', zIndex: 30, pointerEvents: 'all' }} />
              {errors.clientName && <span style={{ color: '#EF4444', fontSize: '0.625rem', display: 'block', marginTop: '3px' }}>{errors.clientName.message}</span>}
            </div>
            <div>
              <input {...register('clientPhone', { required: 'Requis' })} className="input-dark" placeholder="Téléphone *" type="tel" disabled={submitting} style={{ fontSize: '16px', padding: '0.625rem 0.875rem', zIndex: 30, pointerEvents: 'all' }} />
              {errors.clientPhone && <span style={{ color: '#EF4444', fontSize: '0.625rem', display: 'block', marginTop: '3px' }}>{errors.clientPhone.message}</span>}
            </div>
            <div>
              <input {...register('clientEmail', { required: 'Requis', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email invalide' } })} className="input-dark" placeholder="Email *" type="email" disabled={submitting} style={{ fontSize: '16px', padding: '0.625rem 0.875rem', zIndex: 30, pointerEvents: 'all' }} />
              {errors.clientEmail && <span style={{ color: '#EF4444', fontSize: '0.625rem', display: 'block', marginTop: '3px' }}>{errors.clientEmail.message}</span>}
            </div>
            <input {...register('companyName')} className="input-dark" placeholder="Société (optionnel)" disabled={submitting} style={{ fontSize: '16px', padding: '0.625rem 0.875rem', zIndex: 30, pointerEvents: 'all' }} />
            <textarea {...register('notes')} className="input-dark" placeholder="Notes / précisions..." rows={2} disabled={submitting} style={{ fontSize: '16px', padding: '0.625rem 0.875rem', resize: 'vertical', zIndex: 30, pointerEvents: 'all' }} />

            <button
              type="submit"
              className="btn-gold"
              disabled={submitting || cart.length === 0}
              style={{ justifyContent: 'center', fontSize: '0.8125rem', opacity: (submitting || cart.length === 0) ? 0.6 : 1, cursor: (submitting || cart.length === 0) ? 'not-allowed' : 'pointer' }}
            >
              {submitting ? 'Génération...' : 'Générer mon devis'}
            </button>
          </form>
        </div>
      </div>

    </div>
  )
}
