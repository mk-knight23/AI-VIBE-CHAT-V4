export interface Provider {
  name: string;
  slug: string;
  description: string;
  category: "Cloud Giant" | "Specialized" | "Local/Open-Source" | "Router/Gateway" | "Emerging/Niche";
  useCases: string[];
  docsUrl: string;
  pricing: {
    free: string;
    paid: string;
  };
  models: {
    free: string[];
    paid: string[];
  };
  apiKeyName: string;
  baseUrl: string;
  setupSteps: string[];
  other: string;
}

export const providers: Provider[] = [
  {
    name: "Anthropic",
    slug: "anthropic",
    category: "Specialized",
    description: "Provider of Claude AI models focused on safety and reliability.",
    useCases: ["Complex reasoning tasks", "Code generation", "Content creation", "Text and image analysis", "Agent building"],
    docsUrl: "https://docs.anthropic.com/en/api/getting-started",
    pricing: {
      free: "No free API tier; free chat access on web/apps with limits.",
      paid: "Token-based: e.g., Claude 4.5 Sonnet $3/$15 per M input/output tokens; prompt caching discounts."
    },
    models: {
      free: [],
      paid: ["Claude 4.1 Opus ($15/$75 per M)", "Claude 4.5 Sonnet ($3/$15 per M)", "Claude 4.5 Haiku ($1/$5 per M)"]
    },
    apiKeyName: "ANTHROPIC_API_KEY",
    baseUrl: "https://api.anthropic.com/v1",
    setupSteps: ["Sign up at console.anthropic.com", "Add billing", "Generate API key"],
    other: "Supports prompt caching (up to 75% savings) and batch processing (50% off)."
  },
  {
    name: "AWS Bedrock",
    slug: "aws-bedrock",
    category: "Cloud Giant",
    description: "Managed service for foundation models from multiple providers.",
    useCases: ["Custom AI apps", "Chatbots with safety guardrails", "RAG for accurate responses", "Multimodal content processing", "Workflow orchestration"],
    docsUrl: "https://docs.aws.amazon.com/bedrock/latest/userguide/",
    pricing: {
      free: "No free credits mentioned; pay-as-you-go.",
      paid: "On-demand per token/image; e.g., Claude 3.5 Sonnet $0.006/$0.03 per 1K input/output; batch 50% off; custom models per minute."
    },
    models: {
      free: [],
      paid: ["Anthropic Claude series", "Amazon Titan", "Meta Llama 3/4", "Mistral AI", "Stability AI for images"]
    },
    apiKeyName: "AWS_ACCESS_KEY_ID (with IAM permissions)",
    baseUrl: "https://bedrock-runtime.[region].amazonaws.com",
    setupSteps: ["Create AWS account", "Enable Bedrock API", "Set up IAM role", "Generate credentials"],
    other: "Supports model customization, guardrails, and agent frameworks."
  },
  {
    name: "Chutes AI",
    slug: "chutes-ai",
    category: "Emerging/Niche",
    description: "Curated open-source LLMs with free access.",
    useCases: ["General LLM tasks", "Open-source model experimentation"],
    docsUrl: "https://docs.chutes.ai/",
    pricing: {
      free: "Free access to several LLMs.",
      paid: "N/A (focus on free)."
    },
    models: {
      free: ["Various open-source LLMs"],
      paid: []
    },
    apiKeyName: "CHUTES_API_KEY",
    baseUrl: "https://api.chutes.ai",
    setupSteps: ["Sign up at chutes.ai", "Get key from dashboard"],
    other: "Limited details; primarily for testing."
  },
  {
    name: "Claude Code",
    slug: "claude-code",
    category: "Specialized",
    description: "Claude-focused for coding tasks (subset of Anthropic).",
    useCases: ["Code generation", "Debugging", "Agentic coding"],
    docsUrl: "https://docs.anthropic.com/en/docs/build-with-claude",
    pricing: {
      free: "None.",
      paid: "Same as Anthropic: e.g., $3/$15 per M for Sonnet."
    },
    models: {
      free: [],
      paid: ["Claude series optimized for code"]
    },
    apiKeyName: "ANTHROPIC_API_KEY",
    baseUrl: "https://api.anthropic.com/v1",
    setupSteps: ["Same as Anthropic"],
    other: "Integrated with Claude tools."
  },
  {
    name: "DeepSeek",
    slug: "deepseek",
    category: "Emerging/Niche",
    description: "Cost-effective Chinese LLM provider.",
    useCases: ["Chat", "Reasoning", "Code generation"],
    docsUrl: "https://platform.deepseek.com/api-docs/en/",
    pricing: {
      free: "None.",
      paid: "Very low: e.g., $0.14/$0.28 per M input/output for DeepSeek-V2; under $5 for high volume."
    },
    models: {
      free: [],
      paid: ["DeepSeek-Chat", "DeepSeek-Reasoner", "DeepSeek-V2"]
    },
    apiKeyName: "DEEPSEEK_API_KEY",
    baseUrl: "https://api.deepseek.com",
    setupSteps: ["Apply at platform.deepseek.com/api_keys"],
    other: "Competitive in price wars; up to 26% lower for long-context."
  },
  {
    name: "Fireworks AI",
    slug: "fireworks-ai",
    category: "Specialized",
    description: "Optimized for open-source models with fast inference.",
    useCases: ["Generative AI", "Fine-tuning", "Image generation"],
    docsUrl: "https://docs.fireworks.ai/",
    pricing: {
      free: "$1 free credits.",
      paid: "Pay-per-token; competitive for open-source."
    },
    models: {
      free: ["Basic access"],
      paid: ["Various LLMs like Llama, Mistral"]
    },
    apiKeyName: "FIREWORKS_API_KEY",
    baseUrl: "https://api.fireworks.ai/inference/v1",
    setupSteps: ["Sign up, get key"],
    other: "Supports fine-tuning."
  },
  {
    name: "Synthetic",
    slug: "synthetic",
    category: "Emerging/Niche",
    description: "OpenAI-compatible synthetic data provider.",
    useCases: ["Data generation", "Testing"],
    docsUrl: "https://docs.synthetic.new/",
    pricing: {
      free: "Limited.",
      paid: "Usage-based."
    },
    models: {
      free: [],
      paid: ["Custom models"]
    },
    apiKeyName: "SYNTHETIC_API_KEY",
    baseUrl: "https://api.synthetic.new",
    setupSteps: ["Sign up for key"],
    other: "Limited public details."
  },
  {
    name: "GCP Vertex AI",
    slug: "gcp-vertex-ai",
    category: "Cloud Giant",
    description: "Google's managed AI platform.",
    useCases: ["AutoML models", "Custom training", "Generative AI evaluation", "Time series forecasting", "Agent building"],
    docsUrl: "https://cloud.google.com/vertex-ai/docs",
    pricing: {
      free: "Free tier for most models; e.g., 180k vCPU-seconds/month for Agent Engine.",
      paid: "Per token/character; e.g., $0.00003/$0.00009 per 1k input/output for metrics; see generative AI link for details."
    },
    models: {
      free: ["Basic AutoML"],
      paid: ["Gemini series", "Custom-trained models"]
    },
    apiKeyName: "GEMINI_API_KEY or service account",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    setupSteps: ["Create GCP project", "Enable API", "Get credentials"],
    other: "Supports Ray for training; BigQuery integration."
  },
  {
    name: "Glama",
    slug: "glama",
    category: "Emerging/Niche",
    description: "OpenAI-compatible provider.",
    useCases: ["General AI tasks"],
    docsUrl: "https://docs.glama.ai/",
    pricing: {
      free: "Not specified.",
      paid: "Usage-based."
    },
    models: {
      free: [],
      paid: ["Various"]
    },
    apiKeyName: "GLAMA_API_KEY",
    baseUrl: "https://glama.ai",
    setupSteps: ["Obtain key"],
    other: "Limited info."
  },
  {
    name: "Google Gemini",
    slug: "google-gemini",
    category: "Cloud Giant",
    description: "Google's multimodal AI API.",
    useCases: ["Text generation", "Multimodal tasks", "Reasoning"],
    docsUrl: "https://ai.google.dev/gemini-api/docs",
    pricing: {
      free: "Free tier without billing.",
      paid: "Per token; e.g., Gemini 2.0 Flash competitive rates."
    },
    models: {
      free: ["Gemini basic"],
      paid: ["Gemini Pro", "Gemini Flash"]
    },
    apiKeyName: "GEMINI_API_KEY",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    setupSteps: ["Follow quickstart for key"],
    other: "26% lower for long-context; multimodal."
  },
  {
    name: "Groq",
    slug: "groq",
    category: "Specialized",
    description: "Fast inference for LLMs.",
    useCases: ["Real-time AI", "High-speed chat", "Inference optimization"],
    docsUrl: "https://console.groq.com/docs/api-reference",
    pricing: {
      free: "Not specified.",
      paid: "Pay-per-use; low latency focus."
    },
    models: {
      free: [],
      paid: ["Various open-source"]
    },
    apiKeyName: "GROQ_API_KEY",
    baseUrl: "https://api.groq.com/openai/v1",
    setupSteps: ["Sign up at console.groq.com"],
    other: "Known for speed."
  },
  {
    name: "Human Relay Provider",
    slug: "human-relay-provider",
    category: "Emerging/Niche",
    description: "Manual relay for non-API models.",
    useCases: ["Web-based model access without keys"],
    docsUrl: "N/A",
    pricing: {
      free: "Manual, no cost.",
      paid: "N/A"
    },
    models: {
      free: ["Any web model"],
      paid: []
    },
    apiKeyName: "None",
    baseUrl: "N/A",
    setupSteps: ["Manual setup"],
    other: "Not standard API."
  },
  {
    name: "LM Studio",
    slug: "lm-studio",
    category: "Local/Open-Source",
    description: "Local LLM runner with API.",
    useCases: ["Offline AI", "Local model testing", "RAG with documents"],
    docsUrl: "https://lmstudio.ai/docs",
    pricing: {
      free: "Fully free local.",
      paid: "N/A"
    },
    models: {
      free: ["Llama, Qwen, Phi, Mistral"],
      paid: []
    },
    apiKeyName: "None",
    baseUrl: "http://localhost:1234/v1",
    setupSteps: ["Install app", "Download models from Hugging Face"],
    other: "REST API for local use."
  },
  {
    name: "MiniMax",
    slug: "minimax",
    category: "Emerging/Niche",
    description: "Multimodal AI provider.",
    useCases: ["Chat", "Image/text processing"],
    docsUrl: "https://platform.minimax.io/docs/guides/quickstart",
    pricing: {
      free: "Trial possible.",
      paid: "Pay-per-use."
    },
    models: {
      free: [],
      paid: ["Multimodal models"]
    },
    apiKeyName: "MINIMAX_API_KEY",
    baseUrl: "https://api.minimax.io",
    setupSteps: ["Sign up, create key"],
    other: "Focus on multimodal."
  },
  {
    name: "Mistral AI",
    slug: "mistral-ai",
    category: "Specialized",
    description: "Open-weight models for efficiency.",
    useCases: ["Text generation", "Fine-tuning", "European compliance"],
    docsUrl: "https://docs.mistral.ai/",
    pricing: {
      free: "None.",
      paid: "e.g., Mistral Small $0.20/$0.60 per M; competitive."
    },
    models: {
      free: [],
      paid: ["Mistral Small", "Mistral Large", "Mistral Nemo"]
    },
    apiKeyName: "MISTRAL_API_KEY",
    baseUrl: "https://api.mistral.ai",
    setupSteps: ["Create account, add payments, get key"],
    other: "Open-source focus."
  },
  {
    name: "Ollama",
    slug: "ollama",
    category: "Local/Open-Source",
    description: "Local open-source LLM runner.",
    useCases: ["Local AI deployment", "Model experimentation"],
    docsUrl: "https://docs.ollama.com/api/introduction",
    pricing: {
      free: "Fully free.",
      paid: "N/A"
    },
    models: {
      free: ["Any open-source"],
      paid: []
    },
    apiKeyName: "None",
    baseUrl: "http://localhost:11434/v1",
    setupSteps: ["Install Ollama", "Pull models"],
    other: "No cloud costs."
  },
  {
    name: "OpenAI",
    slug: "openai",
    category: "Cloud Giant",
    description: "Leading provider of GPT models.",
    useCases: ["Chat", "Image generation", "Fine-tuning", "Audio processing"],
    docsUrl: "https://platform.openai.com/docs/api-reference",
    pricing: {
      free: "Trial credits.",
      paid: "e.g., GPT-5 $10 per M output; Batch API 50% off; images $0.01-$0.17."
    },
    models: {
      free: ["Basic access"],
      paid: ["GPT-5", "GPT-4o", "DALL-E for images"]
    },
    apiKeyName: "OPENAI_API_KEY",
    baseUrl: "https://api.openai.com/v1",
    setupSteps: ["Sign up, add billing, create key"],
    other: "Multimodal; tool calling."
  },
  {
    name: "OpenAI Compatible",
    slug: "openai-compatible",
    category: "Router/Gateway",
    description: "Gateways compatible with OpenAI SDK.",
    useCases: ["Proxy services", "Multi-provider routing"],
    docsUrl: "Varies",
    pricing: {
      free: "Varies.",
      paid: "Per gateway."
    },
    models: {
      free: [],
      paid: ["Routed models"]
    },
    apiKeyName: "Varies (e.g., AI_GATEWAY_API_KEY)",
    baseUrl: "Custom",
    setupSteps: ["Setup per provider"],
    other: "For compatibility."
  },
  {
    name: "OpenRouter",
    slug: "openrouter",
    category: "Router/Gateway",
    description: "Router for multiple AI providers.",
    useCases: ["Model aggregation", "Cost optimization", "Fallbacks"],
    docsUrl: "https://openrouter.ai/docs",
    pricing: {
      free: "Some models with limits (e.g., Llama free).",
      paid: "Pay-as-you-go for 400+ models."
    },
    models: {
      free: ["Llama-3.2-1b-instruct:free"],
      paid: ["Anthropic, OpenAI, etc."]
    },
    apiKeyName: "OPENROUTER_API_KEY",
    baseUrl: "https://openrouter.ai/api/v1",
    setupSteps: ["Sign up, get key"],
    other: "Unified access."
  },
  {
    name: "OVHcloud AI Endpoints",
    slug: "ovhcloud-ai-endpoints",
    category: "Emerging/Niche",
    description: "European cloud AI models.",
    useCases: ["Code generation", "Reasoning", "Speech recognition", "Image generation"],
    docsUrl: "https://endpoints.ai.cloud.ovh.net/catalog",
    pricing: {
      free: "Trial credits; some models free (e.g., image gen).",
      paid: "Per token/second: e.g., LLM 0.04€-0.08€/M input."
    },
    models: {
      free: ["Stable-Diffusion-XL", "Text-to-Speech"],
      paid: ["CODE LLM (30B)", "REASONING LLMs (21B-117B)", "Whisper for audio"]
    },
    apiKeyName: "OVHCLOUD_API_KEY",
    baseUrl: "https://endpoints.ai.cloud.ovh.net",
    setupSteps: ["Sign up, get key"],
    other: "Pay-per-use; European data residency."
  },
  {
    name: "Requesty",
    slug: "requesty",
    category: "Router/Gateway",
    description: "Unified AI router.",
    useCases: ["Multi-model access"],
    docsUrl: "https://docs.requesty.ai/quickstart",
    pricing: {
      free: "Not specified.",
      paid: "Pay-as-you-go."
    },
    models: {
      free: [],
      paid: ["Various"]
    },
    apiKeyName: "REQUESTY_API_KEY",
    baseUrl: "https://router.requesty.ai/v1",
    setupSteps: ["Sign up at app.requesty.ai"],
    other: "Gateway service."
  },
  {
    name: "Unbound",
    slug: "unbound",
    category: "Router/Gateway",
    description: "AI security gateway.",
    useCases: ["Secure AI integrations"],
    docsUrl: "https://docs.getunbound.ai/",
    pricing: {
      free: "None.",
      paid: "Enterprise pricing."
    },
    models: {
      free: [],
      paid: ["Various"]
    },
    apiKeyName: "UNBOUND_API_KEY",
    baseUrl: "https://api.getunbound.ai/v1",
    setupSteps: ["Sign up for key"],
    other: "Focus on security."
  },
  {
    name: "v0",
    slug: "v0",
    category: "Specialized",
    description: "AI for React/Next.js generation.",
    useCases: ["Code generation"],
    docsUrl: "https://v0.app/docs/api",
    pricing: {
      free: "None.",
      paid: "Requires premium plan."
    },
    models: {
      free: [],
      paid: ["v0 models"]
    },
    apiKeyName: "V0_API_KEY",
    baseUrl: "N/A",
    setupSteps: ["Get from v0.app settings"],
    other: "Specialized for dev."
  },
  {
    name: "Vercel AI Gateway",
    slug: "vercel-ai-gateway",
    category: "Router/Gateway",
    description: "OpenAI-compatible gateway for Vercel.",
    useCases: ["AI integrations in apps"],
    docsUrl: "https://vercel.com/docs/ai-gateway/getting-started",
    pricing: {
      free: "None.",
      paid: "Pay-per-use."
    },
    models: {
      free: [],
      paid: ["Multiple providers"]
    },
    apiKeyName: "AI_GATEWAY_API_KEY",
    baseUrl: "Custom",
    setupSteps: ["Create in Vercel dashboard"],
    other: "For Vercel users."
  },
  {
    name: "MegaLLM",
    slug: "megallm",
    category: "Router/Gateway",
    description: "Unified API gateway providing access to 70+ AI models from multiple providers.",
    useCases: ["Multi-model access", "Cost optimization", "Model comparison", "Fallback routing", "Enterprise AI integration"],
    docsUrl: "https://docs.megallm.io/",
    pricing: {
      free: "Trial credits available.",
      paid: "Pay-per-use pricing based on underlying model costs; competitive rates across 70+ models."
    },
    models: {
      free: ["Trial access to select models"],
      paid: ["OpenAI GPT series", "Anthropic Claude", "Google Gemini", "Meta Llama", "Mistral", "70+ total models"]
    },
    apiKeyName: "MEGALLM_API_KEY",
    baseUrl: "https://api.megallm.io/v1",
    setupSteps: ["Sign up at megallm.io", "Create API key in dashboard", "Configure model preferences"],
    other: "OpenAI-compatible API; supports automatic failover and load balancing across providers."
  },
  {
    name: "MegaLLM",
    slug: "megallm",
    category: "Router/Gateway",
    description: "Unified API gateway providing access to 12 AI models from multiple providers.",
    useCases: ["Multi-model access", "Cost optimization", "Model comparison", "Fallback routing", "Enterprise AI integration"],
    docsUrl: "https://docs.megallm.io/",
    pricing: {
      free: "Trial credits available.",
      paid: "Pay-per-use: $0.07-$1.00 per M tokens depending on model."
    },
    models: {
      free: ["Trial access to select models"],
      paid: ["OpenAI GPT-oss-20b ($0.07/$0.30)", "Llama 3.3 70B ($0.12/$0.30)", "DeepSeek R1 Distill 70B ($0.75/$0.99)", "Qwen3 32B ($0.15/$0.60)", "12 total models"]
    },
    apiKeyName: "MEGALLM_API_KEY",
    baseUrl: "https://ai.megallm.io/v1",
    setupSteps: ["Sign up at megallm.io", "Create API key in dashboard", "Configure model preferences"],
    other: "OpenAI-compatible API; supports automatic failover and load balancing across providers. Models include OpenAI GPT-oss, Llama, DeepSeek, Qwen, Kimi, and MiniMax."
  },
  {
    name: "Agentrouter",
    slug: "agentrouter",
    category: "Router/Gateway",
    description: "Intelligent routing system for AI agents with automatic model selection and optimization.",
    useCases: ["Agent orchestration", "Intelligent model routing", "Cost-aware AI workflows", "Multi-agent systems", "Production AI deployment"],
    docsUrl: "https://docs.agentrouter.org/",
    pricing: {
      free: "Free tier with usage quotas.",
      paid: "Usage-based pricing with volume discounts."
    },
    models: {
      free: ["Access to open-source models"],
      paid: ["Premium models from major providers", "Custom routing configurations"]
    },
    apiKeyName: "AGENTROUTER_API_KEY",
    baseUrl: "https://api.agentrouter.org/v1",
    setupSteps: ["Register at agentrouter.org", "Generate API key", "Configure routing rules", "Set up agent workflows"],
    other: "Features intelligent routing based on task complexity, cost, and latency requirements."
  },
  {
    name: "Virtual Quota Fallback",
    slug: "virtual-quota-fallback",
    category: "Router/Gateway",
    description: "Quota management and fallback system for AI API rate limit handling.",
    useCases: ["Rate limit management", "API quota monitoring", "Automatic fallback routing", "High-availability AI systems", "Cost control"],
    docsUrl: "N/A (Feature/utility)",
    pricing: {
      free: "Typically included as feature in other platforms.",
      paid: "Part of enterprise AI gateway solutions."
    },
    models: {
      free: ["Works with any API provider"],
      paid: ["Enterprise configurations"]
    },
    apiKeyName: "Varies by implementation",
    baseUrl: "N/A (Feature/utility)",
    setupSteps: ["Configure quota limits", "Set up fallback providers", "Define routing priorities", "Monitor usage"],
    other: "Not a standalone provider; typically a feature in AI gateways for handling rate limits and quota exhaustion."
  },
  {
    name: "VS Code Language Model API",
    slug: "vs-code-language-model-api",
    category: "Specialized",
    description: "Internal API for VS Code AI features.",
    useCases: ["Code completion", "Copilot integration"],
    docsUrl: "https://code.visualstudio.com/api/extension-guides/ai/language-model",
    pricing: {
      free: "With Copilot.",
      paid: "Subscription for advanced."
    },
    models: {
      free: ["Basic Copilot"],
      paid: ["GPT-4o"]
    },
    apiKeyName: "None",
    baseUrl: "Internal",
    setupSteps: ["Enable in VS Code"],
    other: "Editor-specific."
  },
  {
    name: "xAI (Grok)",
    slug: "xai-grok",
    category: "Emerging/Niche",
    description: "xAI's Grok models with real-time data.",
    useCases: ["Reasoning", "Vision", "Tool calling", "Image generation", "Search"],
    docsUrl: "https://docs.x.ai/docs/overview",
    pricing: {
      free: "$25 credits/month.",
      paid: "e.g., Grok-4 $3/$15 per M; images $0.07 each."
    },
    models: {
      free: ["Basic access"],
      paid: ["Grok-4.1-fast-reasoning ($0.20/$0.50 per M)", "Grok-2-image"]
    },
    apiKeyName: "XAI_API_KEY",
    baseUrl: "https://api.x.ai/v1",
    setupSteps: ["Sign up at console.x.ai"],
    other: "Enterprise features like SOC 2 compliance."
  },
  {
    name: "Cohere",
    slug: "cohere",
    category: "Specialized",
    description: "Enterprise-focused AI with Command models for business applications.",
    useCases: ["Enterprise chat", "Semantic search", "Text generation", "Classification", "Embeddings"],
    docsUrl: "https://docs.cohere.com",
    pricing: {
      free: "Trial API access available.",
      paid: "Usage-based pricing; Command R+ from $3 per M tokens."
    },
    models: {
      free: ["Trial access"],
      paid: ["Command R+", "Command R", "Command Light"]
    },
    apiKeyName: "COHERE_API_KEY",
    baseUrl: "https://api.cohere.ai/v1",
    setupSteps: ["Sign up at cohere.com", "Get API key from dashboard"],
    other: "Strong enterprise features with RAG and embeddings."
  },
  {
    name: "Together AI",
    slug: "together-ai",
    category: "Specialized",
    description: "Fast inference for open-source models with competitive pricing.",
    useCases: ["Open-source models", "Fast inference", "Fine-tuning", "Custom deployments"],
    docsUrl: "https://docs.together.ai",
    pricing: {
      free: "Free trial credits.",
      paid: "From $0.20 per M tokens for open-source models."
    },
    models: {
      free: ["Trial access"],
      paid: ["Llama 3 70B", "Mixtral 8x7B", "Qwen models"]
    },
    apiKeyName: "TOGETHER_API_KEY",
    baseUrl: "https://api.together.xyz/v1",
    setupSteps: ["Sign up at together.ai", "Generate API key"],
    other: "Optimized for open-source model inference."
  },
  {
    name: "Replicate",
    slug: "replicate",
    category: "Specialized",
    description: "Run AI models in the cloud with simple API access.",
    useCases: ["Image generation", "Model hosting", "Custom models", "ML deployment"],
    docsUrl: "https://replicate.com/docs",
    pricing: {
      free: "Free tier available.",
      paid: "Pay per prediction; varies by model."
    },
    models: {
      free: ["Limited free predictions"],
      paid: ["Llama 2", "Stable Diffusion", "Custom models"]
    },
    apiKeyName: "REPLICATE_API_TOKEN",
    baseUrl: "https://api.replicate.com/v1",
    setupSteps: ["Sign up at replicate.com", "Get API token from account"],
    other: "Great for image generation and custom model hosting."
  },
  {
    name: "Hugging Face",
    slug: "huggingface",
    category: "Local/Open-Source",
    description: "Access thousands of open-source models via Inference API.",
    useCases: ["Open-source models", "Model experimentation", "Research", "Fine-tuning"],
    docsUrl: "https://huggingface.co/docs/api-inference",
    pricing: {
      free: "Free tier with rate limits.",
      paid: "Inference Endpoints from $0.60/hour."
    },
    models: {
      free: ["Thousands of open-source models"],
      paid: ["Dedicated endpoints for any model"]
    },
    apiKeyName: "HUGGINGFACE_API_KEY",
    baseUrl: "https://api-inference.huggingface.co",
    setupSteps: ["Sign up at huggingface.co", "Create access token in settings"],
    other: "Largest open-source model hub with 500k+ models."
  },
  {
    name: "Perplexity AI",
    slug: "perplexity",
    category: "Specialized",
    description: "AI models with real-time web search capabilities.",
    useCases: ["Search-augmented chat", "Real-time information", "Research", "Q&A"],
    docsUrl: "https://docs.perplexity.ai",
    pricing: {
      free: "Limited free tier.",
      paid: "From $5 per M tokens for online models."
    },
    models: {
      free: ["Basic access"],
      paid: ["Sonar Large Online", "Sonar Medium Online"]
    },
    apiKeyName: "PERPLEXITY_API_KEY",
    baseUrl: "https://api.perplexity.ai",
    setupSteps: ["Sign up at perplexity.ai", "Get API key from settings"],
    other: "Unique online search integration for up-to-date responses."
  },
  {
    name: "AI21 Labs",
    slug: "ai21",
    category: "Specialized",
    description: "Jamba models with hybrid architecture for long context.",
    useCases: ["Long context", "Document analysis", "Text generation", "Summarization"],
    docsUrl: "https://docs.ai21.com",
    pricing: {
      free: "Free trial available.",
      paid: "Usage-based; Jamba from $0.50 per M tokens."
    },
    models: {
      free: ["Trial access"],
      paid: ["Jamba Instruct", "Jurassic-2"]
    },
    apiKeyName: "AI21_API_KEY",
    baseUrl: "https://api.ai21.com/studio/v1",
    setupSteps: ["Sign up at ai21.com", "Get API key from studio"],
    other: "Hybrid SSM-Transformer architecture with 256K context."
  }
];
