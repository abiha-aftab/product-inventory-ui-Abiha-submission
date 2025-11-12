// Utility functions for formatting data (intentionally has some bugs for candidates to find)

export function formatPrice(price: number): string {
  // BUG: Doesn't handle edge cases like NaN, undefined, or very large numbers
  return `$${price.toFixed(2)}`
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch (error) {
    // BUG: Poor error handling - should return a fallback value
    throw new Error('Invalid date format')
  }
}

export function truncateText(text: string, maxLength: number): string {
  // BUG: Doesn't handle null/undefined input or negative maxLength
  if (text.length <= maxLength) {
    return text
  }
  return text.substring(0, maxLength) + '...'
}

export function calculateDiscount(originalPrice: number, discountPercent: number): number {
  // BUG: No validation on discount percent (could be negative or > 100)
  return originalPrice * (1 - discountPercent / 100)
}