/**
 * Historical issues:
 * - `formatPrice` called `.toFixed` blindly, throwing on NaN/Infinity and huge values.
 * - `formatDate` threw errors on invalid inputs instead of returning a fallback.
 * - `truncateText` failed on empty text or negative lengths.
 * - `calculateDiscount` accepted negative or >100% discounts and returned long floats.
 */
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatPrice(price: number): string {
  if (typeof price !== 'number' || Number.isNaN(price) || !Number.isFinite(price)) {
    return currencyFormatter.format(0)
  }

  return currencyFormatter.format(price)
}

export function formatDate(dateString: string): string {
  if (!dateString) {
    return 'Invalid date'
  }

  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) {
    return 'Invalid date'
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function truncateText(text: string, maxLength: number): string {
  if (!text) {
    return ''
  }

  if (maxLength <= 0) {
    return '...'
  }

  if (text.length <= maxLength) {
    return text
  }

  return `${text.substring(0, maxLength)}...`
}

export function calculateDiscount(originalPrice: number, discountPercent: number): number {
  const safePrice = Number.isFinite(originalPrice) ? originalPrice : 0
  const normalizedDiscount = Math.min(Math.max(discountPercent, 0), 100)
  const discountedValue = safePrice * (1 - normalizedDiscount / 100)

  return Number.parseFloat(discountedValue.toFixed(2))
}