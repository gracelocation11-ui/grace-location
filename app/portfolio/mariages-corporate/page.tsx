import type { Metadata } from 'next'
import MariagesCorporateClient from './client'

export const metadata: Metadata = {
  title: 'Mariages & Corporate',
  description: 'Galerie photos mariages, galas et événements corporate — E-Shepha Event Libreville',
}

export default function MariagesCorporatePage() {
  return <MariagesCorporateClient />
}
