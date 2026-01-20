import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const companies = await prisma.company.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        return NextResponse.json(companies);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching companies' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const company = await prisma.company.create({
            data: body
        });
        return NextResponse.json(company);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating company' }, { status: 500 });
    }
}
