import type { Metadata } from 'next'
import { VEHICLES_DATA } from '@/lib/vehicles-data'
import VehicleDetailClient from './client'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return VEHICLES_DATA.map(v => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const vehicle = VEHICLES_DATA.find(v => v.slug === slug)
  if (!vehicle) return { title: 'Véhicule non trouvé' }
  return {
    title: `${vehicle.brand} ${vehicle.model} — Location Libreville | Grâce Location`,
    description: `Louer le ${vehicle.brand} ${vehicle.model} ${vehicle.year} à Libreville. ${vehicle.pricePerDay.toLocaleString('fr-FR')} FCFA/jour. Chauffeur disponible.`,
  }
}

export default async function VehicleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const vehicle = VEHICLES_DATA.find(v => v.slug === slug)
  if (!vehicle) notFound()
  return <VehicleDetailClient vehicle={vehicle} allVehicles={VEHICLES_DATA} />
}
