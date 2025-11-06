import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { analyzeProductImage } from '@/lib/ai/chains/image-analysis-chain'
import { handleError } from '@/lib/utils/error-handling'

export const runtime = 'edge'
export const maxDuration = 30

// POST /api/ai/analyze-image
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Verify authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    const { imageUrl } = body
    
    if (!imageUrl) {
      return NextResponse.json({ 
        error: 'Image URL is required' 
      }, { status: 400 })
    }
    
    // Analyze image using Gemini Vision
    const analysis = await analyzeProductImage(imageUrl)
    
    // Log AI interaction
    await supabase
      .from('ai_interactions')
      .insert({
        user_id: user.id,
        interaction_type: 'image_analysis',
        input_data: { imageUrl },
        output_data: analysis,
        model_used: 'gemini-2.0-flash-exp',
        tokens_used: 0
      })
    
    return NextResponse.json({ analysis })
  } catch (error) {
    const { message, statusCode } = handleError(error)
    return NextResponse.json({ error: message }, { status: statusCode })
  }
}
