import type { Metadata } from 'next'
import EShepaClient from './client'

export const metadata: Metadata = {
  title: 'E-Shepha Event | Plateforme Événementielle Gabon',
  description: "E-Shepha Event — La nouvelle génération d'événements au Gabon. Conférences, mariages, galas, événements culturels à Libreville.",
}

export default function EShephaPage() {
  return <EShepaClient />
}
