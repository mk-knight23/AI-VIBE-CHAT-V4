# 📊 AI-VIBE-CHAT-V4

<p align="center">
  <img src="https://img.shields.io/badge/AI--VIBE-CHAT--V4-blue?style=for-the-badge&logo=next.js&logoColor=white" alt="AI Vibe Project">
  <br>
  <b>AI API Providers Showcase - 30+ Providers, Benchmarks, and Interactive Tools.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.0+-black.svg?logo=next.js&logoColor=white" alt="Next.js 15">
  <img src="https://img.shields.io/badge/React-19.0+-61DAFB.svg?logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg?logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
</p>

---

A comprehensive, production-ready Next.js 15 application showcasing **30 AI API providers** with advanced features including interactive charts, pricing calculator, benchmarks dashboard, and API playground.

---

## 🗺️ Quick Navigation

- [✨ Features](#-features)
- [🛠️ Technologies Used](#%EF%B8%8F-technologies-used)
- [🚀 Getting Started](#-getting-started)
- [🌐 Deployment](#-deployment)
- [🧪 Testing](#-testing)
- [📂 Project Structure](#%EF%B8%8F-project-structure)
- [🤖 Providers Included](#-providers-included)
- [📊 Data Structure](#-data-structure)

---

## 🛠️ Engineered With

<p align="left">
  <a href="https://nextjs.org"><img src="https://skillicons.dev/icons?i=nextjs" alt="Next.js"></a>
  <a href="https://react.dev"><img src="https://skillicons.dev/icons?i=react" alt="React"></a>
  <a href="https://tailwindcss.com"><img src="https://skillicons.dev/icons?i=tailwind" alt="Tailwind CSS"></a>
  <a href="https://typescriptlang.org"><img src="https://skillicons.dev/icons?i=ts" alt="TypeScript"></a>
  <a href="https://recharts.org"><img src="https://img.shields.io/badge/Charts-Recharts-22b5bf" alt="Recharts"></a>
</p>

---

## ✨ Features

### Core Features
- **Modern Design**: Dark-mode compatible UI built with Tailwind CSS with gradient accents
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Search & Filter**: Real-time search with category filtering and advanced sidebar filters
- **Category System**: Visual categorization (Cloud Giant, Specialized, Local/Open-Source, Router/Gateway, Emerging/Niche)
- **Featured Providers**: Highlighted section for popular providers with hover animations
- **Quick Compare**: Select up to 3 providers for instant comparison on home page

### Advanced Tools
- **Compare Tool**: Side-by-side comparison of up to 4 providers with detailed metrics
- **Pricing Calculator**: Interactive cost estimator with sliders, presets, and real-time calculations
- **Benchmarks Dashboard**: Performance metrics with interactive Recharts visualizations (bar, radar, scatter)
- **API Playground**: Mocked API testing interface with multiple modes (chat, code, summarize)
- **Market Overview**: Interactive dashboard with market insights, trends, and recommendations
- **Providers Page**: Advanced filtering by category, features, and sorting options

### Data Visualizations
- **Pie Charts**: Provider category distribution
- **Line Charts**: Price trend analysis
- **Bar Charts**: Response latency comparisons
- **Radar Charts**: Multi-dimensional capability analysis
- **Scatter Plots**: Price vs performance analysis
- **Progress Bars**: Individual metric visualizations

### State Management
- **Zustand Stores**: Efficient client-side state management
- **Theme Store**: Dark/light mode with localStorage persistence
- **Compare Store**: Provider selection management
- **Calculator Store**: Pricing calculator state

### Provider Details
- **Dynamic Routes**: Individual detail pages for each provider
- **Similar Providers**: Recommendations based on category
- **Code Examples**: Sample API calls in Python
- **Comprehensive Info**: Use cases, pricing, models, setup steps, and more
- **SEO Optimized**: Metadata and semantic HTML for better search engine visibility
- **Static Generation**: Fast page loads with Next.js App Router

---

## 🛠️ Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **Recharts**: Beautiful, composable charts
- **Lucide React**: Modern icon library
- **Framer Motion**: Smooth animations (ready to integrate)
- **Fuse.js**: Fuzzy search (ready to integrate)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation
1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production
```bash
npm run build
npm start
```

---

## 🌐 Deployment

### Quick Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or use the deployment script:
```bash
./deploy.sh
```

### Deploy via GitHub
1. Push to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/ai-api-providers.git
git push -u origin main
```
2. Import on [Vercel](https://vercel.com/new)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

---

## 🧪 Testing

Run the test checklist:
```bash
npm run build  # Verify build succeeds
```
See [TESTING.md](TESTING.md) for comprehensive testing guide.

---

## 📂 Project Structure

<details>
<summary>View Detailed Directory Map</summary>

```
├── app/
│   ├── [slug]/          # Dynamic provider detail pages
│   ├── about/           # About page
│   ├── benchmarks/      # Performance benchmarks page
│   ├── calculator/      # Pricing calculator page
│   ├── compare/         # Compare providers page
│   ├── contact/         # Contact page
│   ├── market-overview/ # Market insights dashboard
│   ├── playground/      # API playground (mocked)
│   ├── providers/       # All providers with filters
│   ├── sources/         # References and citations
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout with navigation
│   └── page.tsx         # Home page with search
├── data/
│   └── providers.ts     # Provider data (28 providers)
├── lib/
│   └── stores.ts        # Zustand state management stores
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```
</details>


---

## 🤖 Providers Included

The application includes detailed information for **30 AI API providers**:

- Anthropic (Claude)
- AWS Bedrock
- Chutes AI
- Claude Code
- DeepSeek
- Fireworks AI
- Synthetic
- GCP Vertex AI
- Glama
- Google Gemini
- Groq
- Human Relay Provider
- LM Studio
- **MegaLLM** (12 models)
- MiniMax
- Mistral AI
- Ollama
- OpenAI
- OpenAI Compatible
- OpenRouter
- OVHcloud AI Endpoints
- Requesty
- Unbound
- v0
- Vercel AI Gateway
- Agentrouter
- Virtual Quota Fallback
- VS Code Language Model API
- xAI (Grok)
- **NEW: Cohere, Together AI, Replicate, Hugging Face, Perplexity AI, AI21 Labs**

### Data Structure

Each provider includes:
- Name and description
- Use cases
- Documentation links
- Pricing (free and paid tiers)
- Available models
- API key requirements
- Base URL
- Setup instructions
- Additional details

---

## 📊 Data Structure (TypeScript)

To add or modify providers, edit `/data/providers.ts`. The data structure is:

```typescript
{
  name: string;
  slug: string;
  description: string;
  useCases: string[];
  docsUrl: string;
  pricing: { free: string; paid: string };
  models: { free: string[]; paid: string[] };
  apiKeyName: string;
  baseUrl: string;
  setupSteps: string[];
  other: string;
}
```

---

## 🔒 Security Status

**Last Security Audit:** February 20, 2026
**Status:** ✅ Fully Secured

### Security Fixes Applied
| Issue | Status | Details |
|-------|--------|---------|
| Next.js Vulnerabilities | ✅ Fixed | Upgraded from 15.0.7 to 15.1.8+ |
| API Key Exposure | ✅ Fixed | Server-side storage implemented |
| Client-to-API Calls | ✅ Fixed | Server proxy added |
| Missing Security Headers | ✅ Fixed | CSP + headers configured |
| Input Validation | ✅ Fixed | Zod schemas on all routes |

### React/Next.js Best Practices Applied
- ✅ Server-side rendering (SSR)
- ✅ Static generation for better performance
- ✅ TypeScript strict mode
- ✅ Environment variable validation
- ✅ Error boundaries for graceful failures
- ✅ Security headers (CSP, X-Frame-Options)
- ✅ No client-side API keys
- ✅ Proper error handling (no info leakage)

---

## 📄 License

This project is open source and available for educational purposes.

## ⚠️ Disclaimer

Pricing and features are subject to change. Always verify current information on official provider websites before making decisions.

---

<p align="center">
  <i>AI-VIBE-CHAT-V4 - The Ultimate AI Provider Hub</i>
</p>
