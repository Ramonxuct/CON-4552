import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const invoices = await prisma.invoice.findMany({
            include: {
                company: true
            },
            orderBy: {
                date: 'desc'
            }
        });
        return NextResponse.json(invoices);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching invoices' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const invoice = await prisma.invoice.create({
            data: {
                amount: parseFloat(body.amount),
                status: 'Pendiente',
                concept: body.concept,
                company_id: body.company_id,
                date: new Date()
            }
        });
        return NextResponse.json(invoice);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating invoice' }, { status: 500 });
    }
}
