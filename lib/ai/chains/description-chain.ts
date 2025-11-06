import { PromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { geminiModel } from '../langchain-config'
import { DESCRIPTION_PROMPT_ID, DESCRIPTION_PROMPT_EN } from '../prompts/description-prompts'
import type { AIDescriptionInput } from '@/types/ai'

export async function generateDescription(input: AIDescriptionInput): Promise<string> {
  const template = input.language === 'en' ? DESCRIPTION_PROMPT_EN : DESCRIPTION_PROMPT_ID
  
  const descriptionPrompt = PromptTemplate.fromTemplate(template)
  
  const chain = RunnableSequence.from([
    descriptionPrompt,
    geminiModel,
    new StringOutputParser()
  ])
  
  const result = await chain.invoke({
    productName: input.productName,
    category: input.category,
    culturalOrigin: input.culturalOrigin || 'Indonesia',
    materials: input.materials || 'Traditional materials',
    features: input.features?.join(', ') || 'Handcrafted with care',
    language: input.language === 'en' ? 'English' : 'Bahasa Indonesia'
  })
  
  return result
}

export async function generateShortDescription(
  productName: string,
  category: string,
  language: 'id' | 'en' = 'id'
): Promise<string> {
  const prompt = `Create a concise 50-word product description for:

Product: ${productName}
Category: ${category}

Focus on the key selling points and cultural value. Write in ${language === 'en' ? 'English' : 'Bahasa Indonesia'}.

Short Description:`

  const result = await geminiModel.invoke(prompt)
  return result.content.toString().trim()
}
