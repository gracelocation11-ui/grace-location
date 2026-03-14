import type { Service, ServiceCategory } from '@/types'

/* ═══════════════════════════════════════════════════════════
   E-SHEPHA EVENT — Services Catalog & Constants
   ═══════════════════════════════════════════════════════════ */

/* ─── CONSTANTS ──────────────────────────────────────────── */
export const WHATSAPP_NUMBER = '+24177000000'
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`
export const COMPANY_EMAIL = 'contact@e-shepha.com'
export const COMPANY_PHONE = '+241 77 00 00 00'
export const COMPANY_ADDRESS = 'Libreville, Gabon'

export const DEFAULT_CURRENCY = 'FCFA' as const

export const TAX_RATE = 18 // TVA Gabon 18%

/* ─── PRICE FORMATTER ────────────────────────────────────── */
export function formatPrice(
  amount: number,
  currency: string = 'FCFA',
  options?: { compact?: boolean; showCurrency?: boolean }
): string {
  const { compact = false, showCurrency = true } = options ?? {}

  if (compact && amount >= 1_000_000) {
    const millions = (amount / 1_000_000).toLocaleString('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    })
    return showCurrency ? `${millions}M ${currency}` : `${millions}M`
  }

  if (compact && amount >= 1_000) {
    const thousands = (amount / 1_000).toLocaleString('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    return showCurrency ? `${thousands}k ${currency}` : `${thousands}k`
  }

  const formatted = amount.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return showCurrency ? `${formatted} ${currency}` : formatted
}

export function formatPriceRange(min: number, max: number, currency: string = 'FCFA'): string {
  if (min === max) return formatPrice(min, currency)
  return `${formatPrice(min, currency, { showCurrency: false })} – ${formatPrice(max, currency)}`
}

/* ─── EVENT TYPES ────────────────────────────────────────── */
export const EVENT_TYPES = [
  { value: 'mariage', label: 'Mariage' },
  { value: 'fiancailles', label: 'Fiançailles' },
  { value: 'anniversaire', label: 'Anniversaire' },
  { value: 'gala', label: 'Gala & Soirée de Gala' },
  { value: 'corporate', label: 'Événement Corporate' },
  { value: 'conference', label: 'Conférence & Séminaire' },
  { value: 'cocktail', label: 'Cocktail & Réception' },
  { value: 'bapteme', label: 'Baptême & Communion' },
  { value: 'deuil', label: 'Cérémonie Funèbre' },
  { value: 'politique', label: 'Événement Politique' },
  { value: 'lancement', label: 'Lancement de Produit' },
  { value: 'autre', label: 'Autre' },
] as const

export type EventTypeValue = (typeof EVENT_TYPES)[number]['value']

/* ─── GUEST COUNT OPTIONS ────────────────────────────────── */
export const GUEST_COUNT_OPTIONS = [
  { value: '1-20', label: '1 – 20 personnes' },
  { value: '21-50', label: '21 – 50 personnes' },
  { value: '51-100', label: '51 – 100 personnes' },
  { value: '101-200', label: '101 – 200 personnes' },
  { value: '201-500', label: '201 – 500 personnes' },
  { value: '500+', label: '500+ personnes' },
] as const

/* ─── BUDGET RANGES ──────────────────────────────────────── */
export const BUDGET_RANGES = [
  { value: 'under_1m', label: 'Moins de 1 000 000 FCFA' },
  { value: '1m_5m', label: '1 000 000 – 5 000 000 FCFA' },
  { value: '5m_15m', label: '5 000 000 – 15 000 000 FCFA' },
  { value: '15m_30m', label: '15 000 000 – 30 000 000 FCFA' },
  { value: '30m_plus', label: '30 000 000 FCFA et plus' },
  { value: 'to_discuss', label: 'À discuter' },
] as const

/* ─── SERVICES CATALOG ───────────────────────────────────── */
export const SERVICES: Service[] = [
  /* ── 1. EVENT & WEDDING PLANNING ── */
  {
    id: 'svc-event-01',
    slug: 'planification-evenements',
    category: 'event_planning',
    name: 'Planification Événements',
    tagline: 'Chaque détail, orchestré à la perfection',
    description:
      "De la conception à l'exécution, nous créons des expériences inoubliables. Galas, conférences, lancements de produits — notre équipe gère chaque aspect avec rigueur et élégance.",
    features: [
      'Conception et direction artistique',
      'Gestion des prestataires locaux et internationaux',
      'Coordination le jour J',
      'Décoration et scénographie',
      'Son, lumière et audiovisuel',
      'Accueil et protocole VIP',
    ],
    price: { min: 1_500_000, max: 15_000_000, currency: 'FCFA', label: 'À partir de' },
    priceNote: 'Devis personnalisé selon la taille et les exigences de l\'événement',
    image: '/images/services/event-planning.jpg',
    highlight: true,
    available: true,
    sortOrder: 1,
  },
  {
    id: 'svc-wedding-01',
    slug: 'mariage-luxe',
    category: 'event_planning',
    name: 'Mariage de Luxe',
    tagline: 'Votre plus beau jour, notre plus grande création',
    description:
      'Mariages intime ou grandioses, traditionnels ou modernes — nous tissons votre histoire d\'amour en un événement d\'exception. Chaque mariage est unique, chaque détail pensé pour vous.',
    features: [
      'Consultation personnalisée de couple',
      'Recherche et sélection de lieu',
      'Coordination cérémonie & réception',
      'Wedding styling & moodboard',
      'Gestion traiteur et pièce montée',
      'Coordination photographe & vidéaste',
      'Honeymoon planning (Gabon & abroad)',
    ],
    price: { min: 5_000_000, max: 50_000_000, currency: 'FCFA', label: 'À partir de' },
    priceNote: 'Package complet ou services à la carte disponibles',
    image: '/images/services/mariage.jpg',
    highlight: true,
    available: true,
    sortOrder: 2,
  },

  /* ── 2. CATERING SERVICES ── */
  {
    id: 'svc-catering-01',
    slug: 'catering-gastronomique',
    category: 'catering',
    name: 'Catering Gastronomique',
    tagline: 'Une symphonie de saveurs pour chaque occasion',
    description:
      'Notre service traiteur élève chaque événement. Cuisine gabonaise authentique, gastronomie française et cuisine internationale — une expérience culinaire sur-mesure pour vos convives.',
    features: [
      'Menu dégustation personnalisé',
      'Chefs professionnels sur place',
      'Service à table style banquet ou buffet',
      'Cocktails et canapés premium',
      'Pièces montées et desserts artisanaux',
      'Options végétariennes, halal, casher',
      'Location de vaisselle et mobilier',
    ],
    price: { min: 15_000, max: 85_000, currency: 'FCFA', label: 'Par personne' },
    priceNote: 'Prix par personne selon le menu sélectionné — minimum 20 personnes',
    image: '/images/services/catering.jpg',
    highlight: false,
    available: true,
    sortOrder: 3,
  },
  {
    id: 'svc-catering-02',
    slug: 'cocktail-reception',
    category: 'catering',
    name: 'Cocktail & Réception',
    tagline: 'L\'art de recevoir, magnifié',
    description:
      'Cocktails d\'entreprise, réceptions diplomatiques, soirées privées — nous créons des moments de convivialité raffinée avec un service impeccable.',
    features: [
      'Service bar premium & mocktails',
      'Canapés & bouchées gastronomiques',
      'Équipe de service professionnelle',
      'Setup & démontage inclus',
    ],
    price: { min: 500_000, max: 5_000_000, currency: 'FCFA', label: 'À partir de' },
    priceNote: 'Pour 30 personnes minimum',
    image: '/images/services/cocktail.jpg',
    highlight: false,
    available: true,
    sortOrder: 4,
  },

  /* ── 3. VEHICLE RENTAL ── */
  {
    id: 'svc-vehicle-01',
    slug: 'location-vehicules',
    category: 'vehicle_rental',
    name: 'Location de Véhicules',
    tagline: 'Arrivez en style, partez en prestige',
    description:
      'Notre flotte premium de SUV et berlines de luxe vous assure confort et prestige pour tous vos déplacements à Libreville et au Gabon. Avec ou sans chauffeur.',
    features: [
      'Flotte SUV & berlines haut de gamme',
      'Chauffeurs professionnels bilingues',
      'Climatisation et Wi-Fi à bord',
      'Disponible 24h/7j',
      'Transferts aéroport & hôtel',
      'Convois de mariage et cortèges',
      'Location longue durée négociable',
    ],
    price: { min: 150_000, max: 500_000, currency: 'FCFA', label: 'Par jour' },
    priceNote: 'Chauffeur en option — tarif dégressif pour les locations hebdomadaires',
    image: '/images/services/vehicles.jpg',
    highlight: true,
    available: true,
    sortOrder: 5,
  },
  {
    id: 'svc-vehicle-02',
    slug: 'convoi-mariage',
    category: 'vehicle_rental',
    name: 'Convoi de Mariage',
    tagline: 'Le cortège parfait pour votre grand jour',
    description:
      'Cortèges de mariage élégants avec décoration florale, chauffeurs en tenue, et coordination complète du convoi pour une arrivée mémorable.',
    features: [
      'Décoration florale des véhicules',
      'Chauffeurs en tenue formelle',
      'Coordination du cortège',
      'Ruban et accessoires inclus',
    ],
    price: { min: 800_000, max: 3_000_000, currency: 'FCFA', label: 'Pack' },
    priceNote: 'Pack 3, 5 ou 7 véhicules selon besoin',
    image: '/images/services/wedding-convoy.jpg',
    highlight: false,
    available: true,
    sortOrder: 6,
  },

  /* ── 4. E-SHEPHA PLATFORM ── */
  {
    id: 'svc-platform-01',
    slug: 'plateforme-digitale',
    category: 'platform',
    name: 'E-Shepha Platform',
    tagline: 'L\'innovation digitale au service de vos événements',
    description:
      'Notre plateforme digitale révolutionne la gestion événementielle. Gestion des RSVPs, listes de cadeaux, invitations numériques, billetterie en ligne et coordination en temps réel.',
    features: [
      'Gestion RSVP digitale en temps réel',
      'Invitations numériques premium',
      'Liste de cadeaux interactive',
      'Billetterie et check-in digital',
      'Streaming live de l\'événement',
      'Album photo collaboratif',
      'Dashboard analytics post-événement',
    ],
    price: { min: 250_000, max: 2_000_000, currency: 'FCFA', label: 'À partir de' },
    priceNote: 'Tarif selon le nombre de fonctionnalités et d\'invités',
    image: '/images/services/platform.jpg',
    highlight: true,
    available: true,
    sortOrder: 7,
  },

  /* ── 5. COACHING ── */
  {
    id: 'svc-coaching-01',
    slug: 'coaching-mariage',
    category: 'coaching',
    name: 'Wedding Coaching',
    tagline: 'Guidez chaque étape de votre parcours',
    description:
      'Au-delà de l\'organisation, nous vous accompagnons dans le voyage émotionnel et logistique du mariage — de la demande en mariage jusqu\'aux préparatifs, avec sagesse et sérénité.',
    features: [
      'Sessions de coaching individuel ou de couple',
      'Gestion du stress et de la prise de décision',
      'Budget et priorisation',
      'Famille et protocole interculturel',
      'Timeline et checklist personnalisée',
    ],
    price: { min: 150_000, max: 800_000, currency: 'FCFA', label: 'Par session' },
    priceNote: 'Sessions individuelles ou pack de 5 séances',
    image: '/images/services/wedding-coaching.jpg',
    highlight: false,
    available: true,
    sortOrder: 8,
  },
  {
    id: 'svc-coaching-02',
    slug: 'coaching-politique',
    category: 'coaching',
    name: 'Political Coaching',
    tagline: 'Image, présence, impact — au plus haut niveau',
    description:
      'Conseil stratégique en image et communication pour figures politiques et personnalités publiques. Préparation aux discours, gestion médiatique, et organisation d\'événements officiels.',
    features: [
      'Conseil image et personal branding',
      'Préparation discours et prises de parole',
      'Organisation événements protocolaires',
      'Communication de crise',
      'Consulting médias & réseaux sociaux',
    ],
    price: null,
    priceNote: 'Demande de renseignement confidentielle — tarif sur consultation privée',
    image: '/images/services/political-coaching.jpg',
    highlight: false,
    available: true,
    sortOrder: 9,
  },
]

/* ─── HELPERS ─────────────────────────────────────────────── */
export function getServicesByCategory(category: ServiceCategory): Service[] {
  return SERVICES.filter((s) => s.category === category && s.available)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getHighlightedServices(): Service[] {
  return SERVICES.filter((s) => s.highlight && s.available)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}

/* ─── SERVICE CATEGORY META ───────────────────────────────── */
export const SERVICE_CATEGORY_META: Record<
  ServiceCategory,
  { label: string; labelFr: string; icon: string; description: string }
> = {
  event_planning: {
    label: 'Event & Wedding Planning',
    labelFr: 'Événements & Mariages',
    icon: '✦',
    description: 'Conception et coordination complète de vos événements',
  },
  catering: {
    label: 'Catering Services',
    labelFr: 'Restauration',
    icon: '◈',
    description: 'Gastronomie d\'excellence pour chaque occasion',
  },
  vehicle_rental: {
    label: 'Vehicle Rental',
    labelFr: 'Location Véhicules',
    icon: '◉',
    description: 'Flotte premium avec chauffeurs professionnels',
  },
  platform: {
    label: 'E-Shepha Platform',
    labelFr: 'Plateforme Digitale',
    icon: '◎',
    description: 'Innovation digitale pour vos événements',
  },
  coaching: {
    label: 'Coaching',
    labelFr: 'Coaching',
    icon: '◇',
    description: 'Accompagnement personnalisé aux moments clés',
  },
}
