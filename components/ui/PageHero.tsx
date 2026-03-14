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
        padding: '7rem 1.5rem 5rem',
        background: gradient ?? 'linear-gradient(180deg, #0a0a0a 0%, #080808 100%)',
        borderBottom: '1px solid #1A1A1A',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Kente pattern overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(45deg,#C9A84C 25%,transparent 25%),linear-gradient(-45deg,#C9A84C 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#C9A84C 75%),linear-gradient(-45deg,transparent 75%,#C9A84C 75%)',
          backgroundSize: '8px 8px',
          backgroundPosition: '0 0,0 4px,4px -4px,-4px 0px',
          opacity: 0.03,
          zIndex: 0,
        }}
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="section-label" style={{ marginBottom: '1rem' }}>
          {label}
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem,6vw,5rem)',
            fontWeight: 500,
            color: '#F7F4EE',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.125rem',
              color: '#BDB8AD',
              maxWidth: '48ch',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
