/** Format a ZAR amount as `R749` (no decimals for whole rand). */
export function formatPrice(amount: number): string {
  return `R${amount.toLocaleString('en-ZA')}`;
}
