'use client'

import Link from 'next/link'

const WHATSAPP = 'https://wa.me/24106203965'

const NAV_GROUPS = [
  {
    title: 'Services',
    links: [
      { label: 'Événements & Mariages', href: '#services' },
      { label: 'Catering Gastronomique', href: '#services' },
      { label: 'Location Véhicules', href: '#vehicules' },
      { label: 'E-Shepha Platform', href: '#platform' },
      { label: 'Wedding Coaching', href: '#services' },
      { label: 'Political Coaching', href: '#services' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'Notre Portfolio', href: '#galerie' },
      { label: 'Nos Partenaires', href: '#partenaires' },
      { label: 'Notre Vision', href: '#platform' },
      { label: 'Demande de devis', href: '#devis' },
      { label: 'Rendez-vous', href: '#contact' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: '+241 06 20 39 65', href: 'tel:+24106203965' },
      { label: '+241 077 68 70 85', href: 'tel:+24177687085' },
      { label: 'gracelocation11@gmail.com', href: 'mailto:gracelocation11@gmail.com' },
      { label: 'WhatsApp', href: WHATSAPP },
      { label: 'Libreville, Gabon', href: '#contact' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: '#050505',
        borderTop: '1px solid #1A1A1A',
        padding: '5rem 1.5rem 2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* ── TOP GRID ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
            gap: '3rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid #1A1A1A',
            marginBottom: '2rem',
          }}
        >
          {/* Brand col */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1.25rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.375rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: '#C9A84C',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}
              >
                E-Shepha Event
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.5625rem',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  color: '#BDB8AD',
                  textTransform: 'uppercase',
                }}
              >
                Grâce Location · Libreville, Gabon
              </div>
            </Link>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                color: '#BDB8AD',
                lineHeight: 1.7,
                maxWidth: '28ch',
                marginBottom: '1.5rem',
              }}
            >
              Premium event management à Libreville. Mariages, galas, location
              de véhicules et innovation digitale.
            </p>

            {/* Motto */}
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1rem',
                fontStyle: 'italic',
                color: 'rgba(201,168,76,0.6)',
                marginBottom: '1.5rem',
              }}
            >
              Create · Connect · Celebrate
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { label: 'WhatsApp', href: WHATSAPP, icon: '💬' },
                {
                  label: 'Instagram',
                  href: 'https://instagram.com/eshepha_event',
                  icon: '📸',
                },
                {
                  label: 'Facebook',
                  href: 'https://facebook.com/eshepha',
                  icon: '👥',
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    border: '1px solid #2A2A2A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                    transition: 'border-color 0.25s ease, background 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#C9A84C44'
                    e.currentTarget.style.background = '#C9A84C11'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#2A2A2A'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav groups */}
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              <h4
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                  marginBottom: '1.25rem',
                }}
              >
                {group.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="link-gold"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8125rem',
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── BOTTOM BAR ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.6875rem',
              color: '#2A2A2A',
              letterSpacing: '0.08em',
            }}
          >
            © {year} E-Shepha Event / Grâce Location. Tous droits réservés.
          </p>

          {/* Kente divider accent */}
          <div
            style={{
              height: '2px',
              flex: 1,
              maxWidth: '200px',
              backgroundImage: `repeating-linear-gradient(
                90deg,
                #C9A84C 0px, #C9A84C 6px,
                #2A2A2A 6px, #2A2A2A 12px,
                #8B4513 12px, #8B4513 18px,
                #2A2A2A 18px, #2A2A2A 24px
              )`,
            }}
          />

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Politique de confidentialité', 'CGV'].map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6875rem',
                  color: '#2A2A2A',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#BDB8AD'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#2A2A2A'
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 1023px) {
          footer {
            padding-bottom: calc(80px + env(safe-area-inset-bottom, 0px)) !important;
          }
        }
      `}</style>
    </footer>
  )
}
