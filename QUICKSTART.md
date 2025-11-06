# 🚀 Quick Start Guide - Warisan Karsa

## Prerequisites Checklist
- [ ] Node.js 18+ installed
- [ ] npm 9+ installed
- [ ] Git installed
- [ ] Supabase account created
- [ ] Google AI Studio account (for Gemini API key)

## 5-Minute Setup

### Step 1: Install Dependencies (2 minutes)
```bash
npm install
```

### Step 2: Environment Setup (1 minute)
```bash
# Copy environment template
cp .env.local.example .env.local
```

Edit `.env.local` and add:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
GEMINI_API_KEY=your_gemini_key
```

### Step 3: Database Setup (1 minute)

1. Go to your Supabase project dashboard
2. Open SQL Editor
3. Run these scripts in order:
   - `lib/supabase/schema.sql`
   - `lib/supabase/auth-policies.sql`
   - `lib/supabase/storage-policies.sql`

### Step 4: Run Development Server (1 minute)
```bash
npm run dev
```

Open http://localhost:3000 🎉

---

## Getting API Keys

### Supabase Keys
1. Go to https://supabase.com
2. Create new project
3. Settings → API → Copy keys

### Gemini API Key
1. Go to https://ai.google.dev
2. Get API key
3. Copy key

### WhatsApp (Optional)
1. Go to https://developers.facebook.com
2. Create WhatsApp Business App
3. Get access token

---

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm test            # Run unit tests
npm run test:e2e    # Run E2E tests

# Code Quality
npm run lint        # Run ESLint
npm run type-check  # TypeScript check
```

---

## Project Structure Overview

```
WarisanKarsa/
├── app/
│   ├── api/              # API endpoints
│   └── page.tsx          # Homepage
├── components/
│   ├── ui/               # UI components
│   └── products/         # Product components
├── lib/
│   ├── ai/               # AI/LangChain
│   ├── supabase/         # Database
│   └── whatsapp/         # WhatsApp bot
└── types/                # TypeScript types
```

---

## Testing the Features

### 1. Test Homepage
- Open http://localhost:3000
- Should see hero section and featured products

### 2. Test AI Description Generator (after auth)
```bash
POST http://localhost:3000/api/ai/generate-description
Content-Type: application/json

{
  "productName": "Batik Tulis",
  "category": "Batik",
  "language": "id"
}
```

### 3. Test Products API
```bash
GET http://localhost:3000/api/products
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Supabase Connection Error
- Check if Supabase URL and keys are correct
- Verify project is not paused in Supabase dashboard

### Gemini API Error
- Verify API key is valid
- Check if you have quota remaining
- Try regenerating the key

---

## Next Steps

1. ✅ **Add Authentication UI** - Create login/register pages
2. ✅ **Build Dashboard** - Seller product management interface
3. ✅ **Add Product Forms** - Create/edit product forms
4. ✅ **Implement Orders** - Order management system
5. ✅ **Test AI Features** - Try all AI endpoints
6. ✅ **Deploy to Vercel** - Push to production

---

## Getting Help

- 📖 Read `README.md` for detailed documentation
- 🏗️ Check `CLAUDE.md` for architecture details
- 📝 See `IMPLEMENTATION_SUMMARY.md` for what's implemented
- 🐛 Check GitHub Issues for known problems

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [LangChain TypeScript Docs](https://js.langchain.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Google Gemini API](https://ai.google.dev/docs)

---

**Happy Coding! 🎉**
