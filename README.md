"# 🌟 Warisan Karsa - Cultural Marketplace

A full-stack cultural marketplace platform built with Next.js 14, Supabase, LangChain, and AI-powered features.

## 🎯 Features

- **AI-Powered Product Descriptions**: Generate culturally-aware product descriptions using Google Gemini
- **Image Quality Analysis**: AI-driven image evaluation for product photos
- **Marketing Suggestions**: Automated marketing recommendations using LangChain
- **WhatsApp Bot Integration**: Manage products and orders via WhatsApp
- **Real-time Notifications**: Instant updates for orders and messages via Supabase Realtime
- **Seller Dashboard**: Complete product and order management system
- **Secure Authentication**: Supabase Auth with Row Level Security

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase (PostgreSQL + Auth + Storage + Realtime)
- **AI**: LangChain + LangGraph + Google Gemini API
- **Messaging**: WhatsApp Business API
- **Deployment**: Vercel Edge Network

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm 9+
- Supabase account and project
- Google Gemini API key
- WhatsApp Business API credentials (optional)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WarisanKarsa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.local.example` to `.env.local` and fill in your credentials:
   ```bash
   cp .env.local.example .env.local
   ```

   Required environment variables:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Google Gemini AI
   GEMINI_API_KEY=your_gemini_api_key

   # WhatsApp Business API (optional)
   WHATSAPP_API_TOKEN=your_whatsapp_token
   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
   WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_webhook_verify_token

   # Application
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Supabase database**

   Run the SQL scripts in your Supabase SQL Editor:
   ```bash
   # 1. Database schema
   lib/supabase/schema.sql

   # 2. Row Level Security policies
   lib/supabase/auth-policies.sql

   # 3. Storage policies
   lib/supabase/storage-policies.sql
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗂️ Project Structure

```
WarisanKarsa/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (Serverless Functions)
│   │   ├── products/      # Product CRUD
│   │   ├── ai/           # AI endpoints
│   │   └── whatsapp/     # WhatsApp webhook
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/            # React Components
│   ├── ui/               # Base UI components
│   └── products/         # Product-specific components
├── lib/                  # Core Libraries
│   ├── supabase/        # Supabase configuration
│   ├── ai/              # LangChain & AI
│   ├── whatsapp/        # WhatsApp bot
│   └── utils/           # Utility functions
├── types/               # TypeScript types
└── public/             # Static assets
```

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Configure WhatsApp Webhook** (optional)
   - Set webhook URL to: `https://your-domain.vercel.app/api/whatsapp/webhook`
   - Use the `WHATSAPP_WEBHOOK_VERIFY_TOKEN` from your `.env.local`

## 📝 API Documentation

### Products API

- `GET /api/products` - List all products with filters
- `POST /api/products` - Create new product
- `GET /api/products/[id]` - Get product by ID
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### AI API

- `POST /api/ai/generate-description` - Generate AI product description
- `POST /api/ai/analyze-image` - Analyze product image quality
- `POST /api/ai/marketing-suggestions` - Get marketing recommendations

### WhatsApp API

- `POST /api/whatsapp/webhook` - WhatsApp webhook handler
- `GET /api/whatsapp/webhook` - Webhook verification

## 🤖 AI Features

### Description Generator
Generates culturally-aware product descriptions in Indonesian or English using Google Gemini.

```typescript
const description = await generateDescription({
  productName: 'Batik Tulis',
  category: 'Batik',
  culturalOrigin: 'Indonesia',
  language: 'id'
})
```

### Image Analysis
Analyzes product images for quality, authenticity, and marketability.

```typescript
const analysis = await analyzeProductImage(imageUrl)
// Returns: quality_score, presentation_score, authenticity_score, etc.
```

### Marketing Suggestions
Provides targeted marketing recommendations using AI.

```typescript
const suggestions = await generateMarketingSuggestions({
  productName,
  description,
  category
})
```

## 📱 WhatsApp Bot Commands

- `/produk list` - List your products
- `/produk detail [id]` - View product details
- `/order list` - List your orders
- `/order detail [id]` - View order details
- `/help` - Show help menu

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

## 🔐 Security

- Row Level Security (RLS) enabled on all Supabase tables
- Authentication required for sensitive operations
- Environment variables for API keys
- CORS configured for API routes

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📞 Support

For support, email support@warisankarsa.com or join our community Discord.

---

Built with ❤️ for cultural preservation and artisan empowerment." 
