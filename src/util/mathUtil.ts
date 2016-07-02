/**
 * Modulo function returning result with same sign as divisor.
 */
export function mod(dividend: number, divisor: number) {
        return ((dividend % divisor) + divisor) % divisor;
}

/**
 * Clamp number between min and max.
 */
export function clamp(n: number, min: number, max: number) {
        return Math.max(min, Math.min(n, max));
}