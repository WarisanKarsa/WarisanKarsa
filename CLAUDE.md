# 🌐 CLAUDE.md - Cultural Marketplace Technology Stack

## 🚨 CRITICAL: FULL-STACK PARALLEL EXECUTION

**MANDATORY RULE**: For this cultural marketplace project, ALL operations MUST be concurrent/parallel:

### 🔴 PROJECT-SPECIFIC CONCURRENT PATTERNS:

- **Frontend/Backend Parallel**: Develop Next.js components and Vercel Functions simultaneously
- **AI Integration**: Build LangChain workflows while implementing API endpoints
- **Database Operations**: Create Supabase schemas, auth policies, and storage buckets in parallel
- **WhatsApp Bot**: Develop webhook handlers, message processors, and AI responders concurrently
- **Testing Suites**: Generate frontend, backend, and AI integration tests in parallel

### ⚡ GOLDEN RULE: "AI-POWERED FULL-STACK PARALLEL DEVELOPMENT"

```typescript
// ✅ CORRECT Pattern - Single Message Full-Stack Development
[BatchTool]:
  // Frontend Components (Parallel)
  - Write("app/products/page.tsx", productListingPage)
  - Write("app/dashboard/page.tsx", sellerDashboard)
  - Write("components/ProductCard.tsx", productCardComponent)
  - Write("components/AIDescriptionGenerator.tsx", aiGeneratorComponent)
  
  // Backend API Routes (Parallel)
  - Write("app/api/products/route.ts", productAPIHandler)
  - Write("app/api/ai/generate-description/route.ts", aiDescriptionAPI)
  - Write("app/api/whatsapp/webhook/route.ts", whatsappWebhook)
  - Write("app/api/images/analyze/route.ts", imageAnalysisAPI)
  
  // AI Services (Parallel)
  - Write("lib/ai/langchain-config.ts", langchainSetup)
  - Write("lib/ai/description-generator.ts", descriptionGenerator)
  - Write("lib/ai/image-analyzer.ts", geminiVisionIntegration)
  - Write("lib/ai/marketing-advisor.ts", marketingAIAgent)
  
  // Database Setup (Parallel)
  - Write("lib/supabase/schema.sql", databaseSchema)
  - Write("lib/supabase/auth-policies.sql", rowLevelSecurity)
  - Write("lib/supabase/storage-policies.sql", storagePolicies)
  - Write("lib/supabase/realtime-config.ts", realtimeSetup)
  
  // WhatsApp Bot (Parallel)
  - Write("lib/whatsapp/bot-handler.ts", messageHandler)
  - Write("lib/whatsapp/commands.ts", botCommands)
  - Write("lib/whatsapp/notifications.ts", notificationService)
  
  // Tests (Parallel)
  - Write("__tests__/api/products.test.ts", productAPITests)
  - Write("__tests__/ai/description-generator.test.ts", aiTests)
  - Write("__tests__/whatsapp/bot.test.ts", whatsappBotTests)
```

---

## 🎯 PROJECT CONTEXT

### Project Type
**Cultural Product Marketplace with AI-Powered Features**

- **Purpose**: Enable cultural artisans to sell traditional products online with AI assistance
- **Target Users**: Cultural product sellers, buyers, marketplace administrators
- **Key Features**: AI product descriptions, image quality analysis, WhatsApp integration, real-time notifications

### Tech Stack Overview

```typescript
Tech_Stack = {
  frontend: "Next.js 14+ (React, TypeScript, App Router)",
  backend: "Vercel Serverless Functions (TypeScript)",
  database: "Supabase (PostgreSQL + Auth + Storage + Realtime)",
  ai_framework: "LangChain + LangGraph (TypeScript)",
  ai_model: "Google Gemini API (text + vision)",
  messaging: "WhatsApp Business API",
  deployment: "Vercel Edge Network",
  styling: "Tailwind CSS",
  testing: "Jest + React Testing Library + Playwright"
}
```

---

## 🏗️ ARCHITECTURE PATTERN

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐     ┌──────────────┐     ┌─────────────┐ │
│  │   Next.js    │────▶│   Serverless │────▶│  Supabase   │ │
│  │   Frontend   │     │   Functions  │     │  (Backend)  │ │
│  └──────────────┘     └──────────────┘     └─────────────┘ │
│         │                     │                     │        │
│         │                     ▼                     │        │
│         │              ┌─────────────┐              │        │
│         │              │  LangChain  │              │        │
│         │              │  + Gemini   │              │        │
│         │              └─────────────┘              │        │
│         │                                           │        │
│         └───────────────────┬───────────────────────┘        │
│                             │                                │
└─────────────────────────────┼────────────────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │  WhatsApp Bot API  │
                    │  (Webhook Handler) │
                    └───────────────────┘
