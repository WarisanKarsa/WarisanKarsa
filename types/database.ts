export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'seller' | 'buyer' | 'admin'
          full_name: string
          phone: string | null
          whatsapp_number: string | null
          address: Address | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: 'seller' | 'buyer' | 'admin'
          full_name: string
          phone?: string | null
          whatsapp_number?: string | null
          address?: Address | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'seller' | 'buyer' | 'admin'
          full_name?: string
          phone?: string | null
          whatsapp_number?: string | null
          address?: Address | null
          updated_at?: string
        }
      }
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Product, 'id' | 'created_at'>>
      }
      orders: {
        Row: Order
        Insert: Omit<Order, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Order, 'id' | 'created_at'>>
      }
      ai_interactions: {
        Row: AIInteraction
        Insert: Omit<AIInteraction, 'id' | 'created_at'>
        Update: Partial<Omit<AIInteraction, 'id' | 'created_at'>>
      }
      whatsapp_messages: {
        Row: WhatsAppMessage
        Insert: Omit<WhatsAppMessage, 'id' | 'created_at'>
        Update: Partial<Omit<WhatsAppMessage, 'id' | 'created_at'>>
      }
    }
  }
}

export interface Address {
  street?: string
  city: string
  province: string
  postal_code?: string
  country: string
}

export interface Product {
  id: string
  seller_id: string
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

export interface Order {
  id: string
  buyer_id: string
  seller_id: string
  product_id: string
  quantity: number
  total_price: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  shipping_address: Address
  whatsapp_thread_id: string | null
  created_at: string
  updated_at: string
}

export interface AIInteraction {
  id: string
  user_id: string
  interaction_type: 'description' | 'image_analysis' | 'marketing'
  input_data: Record<string, any>
  output_data: Record<string, any>
  model_used: string
  tokens_used: number
  created_at: string
}

export interface WhatsAppMessage {
  id: string
  user_id: string
  message_type: 'inbound' | 'outbound'
  content: string
  media_url: string | null
  status: string
  whatsapp_message_id: string
  created_at: string
}
