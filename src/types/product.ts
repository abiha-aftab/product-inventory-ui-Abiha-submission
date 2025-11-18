/**
 * Historical issues:
 * - `FilterOptions.category` was required, forcing callers to pass empty strings
 *   even when no category filter was desired, complicating reset logic.
 */

export interface Product {
  id: string
  name: string
  description: string
  category: string
  price: number
  stock: number
  imageUrl?: string
  sku: string
  createdAt: string
  updatedAt: string
}

export interface ProductDTO {
  id: string
  name: string
  description: string
  category: string
  price: number
  stock: number
  imageUrl?: string
  sku: string
  createdAt: string
  updatedAt: string
}

export interface FilterOptions {
  category?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
}

export interface CreateProductRequest {
  name: string
  description: string
  category: string
  price: number
  stock: number
  imageUrl?: string
  sku: string
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string
}

export type ProductCategory = 
  | 'Electronics'
  | 'Clothing'
  | 'Books'
  | 'Home & Garden'
  | 'Sports'
  | 'Toys'
  | 'Beauty'
  | 'Automotive'