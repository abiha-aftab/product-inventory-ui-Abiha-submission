import type { Product, CreateProductRequest, UpdateProductRequest, FilterOptions } from '@/types/product'
import { ApiException, type ApiResponse } from '@/types/api'
import { mockProducts } from '@/data/mockProducts'

/**
 * Historical issues (documented for future regressions):
 * - Filtering previously ran multiple passes and inverted stock logic (`inStock` true returned OOS items).
 * - Validation only checked a couple of fields, allowing NaN/Infinity prices, negative stock, duplicate SKUs, etc.
 * - IDs were generated with Math.random, which risked collisions in larger lists.
 */

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const MAX_ALLOWED_PRICE = 1_000_000

const normalizeNumber = (value?: number) => {
  if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) {
    return undefined
  }
  return value
}

export async function getProducts(filters?: FilterOptions): Promise<Product[]> {
  await delay(800) // Simulate slow API
  
  if (!filters) {
    return [...mockProducts]
  }

  const normalizedFilters: FilterOptions = {
    category: filters.category?.trim() || undefined,
    minPrice: normalizeNumber(filters.minPrice),
    maxPrice: normalizeNumber(filters.maxPrice),
    inStock: filters.inStock,
  }

  return mockProducts.filter((product) => {
    if (normalizedFilters.category && product.category !== normalizedFilters.category) {
      return false
    }

    if (
      normalizedFilters.minPrice !== undefined &&
      product.price < normalizedFilters.minPrice
    ) {
      return false
    }

    if (
      normalizedFilters.maxPrice !== undefined &&
      product.price > normalizedFilters.maxPrice
    ) {
      return false
    }

    if (normalizedFilters.inStock === true && product.stock <= 0) {
      return false
    }

    if (normalizedFilters.inStock === false && product.stock > 0) {
      return false
    }

    return true
  })
}

export async function getProduct(id: string): Promise<Product | null> {
  await delay(300)
  
  const product = mockProducts.find(p => p.id === id)
  return product || null
}

export async function createProduct(data: CreateProductRequest): Promise<ApiResponse<Product>> {
  await delay(500)

  const assertString = (value: string, field: string) => {
    if (!value || !value.trim()) {
      throw new ApiException('VALIDATION_ERROR', `${field} is required`)
    }
    return value.trim()
  }

  const assertNumber = (value: number, field: string) => {
    if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) {
      throw new ApiException('VALIDATION_ERROR', `${field} must be a valid number`)
    }
    return value
  }

  const name = assertString(data.name, 'Product name')
  const description = assertString(data.description, 'Description')
  const category = assertString(data.category, 'Category')
  const sku = assertString(data.sku, 'SKU')
  const price = assertNumber(data.price, 'Price')
  const stock = assertNumber(data.stock, 'Stock')

  if (price <= 0 || price > MAX_ALLOWED_PRICE) {
    throw new ApiException('VALIDATION_ERROR', `Price must be between 0.01 and ${MAX_ALLOWED_PRICE.toLocaleString()}`)
  }

  if (!Number.isInteger(stock) || stock < 0) {
    throw new ApiException('VALIDATION_ERROR', 'Stock must be a non-negative integer')
  }

  if (mockProducts.some((product) => product.sku === sku)) {
    throw new ApiException('DUPLICATE_SKU', 'A product with this SKU already exists')
  }

  const now = new Date().toISOString()

  const newProduct: Product = {
    id: globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : Math.random().toString(36).slice(2, 11),
    name,
    description,
    category,
    price,
    stock,
    imageUrl: data.imageUrl?.trim() || undefined,
    sku,
    createdAt: now,
    updatedAt: now,
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