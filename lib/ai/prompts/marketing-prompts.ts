export const MARKETING_SUGGESTIONS_PROMPT = `
As a marketing consultant for cultural products, provide strategic recommendations.

Product Details:
- Name: {productName}
- Description: {description}
- Category: {category}
- Image Analysis: {imageAnalysis}

Provide comprehensive marketing suggestions in JSON format:
{
  "target_audience": ["audience segment 1", "audience segment 2"],
  "pricing_strategy": "detailed pricing recommendation",
  "promotion_ideas": ["idea 1", "idea 2", "idea 3"],
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "social_media_tips": ["tip 1", "tip 2", "tip 3"],
  "unique_selling_points": ["usp 1", "usp 2", "usp 3"]
}
`

export const SEO_KEYWORDS_PROMPT = `
Generate SEO keywords for this cultural product:

Product: {productName}
Category: {category}
Description: {description}

Provide 10-15 relevant keywords in JSON format:
{
  "primary_keywords": ["keyword1", "keyword2"],
  "secondary_keywords": ["keyword3", "keyword4"],
  "long_tail_keywords": ["specific phrase 1", "specific phrase 2"]
}
`
