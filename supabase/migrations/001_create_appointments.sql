-- ============================================================
-- E-Shepha Event — Supabase Migration 001
-- Table: appointments
-- Run this in the Supabase SQL editor or via Supabase CLI
-- ============================================================

-- appointments table
create table if not exists public.appointments (
  id          uuid        primary key default gen_random_uuid(),
  service     text        not null,        -- booking type label e.g. "Coaching gratuit"
  date        date        not null,        -- preferred date  e.g. "2025-06-15"
  time        text        not null,        -- preferred time  e.g. "10:00"
  name        text        not null,        -- client full name
  phone       text        not null,        -- client phone
  email       text        not null,        -- client email
  notes       text,                        -- topic + extra notes (combined)
  channel     text,                        -- contact channel  e.g. "whatsapp"
  reference   text        unique,          -- e.g. "RDV-2025-1234"
  status      text        not null default 'pending',  -- pending | confirmed | cancelled
  created_at  timestamptz not null default now()
);

-- Index for fast conflict/availability checks
create index if not exists appointments_date_time_idx
  on public.appointments (date, time)
  where status <> 'cancelled';

-- Row Level Security (RLS)
alter table public.appointments enable row level security;

-- Service role has full access (server-side API routes only)
create policy "service_role_full_access" on public.appointments
  for all
  to service_role
  using (true)
  with check (true);

-- Public can only INSERT their own bookings (anon key, no select/update/delete)
create policy "anon_insert_only" on public.appointments
  for insert
  to anon
  with check (true);

-- ============================================================
-- Supporting tables (quotes, orders) — optional, add as needed
-- ============================================================

create table if not exists public.quotes (
  id            uuid        primary key default gen_random_uuid(),
  reference     text        unique not null,
  status        text        not null default 'draft',
  client_name   text        not null,
  client_email  text        not null,
  client_phone  text        not null,
  company_name  text,
  client_address text,
  items         jsonb       not null default '[]',
  subtotal      bigint      not null default 0,
  tax_rate      integer     not null default 18,
  tax_amount    bigint      not null default 0,
  total         bigint      not null default 0,
  currency      text        not null default 'FCFA',
  validity_days integer     not null default 30,
  valid_until   timestamptz,
  notes         text,
  created_at    timestamptz not null default now()
);

alter table public.quotes enable row level security;
create policy "service_role_full_access_quotes" on public.quotes
  for all to service_role using (true) with check (true);

create table if not exists public.orders (
  id              uuid        primary key default gen_random_uuid(),
  reference       text        unique not null,
  status          text        not null default 'pending',
  client_name     text        not null,
  client_email    text        not null,
  client_phone    text        not null,
  client_address  text,
  company_name    text,
  items           jsonb       not null default '[]',
  total_amount    bigint      not null default 0,
  currency        text        not null default 'FCFA',
  payment_method  text        not null default 'cash_on_delivery',
  payment_status  text        not null default 'pending',
  event_date      date,
  event_location  text,
  event_type      text,
  notes           text,
  created_at      timestamptz not null default now()
);

alter table public.orders enable row level security;
create policy "service_role_full_access_orders" on public.orders
  for all to service_role using (true) with check (true);
