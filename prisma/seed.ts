import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // 1. Clean existing data
    await prisma.movement.deleteMany();
    await prisma.bus.deleteMany();
    await prisma.route.deleteMany();
    await prisma.invoice.deleteMany();
    await prisma.company.deleteMany();

    // 2. Create Companies
    const alsa = await prisma.company.create({
        data: {
            id: 'c1',
            name: 'Alsa',
            cif: 'A12345678',
            email: 'vigo@alsa.es',
            phone: '902 422 242',
            fleet_size: 154,
            color: '#8A1D5B',
            logo: '/images/alsa_logo.png'
        }
    });

    const avanza = await prisma.company.create({
        data: {
            id: 'c2',
            name: 'Avanza',
            cif: 'A87654321',
            email: 'guada@avanza.es',
            phone: '912 767 070',
            fleet_size: 98,
            color: '#E30613'
        }
    });

    const samar = await prisma.company.create({
        data: {
            id: 'c3',
            name: 'Samar',
            cif: 'B11223344',
            email: 'info@samar.es',
            phone: '949 212 950',
            fleet_size: 45,
            color: '#009640'
        }
    });

    console.log('✅ Companies created');

    // 3. Create Routes
    const route1 = await prisma.route.create({
        data: {
            id: 'r1',
            origin: 'Madrid',
            destination: 'Guadalajara',
            distance_km: 55,
            estimated_duration: '45m',
            base_price: 12.50
        }
    });

    const route2 = await prisma.route.create({
        data: {
            id: 'r2',
            origin: 'Guadalajara',
            destination: 'Zaragoza',
            distance_km: 260,
            estimated_duration: '3h',
            base_price: 34.00
        }
    });

    const route3 = await prisma.route.create({
        data: {
            id: 'r3',
            origin: 'Guadalajara',
            destination: 'Barcelona',
            distance_km: 560,
            estimated_duration: '7h',
            base_price: 65.00
        }
    });

    console.log('✅ Routes created');

    // 4. Create Buses
    const bus1 = await prisma.bus.create({
        data: {
            id: 'b1',
            license_plate: '1234-ABC',
            bus_type: 'Standard',
            company_id: alsa.id
        }
    });

    const bus2 = await prisma.bus.create({
        data: {
            id: 'b2',
            license_plate: '5678-DEF',
            bus_type: 'Double',
            company_id: avanza.id
        }
    });

    const bus3 = await prisma.bus.create({
        data: {
            id: 'b3',
            license_plate: '9999-XYZ',
            bus_type: 'Luxury',
            company_id: samar.id
        }
    });

    console.log('✅ Buses created');

    // 5. Create Movements
    // Movement 1: Alsa Arrival
    await prisma.movement.create({
        data: {
            type: 'arrival',
            status: 'arrived',
            scheduled_time: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
            actual_time: new Date(Date.now() - 1000 * 60 * 25),
            bay_number: 'D12',
            bus_id: bus1.id,
            route_id: route1.id,
            company_id: alsa.id
        }
    });

    // Movement 2: Avanza Departure
    await prisma.movement.create({
        data: {
            type: 'departure',
            status: 'scheduled',
            scheduled_time: new Date(Date.now() + 1000 * 60 * 15), // in 15 mins
            bay_number: 'D05',
            bus_id: bus2.id,
            route_id: route2.id,
            company_id: avanza.id
        }
    });

    // Movement 3: Samar Departure (Delayed)
    await prisma.movement.create({
        data: {
            type: 'departure',
            status: 'delayed',
            scheduled_time: new Date(Date.now() + 1000 * 60 * 5),
            bay_number: 'D01',
            bus_id: bus3.id,
            route_id: route3.id,
            company_id: samar.id
        }
    });

    console.log('✅ Movements created');

    // 6. Create Invoices (Mock)
    await prisma.invoice.create({
        data: {
            id: 'FAC-2026-001',
            amount: 12450.50,
            date: new Date('2026-01-15'),
            status: 'Pagada',
            concept: 'Canon Estación',
            company_id: alsa.id
        }
    });

    console.log('✅ Invoices created');
    console.log('🏁 Seed completed!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
