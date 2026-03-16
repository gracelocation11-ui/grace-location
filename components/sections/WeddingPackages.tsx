'use client'

interface WeddingPackage {
  id: string
  title: string
  price: number
  priceLabel: string
  badge?: string
  highlight?: boolean
  includes: string[]
}

const PACKAGES: WeddingPackage[] = [
  {
    id: 'pack-mariage-essentiel',
    title: 'Mariage Essentiel',
    price: 2500000,
    priceLabel: 'À partir de 2,5M FCFA',
    includes: [
      'Planification basique',
      'Coordination jour J',
      'Tentes et tables standards',
      'Sonorisation basique',
      'Décoration simple',
      '1 véhicule pour les mariés',
    ],
  },
  {
    id: 'pack-mariage-vip',
    title: 'Mariage VIP',
    price: 5000000,
    priceLabel: 'À partir de 5M FCFA',
    badge: 'Populaire',
    highlight: true,
    includes: [
      'Organisation complète',
      'Décoration premium',
      'Sonorisation professionnelle',
      'Éclairage événementiel',
      'Coordination invités',
      'Véhicules VIP',
      'Cocktail / traiteur',
    ],
  },
  {
    id: 'pack-mariage-luxe',
    title: 'Mariage Luxe',
    price: 10000000,
    priceLabel: 'À partir de 10M FCFA',
    badge: 'Prestige',
    includes: [
      'Wedding planner dédié',
      'Décoration luxe personnalisée',
      'Mise en scène complète',
      'Traiteur gastronomique',
      'Flotte de véhicules prestige',
      'Coordination invités',
      'Gestion protocole VIP',
    ],
  },
]

interface Props {
  onAdd: (id: string, name: string, price: number) => void
  addedIds?: string[]
}

export default function WeddingPackages({ onAdd, addedIds = [] }: Props) {
  return (
    <section style={{ padding: '3rem 1.5rem 0', background: '#0A0A0A' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div className="section-label" style={{ marginBottom: '0.75rem' }}>Forfaits Mariage</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 500, color: '#F5F5F5', margin: '0 0 0.5rem' }}>
            Packages Clé en Main
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'rgba(245,245,245,0.55)', lineHeight: 1.6, maxWidth: '60ch' }}>
            Tout inclus pour votre mariage — de l&apos;essentiel au luxe absolu. Ajoutez le forfait à votre devis en un clic.
          </p>
        </div>

        {/* Cards grid */}
        <div data-wedding-grid style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#1A1A1A', marginBottom: '3rem' }}>
          {PACKAGES.map(pkg => {
            const isAdded = addedIds.includes(pkg.id)
            return (
              <div
                key={pkg.id}
                style={{
                  background: pkg.highlight ? '#0f0f0a' : '#0A0A0A',
                  padding: '2rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  borderTop: pkg.highlight ? '2px solid var(--gold)' : '2px solid transparent',
                  position: 'relative',
                }}
              >
                {/* Badge */}
                {pkg.badge && (
                  <span style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    fontFamily: 'var(--font-sans)', fontSize: '0.5625rem', fontWeight: 700,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    background: 'var(--gold)', color: '#0A0A0A', padding: '0.2rem 0.625rem',
                  }}>
                    {pkg.badge}
                  </span>
                )}

                {/* Title */}
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.375rem', fontWeight: 500, color: '#F5F5F5', margin: 0, paddingRight: pkg.badge ? '4rem' : 0 }}>
                  {pkg.title}
                </h3>

                {/* Price */}
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.375rem', fontWeight: 600, color: 'var(--gold)' }}>
                  {pkg.priceLabel}
                </div>

                {/* Includes list */}
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                  {pkg.includes.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--gold)', flexShrink: 0, fontSize: '0.5rem', marginTop: '4px' }}>✦</span>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'rgba(245,245,245,0.55)', lineHeight: 1.45 }}>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => onAdd(pkg.id, pkg.title, pkg.price)}
                  className={isAdded ? 'btn-gold' : 'btn-outline'}
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.75rem', marginTop: '0.5rem' }}
                >
                  {isAdded ? '✓ Ajouté au devis' : '+ Ajouter au devis'}
                </button>
              </div>
            )
          })}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#1A1A1A', marginBottom: '0' }} />
      </div>

      <style>{`
        @media (max-width: 720px) {
          [data-wedding-grid] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
