'use client'

import { motion } from 'framer-motion'
import AppointmentBooking from '@/components/forms/AppointmentBooking'

const FEATURES = [
  { icon: '⚡', title: 'Confirmation rapide', desc: 'Réponse garantie sous 24h ouvrables.' },
  { icon: '🔒', title: 'Totalement confidentiel', desc: 'Vos informations ne sont jamais partagées.' },
  { icon: '🌍', title: 'Disponible partout', desc: 'Visio, téléphone ou en personne à Libreville.' },
]

export default function AppointmentSection() {
  return (
    <section
      id="rendez-vous"
      style={{ padding: '7rem 1.5rem', background: '#080808', position: 'relative' }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,420px)',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        {/* ── LEFT ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        >
          <div className="section-label" style={{ marginBottom: '1rem' }}>
            Planifier un Appel
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.5vw, 3.25rem)',
              fontWeight: 500,
              color: '#F7F4EE',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
            }}
          >
            Réservez Votre Consultation
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9375rem',
              color: '#BDB8AD',
              lineHeight: 1.7,
              marginBottom: '3rem',
              maxWidth: '44ch',
            }}
          >
            Prenez rendez-vous avec notre équipe pour discuter de votre projet événementiel,
            mariage ou consulting — en toute sérénité.
          </p>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  padding: '1.25rem 0',
                  borderBottom: '1px solid #1A1A1A',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    border: '1px solid rgba(201,168,76,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.125rem',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      color: '#F7F4EE',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {f.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8125rem',
                      color: '#BDB8AD',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Availability note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{
              marginTop: '2rem',
              padding: '1rem 1.25rem',
              border: '1px solid rgba(201,168,76,0.15)',
              background: 'rgba(201,168,76,0.03)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8125rem',
                color: '#BDB8AD',
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              🕐 <strong style={{ color: '#F7F4EE' }}>Horaires :</strong> Lun – Sam, 09h00 – 17h00 (heure de Libreville, WAT/UTC+1)
            </p>
          </motion.div>
        </motion.div>

        {/* ── RIGHT — BOOKING WIDGET ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        >
          <AppointmentBooking />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #rendez-vous > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
