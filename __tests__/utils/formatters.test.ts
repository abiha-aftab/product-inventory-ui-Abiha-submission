import { formatPrice, formatDate, truncateText, calculateDiscount } from '@/utils/formatters'

describe('Formatter Utilities', () => {
  describe('formatPrice', () => {
    it('formats regular prices correctly', () => {
      expect(formatPrice(99.99)).toBe('$99.99')
      expect(formatPrice(10)).toBe('$10.00')
      expect(formatPrice(0)).toBe('$0.00')
    })

    // These tests will initially fail due to bugs in the implementation
    it('handles edge cases', () => {
      expect(() => formatPrice(NaN)).not.toThrow()
      expect(() => formatPrice(Infinity)).not.toThrow()
    })
  })

  describe('formatDate', () => {
    it('formats valid dates correctly', () => {
      const result = formatDate('2024-01-15T10:30:00Z')
      expect(result).toMatch(/Jan 15, 2024/)
    })

    it('handles invalid dates gracefully', () => {
      expect(() => formatDate('invalid-date')).not.toThrow()
    })
  })

  describe('truncateText', () => {
    it('truncates long text correctly', () => {
      const longText = 'This is a very long text that should be truncated'
      expect(truncateText(longText, 10)).toBe('This is a ...')
    })

    it('returns short text unchanged', () => {
      expect(truncateText('Short', 10)).toBe('Short')
    })

    it('handles edge cases', () => {
      expect(() => truncateText('', 5)).not.toThrow()
      expect(() => truncateText('test', -1)).not.toThrow()
    })
  })

  describe('calculateDiscount', () => {
    it('calculates discount correctly', () => {
      expect(calculateDiscount(100, 10)).toBe(90)
      expect(calculateDiscount(50, 20)).toBe(40)
    })

    it('handles edge cases', () => {
      expect(() => calculateDiscount(100, -10)).not.toThrow()
      expect(() => calculateDiscount(100, 150)).not.toThrow()
    })
  })
})