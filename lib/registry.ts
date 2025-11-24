import { AIProvider } from './types';

export const PROVIDERS: AIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://api.openai.com/v1',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o (Paid)', description: 'Most capable', contextLength: 128000, maxTokens: 16384 },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini (Paid)', description: 'Affordable', contextLength: 128000, maxTokens: 16384 },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo (Paid)', description: 'Efficient', contextLength: 16385, maxTokens: 4096 }
    ]
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://api.anthropic.com/v1',
    models: [
      { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet (Paid)', description: 'Most intelligent', contextLength: 200000, maxTokens: 8192 },
      { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku (Paid)', description: 'Fast', contextLength: 200000, maxTokens: 8192 }
    ]
  },
  {
    id: 'google',
    name: 'Google Gemini',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    models: [
      { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash (Free)', description: 'Latest, 15 RPM free', contextLength: 1000000, maxTokens: 8192 },
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro (Free)', description: '2 RPM free', contextLength: 2000000, maxTokens: 8192 },
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (Free)', description: '15 RPM free', contextLength: 1000000, maxTokens: 8192 }
    ]
  },
  {
    id: 'groq',
    name: 'Groq',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://api.groq.com/openai/v1',
    models: [
      { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B (Free)', description: 'Free tier', contextLength: 128000, maxTokens: 32768 },
      { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B (Free)', description: 'Ultra-fast free', contextLength: 128000, maxTokens: 8192 },
      { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B (Free)', description: 'Free tier', contextLength: 32768, maxTokens: 32768 }
    ]
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://openrouter.ai/api/v1',
    models: [
      { id: 'deepseek/deepseek-v3-0324:free', name: 'DeepSeek V3 (Free)', description: '685B flagship', contextLength: 164000, maxTokens: 8192 },
      { id: 'deepseek/r1-0528:free', name: 'DeepSeek R1 (Free)', description: '671B reasoning', contextLength: 164000, maxTokens: 8192 },
      { id: 'openai/gpt-4o', name: 'GPT-4o (Paid)', description: 'Via OpenRouter', contextLength: 128000, maxTokens: 16384 }
    ]
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://api.deepseek.com/v1',
    models: [
      { id: 'deepseek-chat', name: 'DeepSeek Chat (Paid)', description: 'General purpose', contextLength: 64000, maxTokens: 4096 },
      { id: 'deepseek-reasoner', name: 'DeepSeek R1 (Paid)', description: 'Reasoning', contextLength: 64000, maxTokens: 8192 }
    ]
  },
  {
    id: 'megallm',
    name: 'MegaLLM',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://ai.megallm.io/v1',
    models: [
      { id: 'openai-gpt-oss-20b', name: 'OpenAI GPT-oss-20b', description: 'Advanced reasoning', contextLength: 128000, maxTokens: 128000 },
      { id: 'llama3.3-70b-instruct', name: 'Llama 3.3 70B', description: 'Open-source LLM', contextLength: 131072, maxTokens: 131072 },
      { id: 'deepseek-r1-distill-llama-70b', name: 'DeepSeek R1 Distill 70B', description: 'Reasoning model', contextLength: 128000, maxTokens: 128000 },
      { id: 'alibaba-qwen3-32b', name: 'Qwen3 32B', description: 'Alibaba AI', contextLength: 131072, maxTokens: 16384 },
      { id: 'openai-gpt-oss-120b', name: 'OpenAI GPT-oss-120b', description: 'Superior reasoning', contextLength: 128000, maxTokens: 128000 },
      { id: 'llama3-8b-instruct', name: 'Llama 3.1 8B', description: 'Compact LLM', contextLength: 8192, maxTokens: 8192 },
      { id: 'moonshotai/kimi-k2-instruct-0905', name: 'Kimi K2', description: 'Moonshot AI', contextLength: 256000, maxTokens: 56000 },
      { id: 'deepseek-ai/deepseek-v3.1-terminus', name: 'DeepSeek V3.1 Terminus', description: 'Advanced reasoning', contextLength: 163840, maxTokens: 56000 },
      { id: 'qwen/qwen3-next-80b-a3b-instruct', name: 'Qwen3 Next 80B', description: 'Next-gen Qwen', contextLength: 262144, maxTokens: 16384 },
      { id: 'deepseek-ai/deepseek-v3.1', name: 'DeepSeek V3.1', description: 'Latest DeepSeek', contextLength: 128000, maxTokens: 16384 },
      { id: 'mistralai/mistral-nemotron', name: 'Mistral Nemotron', description: 'High-performance', contextLength: 128000, maxTokens: 16384 },
      { id: 'minimaxai/minimax-m2', name: 'MiniMax M2', description: 'Advanced AI', contextLength: 128000, maxTokens: 32000 }
    ]
  },
  {
    id: 'ollama',
    name: 'Ollama (Local)',
    requiresApiKey: false,
    requiresBaseUrl: true,
    baseUrl: 'http://localhost:11434',
    models: [
      { id: 'llama3.2:3b', name: 'Llama 3.2 3B (Free)', description: '100% free local', contextLength: 128000, maxTokens: 8192 },
      { id: 'qwen2.5:7b', name: 'Qwen 2.5 7B (Free)', description: '100% free local', contextLength: 32768, maxTokens: 8192 }
    ]
  },
  {
    id: 'lmstudio',
    name: 'LM Studio (Local)',
    requiresApiKey: false,
    requiresBaseUrl: true,
    baseUrl: 'http://localhost:1234/v1',
    models: [
      { id: 'local-model', name: 'Local Model (Free)', description: '100% free, any model', contextLength: 32768, maxTokens: 4096 }
    ]
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://api.mistral.ai/v1',
    models: [
      { id: 'mistral-large-latest', name: 'Mistral Large', description: 'Flagship', contextLength: 128000, maxTokens: 8192 },
      { id: 'mistral-small-latest', name: 'Mistral Small', description: 'Cost-effective', contextLength: 32000, maxTokens: 8192 }
    ]
  },
  {
    id: 'fireworks',
    name: 'Fireworks AI',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://api.fireworks.ai/inference/v1',
    models: [
      { id: 'accounts/fireworks/models/llama-v3p3-70b-instruct', name: 'Llama 3.3 70B', description: 'Fast inference', contextLength: 128000, maxTokens: 8192 }
    ]
  },
  {
    id: 'xai',
    name: 'xAI (Grok)',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://api.x.ai/v1',
    models: [
      { id: 'grok-beta', name: 'Grok Beta', description: 'xAI flagship', contextLength: 128000, maxTokens: 8192 }
    ]
  },
  {
    id: 'bedrock',
    name: 'AWS Bedrock',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://bedrock-runtime.us-east-1.amazonaws.com',
    models: [
      { id: 'anthropic.claude-3-5-sonnet-20241022-v2:0', name: 'Claude 3.5 Sonnet', description: 'AWS hosted', contextLength: 200000, maxTokens: 8192 }
    ]
  },
  {
    id: 'vertexai',
    name: 'GCP Vertex AI',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://us-central1-aiplatform.googleapis.com/v1',
    models: [
      { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash', description: 'GCP hosted', contextLength: 1000000, maxTokens: 8192 }
    ]
  },
  {
    id: 'cohere',
    name: 'Cohere',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://api.cohere.ai/v1',
    models: [
      { id: 'command-r-plus', name: 'Command R+', description: 'Enterprise model', contextLength: 128000, maxTokens: 4096 }
    ]
  },
  {
    id: 'together',
    name: 'Together AI',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://api.together.xyz/v1',
    models: [
      { id: 'meta-llama/Llama-3-70b-chat-hf', name: 'Llama 3 70B', description: 'Open-source', contextLength: 8192, maxTokens: 4096 }
    ]
  },
  {
    id: 'replicate',
    name: 'Replicate',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://api.replicate.com/v1',
    models: [
      { id: 'meta/llama-2-70b-chat', name: 'Llama 2 70B', description: 'Via Replicate', contextLength: 4096, maxTokens: 4096 }
    ]
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://api-inference.huggingface.co',
    models: [
      { id: 'meta-llama/Meta-Llama-3-70B-Instruct', name: 'Llama 3 70B', description: 'HF Inference', contextLength: 8192, maxTokens: 4096 }
    ]
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://api.perplexity.ai',
    models: [
      { id: 'llama-3.1-sonar-large-128k-online', name: 'Sonar Large', description: 'Online search', contextLength: 128000, maxTokens: 4096 }
    ]
  },
  {
    id: 'ai21',
    name: 'AI21 Labs',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://api.ai21.com/studio/v1',
    models: [
      { id: 'jamba-instruct', name: 'Jamba Instruct', description: 'Hybrid model', contextLength: 256000, maxTokens: 4096 }
    ]
  },
  {
    id: 'minimax',
    name: 'MiniMax',
    requiresApiKey: true,
    requiresBaseUrl: false,
    baseUrl: 'https://api.minimax.chat/v1',
    models: [
      { id: 'abab6.5s-chat', name: 'MiniMax 6.5S', description: 'Latest', contextLength: 245000, maxTokens: 8192 }
    ]
  }
];

export const getProvider = (id: string): AIProvider | undefined => {
  return PROVIDERS.find(p => p.id === id);
};

export const getDefaultProvider = (): AIProvider => {
  return PROVIDERS[0];
};

export const getApiKeySteps = (providerId: string): { steps: string[], link: string } => {
  const steps: Record<string, { steps: string[], link: string }> = {
    openai: {
      steps: ['Visit OpenAI Platform', 'Sign up or log in', 'Go to API Keys section', 'Click "Create new secret key"', 'Copy and save your key'],
      link: 'https://platform.openai.com/api-keys'
    },
    anthropic: {
      steps: ['Visit Anthropic Console', 'Create an account', 'Navigate to API Keys', 'Generate new key', 'Copy your API key'],
      link: 'https://console.anthropic.com/settings/keys'
    },
    google: {
      steps: ['Go to Google AI Studio', 'Sign in with Google account', 'Click "Get API Key"', 'Create API key', 'Copy the key'],
      link: 'https://makersuite.google.com/app/apikey'
    },
    groq: {
      steps: ['Visit Groq Console', 'Sign up for free', 'Go to API Keys', 'Create new key', 'Save your key'],
      link: 'https://console.groq.com/keys'
    },
    openrouter: {
      steps: ['Go to OpenRouter', 'Sign up with email', 'Navigate to Keys', 'Generate API key', 'Copy and store securely'],
      link: 'https://openrouter.ai/keys'
    },
    deepseek: {
      steps: ['Visit DeepSeek Platform', 'Register account', 'Go to API Keys page', 'Apply for API access', 'Get your key'],
      link: 'https://platform.deepseek.com/api_keys'
    },
    megallm: {
      steps: ['Visit MegaLLM', 'Create account', 'Go to API Keys section', 'Generate new key', 'Copy your key'],
      link: 'https://megallm.io/api-keys'
    },
    mistral: {
      steps: ['Go to Mistral Console', 'Sign up', 'Navigate to API Keys', 'Create key', 'Save securely'],
      link: 'https://console.mistral.ai/api-keys'
    },
    fireworks: {
      steps: ['Visit Fireworks AI', 'Create account', 'Go to API Keys', 'Generate key', 'Copy key'],
      link: 'https://fireworks.ai/api-keys'
    },
    xai: {
      steps: ['Go to xAI Console', 'Sign up', 'Navigate to API section', 'Create API key', 'Save key'],
      link: 'https://console.x.ai'
    },
    cohere: {
      steps: ['Visit Cohere Dashboard', 'Sign up', 'Go to API Keys', 'Create new key', 'Copy key'],
      link: 'https://dashboard.cohere.com/api-keys'
    },
    together: {
      steps: ['Go to Together AI', 'Create account', 'Navigate to API Keys', 'Generate key', 'Save key'],
      link: 'https://api.together.xyz/settings/api-keys'
    },
    replicate: {
      steps: ['Visit Replicate', 'Sign up', 'Go to Account Settings', 'Find API tokens', 'Create token'],
      link: 'https://replicate.com/account/api-tokens'
    },
    huggingface: {
      steps: ['Go to Hugging Face', 'Create account', 'Go to Settings', 'Access Tokens', 'Create new token'],
      link: 'https://huggingface.co/settings/tokens'
    },
    perplexity: {
      steps: ['Visit Perplexity', 'Sign up', 'Go to API section', 'Generate key', 'Copy key'],
      link: 'https://www.perplexity.ai/settings/api'
    },
    ai21: {
      steps: ['Go to AI21 Studio', 'Create account', 'Navigate to API Keys', 'Generate key', 'Save key'],
      link: 'https://studio.ai21.com/account/api-key'
    },
    minimax: {
      steps: ['Visit MiniMax', 'Register', 'Go to API Keys', 'Create key', 'Copy key'],
      link: 'https://api.minimax.chat'
    },
    ollama: {
      steps: ['Download Ollama from website', 'Install on your machine', 'Run "ollama serve"', 'No API key needed', 'Use localhost:11434'],
      link: 'https://ollama.ai/download'
    },
    lmstudio: {
      steps: ['Download LM Studio', 'Install application', 'Load a model', 'Start local server', 'No API key needed'],
      link: 'https://lmstudio.ai'
    }
  };

  return steps[providerId] || {
    steps: ['Visit provider website', 'Create account', 'Navigate to API section', 'Generate API key', 'Copy and save key'],
    link: '#'
  };
};
