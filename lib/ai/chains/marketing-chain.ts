import { PromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { geminiCreativeModel } from '../langchain-config'
import { MARKETING_SUGGESTIONS_PROMPT } from '../prompts/marketing-prompts'
import type { MarketingSuggestion } from '@/types/ai'

export async function generateMarketingSuggestions(input: {
  productName: string
  description: string
  category?: string
  imageAnalysis?: any
}): Promise<MarketingSuggestion> {
  const prompt = PromptTemplate.fromTemplate(MARKETING_SUGGESTIONS_PROMPT)
  
  const chain = RunnableSequence.from([
    prompt,
    geminiCreativeModel,
    new StringOutputParser()
  ])
  
  const result = await chain.invoke({
    productName: input.productName,
    description: input.description,
    category: input.category || 'Cultural Product',
    imageAnalysis: input.imageAnalysis ? JSON.stringify(input.imageAnalysis) : 'Not available'
  })
  
  // Parse JSON from response
  const jsonMatch = result.match(/\{[\s\S]*\}/)
  
  if (!jsonMatch) {
    throw new Error('Failed to parse marketing suggestions response')
  }
  
  try {
    return JSON.parse(jsonMatch[0]) as MarketingSuggestion
  } catch (error) {
    throw new Error('Invalid JSON in marketing suggestions response')
  }
}

export async function generateSEOKeywords(input: {
  productName: string
  category: string
  description: string
}): Promise<{
  primary_keywords: string[]
  secondary_keywords: string[]
  long_tail_keywords: string[]
}> {
  const prompt = `Generate SEO keywords for this cultural product:

Product: ${input.productName}
Category: ${input.category}
Description: ${input.description}

Provide 10-15 relevant keywords in JSON format:
{
  "primary_keywords": ["keyword1", "keyword2"],
  "secondary_keywords": ["keyword3", "keyword4"],
  "long_tail_keywords": ["specific phrase 1", "specific phrase 2"]
}`

  const response = await geminiCreativeModel.invoke(prompt)
  const responseText = response.content.toString()
  const jsonMatch = responseText.match(/\{[\s\S]*\}/)
  
  if (!jsonMatch) {
    throw new Error('Failed to parse SEO keywords response')
  }
  
  return JSON.parse(jsonMatch[0])
}
