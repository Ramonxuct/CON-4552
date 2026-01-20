import { Movement, Company, Route } from '../types';

export interface BillingDetails {
    baseFee: number;
    kmFee: number;
    stayFee: number;
    total: number;
}

/**
 * Calculates the billing amount for a specific movement.
 * Logic:
 * - Base station entry fee: 15€
 * - Stay fee: 5€ per hour after first 30 mins
 * - KM fee: 0.10€ per KM (if applicable)
 */
export function calculateBilling(movement: Movement, route?: Route): BillingDetails {
    const baseFee = 15.00;
    let kmFee = 0;
    let stayFee = 0;

    if (route && route.distance_km) {
        kmFee = route.distance_km * 0.10;
    }

    // Basic stay fee logic based on duration (if available)
    // For mock purposes:
    if (movement.stay_duration) {
        stayFee = 5.00; // Simplified
    }

    return {
        baseFee,
        kmFee,
        stayFee,
        total: baseFee + kmFee + stayFee
    };
}

export function generateInvoiceSummary(companyMovements: Movement[]): number {
    return companyMovements.reduce((acc, m) => acc + (calculateBilling(m).total), 0);
}
