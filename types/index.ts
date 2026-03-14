/* ═══════════════════════════════════════════════════════════
   E-SHEPHA EVENT — TypeScript Interfaces
   ═══════════════════════════════════════════════════════════ */

/* ─── SHARED ─────────────────────────────────────────────── */
export type Currency = 'FCFA' | 'EUR' | 'USD'
export type Locale = 'fr' | 'en'

export interface PriceRange {
  min: number
  max: number
  currency: Currency
  label?: string
}

/* ─── SERVICES ───────────────────────────────────────────── */
export type ServiceCategory =
  | 'event_planning'
  | 'catering'
  | 'vehicle_rental'
  | 'platform'
  | 'coaching'

export interface Service {
  id: string
  slug: string
  category: ServiceCategory
  name: string
  tagline: string
  description: string
  features: string[]
  price: PriceRange | null
  priceNote?: string
  image: string
  gallery?: string[]
  icon?: string
  highlight?: boolean
  available: boolean
  sortOrder: number
  createdAt?: string
}

/* ─── VEHICLES ───────────────────────────────────────────── */
export type VehicleCategory =
  | 'suv_luxury'
  | 'sedan_executive'
  | 'van_prestige'
  | 'minibus'
  | 'cabriolet'

export type FuelType = 'essence' | 'diesel' | 'hybride' | 'electrique'
export type TransmissionType = 'automatique' | 'manuelle'

export interface Vehicle {
  id: string
  slug: string
  brand: string
  model: string
  year: number
  category: VehicleCategory
  color: string
  seats: number
  doors: number
  fuel: FuelType
  transmission: TransmissionType
  features: string[]
  pricePerDay: number
  pricePerHalfDay?: number
  pricePerWeek?: number
  currency: Currency
  images: string[]
  available: boolean
  withDriver: boolean
  driverIncluded: boolean
  minRentalDays?: number
  createdAt?: string
  updatedAt?: string
}

/* ─── PORTFOLIO ──────────────────────────────────────────── */
export type PortfolioCategory =
  | 'mariage'
  | 'corporate'
  | 'gala'
  | 'conference'
  | 'private_party'
  | 'political'

export interface PortfolioItem {
  id: string
  slug: string
  title: string
  subtitle?: string
  category: PortfolioCategory
  client?: string
  location: string
  date: string
  description: string
  coverImage: string
  gallery: string[]
  tags: string[]
  featured: boolean
  testimonial?: {
    quote: string
    author: string
    role?: string
  }
  createdAt?: string
}

/* ─── PARTNERS ───────────────────────────────────────────── */
export interface Partner {
  id: string
  name: string
  logo: string
  website?: string
  category?: string
  featured: boolean
}

/* ─── QUOTE / DEVIS ──────────────────────────────────────── */
export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'

export interface QuoteItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  currency: Currency
  total: number
  note?: string
}

export interface Quote {
  id: string
  reference: string                // e.g. "DEV-2025-0042"
  status: QuoteStatus
  // Client info
  clientName: string
  clientEmail: string
  clientPhone: string
  companyName?: string
  clientAddress?: string
  // Quote details
  items: QuoteItem[]
  subtotal: number
  taxRate: number                  // percentage e.g. 18
  taxAmount: number
  total: number
  currency: Currency
  // Metadata
  validityDays: number             // days before expiry
  validUntil: string               // ISO date
  notes?: string
  termsAndConditions?: string
  pdfUrl?: string
  // Timestamps
  createdAt: string
  updatedAt?: string
  sentAt?: string
  acceptedAt?: string
}

/* ─── ORDERS / COMMANDES ─────────────────────────────────── */
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'ready'
  | 'delivered'
  | 'cancelled'

export type PaymentMethod = 'cash_on_delivery' | 'mobile_money' | 'bank_transfer'
export type PaymentStatus = 'pending' | 'partial' | 'paid'

export interface OrderItem {
  serviceId: string
  serviceName: string
  serviceCategory: ServiceCategory
  quantity: number
  unitPrice: number
  total: number
  currency: Currency
  details?: string
}

export interface Order {
  id: string
  reference: string               // e.g. "CMD-2025-0097"
  status: OrderStatus
  // Client info
  clientName: string
  clientEmail: string
  clientPhone: string
  clientAddress?: string
  companyName?: string
  // Order details
  items: OrderItem[]
  totalAmount: number
  currency: Currency
  // Payment (cash on delivery)
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  // Event details (if applicable)
  eventDate?: string
  eventLocation?: string
  eventType?: string
  // Internal
  notes?: string
  adminNotes?: string
  assignedTo?: string
  // Timestamps
  createdAt: string
  updatedAt?: string
  confirmedAt?: string
  deliveredAt?: string
}

/* ─── APPOINTMENTS / RENDEZ-VOUS ─────────────────────────── */
export type BookingType = 'discovery_call' | 'consultation' | 'site_visit' | 'wedding_consultation' | 'political_consultation'
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled'
export type BookingChannel = 'whatsapp' | 'phone' | 'video_call' | 'in_person'

export interface TimeSlot {
  date: string           // ISO date e.g. "2025-06-15"
  startTime: string      // e.g. "10:00"
  endTime: string        // e.g. "11:00"
  available: boolean
}

export interface Appointment {
  id: string
  reference: string              // e.g. "RDV-2025-0018"
  type: BookingType
  status: BookingStatus
  channel: BookingChannel
  // Client info
  clientName: string
  clientEmail: string
  clientPhone: string
  // Timing
  preferredDate: string          // ISO date
  preferredTime: string          // e.g. "10:00"
  timezone: string               // e.g. "Africa/Libreville"
  durationMinutes: number        // 30, 60, 90, 120
  confirmedDate?: string
  confirmedTime?: string
  // Details
  serviceCategory?: ServiceCategory
  topic?: string
  notes?: string
  meetingLink?: string           // Zoom / Google Meet link
  // Timestamps
  createdAt: string
  updatedAt?: string
  confirmedAt?: string
  completedAt?: string
}

/* ─── LEAD / CONTACT ─────────────────────────────────────── */
export type LeadSource = 'website' | 'whatsapp' | 'instagram' | 'referral' | 'google' | 'other'
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'

export interface Lead {
  id: string
  name: string
  email?: string
  phone: string
  source: LeadSource
  status: LeadStatus
  serviceInterest?: ServiceCategory
  message?: string
  budget?: string
  eventDate?: string
  notes?: string
  createdAt: string
  updatedAt?: string
}

/* ─── COACHING ───────────────────────────────────────────── */
export type CoachingType = 'wedding' | 'political'

export interface CoachingInquiry {
  id: string
  type: CoachingType
  clientName: string
  clientEmail: string
  clientPhone: string
  background?: string
  objectives?: string
  timeline?: string
  budget?: string
  confidential: boolean
  createdAt: string
}

/* ─── API RESPONSES ──────────────────────────────────────── */
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  pageSize: number
  totalPages: number
}

/* ─── FORM STATES ────────────────────────────────────────── */
export interface FormState {
  loading: boolean
  success: boolean
  error: string | null
}
