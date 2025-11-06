export interface OrderInput {
  product_id: string
  quantity: number
  shipping_address: {
    street?: string
    city: string
    province: string
    postal_code?: string
    country: string
  }
}

export interface OrderWithDetails {
  id: string
  buyer_id: string
  buyer_name: string
  seller_id: string
  seller_name: string
  product_id: string
  product_name: string
  product_image: string
  quantity: number
  total_price: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  shipping_address: {
    street?: string
    city: string
    province: string
    postal_code?: string
    country: string
  }
  whatsapp_thread_id: string | null
  created_at: string
  updated_at: string
}
