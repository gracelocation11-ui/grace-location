import type { Metadata } from 'next'
import OrganisationCeremonieClient from './client'

export const metadata: Metadata = {
  title: 'Location Tentes Chaises Tables — Libreville | Grâce Location',
  description: 'Location de tentes, chaises, tables, décoration et équipements pour mariages et événements à Libreville, Gabon.',
}

export default function OrganisationCeremoniePage() {
  return <OrganisationCeremonieClient />
}
