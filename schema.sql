-- SQL Schema for Bus Station Management System

-- Companies Table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    cif TEXT UNIQUE NOT NULL,
    contact_name TEXT,
    email TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Routes Table
CREATE TABLE routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    distance_km DECIMAL(10,2),
    estimated_duration INTERVAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Buses Table
CREATE TABLE buses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_plate TEXT UNIQUE NOT NULL,
    company_id UUID REFERENCES companies(id),
    bus_type TEXT, -- e.g., standard, double-decker
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Movements Table (Real-time tracking)
CREATE TABLE movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bus_id UUID REFERENCES buses(id),
    route_id UUID REFERENCES routes(id),
    type TEXT CHECK (type IN ('arrival', 'departure')),
    scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
    actual_time TIMESTAMP WITH TIME ZONE,
    bay_number TEXT,
    status TEXT DEFAULT 'scheduled', -- scheduled, arrived, departed, delayed, cancelled
    stay_duration INTERVAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Calendar & Holidays
CREATE TABLE station_calendar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_date DATE UNIQUE NOT NULL,
    event_name TEXT,
    is_holiday BOOLEAN DEFAULT FALSE,
    special_notes TEXT
);

-- Invoicing & Billing
CREATE TABLE billing_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id),
    movement_id UUID REFERENCES movements(id),
    billing_period_start DATE,
    billing_period_end DATE,
    base_fee DECIMAL(10,2),
    km_fee DECIMAL(10,2),
    stay_fee DECIMAL(10,2),
    total_amount DECIMAL(10,2),
    status TEXT DEFAULT 'pending', -- pending, invoiced, paid
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System Configuration & Users
CREATE TABLE station_config (
    key TEXT PRIMARY KEY,
    value TEXT,
    description TEXT
);
