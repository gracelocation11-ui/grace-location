'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface Photo {
  src: string
  alt: string
  size?: 'normal' | 'tall' | string
}

interface Props {
  photos: Photo[]
  accent?: string
  backHref?: string
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const GRADIENTS = [
  'linear-gradient(135deg, #1a0e04 0%, #2e1a08 100%)',
  'linear-gradient(135deg, #04100a 0%, #081e10 100%)',
  'linear-gradient(135deg, #060a18 0%, #0a1028 100%)',
  'linear-gradient(135deg, #18080a 0%, #2a0e10 100%)',
  'linear-gradient(135deg, #1a1808 0%, #2a2808 100%)',
  'linear-gradient(135deg, #18081a 0%, #280e2a 100%)',
]

export default function PortfolioGallery({ photos, accent = 'var(--gold)', backHref = '/portfolio' }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const open = (i: number) => setLightbox(i)
  const close = () => setLightbox(null)
  const prev = () => setLightbox(i => i !== null ? (i - 1 + photos.length) % photos.length : null)
  const next = () => setLightbox(i => i !== null ? (i + 1) % photos.length : null)

  return (
    <>
      <section style={{ padding: '4rem 1.5rem 6rem', background: '#0A0A0A' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{ marginBottom: '2.5rem' }}
          >
            <Link href={backHref} style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(245,245,245,0.55)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'color 0.2s ease',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = accent)}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,245,245,0.55)')}
            >
              ← Portfolio
            </Link>
          </motion.div>

          {/* Grid */}
          <div className="gallery-grid">
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: EASE, delay: (i % 6) * 0.06 }}
                onClick={() => open(i)}
                style={{
                  cursor: 'zoom-in',
                  overflow: 'hidden',
                  position: 'relative',
                  gridRow: photo.size === 'tall' ? 'span 2' : 'span 1',
                  background: GRADIENTS[i % GRADIENTS.length],
                }}
                className="gallery-item"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)' }}
                  className="gallery-img"
                  onError={() => {}}
                />
                {/* Hover overlay */}
                <div className="gallery-overlay" style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 60%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.25rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.6875rem',
                    color: '#F5F5F5',
                    letterSpacing: '0.06em',
                  }}>{photo.alt}</span>
                </div>
                {/* Accent top border */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '2px',
                  background: accent,
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.4s ease',
                }} className="gallery-border" />
              </motion.div>
            ))}
          </div>

          {/* Count */}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.6875rem',
            color: '#2A2A2A',
            textAlign: 'center',
            marginTop: '2rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            {photos.length} photos
          </p>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.95)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
          >
            {/* Close */}
            <button
              onClick={close}
              style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                background: 'rgba(255,255,255,0.1)',
                border: 'none', color: '#F5F5F5',
                width: '40px', height: '40px',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '1.25rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >✕</button>

            {/* Prev */}
            <button
              onClick={e => { e.stopPropagation(); prev() }}
              style={{
                position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)',
                border: `1px solid ${accent}33`,
                color: '#F5F5F5',
                width: '44px', height: '44px',
                cursor: 'pointer', fontSize: '1.125rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >‹</button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '900px',
                aspectRatio: '16/10',
                background: GRADIENTS[lightbox % GRADIENTS.length],
              }}
            >
              <Image
                src={photos[lightbox].src}
                alt={photos[lightbox].alt}
                fill
                sizes="90vw"
                style={{ objectFit: 'contain' }}
                priority
              />
              <div style={{
                position: 'absolute', bottom: '-2rem', left: 0,
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6875rem',
                color: 'rgba(245,245,245,0.55)',
                letterSpacing: '0.06em',
              }}>
                {photos[lightbox].alt} — {lightbox + 1} / {photos.length}
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={e => { e.stopPropagation(); next() }}
              style={{
                position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)',
                border: `1px solid ${accent}33`,
                color: '#F5F5F5',
                width: '44px', height: '44px',
                cursor: 'pointer', fontSize: '1.125rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >›</button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 280px;
          gap: 1px;
          background: #1A1A1A;
        }
        .gallery-item { min-height: 280px; }
        .gallery-item:hover .gallery-overlay { opacity: 1 !important; }
        .gallery-item:hover .gallery-img { transform: scale(1.04); }
        .gallery-item:hover .gallery-border { transform: scaleX(1) !important; }
        @media (max-width: 900px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 240px; }
          .gallery-item { min-height: 240px; }
        }
        @media (max-width: 560px) {
          .gallery-grid { grid-template-columns: 1fr; grid-auto-rows: 220px; }
          .gallery-item[style*="span 2"] { grid-row: span 1 !important; }
        }
      `}</style>
    </>
  )
}
