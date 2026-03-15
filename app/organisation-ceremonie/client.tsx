'use client'

import { useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import PageHero from '@/components/ui/PageHero'
import MobileCTABar from '@/components/ui/MobileCTABar'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import QuoteBasket, { type BasketItem } from '@/components/forms/QuoteBasket'
import WeddingPackages from '@/components/sections/WeddingPackages'
import { CATALOG_CATEGORIES, CATALOG_ITEMS, type CatalogItem } from '@/lib/catalog-data'
import { formatPrice } from '@/lib/services-data'

const EVENT_CHIPS = ['Mariage', 'Anniversaire', 'Baptême', 'Conférence', 'Lancement', 'Festival']

export default function OrganisationCeremonieClient() {
  const [activeCategory, setActiveCategory] = useState('tentes')
  const [basket, setBasket] = useState<BasketItem[]>([])

  const filteredItems = CATALOG_ITEMS.filter(i => i.category === activeCategory)

  const getBasketItem = (id: string) => basket.find(b => b.id === id)

  const addedPackageIds = basket.map(b => b.id)

  const addPackage = (id: string, name: string, price: number) => {
    setBasket(prev => {
      const existing = prev.find(b => b.id === id)
      if (existing) return prev.map(b => b.id === id ? { ...b, quantity: b.quantity + 1 } : b)
      return [...prev, { id, name, price, unit: 'forfait', quantity: 1 }]
    })
  }

  const addItem = (item: CatalogItem) => {
    setBasket(prev => {
      const existing = prev.find(b => b.id === item.id)
      if (existing) {
        return prev.map(b => b.id === item.id ? { ...b, quantity: b.quantity + (item.minQty ?? 1) } : b)
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, unit: item.unit, quantity: item.minQty ?? 1 }]
    })
  }

  const removeItem = (id: string) => setBasket(prev => prev.filter(b => b.id !== id))

  const updateQty = (id: string, delta: number) => {
    setBasket(prev =>
      prev.map(b => b.id === id ? { ...b, quantity: Math.max(0, b.quantity + delta) } : b)
        .filter(b => b.quantity > 0)
    )
  }

  return (
    <>
      <Navbar />
      <PageHero
        label="Organisation"
        title="Organisation de Cérémonies"
        subtitle="Location d'équipements événementiels depuis 2006"
      />

      {/* Wedding packages */}
      <WeddingPackages onAdd={addPackage} addedIds={addedPackageIds} />

      <section style={{ padding: '3rem 1.5rem 2rem', background: '#080808' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Event chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {EVENT_CHIPS.map(chip => (
              <span key={chip} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#BDB8AD', padding: '0.375rem 0.875rem', border: '1px solid rgba(201,168,76,0.2)', letterSpacing: '0.06em' }}>
                {chip}
              </span>
            ))}
          </div>

          {/* Intro */}
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: '#BDB8AD', lineHeight: 1.7, maxWidth: '72ch', marginBottom: '3rem' }}>
            Depuis 2006, Grâce Location équipe les plus beaux événements du Gabon. Tentes, chaises, tables, décoration, sonorisation — tout le matériel pour votre cérémonie.
          </p>

          {/* Main 2-col layout */}
          <div data-catalog-grid style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>

            {/* LEFT: Catalog */}
            <div>
              {/* Category tabs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.5rem' }}>
                {CATALOG_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '0.5rem 1rem',
                      border: '1px solid',
                      borderColor: activeCategory === cat.id ? '#C9A84C' : '#2A2A2A',
                      background: activeCategory === cat.id ? '#C9A84C' : 'transparent',
                      color: activeCategory === cat.id ? '#080808' : '#BDB8AD',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Product grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: '1px', background: '#1A1A1A' }}>
                {filteredItems.map(item => {
                  const inCart = !!getBasketItem(item.id)
                  return (
                    <div
                      key={item.id}
                      style={{
                        background: inCart ? '#0f0f0a' : '#080808',
                        padding: '1.25rem',
                        borderTop: inCart ? '2px solid #C9A84C' : '2px solid transparent',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.625rem',
                      }}
                    >
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 500, color: '#F7F4EE', lineHeight: 1.3 }}>
                        {item.name}
                      </div>
                      {item.description && (
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: '#BDB8AD', lineHeight: 1.5 }}>
                          {item.description}
                        </p>
                      )}
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 600, color: '#C9A84C' }}>
                        {formatPrice(item.price, 'FCFA', { compact: true })}
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 400, color: '#BDB8AD', marginLeft: '0.25rem' }}>/ {item.unit}</span>
                      </div>
                      {item.minQty && (
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.5625rem', color: '#BDB8AD', letterSpacing: '0.08em' }}>
                          Min. {item.minQty} {item.unit}
                        </p>
                      )}
                      <button
                        onClick={() => addItem(item)}
                        className={inCart ? 'btn-gold' : 'btn-outline'}
                        style={{ fontSize: '0.625rem', padding: '0.5rem 0.75rem', justifyContent: 'center', marginTop: 'auto' }}
                      >
                        {inCart ? '✓ Ajouté' : '+ Ajouter'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* RIGHT: Basket */}
            <div data-catalog-basket style={{ position: 'sticky', top: '88px' }}>
              <QuoteBasket
                items={basket}
                onRemove={removeItem}
                onUpdateQty={updateQty}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCTABar />
      <WhatsAppFloat />

      <style>{`
        @media (max-width: 1024px) {
          [data-catalog-grid] { display: flex !important; flex-direction: column !important; }
          [data-catalog-basket] { position: static !important; }
        }
      `}</style>
    </>
  )
}
