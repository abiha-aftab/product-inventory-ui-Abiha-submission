'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

// BUG: This component has several accessibility and performance issues
export function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock <= 0
  
  // BUG: Price formatting is incorrect - doesn't handle edge cases
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
  }
  
  // BUG: Stock status logic has issues
  const getStockStatus = () => {
    if (product.stock === 0) return 'Out of Stock'
    if (product.stock <= 5) return 'Low Stock' 
    return 'In Stock'
  }
  
  const getStockColor = () => {
    if (product.stock === 0) return 'text-error-600'
    if (product.stock <= 5) return 'text-warning-600'
    return 'text-success-600'
  }
  
  // PERFORMANCE ISSUE: This calculation runs on every render
  const discountedPrice = Math.random() > 0.7 ? product.price * 0.9 : null
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      {/* BUG: Image component is not optimized properly */}
      <div className="relative h-48 bg-gray-100">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name} // BUG: Alt text should be more descriptive
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false} // BUG: Should be dynamic based on visibility
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        {discountedPrice && (
          <div className="absolute top-2 right-2 bg-error-500 text-white px-2 py-1 text-xs rounded">
            Sale!
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {product.name}
          </h3>
          {/* BUG: Stock badge is not screen reader friendly */}
          <span className={`text-xs px-2 py-1 rounded ${getStockColor()}`}>
            {getStockStatus()}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Category</span>
            <span className="text-sm font-medium">{product.category}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500">Stock</span>
            <span className="text-sm font-medium">{product.stock}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-baseline">
            {discountedPrice ? (
              <>
                <span className="text-lg font-bold text-error-600">
                  {formatPrice(discountedPrice)}
                </span>
                <span className="text-sm text-gray-500 line-through ml-2">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-400">
            SKU: {product.sku}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="primary" 
            className="flex-1"
            disabled={isOutOfStock}
            onClick={() => {
              // BUG: No error handling for this action
              console.log('Add to cart:', product.id)
            }}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => {
              // TODO: Implement product details view
              console.log('View details:', product.id)
            }}
            // BUG: Missing accessibility attributes
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  )
}