```

---

## 📁 PROJECT STRUCTURE (CREATE IN PARALLEL)

```typescript
cultural-marketplace/
├── app/                                    // Next.js App Router
│   ├── (auth)/                            // Auth routes
│   │   ├── login/page.tsx                 // Login page
│   │   └── register/page.tsx              // Register page
│   ├── (marketplace)/                     // Public marketplace
│   │   ├── page.tsx                       // Homepage
│   │   ├── products/                      
│   │   │   ├── page.tsx                   // Product listing
│   │   │   └── [id]/page.tsx              // Product detail
│   │   └── categories/
│   │       └── [slug]/page.tsx            // Category pages
│   ├── (dashboard)/                       // Seller dashboard
│   │   ├── dashboard/
│   │   │   ├── page.tsx                   // Dashboard home
│   │   │   ├── products/                  
│   │   │   │   ├── page.tsx               // Product management
│   │   │   │   ├── new/page.tsx           // Add product
│   │   │   │   └── [id]/edit/page.tsx     // Edit product
│   │   │   ├── orders/page.tsx            // Order management
│   │   │   ├── analytics/page.tsx         // Sales analytics
│   │   │   └── settings/page.tsx          // Seller settings
│   └── api/                               // API Routes (Serverless)
│       ├── products/
│       │   ├── route.ts                   // GET/POST products
│       │   └── [id]/route.ts              // GET/PUT/DELETE product
│       ├── orders/
│       │   ├── route.ts                   // Order management
│       │   └── [id]/route.ts              // Order details
│       ├── ai/
│       │   ├── generate-description/
│       │   │   └── route.ts               // AI description generator
│       │   ├── analyze-image/
│       │   │   └── route.ts               // Image quality analysis
│       │   └── marketing-suggestions/
│       │       └── route.ts               // Marketing recommendations
│       ├── whatsapp/
│       │   ├── webhook/route.ts           // WhatsApp webhook handler
│       │   ├── send-message/route.ts      // Send WhatsApp message
│       │   └── notifications/route.ts     // Notification service
│       └── supabase/
│           ├── auth/route.ts              // Auth handlers
│           └── storage/route.ts           // Storage handlers
│
├── components/                            // React Components
│   ├── ui/                                // Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── products/
│   │   ├── ProductCard.tsx                // Product display card
│   │   ├── ProductForm.tsx                // Product creation form
│   │   ├── ProductGallery.tsx             // Image gallery
│   │   └── AIDescriptionGenerator.tsx     // AI-powered description
│   ├── dashboard/
│   │   ├── AnalyticsChart.tsx             // Sales charts
│   │   ├── OrderList.tsx                  // Order listing
│   │   └── QuickStats.tsx                 // Dashboard stats
│   └── whatsapp/
│       ├── ChatInterface.tsx              // WhatsApp chat UI
│       └── NotificationBadge.tsx          // Notification indicator
│
├── lib/                                   // Core Libraries
│   ├── supabase/
│   │   ├── client.ts                      // Supabase client setup
│   │   ├── server.ts                      // Server-side client
│   │   ├── auth.ts                        // Auth utilities
│   │   ├── storage.ts                     // Storage utilities
│   │   ├── schema.sql                     // Database schema
│   │   ├── migrations/                    // Database migrations
│   │   └── seed.sql                       // Seed data
│   ├── ai/
│   │   ├── langchain-config.ts            // LangChain setup
│   │   ├── langgraph-workflow.ts          // LangGraph state machine
│   │   ├── gemini-client.ts               // Gemini API client
│   │   ├── chains/
│   │   │   ├── description-chain.ts       // Description generator
│   │   │   ├── image-analysis-chain.ts    // Image analyzer
│   │   │   └── marketing-chain.ts         // Marketing advisor
│   │   ├── agents/
│   │   │   ├── product-agent.ts           // Product management agent
│   │   │   └── seller-assistant-agent.ts  // Seller helper agent
│   │   └── prompts/
│   │       ├── description-prompts.ts     // Prompt templates
│   │       ├── image-prompts.ts
│   │       └── marketing-prompts.ts
│   ├── whatsapp/
│   │   ├── client.ts                      // WhatsApp API client
│   │   ├── webhook-handler.ts             // Webhook processor
│   │   ├── message-parser.ts              // Parse incoming messages
│   │   ├── commands/
│   │   │   ├── product-commands.ts        // Product-related commands
│   │   │   ├── order-commands.ts          // Order commands
│   │   │   └── help-commands.ts           // Help menu
│   │   └── notifications/
│   │       ├── order-notifications.ts     // Order alerts
│   │       └── buyer-messages.ts          // Buyer communications
│   └── utils/
│       ├── image-processing.ts            // Image utilities
│       ├── validation.ts                  // Input validation
│       ├── formatting.ts                  // Data formatting
│       └── error-handling.ts              // Error utilities
│
├── types/                                 // TypeScript Types
│   ├── database.ts                        // Supabase types
│   ├── products.ts                        // Product types
│   ├── orders.ts                          // Order types
│   ├── ai.ts                              // AI types
│   └── whatsapp.ts                        // WhatsApp types
│
├── __tests__/                             // Test Suites
│   ├── api/
│   │   ├── products.test.ts               // Product API tests
│   │   ├── orders.test.ts                 // Order API tests
│   │   └── ai.test.ts                     // AI API tests
│   ├── components/
│   │   ├── ProductCard.test.tsx           // Component tests
│   │   └── AIDescriptionGenerator.test.tsx
│   ├── ai/
│   │   ├── description-chain.test.ts      // AI chain tests
│   │   └── image-analysis.test.ts
│   ├── whatsapp/
│   │   ├── webhook.test.ts                // Webhook tests
│   │   └── commands.test.ts               // Command tests
│   └── e2e/
│       ├── product-creation.spec.ts       // E2E tests
│       └── order-flow.spec.ts
│
├── public/                                // Static Assets
│   ├── images/
│   ├── icons/
│   └── locales/                           // i18n translations
│
├── supabase/                              // Supabase Configuration
│   ├── config.toml                        // Supabase config
│   ├── migrations/                        // SQL migrations
│   └── seed.sql                           // Seed data
│
└── Configuration Files
    ├── next.config.js                     // Next.js config
    ├── tailwind.config.ts                 // Tailwind config
    ├── tsconfig.json                      // TypeScript config
    ├── jest.config.js                     // Jest config
    ├── playwright.config.ts               // Playwright config
    ├── .env.local                         // Environment variables
    └── vercel.json                        // Vercel config
