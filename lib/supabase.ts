import { createClient, SupabaseClient } from '@supabase/supabase-js'

/* ─── ENV ─────────────────────────────────────────────────── */
const supabaseUrl        = process.env.NEXT_PUBLIC_SUPABASE_URL        ?? ''
const supabaseAnonKey    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY    ?? ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY        ?? ''

const hasPublicConfig = Boolean(supabaseUrl && supabaseAnonKey)
const hasAdminConfig  = Boolean(supabaseUrl && supabaseServiceKey)

if (!hasPublicConfig && typeof window === 'undefined') {
  console.warn(
    '[supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. ' +
    'Database features will be disabled until env vars are configured.'
  )
}

/* ─── PUBLIC CLIENT (browser-safe) ──────────────────────── */
// Uses anon key — respects Row Level Security (RLS).
// Returns null if env vars are not set.
export const supabase: SupabaseClient | null = hasPublicConfig
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    })
  : null

/* ─── ADMIN CLIENT (server-only) ─────────────────────────── */
// Uses service_role key — bypasses RLS.
// NEVER expose to the client — server API routes only.
// Returns null if SUPABASE_SERVICE_ROLE_KEY is not set.
export const supabaseAdmin: SupabaseClient | null = hasAdminConfig
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null

/* ─── CONFIG FLAGS ────────────────────────────────────────── */
export const isSupabaseConfigured = hasPublicConfig
export const isAdminConfigured    = hasAdminConfig

/* ─── TABLE NAMES ─────────────────────────────────────────── */
export const TABLES = {
  ORDERS:             'orders',
  QUOTES:             'quotes',
  APPOINTMENTS:       'appointments',
  LEADS:              'leads',
  PRODUCTS:           'products',
  VEHICLES:           'vehicles',
  PORTFOLIO:          'portfolio',
  PARTNERS:           'partners',
  COACHING_INQUIRIES: 'coaching_inquiries',
} as const

export type TableName = (typeof TABLES)[keyof typeof TABLES]

/* ─── REFERENCE GENERATOR ─────────────────────────────────── */
export function generateReference(prefix: 'CMD' | 'DEV' | 'RDV'): string {
  const year   = new Date().getFullYear()
  const random = Math.floor(1000 + Math.random() * 9000)
  return `${prefix}-${year}-${random}`
}

/* ─── ERROR HELPERS ───────────────────────────────────────── */
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
  if (error instanceof Error)  return error.message
  return 'Une erreur inattendue est survenue.'
}
