'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import PageHero from '@/components/ui/PageHero'
import MobileCTABar from '@/components/ui/MobileCTABar'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import toast from 'react-hot-toast'

const PILLARS_ESHEPHA = [
  { icon: '💡', title: 'Connaissance & Innovation', sub: 'Conférences, masterclass, panels de haut niveau' },
  { icon: '🎨', title: 'Culture & Art de Vivre', sub: 'Défilés, expositions, événements culturels' },
  { icon: '🤝', title: 'Impact Social & Jeunesse', sub: 'Forums, sensibilisation, programmes jeunesse' },
  { icon: '🎉', title: 'Célébrations & Entertainment', sub: 'Galas, mariages, réceptions VIP' },
]

const EVENT_CHIPS = ['Conférences', 'Networking', 'Panels', 'Masterclass', 'Défilés', 'Culturel', 'Impact social', 'Célébrations']

const TIMELINE = [
  { year: '2006', text: 'Fondation de Grâce Location à Libreville' },
  { year: '2015', text: 'Partenaire des institutions gouvernementales gabonaises' },
  { year: '2020', text: 'Partenaire officiel La Tropicale Amissa Bongo' },
  { year: '2025', text: 'Naissance de E-Shepha Event' },
]

const BUDGET_OPTIONS = ['<5M FCFA', '5–15M FCFA', '15–30M FCFA', '30M+ FCFA', 'À discuter']

