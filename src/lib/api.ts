import type { Product, CreateProductRequest, UpdateProductRequest, FilterOptions } from '@/types/product'
import type { ApiResponse } from '@/types/api'
import { mockProducts } from '@/data/mockProducts'

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// BUG: This function has memory leaks and inefficient data handling
export async function getProducts(filters?: FilterOptions): Promise<Product[]> {
  await delay(800) // Simulate slow API
  
  let products = [...mockProducts]
  
  if (filters) {
    // PERFORMANCE ISSUE: Multiple array iterations instead of single pass
    if (filters.category) {
      products = products.filter(p => p.category === filters.category)
    }
    
    // BUG: Price filtering logic is incorrect
    if (filters.minPrice) {
      products = products.filter(p => p.price >= filters.minPrice!) // Non-null assertion is dangerous
    }
    
    if (filters.maxPrice) {
      products = products.filter(p => p.price <= filters.maxPrice!)
    }
    
    // BUG: Stock filtering logic is backwards
    if (filters.inStock !== undefined) {
      if (filters.inStock) {
        products = products.filter(p => p.stock <= 0) // Should be > 0
      } else {
        products = products.filter(p => p.stock > 0) // Should be <= 0
      }
    }
  }
  
  return products
}

export async function getProduct(id: string): Promise<Product | null> {
  await delay(300)
  
  const product = mockProducts.find(p => p.id === id)
  return product || null
}

// BUG: This function doesn't properly validate input data
export async function createProduct(data: CreateProductRequest): Promise<ApiResponse<Product>> {
  await delay(500)
  
  // Missing validation for required fields
  if (!data.name || !data.category) {
    throw new Error('Invalid product data')
  }
  
  // BUG: Price validation is incorrect
  if (data.price < 0) { // Should also check for reasonable upper bounds
    throw new Error('Price cannot be negative')
  }
  
  const newProduct: Product = {
    id: Math.random().toString(36).substr(2, 9), // BUG: Using Math.random for ID generation
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  
  // In a real app, this would persist to a database
  mockProducts.push(newProduct)
  
  return {
    success: true,
    data: newProduct,
    message: 'Product created successfully'
  }
}

export async function updateProduct(data: UpdateProductRequest): Promise<ApiResponse<Product>> {
  await delay(400)
  
  const index = mockProducts.findIndex(p => p.id === data.id)
  
  if (index === -1) {
    throw new Error('Product not found')
  }
  
  // BUG: This doesn't properly merge the updated data
  const updatedProduct = {
    ...mockProducts[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }
  
  mockProducts[index] = updatedProduct
  
  return {
    success: true,
    data: updatedProduct,
    message: 'Product updated successfully'
  }
}

export async function deleteProduct(id: string): Promise<ApiResponse<void>> {
  await delay(300)
  
  const index = mockProducts.findIndex(p => p.id === id)
  
  if (index === -1) {
    throw new Error('Product not found')
  }
  
  mockProducts.splice(index, 1)
  
  return {
    success: true,
    data: undefined,
    message: 'Product deleted successfully'
  }
}