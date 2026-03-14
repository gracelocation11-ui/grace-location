import type { Metadata } from 'next'
import ContactClient from './client'

export const metadata: Metadata = {
  title: 'Contact — Grâce Location · E-Shepha Event · Libreville',
  description: 'Contactez Grâce Location / E-Shepha Event. +241 06 20 39 65 · Libreville, Gabon.',
}

export default function ContactPage() {
  return <ContactClient />
}
