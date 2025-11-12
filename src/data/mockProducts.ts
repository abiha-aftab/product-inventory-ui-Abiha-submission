import type { Product } from '@/types/product'

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    category: 'Electronics',
    price: 199.99,
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    sku: 'WBH-001',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-02-01T14:22:00Z'
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable 100% organic cotton t-shirt available in multiple colors.',
    category: 'Clothing',
    price: 29.99,
    stock: 0, // Out of stock for testing
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    sku: 'OCT-002',
    createdAt: '2024-01-10T08:15:00Z',
    updatedAt: '2024-02-15T09:45:00Z'
  },
  {
    id: '3',
    name: 'JavaScript: The Definitive Guide',
    description: 'Complete reference book for JavaScript programming language. 7th edition.',
    category: 'Books',
    price: 59.99,
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    sku: 'JSG-003',
    createdAt: '2024-01-05T12:00:00Z',
    updatedAt: '2024-01-20T16:30:00Z'
  },
  {
    id: '4',
    name: 'Smart Plant Pot',
    description: 'Self-watering plant pot with IoT connectivity and mobile app control.',
    category: 'Home & Garden',
    price: 89.99,
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500',
    sku: 'SPP-004',
    createdAt: '2024-02-01T11:20:00Z',
    updatedAt: '2024-02-10T13:15:00Z'
  },
  {
    id: '5',
    name: 'Professional Tennis Racket',
    description: 'Lightweight carbon fiber tennis racket used by professional players.',
    category: 'Sports',
    price: 249.99,
    stock: 5,
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500',
    sku: 'PTR-005',
    createdAt: '2024-01-25T14:45:00Z',
    updatedAt: '2024-02-05T10:30:00Z'
  },
  {
    id: '6',
    name: 'Educational Building Blocks',
    description: 'Colorful building blocks set that promotes creativity and problem-solving skills.',
    category: 'Toys',
    price: 39.99,
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    sku: 'EBB-006',
    createdAt: '2024-01-12T09:00:00Z',
    updatedAt: '2024-01-28T15:20:00Z'
  },
  {
    id: '7',
    name: 'Luxury Face Cream',
    description: 'Anti-aging face cream with natural ingredients and SPF 30 protection.',
    category: 'Beauty',
    price: 79.99,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
    sku: 'LFC-007',
    createdAt: '2024-02-08T16:10:00Z',
    updatedAt: '2024-02-12T11:45:00Z'
  },
  {
    id: '8',
    name: 'Car Phone Mount',
    description: 'Adjustable magnetic phone mount for car dashboard with 360-degree rotation.',
    category: 'Automotive',
    price: 24.99,
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1549317336-206569e8475c?w=500',
    sku: 'CPM-008',
    createdAt: '2024-01-30T13:25:00Z',
    updatedAt: '2024-02-14T08:50:00Z'
  },
  {
    id: '9',
    name: 'Vintage Leather Jacket',
    description: 'Genuine leather jacket with vintage styling and premium craftsmanship.',
    category: 'Clothing',
    price: 299.99,
    stock: 3,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    sku: 'VLJ-009',
    createdAt: '2024-01-18T10:15:00Z',
    updatedAt: '2024-02-03T14:30:00Z'
  },
  {
    id: '10',
    name: 'Gaming Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with customizable keys and gaming optimization.',
    category: 'Electronics',
    price: 159.99,
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
    sku: 'GMK-010',
    createdAt: '2024-02-06T12:40:00Z',
    updatedAt: '2024-02-11T09:25:00Z'
  }
]