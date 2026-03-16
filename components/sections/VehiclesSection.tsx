'use client'

import { motion } from 'framer-motion'
import { formatPrice } from '@/lib/services-data'

const WA_BASE = 'https://wa.me/24106203965?text='

const VEHICLES = [
  {
    id: 'v1',
    brand: 'Toyota',
    model: 'Land Cruiser 300',
    category: 'SUV Luxe',
    seats: 7,
    pricePerDay: 250_000,
    features: ['4×4 Intégral', 'Climatisation', 'Wi-Fi', 'Cuir'],
    badge: 'Recommandé',
    badgeColor: 'var(--gold)',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2a2218 100%)',
  },
  {
    id: 'v2',
    brand: 'Mercedes',
    model: 'GLE 450',
    category: 'SUV Executive',
    seats: 5,
    pricePerDay: 300_000,
    features: ['AMG Line', 'Toit panoramique', 'Massage', 'Wi-Fi'],
    badge: null,
    badgeColor: null,
    gradient: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2a 100%)',
  },
  {
    id: 'v3',
    brand: 'BMW',
    model: 'X5 xDrive',
    category: 'SUV Prestige',
    seats: 5,
    pricePerDay: 280_000,
    features: ['M Sport', 'Harman Kardon', 'Head-up Display', 'Wi-Fi'],
    badge: null,
    badgeColor: null,
    gradient: 'linear-gradient(135deg, #1a0f0f 0%, #2a1a1a 100%)',
  },
  {
    id: 'v4',
    brand: 'Toyota',
    model: 'HiAce Prestige',
    category: 'Van VIP',
    seats: 12,
    pricePerDay: 200_000,
    features: ['Minibus VIP', 'Climatisation', 'USB & prises', 'Rideaux'],
    badge: 'Convois & groupes',
    badgeColor: '#2A5A8A',
    gradient: 'linear-gradient(135deg, #0a1018 0%, #151f28 100%)',
  },
  {
    id: 'v5',
    brand: 'Mercedes',
    model: 'Classe E 220',
    category: 'Berline Executive',
    seats: 4,
    pricePerDay: 180_000,
    features: ['Berline luxe', 'Cuir beige', 'Écran arrière', 'Wi-Fi'],
    badge: null,
    badgeColor: null,
    gradient: 'linear-gradient(135deg, #0f1a0f 0%, #1a2a1a 100%)',
  },
  {
    id: 'v6',
    brand: 'Range Rover',
    model: 'Velar P400',
    category: 'SUV Ultra-Luxe',
    seats: 5,
    pricePerDay: 400_000,
    features: ['Pivi Pro', 'Air suspension', 'Meridian Audio', '22" Jantes'],
    badge: 'Ultra Premium',
    badgeColor: '#8B2A8B',
    gradient: 'linear-gradient(135deg, #1a0f1a 0%, #2a1a2a 100%)',
  },
]

const REFERENCES = ['La Tropicale Gabon', 'CAN 2012', 'CEMAC', 'Radisson Blu']

export default function VehiclesSection() {
  return (
    <section
      id="vehicules"
      style={{ padding: '7rem 1.5rem', background: '#0a0a0a', position: 'relative' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3.5rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <div className="section-label" style={{ marginBottom: '1rem' }}>
              Notre Flotte
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 500,
                color: '#F5F5F5',
                lineHeight: 1.1,
              }}
            >
              Véhicules de Prestige
            </h2>
          </div>

          {/* Reference strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {REFERENCES.map((r) => (
              <span
                key={r}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,245,245,0.55)',
                  padding: '0.375rem 0.75rem',
                  border: '1px solid #2A2A2A',
                  background: '#111',
                }}
              >
                ✓ {r}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── VEHICLE GRID ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))',
            gap: '1px',
            background: '#1A1A1A',
          }}
        >
          {VEHICLES.map((v, i) => {
            const waMsg = encodeURIComponent(
              `Bonjour E-Shepha Event ! Je souhaite réserver le ${v.brand} ${v.model} (${v.category}). Merci de me confirmer la disponibilité.`
            )

            return (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  delay: (i % 3) * 0.08,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  background: '#0A0A0A',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Card image area */}
                <div
                  style={{
                    height: '200px',
                    background: v.gradient,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {/* Placeholder car silhouette */}
                  <svg
                    viewBox="0 0 200 80"
                    fill="none"
                    style={{ width: '70%', opacity: 0.15 }}
                    aria-hidden
                  >
                    <path
                      d="M20 55 L25 35 Q35 20 60 18 L140 18 Q165 20 175 35 L180 55 L185 60 L185 65 L15 65 L15 60 Z"
                      fill="white"
                    />
                    <circle cx="50" cy="65" r="12" fill="white" />
                    <circle cx="150" cy="65" r="12" fill="white" />
                    <path d="M60 18 L80 18 L75 38 L55 38 Z" fill="rgba(255,255,255,0.3)" />
                    <path d="M90 18 L130 18 L130 38 L90 38 Z" fill="rgba(255,255,255,0.3)" />
                  </svg>

                  {/* Badge */}
                  {v.badge && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: v.badgeColor ?? 'var(--gold)',
                        color: v.badgeColor === 'var(--gold)' ? '#0A0A0A' : '#fff',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.5625rem',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        padding: '0.3rem 0.625rem',
                      }}
                    >
                      {v.badge}
                    </div>
                  )}

                  {/* Price overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'rgba(8,8,8,0.85)',
                      border: '1px solid #2A2A2A',
                      padding: '0.375rem 0.75rem',
                      textAlign: 'right',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.5rem',
                        color: 'rgba(245,245,245,0.55)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      À partir de / jour
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: 'var(--gold)',
                        lineHeight: 1.2,
                      }}
                    >
                      {formatPrice(v.pricePerDay, 'FCFA', { compact: true })}
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {v.category} · {v.seats} places
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.375rem',
                        fontWeight: 500,
                        color: '#F5F5F5',
                        lineHeight: 1.2,
                      }}
                    >
                      {v.brand} {v.model}
                    </h3>
                  </div>

                  {/* Features */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {v.features.map((f) => (
                      <span
                        key={f}
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.625rem',
                          fontWeight: 500,
                          letterSpacing: '0.08em',
                          color: 'rgba(245,245,245,0.55)',
                          padding: '0.25rem 0.625rem',
                          border: '1px solid #2A2A2A',
                          background: '#111',
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={`${WA_BASE}${waMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{
                      marginTop: 'auto',
                      justifyContent: 'center',
                      fontSize: '0.6875rem',
                      padding: '0.625rem 1rem',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.855L0 24l6.335-1.509A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-4.964-1.347l-.356-.211-3.763.896.953-3.671-.232-.374A9.786 9.786 0 012.182 12c0-5.42 4.398-9.818 9.818-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
                    </svg>
                    Réserver via WhatsApp
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── BOTTOM CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              color: 'rgba(245,245,245,0.55)',
              marginBottom: '1.25rem',
            }}
          >
            Chauffeurs professionnels disponibles · Location avec ou sans chauffeur
          </p>
          <a href="#devis" className="btn-gold">
            Demander un devis flotte
          </a>
        </motion.div>
      </div>
    </section>
  )
}
