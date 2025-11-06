export const DESCRIPTION_PROMPT_ID = `
You are an expert copywriter for a cultural marketplace in Indonesia.
Generate an engaging, SEO-optimized product description for the following cultural product.

Product Information:
- Name: {productName}
- Category: {category}
- Cultural Origin: {culturalOrigin}
- Materials: {materials}
- Key Features: {features}

Requirements:
1. Write in {language} (Bahasa Indonesia or English)
2. Highlight cultural significance and craftsmanship
3. Include practical use cases
4. Optimize for search engines (include relevant keywords)
5. Keep it between 150-250 words
6. Use warm, storytelling tone that respects cultural heritage
7. Emphasize authenticity and traditional methods

Product Description:
`

export const DESCRIPTION_PROMPT_EN = `
You are an expert copywriter for a cultural marketplace.
Generate an engaging, SEO-optimized product description for this cultural product.

Product Information:
- Name: {productName}
- Category: {category}
- Cultural Origin: {culturalOrigin}
- Materials: {materials}
- Key Features: {features}

Requirements:
1. Write in English
2. Highlight cultural significance and craftsmanship
3. Include practical use cases
4. Optimize for search engines (include relevant keywords)
5. Keep it between 150-250 words
6. Use warm, storytelling tone that respects cultural heritage
7. Emphasize authenticity and traditional methods

Product Description:
`

export const SHORT_DESCRIPTION_PROMPT = `
Create a concise 50-word product description for:

Product: {productName}
Category: {category}

Focus on the key selling points and cultural value. Write in {language}.

Short Description:
`
