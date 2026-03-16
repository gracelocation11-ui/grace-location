'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const TESTIMONIALS = [
  {
    name: 'Marie-Claire Obiang',
    event: 'Mariage — Libreville, 2024',
    stars: 5,
    text: 'Un service exceptionnel du début à la fin. Les tentes, la décoration et le traiteur étaient parfaits. Je recommande vivement Grâce Location.',
  },
  {
    name: 'Dr. Sylvain Ngoubou',
    event: 'Conférence institutionnelle, 2023',
    stars: 5,
    text: 'Professionnalisme et ponctualité au rendez-vous. Le matériel était impeccable et l\'équipe très réactive. Un prestataire de confiance.',
  },
  {
    name: 'Entreprise Olam Gabon',
    event: 'Réception corporate, 2022',
    stars: 5,
    text: 'Grâce Location a géré notre événement avec une rigueur exemplaire. Équipements de qualité, chauffeurs ponctuels. Partenaire recommandé.',
  },
  {
    name: 'Famille Moussavou',
    event: 'Anniversaire — Libreville, 2024',
    stars: 5,
    text: 'Service 5 étoiles ! Tout était parfait — les chaises VIP, la sono, le traiteur. Nous ferons appel à eux pour tous nos événements.',
  },
]

function TestimonialCard({ t, index }: { t: typeof TESTIMONIALS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: '#111111',
        border: `1px solid ${hovered ? 'var(--gold)' : '#1A1A1A'}`,
        padding: '2rem',
        position: 'relative',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? '0 8px 40px rgba(201,168,76,0.1)' : 'none',
      }}
    >
      {/* Quote mark */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1.25rem',
        fontFamily: 'var(--font-serif)',
        fontSize: '4rem',
        fontWeight: 700,
        color: 'var(--gold)',
        opacity: 0.12,
        lineHeight: 1,
        userSelect: 'none',
      }}>
        &ldquo;
      </div>

      {/* Stars */}
      <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
        {Array.from({ length: t.stars }).map((_, i) => (
          <span key={i} style={{ color: 'var(--gold)', fontSize: '0.875rem' }}>★</span>
        ))}
      </div>

      {/* Text */}
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.9375rem',
        color: 'rgba(245,245,245,0.55)',
        lineHeight: 1.7,
        marginBottom: '1.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        {t.text}
      </p>

      {/* Divider */}
      <div style={{ width: '32px', height: '1px', background: '#2A2A2A', marginBottom: '1rem' }} />

      {/* Author */}
      <div>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.0625rem',
          fontWeight: 700,
          color: '#F5F5F5',
          marginBottom: '0.2rem',
        }}>
          {t.name}
        </div>
        <div style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.6875rem',
          color: 'rgba(245,245,245,0.55)',
          letterSpacing: '0.08em',
        }}>
          {t.event}
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section style={{ padding: '5rem 1.5rem', background: '#0A0A0A' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Label + Title */}
        <div className="section-label" style={{ marginBottom: '1rem' }}>
          Témoignages
        </div>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 500,
          color: '#F5F5F5',
          marginBottom: '3rem',
          letterSpacing: '-0.02em',
        }}>
          Ce que disent nos clients
        </h2>

        {/* Grid */}
        <div
          data-testimonials-grid
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            background: '#1A1A1A',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          [data-testimonials-grid] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
