import { HumanMessage } from '@langchain/core/messages'
import { geminiVisionModel } from '../langchain-config'
import { IMAGE_ANALYSIS_PROMPT } from '../prompts/image-prompts'
import type { ImageAnalysisResult } from '@/types/ai'

export async function analyzeProductImage(imageUrl: string): Promise<ImageAnalysisResult> {
  const message = new HumanMessage({
    content: [
      {
        type: 'text',
        text: IMAGE_ANALYSIS_PROMPT
      },
      {
        type: 'image_url',
        image_url: imageUrl
      }
    ]
  })
  
  const response = await geminiVisionModel.invoke([message])
  
  // Parse JSON from response
  const responseText = response.content.toString()
  const jsonMatch = responseText.match(/\{[\s\S]*\}/)
  
  if (!jsonMatch) {
    throw new Error('Failed to parse image analysis response')
  }
  
  try {
    const result = JSON.parse(jsonMatch[0])
    return result as ImageAnalysisResult
  } catch (error) {
    throw new Error('Invalid JSON in image analysis response')
  }
}

export async function batchAnalyzeImages(imageUrls: string[]): Promise<ImageAnalysisResult[]> {
  const analyses = await Promise.all(
    imageUrls.map(url => analyzeProductImage(url))
  )
  
  return analyses
}

export async function quickImageQualityCheck(imageUrl: string): Promise<{
  lighting: number
  focus: number
  composition: number
  background: number
  overall: number
  recommendation: 'accept' | 'improve' | 'reject'
}> {
  const prompt = `Quick quality check for this product image:

Rate the following (1-10):
- Lighting
- Focus/Sharpness
- Composition
- Background cleanliness

Return JSON:
{
  "lighting": 0-10,
  "focus": 0-10,
  "composition": 0-10,
  "background": 0-10,
  "overall": 0-10,
  "recommendation": "accept|improve|reject"
}`

  const message = new HumanMessage({
    content: [
      { type: 'text', text: prompt },
      { type: 'image_url', image_url: imageUrl }
    ]
  })
  
  const response = await geminiVisionModel.invoke([message])
  const responseText = response.content.toString()
  const jsonMatch = responseText.match(/\{[\s\S]*\}/)
  
  if (!jsonMatch) {
    throw new Error('Failed to parse quality check response')
  }
  
  return JSON.parse(jsonMatch[0])
}