```

---

## 🔧 TECHNOLOGY DEEP DIVE

### 1. 🎨 Frontend: Next.js 14+ (React Framework)

#### **Purpose**: Modern, AI-integrated marketplace interface

#### **Key Features**:
```typescript
// App Router with Server Components
app/
  layout.tsx          // Root layout with providers
  page.tsx            // Server-rendered homepage
  loading.tsx         // Loading UI
  error.tsx           // Error boundary
  
// Server Actions for data mutations
'use server'
export async function createProduct(formData: FormData) {
  const supabase = createServerClient()
  // Direct database mutations from React
}

// Client Components for interactivity
'use client'
export function AIDescriptionGenerator() {
  const [description, setDescription] = useState('')
  // Interactive AI features
}
```

#### **Why Next.js for This Project**:
- **Server Components**: Fetch data directly from Supabase without API routes
- **Server Actions**: Simplify form submissions and mutations
- **Image Optimization**: Perfect for product images with automatic WebP conversion
- **Edge Runtime**: Deploy close to users worldwide (Indonesia focus)
- **Streaming SSR**: Progressive page loading for better UX
- **Built-in SEO**: Metadata API for product discoverability

#### **Use Cases**:
- Product catalog with server-side filtering
- Seller dashboard with real-time updates
- AI-powered product creation wizard
- Multi-step order checkout flow
- Real-time chat interface with buyers

---

### 2. ⚡ Backend: Vercel Serverless Functions

#### **Purpose**: Auto-scaling, cost-efficient API layer

#### **Architecture Pattern**:
```typescript
// app/api/ai/generate-description/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { generateDescription } from '@/lib/ai/chains/description-chain'

export const runtime = 'edge' // Edge runtime for low latency

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    
    // Verify authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    // Parse request
    const { productName, category, images } = await request.json()
    
    // Call AI chain (LangChain)
    const description = await generateDescription({
      productName,
      category,
      images,
      userId: user.id
    })
    
    return NextResponse.json({ description })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

