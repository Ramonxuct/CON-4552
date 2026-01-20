import { NextResponse } from 'next/server';
import { mockMovements } from '@/lib/mockData';

/**
 * @api {get} /api/v1/export Export movements data
 * @apiDescription Provides real-time information about bus arrivals and departures.
 * @apiParam {String} [type] 'arrival' or 'departure'
 * @apiParam {String} [status] scheduled, arrived, departed, delayed, cancelled
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    let filteredData = [...mockMovements];

    if (type) {
        filteredData = filteredData.filter(m => m.type === type);
    }

    if (status) {
        filteredData = filteredData.filter(m => m.status === status);
    }

    return NextResponse.json({
        success: true,
        timestamp: new Date().toISOString(),
        count: filteredData.length,
        data: filteredData
    });
}
