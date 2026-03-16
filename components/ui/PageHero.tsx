interface PageHeroProps {
  label: string
  title: string
  subtitle?: string
  gradient?: string
}

export default function PageHero({ label, title, subtitle, gradient }: PageHeroProps) {
  return (
    <section
      style={{
        padding: '8rem 1.5rem 5rem',
        background: gradient ?? '#0A0A0A',
        borderBottom: '1px solid #1A1A1A',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow */}
      <div aria-hidden style={{
        position: 'absolute', top: '50%', left: '30%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(207,169,72,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Kente overlay */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(45deg,#CFA948 25%,transparent 25%),linear-gradient(-45deg,#CFA948 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#CFA948 75%),linear-gradient(-45deg,transparent 75%,#CFA948 75%)',
        backgroundSize: '6px 6px',
        backgroundPosition: '0 0,0 3px,3px -3px,-3px 0px',
        opacity: 0.02,
        zIndex: 0,
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Label */}
        <div style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.6875rem',
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--gold)', opacity: 0.6 }} />
          {label}
        </div>

        {/* Title in Cinzel */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5.5vw, 5rem)',
          fontWeight: 900,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#F5F5F5',
          lineHeight: 1.0,
          marginBottom: subtitle ? '1.25rem' : 0,
        }}>
          {title}
        </h1>

        {subtitle && (
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1rem, 2vw, 1.375rem)',
            color: 'rgba(245,245,245,0.55)',
            maxWidth: '52ch',
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
