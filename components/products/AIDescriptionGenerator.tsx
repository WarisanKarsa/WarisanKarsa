'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

interface AIDescriptionGeneratorProps {
  productName: string
  category: string
  onDescriptionGenerated: (description: string) => void
}

export function AIDescriptionGenerator({
  productName,
  category,
  onDescriptionGenerated
}: AIDescriptionGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateDescription = async () => {
    if (!productName || !category) {
      setError('Please provide product name and category first')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          category,
          language: 'id'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate description')
      }

      const data = await response.json()
      onDescriptionGenerated(data.description)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🤖</span>
          AI Description Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Generate a professional, culturally-aware product description using AI
        </p>
        
        <Button
          onClick={generateDescription}
          disabled={isGenerating || !productName || !category}
          className="w-full"
        >
          {isGenerating ? 'Generating...' : 'Generate Description'}
        </Button>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
