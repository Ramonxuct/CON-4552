import { Movement, Company, Route } from '../types';

export const mockCompanies: Company[] = [
    { id: 'c1', name: 'Alsa', cif: 'A12345678', email: 'vigo@alsa.es', phone: '902 422 242', fleet_size: 154, color: '#8A1D5B', created_at: '2020-01-01' },
    { id: 'c2', name: 'Avanza', cif: 'A87654321', email: 'guada@avanza.es', phone: '912 767 070', fleet_size: 98, color: '#E30613', created_at: '2019-05-12' },
    { id: 'c3', name: 'Samar', cif: 'B11223344', email: 'info@samar.es', phone: '949 212 950', fleet_size: 45, color: '#009640', created_at: '2021-03-22' },
];

export const mockRoutes: Route[] = [
    { id: 'r1', origin: 'Madrid', destination: 'Guadalajara', distance_km: 55, estimated_duration: '45m', base_price: 12.5 },
    { id: 'r2', origin: 'Guadalajara', destination: 'Zaragoza', distance_km: 260, estimated_duration: '3h', base_price: 34.0 },
    { id: 'r3', origin: 'Guadalajara', destination: 'Barcelona', distance_km: 560, estimated_duration: '7h', base_price: 65.0 },
];

export const mockMovements: Movement[] = [
    {
        id: '1',
        bus_id: 'b1',
        route_id: 'r1',
        type: 'arrival',
        scheduled_time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        actual_time: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        bay_number: 'D12',
        status: 'arrived',
        created_at: new Date().toISOString(),
        bus: { id: 'b1', license_plate: '1234-ABC', company_id: 'c1', bus_type: 'Standard' },
        company: mockCompanies[0],
        route: mockRoutes[0]
    },
    {
        id: '2',
        bus_id: 'b2',
        route_id: 'r2',
        type: 'departure',
        scheduled_time: new Date(Date.now() + 1000 * 60 * 15).toISOString(),
        bay_number: 'D05',
        status: 'scheduled',
        created_at: new Date().toISOString(),
        bus: { id: 'b2', license_plate: '5678-DEF', company_id: 'c2', bus_type: 'Double' },
        company: mockCompanies[1],
        route: mockRoutes[1]
    }
];
