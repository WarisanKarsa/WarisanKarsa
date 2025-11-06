import { StateGraph, END } from '@langchain/langgraph'
import { generateDescription } from './chains/description-chain'
import { batchAnalyzeImages } from './chains/image-analysis-chain'
import { generateMarketingSuggestions } from './chains/marketing-chain'
import type { ProductAssistantInput, ProductAssistantOutput, ImageAnalysisResult, MarketingSuggestion } from '@/types/ai'

// Define state interface
interface ProductAssistantState {
  productName: string
  category: string
  images: string[]
  description?: string
  imageAnalysis?: ImageAnalysisResult[]
  marketingSuggestions?: MarketingSuggestion
  currentStep: string
  error?: string
}

// Define nodes
async function analyzeImages(state: ProductAssistantState): Promise<Partial<ProductAssistantState>> {
  try {
    const analyses = await batchAnalyzeImages(state.images)
    
    return {
      imageAnalysis: analyses,
      currentStep: 'generate_description'
    }
  } catch (error) {
    return {
      error: `Image analysis failed: ${error}`,
      currentStep: 'error'
    }
  }
}

async function generateDesc(state: ProductAssistantState): Promise<Partial<ProductAssistantState>> {
  try {
    const description = await generateDescription({
      productName: state.productName,
      category: state.category,
      culturalOrigin: 'Indonesia',
      language: 'id'
    })
    
    return {
      description,
      currentStep: 'generate_marketing'
    }
  } catch (error) {
    return {
      error: `Description generation failed: ${error}`,
      currentStep: 'error'
    }
  }
}

async function generateMarketing(state: ProductAssistantState): Promise<Partial<ProductAssistantState>> {
  try {
    const suggestions = await generateMarketingSuggestions({
      productName: state.productName,
      description: state.description!,
      category: state.category,
      imageAnalysis: state.imageAnalysis
    })
    
    return {
      marketingSuggestions: suggestions,
      currentStep: 'complete'
    }
  } catch (error) {
    return {
      error: `Marketing suggestions failed: ${error}`,
      currentStep: 'error'
    }
  }
}

// Build graph
const workflow = new StateGraph<ProductAssistantState>({
  channels: {
    productName: null,
    category: null,
    images: null,
    description: null,
    imageAnalysis: null,
    marketingSuggestions: null,
    currentStep: null,
    error: null
  }
})

workflow.addNode('analyze_images', analyzeImages)
workflow.addNode('generate_description', generateDesc)
workflow.addNode('generate_marketing', generateMarketing)

// Add conditional edges
workflow.addConditionalEdges(
  'analyze_images',
  (state) => state.currentStep === 'error' ? 'end' : 'generate_description'
)

workflow.addConditionalEdges(
  'generate_description',
  (state) => state.currentStep === 'error' ? 'end' : 'generate_marketing'
)

workflow.addEdge('generate_marketing', END)

workflow.setEntryPoint('analyze_images')

export const productAssistantGraph = workflow.compile()

// Usage function
export async function runProductAssistant(
  input: ProductAssistantInput
): Promise<ProductAssistantOutput> {
  const result = await productAssistantGraph.invoke({
    productName: input.productName,
    category: input.category,
    images: input.images,
    currentStep: 'analyze_images'
  })
  
  if (result.error) {
    throw new Error(result.error)
  }
  
  return {
    description: result.description!,
    imageAnalysis: result.imageAnalysis!,
    marketingSuggestions: result.marketingSuggestions!
  }
}