#### **Serverless Benefits for Cultural Marketplace**:
- **Zero Cold Start Cost**: Only pay when sellers/buyers use the platform
- **Auto-scaling**: Handle sudden traffic spikes during cultural events
- **Global Edge Network**: Fast response times for Indonesian users
- **Cost Efficiency**: Perfect for marketplace with variable traffic
- **Zero Maintenance**: No server management or updates needed

#### **API Route Organization**:
```typescript
// Parallel API development pattern
api/
  products/
    route.ts              // List/create products
    [id]/route.ts         // Get/update/delete product
  ai/
    generate-description/ // AI text generation
    analyze-image/        // AI image analysis
    suggest-marketing/    // Marketing recommendations
  whatsapp/
    webhook/              // Receive WhatsApp messages
    send/                 // Send WhatsApp messages
  orders/
    route.ts              // Order management
    [id]/route.ts         // Order details
```

---

### 3. 🗄️ Database: Supabase (Complete Backend Platform)

#### **Purpose**: Real-time database with built-in auth and storage

#### **Core Components**:

**A. PostgreSQL Database**

```sql
-- Create tables in parallel
-- lib/supabase/schema.sql

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  role TEXT CHECK (role IN ('seller', 'buyer', 'admin')),
  full_name TEXT NOT NULL,
  phone TEXT,
  whatsapp_number TEXT,
  address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  ai_generated_description TEXT,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  status TEXT CHECK (status IN ('draft', 'active', 'sold_out', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID REFERENCES profiles(id),
  seller_id UUID REFERENCES profiles(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  shipping_address JSONB,
  whatsapp_thread_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI interactions log
CREATE TABLE ai_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  interaction_type TEXT, -- 'description', 'image_analysis', 'marketing'
  input_data JSONB,
  output_data JSONB,
  model_used TEXT,
  tokens_used INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- WhatsApp messages
CREATE TABLE whatsapp_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  message_type TEXT, -- 'inbound', 'outbound'
  content TEXT,
  media_url TEXT,
  status TEXT,
  whatsapp_message_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_orders_buyer ON orders(buyer_id);
CREATE INDEX idx_orders_seller ON orders(seller_id);
CREATE INDEX idx_orders_status ON orders(status);
```

**B. Row Level Security (RLS)**

```sql
-- lib/supabase/auth-policies.sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all, update own
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Products: Public can read active, sellers manage own
CREATE POLICY "Active products are viewable by everyone"
  ON products FOR SELECT
  USING (status = 'active' OR seller_id = auth.uid());

CREATE POLICY "Sellers can insert own products"
  ON products FOR INSERT
  WITH CHECK (seller_id = auth.uid());

CREATE POLICY "Sellers can update own products"
  ON products FOR UPDATE
  USING (seller_id = auth.uid());

-- Orders: Buyers and sellers can view their orders
CREATE POLICY "Users can view their orders"
  ON orders FOR SELECT
  USING (buyer_id = auth.uid() OR seller_id = auth.uid());

CREATE POLICY "Buyers can create orders"
  ON orders FOR INSERT
  WITH CHECK (buyer_id = auth.uid());

-- AI interactions: Users can view own
CREATE POLICY "Users can view own AI interactions"
  ON ai_interactions FOR SELECT
  USING (user_id = auth.uid());
```

**C. Storage Configuration**

```typescript
// lib/supabase/storage-policies.sql
-- Product images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

-- Storage policies
CREATE POLICY "Public can view product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can update own product images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'product-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

**D. Real-time Subscriptions**

```typescript
// lib/supabase/realtime-config.ts
import { createClient } from '@supabase/supabase-js'

// Subscribe to new orders (for sellers)
export function subscribeToSellerOrders(sellerId: string, callback: Function) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  
  return supabase
    .channel('seller-orders')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'orders',
        filter: `seller_id=eq.${sellerId}`
      },
      (payload) => callback(payload.new)
    )
    .subscribe()
}

