import { getProducts, createProduct } from '@/lib/api'
import type { FilterOptions, CreateProductRequest } from '@/types/product'

describe('API Functions', () => {
  describe('getProducts', () => {
    it('returns all products when no filters applied', async () => {
      const products = await getProducts()
      expect(products).toHaveLength(10)
      expect(products[0]).toHaveProperty('id')
      expect(products[0]).toHaveProperty('name')
    })

    it('filters products by category', async () => {
      const filters: FilterOptions = { category: 'Electronics' }
      const products = await getProducts(filters)
      
      expect(products.length).toBeGreaterThan(0)
      products.forEach(product => {
        expect(product.category).toBe('Electronics')
      })
    })

    it('filters products by price range', async () => {
      const filters: FilterOptions = { 
        minPrice: 50, 
        maxPrice: 200
      }
      const products = await getProducts(filters)
      
      products.forEach(product => {
        expect(product.price).toBeGreaterThanOrEqual(50)
        expect(product.price).toBeLessThanOrEqual(200)
      })
    })

    it('filters products by stock status', async () => {
      const inStockFilters: FilterOptions = { inStock: true }
      const inStockProducts = await getProducts(inStockFilters)
      
      inStockProducts.forEach(product => {
        expect(product.stock).toBeGreaterThan(0)
      })

      const outOfStockFilters: FilterOptions = { inStock: false }
      const outOfStockProducts = await getProducts(outOfStockFilters)
      
      outOfStockProducts.forEach(product => {
        expect(product.stock).toBeLessThanOrEqual(0)
      })
    })
  })

  describe('createProduct', () => {
    it('creates a new product successfully', async () => {
      const newProduct: CreateProductRequest = {
        name: 'Test Product',
        description: 'Test Description',
        category: 'Electronics',
        price: 99.99,
        stock: 10,
        sku: 'TEST-123'
      }

      const response = await createProduct(newProduct)
      
      expect(response.success).toBe(true)
      expect(response.data).toHaveProperty('id')
      expect(response.data.name).toBe('Test Product')
      expect(response.message).toBe('Product created successfully')
    })

    it('throws error for invalid product data', async () => {
      const invalidProduct = {
        name: '', // Invalid: empty name
        description: 'Test Description',
        category: 'Electronics',
        price: 99.99,
        stock: 10,
        sku: 'TEST-123'
      } as CreateProductRequest

      await expect(createProduct(invalidProduct)).rejects.toThrow('Product name is required')
    })

    it('throws error for negative price', async () => {
      const invalidProduct: CreateProductRequest = {
        name: 'Test Product',
        description: 'Test Description',
        category: 'Electronics',
        price: -10, // Invalid: negative price
        stock: 10,
        sku: 'TEST-123'
      }

      await expect(createProduct(invalidProduct)).rejects.toThrow('Price must be between 0.01 and')
    })
  })
})