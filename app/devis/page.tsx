import type { Metadata } from 'next'
import DevisClient from './client'

export const metadata: Metadata = {
  title: 'Devis Gratuit en Ligne | E-Shepha Event — Grâce Location',
  description: 'Générez votre devis personnalisé en ligne. Location de matériel, traiteur, véhicules. Réponse sous 24h.',
}

export default function DevisPage() {
  return <DevisClient />
}
