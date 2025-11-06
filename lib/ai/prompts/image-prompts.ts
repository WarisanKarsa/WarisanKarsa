export const IMAGE_ANALYSIS_PROMPT = `
Analyze this product image for an e-commerce marketplace.

Evaluate:
1. Image Quality (1-10): Lighting, focus, clarity
2. Product Presentation: Background, framing, angle
3. Cultural Authenticity: Does it showcase traditional craftsmanship?
4. Marketability: Visual appeal for online buyers
5. Suggested Improvements: Specific recommendations

Provide detailed analysis in JSON format:
{
  "quality_score": 0-10,
  "presentation_score": 0-10,
  "authenticity_score": 0-10,
  "marketability_score": 0-10,
  "overall_score": 0-10,
  "strengths": ["..."],
  "improvements": ["..."],
  "detected_objects": ["..."],
  "cultural_elements": ["..."]
}
`

export const IMAGE_QUALITY_CHECK_PROMPT = `
Quick quality check for this product image:

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
}
`
