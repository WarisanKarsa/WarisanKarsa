import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateMarketingSuggestions } from '@/lib/ai/chains/marketing-chain'
import { handleError } from '@/lib/utils/error-handling'

export const runtime = 'edge'
export const maxDuration = 30

// POST /api/ai/marketing-suggestions
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Verify authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    const { productName, description, category, imageAnalysis } = body
    
    if (!productName || !description) {
      return NextResponse.json({ 
        error: 'Product name and description are required' 
      }, { status: 400 })
    }
    
    // Generate marketing suggestions
    const suggestions = await generateMarketingSuggestions({
      productName,
      description,
      category,
      imageAnalysis
    })
    
    // Log AI interaction
    await supabase
      .from('ai_interactions')
      .insert({
        user_id: user.id,
        interaction_type: 'marketing',
        input_data: { productName, description, category },
        output_data: suggestions,
        model_used: 'gemini-2.0-flash-exp',
        tokens_used: 0
      })
    
    return NextResponse.json({ suggestions })
  } catch (error) {
    const { message, statusCode } = handleError(error)
    return NextResponse.json({ error: message }, { status: statusCode })
  }
}
