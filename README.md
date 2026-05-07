<div align="center">

# 📊 AI-VIBE-CHAT-V4

### **The AI Provider Intelligence Dashboard**
*Built with Next.js 15 · Recharts · Zustand · Framer Motion · TypeScript*

[![Next.js](https://img.shields.io/badge/Next.js-15.0+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![Recharts](https://img.shields.io/badge/Recharts-2.12+-22B5BF?style=for-the-badge)](https://recharts.org)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0+-0055FF?style=for-the-badge)](https://framer.com/motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**[🚀 Live Demo](https://ai-vibe-chat-v4.vercel.app)** · **[📖 Docs](./Docs)** · **[⭐ Star](https://github.com/mk-knight23/AI-VIBE-CHAT-V4)**

</div>

---

## 🎯 Your AI Provider Command Center

AI-VIBE-CHAT-V4 is the **intelligence dashboard** of the chat series — not a chat interface, but a comprehensive **benchmarking and analytics platform** for AI API providers. Compare models, calculate costs, track performance, and make data-driven decisions about which AI to use for your projects.

> **Pillar 1, Iteration 4** — Stop guessing. Start measuring.

---

## 📈 What You Can Do

| Feature | Description |
|---------|-------------|
| 📊 **Benchmark Dashboard** | Latency, throughput, quality scores across 20+ models |
| 💰 **Pricing Calculator** | Real-time cost estimation with input/output token breakdown |
| 🔄 **Provider Comparison** | Side-by-side feature matrix for all major providers |
| 🗂️ **Market Overview** | Market share, capability trends, release timelines |
| 🔍 **Fuzzy Search** | Fuse.js-powered model/feature search |
| 📡 **API Status** | Real-time uptime and latency monitoring |
| 🧮 **Cost Optimizer** | Find cheapest model for your specific use case |
| 📁 **Source References** | Linked citations for all benchmark data |

---

## 🏗️ Architecture

```
app/
├── page.tsx                    # Dashboard overview
├── providers/page.tsx          # Provider deep-dives
├── benchmarks/page.tsx         # Performance benchmarks
├── calculator/page.tsx         # Token cost calculator
├── compare/page.tsx            # Side-by-side comparison
├── market-overview/page.tsx    # Market intelligence
├── sources/page.tsx            # Data sources & citations
├── contact/page.tsx            # Contact form
├── [slug]/page.tsx             # Dynamic provider pages
├── api/proxy/route.ts          # API proxy (hides keys)
└── layout.tsx                  # Root with Zustand provider
components/
├── charts/
│   ├── BenchmarkChart.tsx      # Recharts performance charts
│   ├── CostChart.tsx           # Interactive cost comparison
│   ├── MarketSharePie.tsx      # Provider market share
│   └── TimelineChart.tsx       # Model release timeline
├── calculator/
│   ├── TokenCalculator.tsx     # Input/output token estimator
│   └── UseCaseEstimator.tsx    # Use-case cost profiler
└── ui/
    ├── ProviderCard.tsx         # Animated provider card
    ├── ModelTable.tsx           # Sortable model comparison table
    └── StatusBadge.tsx          # Real-time API status
```

---

## 📡 Supported Providers (20+)

| Provider | Models | Pricing | Benchmarks | Status |
|----------|--------|---------|------------|--------|
| **Anthropic** | Claude Opus/Sonnet/Haiku | ✅ | ✅ | 🟢 Live |
| **OpenAI** | GPT-4o, o1, o3 | ✅ | ✅ | 🟢 Live |
| **Google** | Gemini 2.0/1.5 | ✅ | ✅ | 🟢 Live |
| **Meta** | Llama 4, Llama 3.3 | ✅ | ✅ | 🟢 Live |
| **Groq** | Llama, Mixtral | ✅ | ✅ | 🟢 Live |
| **Mistral** | Large, Nemo | ✅ | ✅ | 🟢 Live |
| **Cohere** | Command R+ | ✅ | ✅ | 🟢 Live |
| **Together AI** | 50+ open models | ✅ | ⚡ | 🟢 Live |
| **Fireworks** | Llama, Mixtral | ✅ | ⚡ | 🟢 Live |
| **DeepSeek** | V3, R1 | ✅ | ✅ | 🟢 Live |

---

## 💰 Cost Calculator

```typescript
// lib/cost-calculator.ts
export const calculateCost = (
  provider: string,
  model: string,
  inputTokens: number,
  outputTokens: number
): CostBreakdown => {
  const pricing = PROVIDER_PRICING[provider][model]
  return {
    inputCost: (inputTokens / 1_000_000) * pricing.inputPer1M,
    outputCost: (outputTokens / 1_000_000) * pricing.outputPer1M,
    total: ((inputTokens * pricing.inputPer1M) + (outputTokens * pricing.outputPer1M)) / 1_000_000,
    perRequest: pricing.perRequest ?? 0,
    monthlyEstimate: calculateMonthly(inputTokens, outputTokens, pricing)
  }
}
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/mk-knight23/AI-VIBE-CHAT-V4.git
cd AI-VIBE-CHAT-V4
npm install
npm run dev  # → http://localhost:3000
```

No API keys required for the dashboard view. Optional for live benchmark testing:

```env
# .env.local (optional - for live testing)
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
```

---

## 📦 Commands

```bash
npm run dev          # Next.js with Turbopack
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run test         # Jest tests
```

---

<div align="center">

**Built with 📊 by [Kazi Musharraf](https://mkazi.live)**

*Part of the [AI-VIBE Ecosystem](https://github.com/mk-knight23/AI-VIBE-ECOSYSTEM)*

</div>
