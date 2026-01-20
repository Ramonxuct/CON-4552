import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const whereClause = type ? { type } : {};

    try {
        const movements = await prisma.movement.findMany({
            where: whereClause,
            include: {
                company: true,
                route: true,
                bus: true
            },
            orderBy: {
                scheduled_time: 'asc'
            }
        });
        return NextResponse.json(movements);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching movements' }, { status: 500 });
    }
}
