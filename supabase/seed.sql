-- ==============================================================================
-- APEX TUNING OS — SEED DATA (MOCK PRODUCTION BENCHMARKS)
-- ==============================================================================

-- 1. SEED WORK ORDERS
insert into public.work_orders (
    ticket_id, customer_name, customer_email, customer_phone, vehicle_type, vehicle_make, vehicle_model, service_id, selected_date, selected_time, price_estimate, notes, status
) values
('APEX-9502', 'Marcus Miller', 'marcus.m@gtconcept.net', '(310) 555-0142', 'sports', 'Porsche', 'Cayman GT4', 'ecu-tuning', '2026-05-30', '10:00 AM', 799.00, 'Installing IPD Plenum and high-flow exhaust system before dynamic dyno tune.', 'in_progress'),
('TRACK-4108', 'Sarah Jenkins', 'sjenkins@trackfast.io', '(415) 555-0199', 'sports', 'BMW', 'M4 Competition', 'track-prep', '2026-05-28', '01:30 PM', 280.00, 'Complete thermal run-down audit. Check for high-speed brake pad fade.', 'ready'),
('STREET-7740', 'Devon Vance', 'devon@vanceandassociates.com', '(206) 555-0177', 'sedan', 'Audi', 'RS7 Sportback', 'paint-ceramic', '2026-05-29', '09:00 AM', 650.00, 'Full multi-stage paint renewal required on the high-gloss black roof trims.', 'parts_ordered'),
('APEX-3319', 'Christian Ward', 'c.ward@apexmotors.de', '(310) 555-0192', 'sports', 'Chevrolet', 'Corvette C8 Z06', 'chassis-balance', '2026-06-02', '11:00 AM', 420.00, 'Corner balancing on fresh coilovers before Buttonwillow CW13 track session.', 'inspection');

-- 2. SEED DYNO TELEMETRY SWEEPS
insert into public.dyno_logs (
    log_code, vehicle, run_type, baseline_hp, tuned_hp, torque_delta, tuner_lead, status
) values
('DYNO-881', 'Porsche 911 GT3 RS (991.2)', 'Stage 2 ECU Sweep', 520, 574, '+48 lb-ft', 'Rick ''Dyno'' Sterling', 'VERIFIED'),
('DYNO-882', 'BMW M4 Competition', 'E85 FlexFuel Map', 503, 612, '+92 lb-ft', 'Rick ''Dyno'' Sterling', 'LOGGED'),
('DYNO-883', 'Nissan GT-R Nismo (R35)', 'Boost Controller Calibration', 600, 710, '+105 lb-ft', 'Kenji Sato', 'ANALYZING'),
('DYNO-884', 'Audi RS6 Avant (C8)', 'Transmission TCU Remap', 591, 665, '+65 lb-ft', 'Sarah Alvarez', 'VERIFIED');

-- 3. SEED WORKSHOP BAYS
insert into public.workshop_bays (
    bay_code, name, assigned_tech, lift_equipment, current_vehicle, status
) values
('BAY-01', 'Bay 1: General Diagnostics', 'Sarah Alvarez', 'Rotary 2-Post (10k lb)', 'Audi RS7 Sportback', 'OCCUPIED'),
('BAY-02', 'Bay 2: Active Race Lift', 'Marcus Thorne', 'BendPak Alignment Lift', 'BMW M4 Competition', 'IN_SERVICE'),
('BAY-03', 'Bay 3: AWD Chassis Dyno', 'Rick ''Dyno'' Sterling', 'Dynojet 424xLC2 Linx', 'Porsche Cayman GT4', 'LIVE_TEST'),
('BAY-04', 'Bay 4: Fabrication & Exhaust', 'Devon Vance', '4-Post Storage Lift', 'Chevrolet Corvette C8 Z06', 'OPEN'),
('BAY-05', 'Bay 5: Detailing Cleanroom', 'Kenji Sato', 'Scissor Prep Rack', 'Tesla Model S Plaid', 'CURING_9H');

-- 4. SEED PERFORMANCE PARTS INVENTORY
insert into public.parts_inventory (
    sku, component_name, stock_quantity, reorder_threshold, unit_cost, wholesale_supplier
) values
('MOT-660-FL', 'Motul RBF660 Racing Brake Fluid (500ml)', 24, 6, 19.50, 'Motul Motorsport NA'),
('IPD-PLEN-991', 'IPD 82mm Competition Plenum Kit', 3, 1, 995.00, 'IPD Plenums USA'),
('NGK-RACE-88', 'NGK Racing Iridium Spark Plugs (Step Colder)', 48, 16, 16.20, 'Turner Motorsport'),
('GY-CERAM-9H', 'Gyeon Q² MOHS EVO 9H Ceramic Base (50ml)', 8, 2, 120.00, 'Gyeon Quartz Direct'),
('BMC-AIR-M3', 'BMC High-Performance Panel Air Filters (Pair)', 5, 2, 165.00, 'BMC Filters Italy');
