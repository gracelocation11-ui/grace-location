import type { Metadata } from 'next'
import TraiteurClient from './client'

export const metadata: Metadata = {
  title: 'Traiteur',
  description: 'Galerie photos service traiteur — buffets, cocktails et dîners de gala — E-Shepha Event',
}

export default function TraiteurPage() {
  return <TraiteurClient />
}
