import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Outfit } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Agentation } from 'agentation'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

/* ─── FONTS ─────────────────────────────────────────────── */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
  preload: true,
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

/* ─── SEO METADATA ───────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL('https://gracelocation.online'),
  title: {
    default: 'E-Shepha Event | Premium Event Management — Libreville, Gabon',
    template: '%s | E-Shepha Event',
  },
  description:
    "E-Shepha Event — Organisation d'événements premium à Libreville, Gabon. Mariages de luxe, catering gastronomique, location de véhicules haut de gamme et plateforme digitale d'événements. Create • Connect • Celebrate.",
  keywords: [
    'event management Libreville',
    'E-Shepha Event',
    'organisation événements Gabon',
    'mariage luxe Libreville',
    'location véhicules Gabon',
    'catering Libreville',
    'wedding planner Gabon',
    'Grace Location',
    'événementiel Gabon',
    'coaching politique Libreville',
  ],
  authors: [{ name: 'E-Shepha Event', url: 'https://e-shepha.com' }],
  creator: 'E-Shepha Event',
  publisher: 'E-Shepha Event',
  category: 'Event Management',
  openGraph: {
    type: 'website',
    locale: 'fr_GA',
    alternateLocale: 'fr_FR',
    url: 'https://e-shepha.com',
    siteName: 'E-Shepha Event',
    title: 'E-Shepha Event | Premium Event Management — Libreville',
    description:
      "Create • Connect • Celebrate — Organisation d'événements premium à Libreville, Gabon.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'E-Shepha Event — Premium Event Management Libreville Gabon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Shepha Event | Premium Event Management Libreville',
    description:
      "Create • Connect • Celebrate — Organisation d'événements premium à Libreville, Gabon.",
    images: ['/og-image.jpg'],
    creator: '@eshepha',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#080808',
}

/* ─── ROOT LAYOUT ────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'E-Shepha Event — Grâce Location',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Libreville',
                addressCountry: 'GA',
              },
              telephone: '+24106203965',
              url: 'https://gracelocation.online',
              description: "Organisation d'événements premium au Gabon. Location de matériel, traiteur, véhicules.",
              foundingDate: '2006',
              areaServed: 'Gabon',
            }),
          }}
        />
      </head>
      <body
        className={`
          ${cormorant.variable}
          ${outfit.variable}
          font-sans
          bg-noir
          text-cream
          antialiased
          noise-overlay
        `}
      >
        {children}

        <Analytics />
        {process.env.NODE_ENV === 'development' && <Agentation />}

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1A1A1A',
              color: '#F7F4EE',
              border: '1px solid #2A2A2A',
              borderLeft: '3px solid #C9A84C',
              fontFamily: 'Outfit, system-ui, sans-serif',
              fontSize: '0.875rem',
              padding: '12px 16px',
              maxWidth: '380px',
            },
            success: {
              style: {
                borderLeft: '3px solid #C9A84C',
              },
              iconTheme: {
                primary: '#C9A84C',
                secondary: '#080808',
              },
            },
            error: {
              style: {
                borderLeft: '3px solid #EF4444',
              },
              iconTheme: {
                primary: '#EF4444',
                secondary: '#F7F4EE',
              },
            },
            loading: {
              style: {
                borderLeft: '3px solid #C9A84C44',
              },
              iconTheme: {
                primary: '#C9A84C',
                secondary: '#1A1A1A',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
