# 📁 Project Directory Structure

```
WarisanKarsa/
│
├── 📄 Configuration Files
│   ├── .env.local.example          # Environment variables template
│   ├── .gitignore                  # Git ignore rules
│   ├── jest.config.js              # Jest testing configuration
│   ├── jest.setup.js               # Jest setup file
│   ├── next.config.js              # Next.js configuration
│   ├── package.json                # Dependencies and scripts
│   ├── playwright.config.ts        # E2E testing configuration
│   ├── postcss.config.js           # PostCSS configuration
│   ├── tailwind.config.ts          # Tailwind CSS configuration
│   ├── tsconfig.json               # TypeScript configuration
│   └── vercel.json                 # Vercel deployment configuration
│
├── 📚 Documentation
│   ├── CLAUDE.md                   # Full architecture documentation
│   ├── IMPLEMENTATION_SUMMARY.md   # What was implemented
│   ├── QUICKSTART.md               # Quick start guide
│   ├── README.md                   # Main project documentation
│   └── ROADMAP.md                  # Development roadmap
│
├── 📱 app/                         # Next.js App Router
│   ├── api/                        # Serverless API Routes
│   │   ├── ai/                     # AI Endpoints
│   │   │   ├── analyze-image/
│   │   │   │   └── route.ts        # Image analysis API
│   │   │   ├── generate-description/
│   │   │   │   └── route.ts        # Description generator API
│   │   │   └── marketing-suggestions/
│   │   │       └── route.ts        # Marketing AI API
│   │   │
│   │   ├── products/               # Product Endpoints
│   │   │   ├── [id]/
│   │   │   │   └── route.ts        # Product detail/update/delete
│   │   │   └── route.ts            # Product list/create
│   │   │
│   │   └── whatsapp/               # WhatsApp Endpoints
│   │       └── webhook/
│   │           └── route.ts        # WhatsApp webhook handler
│   │
│   ├── globals.css                 # Global styles
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Homepage
│
├── 🎨 components/                  # React Components
│   ├── products/                   # Product Components
│   │   ├── AIDescriptionGenerator.tsx  # AI description UI
│   │   └── ProductCard.tsx         # Product display card
│   │
│   └── ui/                         # Base UI Components
│       ├── Button.tsx              # Button component
│       ├── Card.tsx                # Card components
│       └── Input.tsx               # Input component
│
├── 📚 lib/                         # Core Libraries
│   ├── ai/                         # AI & LangChain
│   │   ├── chains/                 # LangChain Chains
│   │   │   ├── description-chain.ts    # Description generator
│   │   │   ├── image-analysis-chain.ts # Image analyzer
│   │   │   └── marketing-chain.ts      # Marketing suggestions
│   │   │
│   │   ├── prompts/                # AI Prompt Templates
│   │   │   ├── description-prompts.ts  # Description prompts
│   │   │   ├── image-prompts.ts        # Image analysis prompts
│   │   │   └── marketing-prompts.ts    # Marketing prompts
│   │   │
│   │   ├── langchain-config.ts     # LangChain setup
│   │   └── langgraph-workflow.ts   # LangGraph state machine
│   │
│   ├── supabase/                   # Supabase Integration
│   │   ├── auth-policies.sql       # Row Level Security policies
│   │   ├── auth.ts                 # Auth utilities
│   │   ├── client.ts               # Browser client
│   │   ├── schema.sql              # Database schema
│   │   ├── server.ts               # Server client
│   │   ├── storage-policies.sql    # Storage bucket policies
│   │   └── storage.ts              # Storage utilities
│   │
│   ├── utils/                      # Utility Functions
│   │   ├── cn.ts                   # Class name utility
│   │   ├── error-handling.ts       # Error handling system
│   │   ├── formatting.ts           # Data formatting
│   │   ├── image-processing.ts     # Image utilities
│   │   └── validation.ts           # Input validation
│   │
│   └── whatsapp/                   # WhatsApp Bot
│       ├── commands/               # Bot Commands
│       │   ├── help-commands.ts    # Help menu
│       │   ├── order-commands.ts   # Order commands
│       │   └── product-commands.ts # Product commands
│       │
│       ├── client.ts               # WhatsApp API client
│       ├── notifications.ts        # Push notifications
│       └── webhook-handler.ts      # Webhook processor
│
├── 🔤 types/                       # TypeScript Types
│   ├── ai.ts                       # AI types
│   ├── database.ts                 # Supabase types
│   ├── orders.ts                   # Order types
│   ├── products.ts                 # Product types
│   └── whatsapp.ts                 # WhatsApp types
│
└── 🧪 __tests__/                   # Test Files (To be created)
    ├── api/                        # API tests
    ├── components/                 # Component tests
    ├── ai/                         # AI chain tests
    └── e2e/                        # E2E tests
```

