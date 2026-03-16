'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const ALL_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

const BOOKING_TYPES = [
  { value: 'discovery_call', label: 'Appel découverte', duration: 30, icon: '📞' },
  { value: 'consultation', label: 'Coaching gratuit', duration: 60, icon: '🎯' },
  { value: 'wedding_consultation', label: 'Coaching mariage (gratuit)', duration: 90, icon: '💍' },
  { value: 'site_visit', label: 'Visite de site', duration: 60, icon: '📍' },
  { value: 'political_consultation', label: 'Coaching politique (gratuit)', duration: 60, icon: '🔒' },
]

const CHANNELS = [
  { value: 'whatsapp', label: 'WhatsApp', icon: '💬' },
  { value: 'phone', label: 'Appel téléphonique', icon: '📱' },
  { value: 'video_call', label: 'Visioconférence', icon: '🖥️' },
  { value: 'in_person', label: 'En personne', icon: '🏢' },
]

interface FormData {
  clientName: string
  clientEmail: string
  clientPhone: string
  topic?: string
  notes?: string
}

type Step = 'type' | 'datetime' | 'details' | 'success'

export default function AppointmentBooking() {
  const [step, setStep] = useState<Step>('type')
  const [selectedType, setSelectedType] = useState(BOOKING_TYPES[0])
  const [selectedChannel, setSelectedChannel] = useState(CHANNELS[0])
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [bookedTimes, setBookedTimes] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [confirmationRef, setConfirmationRef]     = useState('')
  const [confirmationService, setConfirmationService] = useState('')
  const [emailSent, setEmailSent]                 = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  /* ── MIN DATE (tomorrow) ── */
  const minDate = (() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().split('T')[0]
  })()

  /* ── MAX DATE (3 months) ── */
  const maxDate = (() => {
    const d = new Date()
    d.setMonth(d.getMonth() + 3)
    return d.toISOString().split('T')[0]
  })()

  /* ── FETCH BOOKED SLOTS ── */
  const fetchSlots = useCallback(async (date: string) => {
    if (!date) return
    setLoadingSlots(true)
    setSelectedTime('')
    try {
      const res = await fetch(`/api/appointments?date=${date}`)
      const json = await res.json()
      setBookedTimes(json.bookedTimes ?? [])
    } catch {
      setBookedTimes([])
    } finally {
      setLoadingSlots(false)
    }
  }, [])

  useEffect(() => {
    if (selectedDate) fetchSlots(selectedDate)
  }, [selectedDate, fetchSlots])

  /* ── FORMAT DATE DISPLAY ── */
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return ''
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  /* ── SUBMIT ── */
  const onSubmit = async (data: FormData) => {
    if (!selectedDate || !selectedTime) {
      toast.error('Sélectionnez une date et un horaire.')
      return
    }
    setSubmitting(true)
    const tid = toast.loading('Envoi de votre demande...')
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          type: selectedType.value,
          channel: selectedChannel.value,
          preferredDate: selectedDate,
          preferredTime: selectedTime,
          durationMinutes: selectedType.duration,
          timezone: 'Africa/Libreville',
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Erreur lors de la réservation')

      setConfirmationRef(json.reference)
      setConfirmationService(json.service ?? selectedType.label)
      setEmailSent(json.emailSent === true)
      toast.success('Rendez-vous enregistré !', { id: tid })
      setStep('success')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur lors de la réservation'
      toast.error(msg, { id: tid })
    } finally {
      setSubmitting(false)
    }
  }

  /* ── SUCCESS ── */
  if (step === 'success') {
    const waMsg = encodeURIComponent(
      `Bonjour E-Shepha Event ! Je viens de réserver un rendez-vous (réf. ${confirmationRef}) — ${confirmationService} — le ${formatDateDisplay(selectedDate)} à ${selectedTime}. Merci de confirmer.`
    )

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ background: '#0f0f0f', border: '1px solid #1A1A1A', overflow: 'hidden' }}
      >
        {/* Gold top bar */}
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #A8852A, #E0C068, #A8852A)' }} />

        <div style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
          {/* Icon */}
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', margin: '0 auto 1.25rem',
          }}>
            ✓
          </div>

          {/* Reference */}
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>
            {confirmationRef}
          </div>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.625rem', fontWeight: 500, color: '#F5F5F5', marginBottom: '0.375rem', lineHeight: 1.2 }}>
            Rendez-vous confirmé
          </h3>

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--gold)', marginBottom: '0.25rem' }}>
            {confirmationService}
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'rgba(245,245,245,0.55)', marginBottom: '2rem' }}>
            {formatDateDisplay(selectedDate)} · {selectedTime} · {selectedChannel.label}
          </p>

          {/* Email status banner */}
          <div style={{
            padding: '0.875rem 1.25rem',
            marginBottom: '1.5rem',
            background: emailSent ? 'rgba(37,211,102,0.06)' : 'rgba(201,168,76,0.06)',
            border: `1px solid ${emailSent ? 'rgba(37,211,102,0.2)' : 'rgba(201,168,76,0.2)'}`,
            textAlign: 'left',
          }}>
            {emailSent ? (
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'rgba(245,245,245,0.55)', margin: 0, lineHeight: 1.6 }}>
                <span style={{ color: '#25D366' }}>✓</span> Un email de confirmation a été envoyé à{' '}
                <strong style={{ color: '#F5F5F5' }}>{/* clientEmail shown via form */}votre adresse email</strong>.
                Notre équipe vous contactera sous <strong style={{ color: '#F5F5F5' }}>24h ouvrables</strong>.
              </p>
            ) : (
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'rgba(245,245,245,0.55)', margin: 0, lineHeight: 1.6 }}>
                <span style={{ color: 'var(--gold)' }}>ℹ</span> L&apos;envoi de l&apos;email de confirmation a échoué.
                Votre réservation est bien enregistrée — confirmez via WhatsApp ci-dessous.
              </p>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <a
              href={`https://wa.me/24106203965?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                padding: '0.875rem', background: 'rgba(37,211,102,0.1)',
                border: '1px solid rgba(37,211,102,0.3)', color: '#25D366',
                fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600,
                letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
                transition: 'background 0.2s ease',
              }}
            >
              💬 Confirmer sur WhatsApp
            </a>
            <button
              onClick={() => {
                setStep('type')
                setSelectedDate('')
                setSelectedTime('')
                setEmailSent(false)
                setConfirmationRef('')
                setConfirmationService('')
              }}
              className="btn-outline"
              style={{ fontSize: '0.8125rem', justifyContent: 'center' }}
            >
              Nouveau rendez-vous
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div style={{ background: '#0f0f0f', border: '1px solid #1A1A1A' }}>

      {/* ── HEADER ── */}
      <div style={{ padding: '1.5rem 2rem 0' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 500, color: '#F5F5F5', margin: 0 }}>
          Réserver un rendez-vous
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--gold)', marginBottom: '2rem', marginTop: '0.25rem' }}>
          Accompagnement gratuit — sans engagement
        </p>
      </div>

      {/* ── STEP INDICATOR ── */}
      <div style={{ display: 'flex', borderBottom: '1px solid #1A1A1A' }}>
        {(['type', 'datetime', 'details'] as const).map((s, i) => {
          const stepLabels: Record<'type' | 'datetime' | 'details', string> = { type: 'Type', datetime: 'Horaire', details: 'Infos' }
          const isActive = step === s
          const isDone = (['type', 'datetime', 'details'] as const).indexOf(s) < (['type', 'datetime', 'details', 'success'] as const).indexOf(step)

          return (
            <div
              key={s}
              style={{
                flex: 1,
                padding: '1rem',
                textAlign: 'center',
                borderRight: i < 2 ? '1px solid #1A1A1A' : 'none',
                background: isActive ? '#0A0A0A' : 'transparent',
                borderBottom: isActive ? '2px solid var(--gold)' : '2px solid transparent',
              }}
            >
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: isActive ? 'var(--gold)' : isDone ? 'var(--gold)66' : '#2A2A2A' }}>
                {i + 1}. {stepLabels[s as 'type' | 'datetime' | 'details']}
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ padding: '2rem' }}>
        <AnimatePresence mode="wait">

          {/* ── STEP 1: TYPE + CHANNEL ── */}
          {step === 'type' && (
            <motion.div key="type" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
                Type de rendez-vous
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                {BOOKING_TYPES.map(type => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      background: selectedType.value === type.value ? '#0f0f0a' : 'transparent',
                      border: `1px solid ${selectedType.value === type.value ? 'var(--gold)' : '#2A2A2A'}`,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'border-color 0.2s ease, background 0.2s ease',
                    } as React.CSSProperties}
                  >
                    <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{type.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500, color: '#F5F5F5' }}>{type.label}</div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: 'rgba(245,245,245,0.55)' }}>{type.duration} min</div>
                    </div>
                    {selectedType.value === type.value && (
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ color: '#0A0A0A', fontSize: '0.625rem', fontWeight: 700 }}>✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
                Canal préféré
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '2rem' }}>
                {CHANNELS.map(ch => (
                  <button
                    key={ch.value}
                    onClick={() => setSelectedChannel(ch)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem',
                      background: 'transparent',
                      border: `1px solid ${selectedChannel.value === ch.value ? 'var(--gold)' : '#2A2A2A'}`,
                      cursor: 'pointer',
                      transition: 'border-color 0.2s ease',
                    } as React.CSSProperties}
                  >
                    <span style={{ fontSize: '1rem' }}>{ch.icon}</span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: selectedChannel.value === ch.value ? 'var(--gold)' : 'rgba(245,245,245,0.55)', fontWeight: selectedChannel.value === ch.value ? 600 : 400 }}>{ch.label}</span>
                  </button>
                ))}
              </div>

              <button onClick={() => setStep('datetime')} className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                Suivant →
              </button>
            </motion.div>
          )}

          {/* ── STEP 2: DATE + TIME ── */}
          {step === 'datetime' && (
            <motion.div key="datetime" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
                Choisissez une date
              </p>
              <input
                type="date"
                value={selectedDate}
                min={minDate}
                max={maxDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="input-dark"
                style={{ marginBottom: '1.5rem', colorScheme: 'dark' }}
              />

              {selectedDate && (
                <>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
                    Créneaux disponibles — {formatDateDisplay(selectedDate)}
                  </p>

                  {loadingSlots ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      {ALL_SLOTS.map(s => (
                        <div key={s} style={{ height: '40px', background: '#1A1A1A', borderRadius: '2px', animation: 'pulse 1.5s ease-in-out infinite' }} />
                      ))}
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      {ALL_SLOTS.map(slot => {
                        const booked = bookedTimes.includes(slot)
                        const selected = selectedTime === slot
                        return (
                          <button
                            key={slot}
                            disabled={booked}
                            onClick={() => setSelectedTime(slot)}
                            style={{
                              padding: '0.75rem 0.25rem',
                              minHeight: '44px',
                              background: selected ? 'var(--gold)' : 'transparent',
                              border: `1px solid ${booked ? '#1A1A1A' : selected ? 'var(--gold)' : '#2A2A2A'}`,
                              color: booked ? '#2A2A2A' : selected ? '#0A0A0A' : '#F5F5F5',
                              fontFamily: 'var(--font-sans)',
                              fontSize: '0.8125rem',
                              fontWeight: selected ? 700 : 400,
                              cursor: booked ? 'not-allowed' : 'pointer',
                              transition: 'all 0.2s ease',
                              textDecoration: booked ? 'line-through' : 'none',
                            } as React.CSSProperties}
                          >
                            {slot}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </>
              )}

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => setStep('type')} className="btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8125rem' }}>
                  ← Retour
                </button>
                <button
                  onClick={() => {
                    if (!selectedDate || !selectedTime) {
                      toast.error('Sélectionnez une date et un horaire.')
                      return
                    }
                    setStep('details')
                  }}
                  className="btn-gold"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.8125rem' }}
                >
                  Suivant →
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: DETAILS ── */}
          {step === 'details' && (
            <motion.div key="details" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }}>
              {/* Summary */}
              <div style={{ padding: '1rem', background: '#0A0A0A', border: '1px solid #2A2A2A', borderLeft: '3px solid var(--gold)', marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'rgba(245,245,245,0.55)', marginBottom: '4px' }}>Votre rendez-vous</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: '#F5F5F5', fontWeight: 500 }}>
                  {selectedType.label} · {selectedType.duration} min
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--gold)' }}>
                  {formatDateDisplay(selectedDate)} à {selectedTime} · {selectedChannel.label}
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <input {...register('clientName', { required: 'Requis' })} className="input-dark" placeholder="Nom complet *" disabled={submitting} />
                  {errors.clientName && <span style={{ color: '#EF4444', fontSize: '0.625rem', display: 'block', marginTop: '3px' }}>{errors.clientName.message}</span>}
                </div>
                <div>
                  <input {...register('clientPhone', { required: 'Requis' })} className="input-dark" placeholder="Téléphone *" type="tel" disabled={submitting} />
                  {errors.clientPhone && <span style={{ color: '#EF4444', fontSize: '0.625rem', display: 'block', marginTop: '3px' }}>{errors.clientPhone.message}</span>}
                </div>
                <div>
                  <input {...register('clientEmail', { required: 'Requis', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email invalide' } })} className="input-dark" placeholder="Email *" type="email" disabled={submitting} />
                  {errors.clientEmail && <span style={{ color: '#EF4444', fontSize: '0.625rem', display: 'block', marginTop: '3px' }}>{errors.clientEmail.message}</span>}
                </div>
                <input {...register('topic')} className="input-dark" placeholder="Sujet / objectif (optionnel)" disabled={submitting} />
                <textarea {...register('notes')} className="input-dark" placeholder="Questions ou informations supplémentaires..." rows={2} disabled={submitting} style={{ resize: 'vertical' }} />

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setStep('datetime')} className="btn-outline" style={{ flex: '0 0 auto', fontSize: '0.8125rem', padding: '0.875rem 1rem' }}>
                    ←
                  </button>
                  <button
                    type="submit"
                    className="btn-gold"
                    disabled={submitting}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      fontSize: '0.8125rem',
                      opacity: submitting ? 0.75 : 1,
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      gap: '0.5rem',
                    }}
                  >
                    {submitting && (
                      <span style={{
                        display: 'inline-block',
                        width: '14px',
                        height: '14px',
                        border: '2px solid rgba(8,8,8,0.3)',
                        borderTopColor: '#0A0A0A',
                        borderRadius: '50%',
                        animation: 'spin 0.7s linear infinite',
                        flexShrink: 0,
                      }} />
                    )}
                    {submitting ? 'Enregistrement...' : 'Confirmer le rendez-vous'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
