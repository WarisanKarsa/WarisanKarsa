import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

export const geminiModel = new ChatGoogleGenerativeAI({
  modelName: 'gemini-2.0-flash-exp',
  apiKey: process.env.GEMINI_API_KEY!,
  temperature: 0.7,
  maxOutputTokens: 2048,
})

export const geminiVisionModel = new ChatGoogleGenerativeAI({
  modelName: 'gemini-2.0-flash-exp',
  apiKey: process.env.GEMINI_API_KEY!,
  temperature: 0.3,
})

export const geminiCreativeModel = new ChatGoogleGenerativeAI({
  modelName: 'gemini-2.0-flash-exp',
  apiKey: process.env.GEMINI_API_KEY!,
  temperature: 0.9,
  maxOutputTokens: 1024,
})
