'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { ProductFilters } from '@/components/ProductFilters'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import type { Product, FilterOptions } from '@/types/product'
import { getProducts } from '@/lib/api'

/**
 * Historical issues:
 * - Maintained redundant filtered state via `useEffect`, creating double renders.
 * - Filters compared prices with exclusive logic and inverted stock conditions.
 * - API errors were only logged to console, leaving users without feedback.
 */
const INITIAL_FILTERS: FilterOptions = {
  category: '',
  minPrice: undefined,
  maxPrice: undefined,
  inStock: undefined,
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterOptions>(INITIAL_FILTERS)

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      console.error('Error fetching products:', err)
      setError('We were unable to load the product catalog. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters.category && product.category !== filters.category) {
        return false
      }

      if (filters.minPrice !== undefined && product.price < filters.minPrice) {
        return false
      }

      if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
        return false
      }

      if (filters.inStock === true && product.stock <= 0) {
        return false
      }

      if (filters.inStock === false && product.stock > 0) {
        return false
      }

      return true
    })
  }, [filters, products])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Product Inventory</h2>
          <div className="text-sm text-gray-500">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-md border border-error-200 bg-error-50 p-4 text-sm text-error-700"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={loadProducts}
              className="mt-2 text-error-900 underline underline-offset-2 focus-visible:ring-2 focus-visible:ring-error-500"
            >
              Retry loading products
            </button>
          </div>
        )}
        
        <ProductFilters filters={filters} onFiltersChange={setFilters} />
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}