-- ==============================================================================
-- APEX TUNING OS — SUPABASE RELATIONAL SCHEMA (ENGINE B & ENTERPRISE GRADE)
-- High-Performance Automotive Repair, Dyno Calibration & Workshop Management
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. VEHICLE WORK ORDERS & APPOINTMENTS
create table if not exists public.work_orders (
    id uuid primary key default gen_random_uuid(),
    ticket_id text unique not null,
    customer_name text not null,
    customer_email text not null,
    customer_phone text not null,
    vehicle_type text not null check (vehicle_type in ('sports', 'sedan', 'suv', 'truck')),
    vehicle_make text not null,
    vehicle_model text not null,
    service_id text not null,
    selected_date date not null,
    selected_time text not null,
    price_estimate numeric(10, 2) not null,
    notes text,
    status text not null default 'inspection' check (status in ('inspection', 'parts_ordered', 'in_progress', 'quality_check', 'ready')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. AWD CHASSIS DYNO SWEEPS & TELEMETRY LOGS
create table if not exists public.dyno_logs (
    id uuid primary key default gen_random_uuid(),
    log_code text unique not null,
    vehicle text not null,
    run_type text not null,
    baseline_hp integer not null,
    tuned_hp integer not null,
    torque_delta text not null,
    tuner_lead text not null,
    status text not null default 'VERIFIED',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. WORKSHOP SERVICE BAYS & EQUIPMENT STATUS
create table if not exists public.workshop_bays (
    id uuid primary key default gen_random_uuid(),
    bay_code text unique not null,
    name text not null,
    assigned_tech text not null,
    lift_equipment text not null,
    current_vehicle text,
    status text not null check (status in ('OPEN', 'OCCUPIED', 'IN_SERVICE', 'LIVE_TEST', 'CURING_9H')),
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. PERFORMANCE PARTS & REORDER INVENTORY
create table if not exists public.parts_inventory (
    id uuid primary key default gen_random_uuid(),
    sku text unique not null,
    component_name text not null,
    stock_quantity integer not null default 0,
    reorder_threshold integer not null default 5,
    unit_cost numeric(10, 2) not null,
    wholesale_supplier text not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.work_orders enable row level security;
alter table public.dyno_logs enable row level security;
alter table public.workshop_bays enable row level security;
alter table public.parts_inventory enable row level security;

-- Public read policies (Storefront & customer work tracker)
create policy "Allow public read access to work orders"
    on public.work_orders for select
    using (true);

create policy "Allow public insert for bookings"
    on public.work_orders for insert
    with check (true);

create policy "Allow public read access to dyno logs"
    on public.dyno_logs for select
    using (true);

create policy "Allow public read access to workshop bays"
    on public.workshop_bays for select
    using (true);

create policy "Allow public read access to parts inventory"
    on public.parts_inventory for select
    using (true);

-- Authenticated Admin update/delete policies
create policy "Allow authenticated admin update on work orders"
    on public.work_orders for update
    using (auth.role() = 'authenticated');

create policy "Allow authenticated admin modify on dyno logs"
    on public.dyno_logs for all
    using (auth.role() = 'authenticated');

create policy "Allow authenticated admin modify on workshop bays"
    on public.workshop_bays for all
    using (auth.role() = 'authenticated');

create policy "Allow authenticated admin modify on parts inventory"
    on public.parts_inventory for all
    using (auth.role() = 'authenticated');
