'use client'

import { useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import PageHero from '@/components/ui/PageHero'
import MobileCTABar from '@/components/ui/MobileCTABar'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import QuoteBasket, { type BasketItem } from '@/components/forms/QuoteBasket'
import { formatPrice } from '@/lib/services-data'

const EVENT_CHIPS = ['Mariage', 'Corporate', 'Réception VIP', 'Conférence', 'Anniversaire', 'Lancement']

interface CateringItem {
  id: string
  name: string
  description?: string
  price: number
  unit: string
  minQty?: number
}

const FORMULES: CateringItem[] = [
  { id: 'buffet-africain', name: 'Buffet africain', description: 'Cuisine gabonaise traditionnelle', price: 15000, unit: 'pers', minQty: 50 },
  { id: 'buffet-intl', name: 'Buffet international', description: 'Cuisine internationale variée', price: 20000, unit: 'pers', minQty: 50 },
  { id: 'cocktail-dinatoire', name: 'Cocktail dînatoire', description: 'Canapés et bouchées gastronomiques', price: 12000, unit: 'pers', minQty: 30 },
  { id: 'dejeuner-affaires', name: "Déjeuner d'affaires", description: 'Menu 3 services', price: 18000, unit: 'pers', minQty: 20 },
  { id: 'diner-gala', name: 'Dîner de gala', description: 'Menu gastronomique 5 services', price: 25000, unit: 'pers', minQty: 30 },
]

const COMPLEMENTS: CateringItem[] = [
  { id: 'bar-sans-alcool', name: 'Bar sans alcool', price: 5000, unit: 'pers' },
  { id: 'vaisselle', name: 'Vaisselle complète', price: 3000, unit: 'pers' },
  { id: 'personnel', name: 'Personnel de service', price: 25000, unit: 'agent' },
  { id: 'marmite-chauffante', name: 'Marmite chauffante', price: 10000, unit: 'unité' },
]

function CateringCard({ item, inCart, onAdd }: { item: CateringItem; inCart: boolean; onAdd: () => void }) {
  return (
    <div style={{
      background: inCart ? '#0f0f0a' : '#080808',
      padding: '1.5rem',
      borderTop: inCart ? '2px solid #C9A84C' : '2px solid transparent',
      border: '1px solid #1A1A1A',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    }}>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 500, color: '#F7F4EE' }}>
        {item.name}
      </div>
      {item.description && (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#BDB8AD', lineHeight: 1.5 }}>
          {item.description}
        </p>
      )}
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, color: '#C9A84C' }}>
        {formatPrice(item.price, 'FCFA', { compact: true })}
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 400, color: '#BDB8AD', marginLeft: '0.25rem' }}>/ {item.unit}</span>
      </div>
      {item.minQty && (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.5625rem', color: '#BDB8AD', letterSpacing: '0.08em' }}>
          Minimum {item.minQty} {item.unit}
        </p>
      )}
      <button
        onClick={onAdd}
        className={inCart ? 'btn-gold' : 'btn-outline'}
        style={{ fontSize: '0.6875rem', padding: '0.5rem 0.75rem', justifyContent: 'center', marginTop: 'auto' }}
      >
        {inCart ? '✓ Ajouté' : '+ Ajouter au devis'}
      </button>
    </div>
  )
}

export default function ServiceTraiteurClient() {
  const [basket, setBasket] = useState<BasketItem[]>([])

  const getBasketItem = (id: string) => basket.find(b => b.id === id)

  const addItem = (item: CateringItem) => {
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
        label="Traiteur"
        title="Service Traiteur"
        subtitle="Gastronomie événementielle · Libreville"
      />

      <section style={{ padding: '3rem 1.5rem 5rem', background: '#080808' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Event chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '3rem' }}>
            {EVENT_CHIPS.map(chip => (
              <span key={chip} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#BDB8AD', padding: '0.375rem 0.875rem', border: '1px solid rgba(201,168,76,0.2)', letterSpacing: '0.06em' }}>
                {chip}
              </span>
            ))}
          </div>

          {/* Main 2-col layout */}
          <div data-traiteur-grid style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>

            {/* LEFT: Menu */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 500, color: '#F7F4EE', marginBottom: '1.5rem' }}>Formules</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: '1rem', marginBottom: '3rem' }}>
                {FORMULES.map(item => (
                  <CateringCard
                    key={item.id}
                    item={item}
                    inCart={!!getBasketItem(item.id)}
                    onAdd={() => addItem(item)}
                  />
                ))}
              </div>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 500, color: '#F7F4EE', marginBottom: '1.5rem' }}>Compléments</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
                {COMPLEMENTS.map(item => (
                  <CateringCard
                    key={item.id}
                    item={item}
                    inCart={!!getBasketItem(item.id)}
                    onAdd={() => addItem(item)}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: Basket */}
            <div data-traiteur-basket style={{ position: 'sticky', top: '88px' }}>
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
          [data-traiteur-grid] { display: flex !important; flex-direction: column !important; }
          [data-traiteur-basket] { position: static !important; }
        }
      `}</style>
    </>
  )
}
