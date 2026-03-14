'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import MobileCTABar from '@/components/ui/MobileCTABar'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import { type VehicleData } from '@/lib/vehicles-data'
import { formatPrice } from '@/lib/services-data'
import toast from 'react-hot-toast'

const WHATSAPP_BASE = 'https://wa.me/24106203965'
const PHONE = '+24106203965'

interface Props {
  vehicle: VehicleData
  allVehicles: VehicleData[]
}

export default function VehicleDetailClient({ vehicle, allVehicles }: Props) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)

  const related = allVehicles
    .filter(v => v.category === vehicle.category && v.id !== vehicle.id)
    .slice(0, 3)

  const days = startDate && endDate
    ? Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 1
  const total = days * vehicle.pricePerDay

  const waMsg = encodeURIComponent(`Bonjour, je souhaite louer le ${vehicle.brand} ${vehicle.model} ${vehicle.year}.\nDu: ${startDate || '?'}\nAu: ${endDate || '?'}\nEstimation: ${formatPrice(total, 'FCFA')}`)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.email) {
      toast.error('Veuillez remplir tous les champs obligatoires.')
      return
    }
    setSubmitting(true)
    const tid = toast.loading('Envoi de votre demande...')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: `Location ${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
          message: `Demande de location: ${vehicle.brand} ${vehicle.model} ${vehicle.year}. Du: ${startDate || 'Non précisé'}. Au: ${endDate || 'Non précisé'}. Notes: ${form.notes || 'Aucune'}`,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Erreur')
      toast.success('Demande envoyée ! Nous vous répondrons sous 24h.', { id: tid })
      setForm({ name: '', phone: '', email: '', notes: '' })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur'
      toast.error(msg, { id: tid })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: '6rem 1.5rem 4rem', background: vehicle.gradient, position: 'relative', overflow: 'hidden', borderBottom: '1px solid #1A1A1A' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,8,0.6)' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Link href="/location-vehicules" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#BDB8AD', textDecoration: 'none', letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', marginBottom: '2rem' }}>
            ← Tous les véhicules
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.2em', color: '#C9A84C', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                {vehicle.categoryLabel}
              </span>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 500, color: '#F7F4EE', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                {vehicle.brand} {vehicle.model}
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', color: '#BDB8AD', marginLeft: '0.75rem', fontWeight: 400 }}>{vehicle.year}</span>
              </h1>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', fontWeight: 600, color: '#C9A84C', lineHeight: 1 }}>
                {formatPrice(vehicle.pricePerDay, 'FCFA', { compact: true })}
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#BDB8AD' }}>par jour</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '3rem 1.5rem 5rem', background: '#080808' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div data-vehicle-detail style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' }}>

            {/* LEFT */}
            <div>
              {/* Features */}
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 500, color: '#F7F4EE', marginBottom: '1.25rem' }}>Équipements</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}>
                {vehicle.features.map(f => (
                  <span key={f} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#BDB8AD', padding: '0.375rem 0.875rem', border: '1px solid #2A2A2A', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <span style={{ color: '#C9A84C' }}>✓</span> {f}
                  </span>
                ))}
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#BDB8AD', padding: '0.375rem 0.875rem', border: '1px solid #2A2A2A', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span style={{ color: '#C9A84C' }}>✓</span> {vehicle.seats} places
                </span>
              </div>

              {/* Price calculator */}
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 500, color: '#F7F4EE', marginBottom: '1.25rem' }}>Calculateur de prix</h2>
              <div style={{ background: '#111', border: '1px solid #1A1A1A', padding: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: '#BDB8AD', display: 'block', marginBottom: '0.375rem', letterSpacing: '0.08em' }}>Date de début</label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="input-dark" style={{ fontSize: '16px', colorScheme: 'dark' }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: '#BDB8AD', display: 'block', marginBottom: '0.375rem', letterSpacing: '0.08em' }}>Date de fin</label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="input-dark" style={{ fontSize: '16px', colorScheme: 'dark' }} />
                  </div>
                </div>
                {startDate && endDate && (
                  <div style={{ borderTop: '1px solid #2A2A2A', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#BDB8AD' }}>{days} jour{days > 1 ? 's' : ''}</span>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, color: '#C9A84C' }}>
                      {formatPrice(total, 'FCFA', { compact: true })}
                    </span>
                  </div>
                )}
              </div>

              {/* Related */}
              {related.length > 0 && (
                <>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 500, color: '#F7F4EE', marginBottom: '1.25rem' }}>Véhicules similaires</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
                    {related.map(v => (
                      <Link key={v.id} href={`/location-vehicules/${v.slug}`} style={{ textDecoration: 'none', background: '#111', border: '1px solid #1A1A1A', padding: '1rem', display: 'block', transition: 'border-color 0.3s' }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = '#C9A84C')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = '#1A1A1A')}
                      >
                        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: '#F7F4EE', marginBottom: '0.25rem' }}>{v.brand} {v.model}</div>
                        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: '#C9A84C' }}>{formatPrice(v.pricePerDay, 'FCFA', { compact: true })}/jour</div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* RIGHT: Form */}
            <div style={{ position: 'sticky', top: '88px' }}>
              {/* CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <a href={`${WHATSAPP_BASE}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '48px', background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)', color: '#25D366', fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
                  💬 WhatsApp
                </a>
                <a href={`tel:${PHONE}`}
                  className="btn-outline"
                  style={{ justifyContent: 'center', fontSize: '0.8125rem' }}>
                  📞 Appeler
                </a>
              </div>

              {/* Inquiry form */}
              <div style={{ background: '#0f0f0f', border: '1px solid #1A1A1A' }}>
                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1A1A1A' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 500, color: '#F7F4EE', margin: 0 }}>
                    Demander un devis
                  </h3>
                </div>
                <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-dark" placeholder="Nom complet *" disabled={submitting} style={{ fontSize: '16px', padding: '0.625rem 0.875rem' }} />
                  <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="input-dark" placeholder="Téléphone *" type="tel" disabled={submitting} style={{ fontSize: '16px', padding: '0.625rem 0.875rem' }} />
                  <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-dark" placeholder="Email *" type="email" disabled={submitting} style={{ fontSize: '16px', padding: '0.625rem 0.875rem' }} />
                  <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="input-dark" placeholder="Notes / dates souhaités..." rows={3} disabled={submitting} style={{ fontSize: '16px', padding: '0.625rem 0.875rem', resize: 'vertical' }} />
                  <button type="submit" className="btn-gold" disabled={submitting} style={{ justifyContent: 'center', fontSize: '0.8125rem', opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? 'Envoi...' : 'Envoyer ma demande'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCTABar />
      <WhatsAppFloat />

      <style>{`
        @media (max-width: 768px) {
          [data-vehicle-detail] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
