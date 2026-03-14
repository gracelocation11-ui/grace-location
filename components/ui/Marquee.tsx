import React from 'react'

const ITEMS = [
  'Grâce Location',
  'E-Shepha Event',
  'La Tropicale',
  'CAN 2012',
  'Airtel Gabon',
  'Olam Gabon',
  'CNAMGS',
  'Libreville',
  'Radisson Blu',
  'Air France',
  'Gabon Télécom',
  'Luxembourg',
]

const SEPARATOR = (
  <span
    aria-hidden
    style={{
      display: 'inline-block',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: '#C9A84C',
      margin: '0 1.25rem',
      verticalAlign: 'middle',
      flexShrink: 0,
    }}
  />
)

interface MarqueeProps {
  direction?: 'left' | 'right'
  speed?: number
  className?: string
}

export default function Marquee({
  direction = 'left',
  speed = 35,
  className = '',
}: MarqueeProps) {
  // Duplicate items so the strip is seamless
  const allItems = [...ITEMS, ...ITEMS]

  return (
    <div
      className={className}
      style={{
        overflow: 'hidden',
        borderTop: '1px solid rgba(201,168,76,0.1)',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
        background: 'rgba(17,17,17,0.95)',
        padding: '0.875rem 0',
        userSelect: 'none',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          animation: `${direction === 'left' ? 'marquee' : 'marqueeReverse'} ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {allItems.map((item, i) => (
          <React.Fragment key={`${item}-${i}`}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#BDB8AD',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {item}
            </span>
            {SEPARATOR}
          </React.Fragment>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
