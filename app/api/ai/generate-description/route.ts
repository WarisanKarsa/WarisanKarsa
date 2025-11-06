import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateDescription } from '@/lib/ai/chains/description-chain'
import { handleError } from '@/lib/utils/error-handling'

export const runtime = 'edge'
export const maxDuration = 30

// POST /api/ai/generate-description
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Verify authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    const { productName, category, culturalOrigin, materials, features, language } = body
    
    if (!productName || !category) {
      return NextResponse.json({ 
        error: 'Product name and category are required' 
      }, { status: 400 })
    }
    
    // Generate description using LangChain
    const description = await generateDescription({
      productName,
      category,
      culturalOrigin,
      materials,
      features,
      language: language || 'id'
    })
    
    // Log AI interaction
    await supabase
      .from('ai_interactions')
      .insert({
        user_id: user.id,
        interaction_type: 'description',
        input_data: { productName, category, culturalOrigin, materials, features },
        output_data: { description },
        model_used: 'gemini-2.0-flash-exp',
        tokens_used: 0 // Estimate if needed
      })
    
    return NextResponse.json({ description })
  } catch (error) {
    const { message, statusCode } = handleError(error)
    return NextResponse.json({ error: message }, { status: statusCode })
  }
}
