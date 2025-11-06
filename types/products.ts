export interface ProductInput {
  name: string
  description?: string
  category: string
  price: number
  stock: number
  images: string[]
  metadata?: Record<string, any>
}

export interface ProductFilter {
  category?: string
  minPrice?: number
  maxPrice?: number
  sellerId?: string
  status?: 'draft' | 'active' | 'sold_out' | 'archived'
  search?: string
}

export interface ProductWithSeller {
  id: string
  seller_id: string
  seller_name: string
  seller_phone: string | null
  name: string
  description: string | null
  ai_generated_description: string | null
  category: string
  price: number
  stock: number
  images: string[]
  metadata: Record<string, any>
  status: 'draft' | 'active' | 'sold_out' | 'archived'
  created_at: string
  updated_at: string
}
