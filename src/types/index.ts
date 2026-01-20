export type Company = {
  id: string;
  name: string;
  cif: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  color?: string;
  logo?: string;
  fleet_size?: number;
  created_at: string;
};

export type Route = {
  id: string;
  origin: string;
  destination: string;
  distance_km: number;
  estimated_duration: string;
  base_price?: number;
};


export type Bus = {
  id: string;
  license_plate: string;
  company_id: string;
  bus_type: string;
};

export type MovementStatus = 'scheduled' | 'arrived' | 'departed' | 'delayed' | 'cancelled';

export type Movement = {
  id: string;
  bus_id: string;
  route_id: string;
  type: 'arrival' | 'departure';
  scheduled_time: string;
  actual_time?: string;
  bay_number?: string;
  status: MovementStatus;
  stay_duration?: string;
  created_at: string;
  // Included relations for UI convenience
  bus?: Bus;
  company?: Company;
  route?: Route;
};
