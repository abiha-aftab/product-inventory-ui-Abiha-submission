'use client'

import { ChangeEvent } from 'react'
import type { FilterOptions, ProductCategory } from '@/types/product'

interface ProductFiltersProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
}

const categories: ProductCategory[] = [
  'Electronics',
  'Clothing', 
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
  'Beauty',
  'Automotive'
]

// BUG: This component has performance and UX issues
export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  
  // BUG: These handlers recreate functions on every render
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      category: e.target.value
    })
  }
  
  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onFiltersChange({
      ...filters,
      minPrice: value ? parseFloat(value) : undefined
    })
  }
  
  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onFiltersChange({
      ...filters,
      maxPrice: value ? parseFloat(value) : undefined
    })
  }
  
  const handleStockChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    let inStock: boolean | undefined = undefined
    if (value === 'true') inStock = true
    if (value === 'false') inStock = false
    
    onFiltersChange({
      ...filters,
      inStock
    })
  }
  
  // BUG: Reset function doesn't properly clear all filters
  const handleReset = () => {
    onFiltersChange({
      category: '',
      minPrice: undefined,
      maxPrice: undefined,
      inStock: true, // BUG: Should be undefined
    })
  }
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-4 space-y-4 lg:space-y-0">
        <div className="flex-1">
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label htmlFor="min-price" className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <input
            type="number"
            id="min-price"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={filters.minPrice || ''}
            onChange={handleMinPriceChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex-1">
          <label htmlFor="max-price" className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <input
            type="number"
            id="max-price"
            placeholder="999.99"
            min="0"
            step="0.01"
            value={filters.maxPrice || ''}
            onChange={handleMaxPriceChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex-1">
          <label htmlFor="stock-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Availability
          </label>
          <select
            id="stock-filter"
            value={filters.inStock === undefined ? '' : filters.inStock.toString()}
            onChange={handleStockChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Products</option>
            <option value="true">In Stock Only</option>
            <option value="false">Out of Stock Only</option>
          </select>
        </div>
        
        <div className="flex-shrink-0">
          {/* BUG: Button lacks proper accessibility attributes */}
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            type="button"
          >
            Reset Filters
          </button>
        </div>
      </div>
      
      {/* BUG: This summary text updates too frequently and causes unnecessary re-renders */}
      <div className="mt-3 text-xs text-gray-500">
        {filters.category && `Category: ${filters.category}`}
        {filters.minPrice && ` • Min: $${filters.minPrice}`}
        {filters.maxPrice && ` • Max: $${filters.maxPrice}`}
        {filters.inStock !== undefined && ` • ${filters.inStock ? 'In Stock' : 'Out of Stock'}`}
      </div>
    </div>
  )
}