import type { Metadata } from 'next'
import ServiceTraiteurClient from './client'

export const metadata: Metadata = {
  title: 'Service Traiteur Événements Libreville | Grâce Location',
  description: 'Traiteur gastronomique pour mariages, conférences et réceptions VIP à Libreville, Gabon.',
}

export default function ServiceTraiteurPage() {
  return <ServiceTraiteurClient />
}
