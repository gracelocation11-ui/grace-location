import { createClient } from '@supabase/supabase-js'

/* ─── ENV VALIDATION ─────────────────────────────────────── */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error('Missing env: NEXT_PUBLIC_SUPABASE_URL')
}
if (!supabaseAnonKey) {
  throw new Error('Missing env: NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

/* ─── PUBLIC CLIENT (browser-safe) ──────────────────────── */
// Uses anon key — respects Row Level Security (RLS)
// Use in client components and public API routes
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
})

/* ─── ADMIN CLIENT (server-only) ─────────────────────────── */
// Uses service_role key — bypasses RLS
// NEVER expose this on the client — server routes only
export const supabaseAdmin = supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null

/* ─── TYPED TABLE HELPERS ─────────────────────────────────── */
// Centralised table names — update here if Supabase schema changes
export const TABLES = {
  ORDERS: 'orders',
  QUOTES: 'quotes',
  APPOINTMENTS: 'appointments',
  LEADS: 'leads',
  PRODUCTS: 'products',
  VEHICLES: 'vehicles',
  PORTFOLIO: 'portfolio',
  PARTNERS: 'partners',
  COACHING_INQUIRIES: 'coaching_inquiries',
} as const

export type TableName = (typeof TABLES)[keyof typeof TABLES]

/* ─── REFERENCE GENERATORS ───────────────────────────────── */
// Generate human-readable references for orders, quotes, appointments
export function generateReference(prefix: 'CMD' | 'DEV' | 'RDV'): string {
  const year = new Date().getFullYear()
  const random = Math.floor(1000 + Math.random() * 9000)
  return `${prefix}-${year}-${random}`
}

/* ─── ERROR HELPERS ──────────────────────────────────────── */
export function isSupabaseError(error: unknown): error is { message: string; code: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'code' in error
  )
}

export function getSupabaseErrorMessage(error: unknown): string {
  if (isSupabaseError(error)) return error.message
  if (error instanceof Error) return error.message
  return 'Une erreur inattendue est survenue.'
}
