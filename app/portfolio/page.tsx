import type { Metadata } from 'next'
import PortfolioClient from './client'

export const metadata: Metadata = {
  title: 'Portfolio — Nos Réalisations | Grâce Location · E-Shepha Event',
  description: 'Découvrez nos réalisations : mariages, événements corporate, concerts et cérémonies à Libreville, Gabon.',
}

export default function PortfolioPage() {
  return <PortfolioClient />
}