## 📊 File Count by Category

| Category | Files | Purpose |
|----------|-------|---------|
| **Configuration** | 11 | Project setup and configuration |
| **Documentation** | 5 | Guides and documentation |
| **API Routes** | 6 | Serverless API endpoints |
| **Components** | 5 | React UI components |
| **AI/LangChain** | 8 | AI integration and workflows |
| **Supabase** | 7 | Database and backend |
| **WhatsApp** | 5 | WhatsApp bot system |
| **Utilities** | 5 | Helper functions |
| **Types** | 5 | TypeScript definitions |
| **App Pages** | 3 | Next.js pages |

**Total Files Created: 60+**

## 🎯 Key Directory Purposes

### `/app` - Next.js App Router
- Server-rendered pages
- API routes (serverless functions)
- Layouts and styling

### `/components` - React Components
- Reusable UI components
- Product-specific components
- Fully typed with TypeScript

### `/lib` - Core Business Logic
- **ai/**: LangChain, Gemini, AI workflows
- **supabase/**: Database, auth, storage
- **whatsapp/**: Bot commands and handlers
- **utils/**: Shared utilities

### `/types` - Type Definitions
- Database types from Supabase
- API request/response types
- Domain model types

## 🔧 Configuration Files Overview

| File | Purpose | Technology |
|------|---------|-----------|
| `next.config.js` | Next.js configuration | Next.js 14 |
| `tsconfig.json` | TypeScript compiler options | TypeScript |
| `tailwind.config.ts` | UI theme and utilities | Tailwind CSS |
| `jest.config.js` | Unit test configuration | Jest |
| `playwright.config.ts` | E2E test configuration | Playwright |
| `vercel.json` | Deployment configuration | Vercel |
| `.env.local.example` | Environment variables template | Environment |

## 📦 Key Dependencies

### Frontend
- **next** (14.2.0) - React framework
- **react** (18.3.0) - UI library
- **tailwindcss** (3.4.1) - CSS framework

### Backend
- **@supabase/supabase-js** (2.39.0) - Database & auth
- **@supabase/ssr** (0.1.0) - Server-side rendering

### AI
- **@langchain/core** (0.1.52) - LangChain core
- **@langchain/google-genai** (0.0.13) - Gemini integration
- **@langchain/langgraph** (0.0.19) - State machines

### Utilities
- **zod** (3.22.4) - Schema validation
- **date-fns** (3.3.1) - Date utilities
- **sharp** (0.33.2) - Image processing

### Testing
- **jest** (29.7.0) - Unit testing
- **@playwright/test** (1.41.0) - E2E testing
- **@testing-library/react** (14.1.2) - Component testing

## 🚀 Build Output (after npm run build)

```
WarisanKarsa/
├── .next/                 # Next.js build output
├── node_modules/          # Dependencies
├── public/                # Static assets
└── dist/                  # Production build (if applicable)
```

## 📝 Environment Files

```
.env.local              # Local development (git ignored)
.env.local.example      # Template (committed to git)
.env.production         # Production (Vercel)
```

## 🔐 Protected Files (in .gitignore)

- `.env.local` - Secrets and API keys
- `node_modules/` - Dependencies
- `.next/` - Build output
- `coverage/` - Test coverage
- `playwright-report/` - Test reports

---

**Note**: This structure follows Next.js 14 App Router conventions and implements a clean, scalable architecture suitable for production deployment.
