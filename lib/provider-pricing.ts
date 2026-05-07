// provider-pricing.ts — Real pricing data for all major AI providers
// AI-VIBE-CHAT-V4 v2.0 | Kazi Musharraf | mkazi.live
// Last updated: May 2026

export interface ModelPricing {
  id: string
  name: string
  provider: string
  inputPer1M: number   // USD per 1M input tokens
  outputPer1M: number  // USD per 1M output tokens
  contextWindow: number
  maxOutput: number
  speed: 'ultra-fast' | 'fast' | 'medium' | 'slow'
  capabilities: string[]
  releaseDate: string
}

export const PROVIDER_PRICING: ModelPricing[] = [
  // Anthropic
  { id: 'claude-opus-4-6', name: 'Claude Opus 4.6', provider: 'Anthropic', inputPer1M: 15, outputPer1M: 75, contextWindow: 200000, maxOutput: 8192, speed: 'slow', capabilities: ['text', 'vision', 'tools', 'extended-thinking'], releaseDate: '2025-09' },
  { id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', provider: 'Anthropic', inputPer1M: 3, outputPer1M: 15, contextWindow: 200000, maxOutput: 8192, speed: 'medium', capabilities: ['text', 'vision', 'tools', 'code'], releaseDate: '2025-07' },
  { id: 'claude-haiku-4-5', name: 'Claude Haiku 4.5', provider: 'Anthropic', inputPer1M: 0.25, outputPer1M: 1.25, contextWindow: 200000, maxOutput: 8192, speed: 'fast', capabilities: ['text', 'vision', 'tools'], releaseDate: '2025-05' },
  // OpenAI
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', inputPer1M: 2.5, outputPer1M: 10, contextWindow: 128000, maxOutput: 4096, speed: 'medium', capabilities: ['text', 'vision', 'tools', 'json'], releaseDate: '2024-05' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', inputPer1M: 0.15, outputPer1M: 0.6, contextWindow: 128000, maxOutput: 4096, speed: 'fast', capabilities: ['text', 'vision', 'tools'], releaseDate: '2024-07' },
  { id: 'o1', name: 'o1 (Reasoning)', provider: 'OpenAI', inputPer1M: 15, outputPer1M: 60, contextWindow: 200000, maxOutput: 100000, speed: 'slow', capabilities: ['text', 'vision', 'extended-thinking'], releaseDate: '2024-12' },
  // Google
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'Google', inputPer1M: 0.1, outputPer1M: 0.4, contextWindow: 1000000, maxOutput: 8192, speed: 'ultra-fast', capabilities: ['text', 'vision', 'tools', 'audio'], releaseDate: '2025-02' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', inputPer1M: 1.25, outputPer1M: 5, contextWindow: 2000000, maxOutput: 8192, speed: 'medium', capabilities: ['text', 'vision', 'tools', 'audio', 'video'], releaseDate: '2024-05' },
  // Groq (inference pricing)
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', provider: 'Groq', inputPer1M: 0.59, outputPer1M: 0.79, contextWindow: 128000, maxOutput: 32768, speed: 'ultra-fast', capabilities: ['text', 'tools'], releaseDate: '2024-12' },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', provider: 'Groq', inputPer1M: 0.05, outputPer1M: 0.08, contextWindow: 128000, maxOutput: 8192, speed: 'ultra-fast', capabilities: ['text'], releaseDate: '2024-07' },
  // DeepSeek
  { id: 'deepseek-v3', name: 'DeepSeek V3', provider: 'DeepSeek', inputPer1M: 0.27, outputPer1M: 1.1, contextWindow: 128000, maxOutput: 8192, speed: 'medium', capabilities: ['text', 'tools', 'code'], releaseDate: '2024-12' },
  { id: 'deepseek-r1', name: 'DeepSeek R1 (Reasoning)', provider: 'DeepSeek', inputPer1M: 0.55, outputPer1M: 2.19, contextWindow: 128000, maxOutput: 32768, speed: 'slow', capabilities: ['text', 'extended-thinking'], releaseDate: '2025-01' },
]

export function calculateCost(modelId: string, inputTokens: number, outputTokens: number) {
  const model = PROVIDER_PRICING.find(m => m.id === modelId)
  if (!model) return null
  const input = (inputTokens / 1_000_000) * model.inputPer1M
  const output = (outputTokens / 1_000_000) * model.outputPer1M
  return {
    inputCost: input,
    outputCost: output,
    total: input + output,
    monthlyEstimate: (input + output) * 30 * 24  // Rough daily extrapolation
  }
}
