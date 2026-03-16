import type { Metadata } from 'next'
import VehiculesClient from './client'

export const metadata: Metadata = {
  title: 'Véhicules',
  description: 'Galerie photos flotte de véhicules prestige — convois et transferts VIP — E-Shepha Event',
}

export default function VehiculesPage() {
  return <VehiculesClient />
}
