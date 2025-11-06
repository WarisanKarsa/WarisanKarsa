export interface AIDescriptionInput {
  productName: string
  category: string
  culturalOrigin?: string
  materials?: string
  features?: string[]
  language?: 'id' | 'en'
}

export interface ImageAnalysisResult {
  quality_score: number
  presentation_score: number
  authenticity_score: number
  marketability_score: number
  overall_score: number
  strengths: string[]
  improvements: string[]
  detected_objects: string[]
  cultural_elements: string[]
}

export interface MarketingSuggestion {
  target_audience: string[]
  pricing_strategy: string
  promotion_ideas: string[]
  keywords: string[]
  social_media_tips: string[]
}

export interface ProductAssistantInput {
  productName: string
  category: string
  images: string[]
}

export interface ProductAssistantOutput {
  description: string
  imageAnalysis: ImageAnalysisResult[]
  marketingSuggestions: MarketingSuggestion
}