export default function EShepaClient() {
  const [form, setForm] = useState({
    projectName: '',
    eventType: '',
    eventDate: '',
    audience: '',
    objectives: '',
    budget: '',
    message: '',
    name: '',
    phone: '',
    email: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.email || !form.projectName) {
      toast.error('Veuillez remplir tous les champs obligatoires.')
      return
    }
    setSubmitting(true)
    const tid = toast.loading('Envoi de votre projet...')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: 'E-Shepha Event — Projet événementiel',
          message: `Projet: ${form.projectName} | Type: ${form.eventType} | Date: ${form.eventDate} | Audience: ${form.audience} | Budget: ${form.budget} | Objectifs: ${form.objectives} | Message: ${form.message}`,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Erreur')
      toast.success('Votre projet a été soumis ! Nous vous contacterons sous 24h.', { id: tid })
      setForm({ projectName: '', eventType: '', eventDate: '', audience: '', objectives: '', budget: '', message: '', name: '', phone: '', email: '' })
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
      <PageHero
        label="E-Shepha Event"
        title="La nouvelle génération d'événements"
        subtitle="Libreville, Gabon"
      />

      {/* History */}
      <section style={{ padding: '4rem 1.5rem', background: '#080808' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: '1rem' }}>Notre Histoire</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: '#F7F4EE', marginBottom: '3rem', letterSpacing: '-0.02em' }}>
            De Grâce Location à E-Shepha Event
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px', marginBottom: '3rem' }}>
            {TIMELINE.map(entry => (
              <div key={entry.year} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, color: '#C9A84C', flexShrink: 0, width: '3.5rem' }}>{entry.year}</span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: '#BDB8AD', lineHeight: 1.6 }}>— {entry.text}</span>
              </div>
            ))}
          </div>

          {/* Transition quote */}
          <div style={{ padding: '2rem', border: '1px solid #2A2A2A', borderLeft: '3px solid #C9A84C', background: '#0a0a0a', maxWidth: '600px' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: '#F7F4EE', lineHeight: 1.7, marginBottom: '1rem' }}>
              Née en 2006, Grâce Location a équipé plus de 500 événements au Gabon.
            </p>
            <div style={{ width: '32px', height: '1px', background: '#C9A84C', marginBottom: '1rem' }} />
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontStyle: 'italic', color: '#C9A84C' }}>
              Aujourd&apos;hui, cette expertise évolue en quelque chose de plus grand.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section style={{ padding: '4rem 1.5rem', background: '#0a0a0a', borderTop: '1px solid #1A1A1A' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: '1rem' }}>Les 4 piliers</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: '#F7F4EE', marginBottom: '3rem', letterSpacing: '-0.02em' }}>
            Une vision complète de l&apos;événementiel
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: '#1A1A1A' }}>
            {PILLARS_ESHEPHA.map(p => (
              <div key={p.title} style={{ background: '#080808', padding: '2rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{p.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 500, color: '#F7F4EE', marginBottom: '0.5rem' }}>{p.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: '#BDB8AD', lineHeight: 1.6 }}>{p.sub}</p>
              </div>
            ))}
          </div>

          {/* Event chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2.5rem' }}>
            {EVENT_CHIPS.map(chip => (
              <span key={chip} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#BDB8AD', padding: '0.375rem 0.875rem', border: '1px solid rgba(201,168,76,0.2)', letterSpacing: '0.06em' }}>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Project form */}
      <section style={{ padding: '4rem 1.5rem 5rem', background: '#080808', borderTop: '1px solid #1A1A1A' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: '1rem' }}>Votre projet</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: '#F7F4EE', marginBottom: '2.5rem', letterSpacing: '-0.02em' }}>
            Parlez-nous de votre événement
          </h2>

          <form onSubmit={handleSubmit} style={{ background: '#0f0f0f', border: '1px solid #1A1A1A', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-dark" placeholder="Votre nom *" disabled={submitting} style={{ fontSize: '16px' }} />
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="input-dark" placeholder="Téléphone *" type="tel" disabled={submitting} style={{ fontSize: '16px' }} />
            </div>
            <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-dark" placeholder="Email *" type="email" disabled={submitting} style={{ fontSize: '16px' }} />
            <input value={form.projectName} onChange={e => setForm(f => ({ ...f, projectName: e.target.value }))} className="input-dark" placeholder="Nom du projet *" disabled={submitting} style={{ fontSize: '16px' }} />
            <input value={form.eventType} onChange={e => setForm(f => ({ ...f, eventType: e.target.value }))} className="input-dark" placeholder="Type d'événement *" disabled={submitting} style={{ fontSize: '16px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <input value={form.eventDate} onChange={e => setForm(f => ({ ...f, eventDate: e.target.value }))} className="input-dark" type="date" disabled={submitting} style={{ fontSize: '16px', colorScheme: 'dark' }} />
              <input value={form.audience} onChange={e => setForm(f => ({ ...f, audience: e.target.value }))} className="input-dark" placeholder="Audience estimée" disabled={submitting} style={{ fontSize: '16px' }} />
            </div>
            <textarea value={form.objectives} onChange={e => setForm(f => ({ ...f, objectives: e.target.value }))} className="input-dark" placeholder="Objectifs de l'événement *" rows={3} disabled={submitting} style={{ fontSize: '16px', resize: 'vertical' }} />
            <select value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} className="input-dark" disabled={submitting} style={{ fontSize: '16px' }}>
              <option value="">Budget estimé</option>
              {BUDGET_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="input-dark" placeholder="Message complémentaire *" rows={4} disabled={submitting} style={{ fontSize: '16px', resize: 'vertical' }} />
            <button type="submit" className="btn-gold" disabled={submitting} style={{ justifyContent: 'center', opacity: submitting ? 0.7 : 1 }}>
              {submitting ? 'Envoi...' : 'Soumettre mon projet'}
            </button>
          </form>
        </div>
      </section>

      {/* Partnership CTA */}
      <section style={{ padding: '4rem 1.5rem', background: '#0a0a0a', borderTop: '1px solid #1A1A1A', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 500, color: '#F7F4EE', marginBottom: '1rem' }}>
            Devenez partenaire
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: '#BDB8AD', lineHeight: 1.7, marginBottom: '2rem' }}>
            Institutions, entreprises, marques — rejoignez l&apos;écosystème E-Shepha Event et co-créez des événements d&apos;impact au Gabon.
          </p>
          <Link href="/contact" className="btn-gold" style={{ justifyContent: 'center' }}>
            Nous contacter
          </Link>
        </div>
      </section>

      <Footer />
      <MobileCTABar />
      <WhatsAppFloat />

      <style>{`
        @media (max-width: 640px) {
          form > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
