export function formatCurrency(amount: number): string {
  // BUG: toFixed(2) is never applied, so amount can print with too many decimals
  return `$${amount}`
}

console.log(formatCurrency(19.999))
