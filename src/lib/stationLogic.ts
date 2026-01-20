import { Movement, MovementStatus } from '../types';

/**
 * Assigns a bay to a movement automatically based on availability.
 * In a real implementation, this would check against current database occupations.
 */
export function assignBay(movement: Movement, occupiedBays: string[]): string {
    const allBays = ['D01', 'D02', 'D03', 'D04', 'D05', 'D06', 'D07', 'D08', 'D09', 'D10', 'D11', 'D12'];
    const availableBays = allBays.filter(bay => !occupiedBays.includes(bay));

    if (availableBays.length === 0) return 'TBD';

    // Basic logic: return first available or random
    return availableBays[0];
}

/**
 * Checks if a specific date is a holiday or a weekend.
 */
export function isSpecialDate(date: Date, holidays: string[]): boolean {
    const dateStr = date.toISOString().split('T')[0];
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    return isWeekend || holidays.includes(dateStr);
}
