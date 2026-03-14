import type { Metadata } from 'next'
import LocationVehiculesClient from './client'

export const metadata: Metadata = {
  title: 'Location Véhicules Premium Libreville | Grâce Location',
  description: 'Flotte de 16 véhicules premium avec chauffeur. Toyota LC300, SUV, minibus. Location à Libreville, Gabon.',
}

export default function LocationVehiculesPage() {
  return <LocationVehiculesClient />
}