// Subscribe to order status changes (for buyers)
export function subscribeToOrderUpdates(orderId: string, callback: Function) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  
  return supabase
    .channel(`order-${orderId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
        filter: `id=eq.${orderId}`
      },
      (payload) => callback(payload.new)
    )
    .subscribe()
}
```

---

### 4. 🤖 AI: LangChain + LangGraph + Gemini

#### **Purpose**: Intelligent automation for cultural product sellers

#### **Architecture**:

**A. LangChain Setup**

```typescript
// lib/ai/langchain-config.ts
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { HumanMessage, SystemMessage } from '@langchain/core/messages'

export const geminiModel = new ChatGoogleGenerativeAI({
  modelName: 'gemini-2.0-flash-exp',
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0.7,
  maxOutputTokens: 2048,
})

export const geminiVisionModel = new ChatGoogleGenerativeAI({
  modelName: 'gemini-2.0-flash-exp',
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0.3,
})
```

**B. Product Description Generator Chain**

```typescript
// lib/ai/chains/description-chain.ts
import { PromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'
import { geminiModel } from '../langchain-config'
import { StringOutputParser } from '@langchain/core/output_parsers'

const descriptionPrompt = PromptTemplate.fromTemplate(`
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

Product Description:
`)

export const descriptionChain = RunnableSequence.from([
  descriptionPrompt,
  geminiModel,
  new StringOutputParser()
])

export async function generateDescription(input: {
  productName: string
  category: string
  culturalOrigin?: string
  materials?: string
  features?: string[]
  language?: 'id' | 'en'
}) {
  return await descriptionChain.invoke({
    ...input,
    language: input.language || 'id',
    culturalOrigin: input.culturalOrigin || 'Indonesia',
    materials: input.materials || 'Traditional materials',
    features: input.features?.join(', ') || 'Handcrafted with care'
  })
}
```

**C. Image Analysis Chain**

```typescript
// lib/ai/chains/image-analysis-chain.ts
import { HumanMessage } from '@langchain/core/messages'
import { geminiVisionModel } from '../langchain-config'

export async function analyzeProductImage(imageUrl: string) {
  const message = new HumanMessage({
    content: [
      {
        type: 'text',
        text: `Analyze this product image for an e-commerce marketplace.
        
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
}`
      },
      {
        type: 'image_url',
        image_url: imageUrl
      }
    ]
  })
  
  const response = await geminiVisionModel.invoke([message])
  
  // Parse JSON from response
  const jsonMatch = response.content.toString().match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Failed to parse image analysis')
  
  return JSON.parse(jsonMatch[0])
}
```

**D. LangGraph Agent Workflow**

```typescript
// lib/ai/langgraph-workflow.ts
import { StateGraph, END } from '@langchain/langgraph'
import { generateDescription } from './chains/description-chain'
import { analyzeProductImage } from './chains/image-analysis-chain'
import { generateMarketingSuggestions } from './chains/marketing-chain'

// Define state interface
interface ProductAssistantState {
  productName: string
  category: string
  images: string[]
  description?: string
  imageAnalysis?: any
  marketingSuggestions?: any
  currentStep: string
}

// Define nodes
async function analyzeImages(state: ProductAssistantState) {
  const analyses = await Promise.all(
    state.images.map(img => analyzeProductImage(img))
  )
  
  return {
    ...state,
    imageAnalysis: analyses,
    currentStep: 'generate_description'
  }
}

async function generateDesc(state: ProductAssistantState) {
  const description = await generateDescription({
    productName: state.productName,
    category: state.category,
    culturalOrigin: 'Indonesia',
    language: 'id'
  })
  
  return {
    ...state,
    description,
    currentStep: 'generate_marketing'
  }
}

async function generateMarketing(state: ProductAssistantState) {
  const suggestions = await generateMarketingSuggestions({
    productName: state.productName,
    description: state.description!,
    imageAnalysis: state.imageAnalysis
  })
  
  return {
    ...state,
    marketingSuggestions: suggestions,
    currentStep: 'complete'
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
    currentStep: null
  }
})

workflow.addNode('analyze_images', analyzeImages)
workflow.addNode('generate_description', generateDesc)
workflow.addNode('generate_marketing', generateMarketing)

workflow.addEdge('analyze_images', 'generate_description')
workflow.addEdge('generate_description', 'generate_marketing')
workflow.addEdge('generate_marketing', END)

workflow.setEntryPoint('analyze_images')

export const productAssistantGraph = workflow.compile()

// Usage
export async function runProductAssistant(input: {
  productName: string
  category: string
  images: string[]
}) {
  const result = await productAssistantGraph.invoke({
    ...input,
    currentStep: 'analyze_images'
  })
  
  return result
}
```

**E. Prompt Templates**

```typescript
// lib/ai/prompts/description-prompts.ts
export const CULTURAL_PRODUCT_PROMPTS