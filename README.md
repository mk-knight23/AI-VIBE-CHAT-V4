# AI API Providers

A comprehensive, production-ready Next.js 15 application showcasing **30 AI API providers** with advanced features including interactive charts, pricing calculator, benchmarks dashboard, and API playground.

## Features

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

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **Recharts**: Beautiful, composable charts
- **Lucide React**: Modern icon library
- **Framer Motion**: Smooth animations (ready to integrate)
- **Fuse.js**: Fuzzy search (ready to integrate)

## Getting Started

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

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── [slug]/          # Dynamic provider detail pages
│   │   └── page.tsx
│   ├── about/           # About page
│   │   └── page.tsx
│   ├── benchmarks/      # Performance benchmarks page
│   │   └── page.tsx
│   ├── calculator/      # Pricing calculator page
│   │   └── page.tsx
│   ├── compare/         # Compare providers page
│   │   └── page.tsx
│   ├── contact/         # Contact page
│   │   └── page.tsx
│   ├── market-overview/ # Market insights dashboard
│   │   └── page.tsx
│   ├── playground/      # API playground (mocked)
│   │   └── page.tsx
│   ├── providers/       # All providers with filters
│   │   └── page.tsx
│   ├── sources/         # References and citations
│   │   └── page.tsx
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

## Providers Included

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

## Data Structure

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

## Customization

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

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React 19**: Latest React features

## License

This project is open source and available for educational purposes.

## Disclaimer

Pricing and features are subject to change. Always verify current information on official provider websites before making decisions.
