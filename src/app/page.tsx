'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { ProductFilters } from '@/components/ProductFilters'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import type { Product, FilterOptions } from '@/types/product'
import { getProducts } from '@/lib/api'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    minPrice: undefined,
    maxPrice: undefined,
    inStock: undefined,
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getProducts()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // BUG: This filtering logic has performance issues and incorrect logic
  useEffect(() => {
    let filtered = [...products]
    
    // Inefficient: Creates new array on every render
    filtered = products.filter(product => {
      if (filters.category && product.category !== filters.category) {
        return false
      }
      
      // BUG: Logic error - should be inclusive of min/max prices
      if (filters.minPrice && product.price < filters.minPrice) {
        return false
      }
      if (filters.maxPrice && product.price > filters.maxPrice) {
        return false
      }
      
      // BUG: This condition is backwards
      if (filters.inStock !== undefined) {
        if (filters.inStock && product.stock <= 0) return false
        if (!filters.inStock && product.stock > 0) return false
      }
      
      return true
    })
    
    setFilteredProducts(filtered)
  }, [filters, products])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Product Inventory</h2>
        <div className="text-sm text-gray-500">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>
      
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
  )
}