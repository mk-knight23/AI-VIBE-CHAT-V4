import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Input validation schema
const ProxyRequestSchema = z.object({
  provider: z.enum([
    "openai",
    "anthropic",
    "google",
    "cohere",
    "groq",
    "deepseek",
    "mistral",
    "fireworks",
    "xai",
    "together",
    "huggingface",
    "openrouter",
    "ollama",
    "megallm",
    "replicate",
    "perplexity",
    "ai21",
  ]),
  model: z.string().min(1).max(200),
  prompt: z.string().min(1).max(100000), // Limit prompt size
  temperature: z.number().min(0).max(2).optional().default(0.7),
  maxTokens: z.number().min(1).max(32000).optional().default(500),
  baseUrl: z.string().url().optional(),
});

// In-memory rate limiting (simple implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute in ms

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

// Get API key from environment
function getApiKey(provider: string): string | null {
  const keyMap: Record<string, string> = {
    openai: process.env.OPENAI_API_KEY || "",
    anthropic: process.env.ANTHROPIC_API_KEY || "",
    google: process.env.GOOGLE_API_KEY || "",
    cohere: process.env.COHERE_API_KEY || "",
    groq: process.env.GROQ_API_KEY || "",
    deepseek: process.env.DEEPSEEK_API_KEY || "",
    mistral: process.env.MISTRAL_API_KEY || "",
    fireworks: process.env.FIREWORKS_API_KEY || "",
    xai: process.env.XAI_API_KEY || "",
    together: process.env.TOGETHER_API_KEY || "",
    huggingface: process.env.HUGGINGFACE_API_KEY || "",
    openrouter: process.env.OPENROUTER_API_KEY || "",
    megallm: process.env.MEGALLM_API_KEY || "",
    replicate: process.env.REPLICATE_API_KEY || "",
    perplexity: process.env.PERPLEXITY_API_KEY || "",
    ai21: process.env.AI21_API_KEY || "",
  };

  return keyMap[provider] || null;
}

// Get base URL from environment or use default
function getBaseUrl(provider: string): string {
  const defaultUrls: Record<string, string> = {
    openai: "https://api.openai.com/v1",
    anthropic: "https://api.anthropic.com/v1",
    google: "https://generativelanguage.googleapis.com/v1beta",
    cohere: "https://api.cohere.ai/v1",
    groq: "https://api.groq.com/openai/v1",
    deepseek: "https://api.deepseek.com/v1",
    mistral: "https://api.mistral.ai/v1",
    fireworks: "https://api.fireworks.ai/inference/v1",
    xai: "https://api.x.ai/v1",
    together: "https://api.together.xyz/v1",
    huggingface: "https://api-inference.huggingface.co",
    openrouter: "https://openrouter.ai/api/v1",
    megallm: process.env.MEGALLM_BASE_URL || "https://api.megallm.io/v1",
    replicate: "https://api.replicate.com/v1",
    perplexity: "https://api.perplexity.ai",
    ai21: "https://api.ai21.com/v1",
    ollama: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
  };

  return defaultUrls[provider] || "";
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = ProxyRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: validationResult.error.errors },
        { status: 400 },
      );
    }

    const {
      provider,
      model,
      prompt,
      temperature,
      maxTokens,
      baseUrl: customBaseUrl,
    } = validationResult.data;

    // Get API key from environment
    const apiKey = getApiKey(provider);
    if (!apiKey && provider !== "ollama") {
      return NextResponse.json(
        { error: `API key not configured for provider: ${provider}` },
        { status: 500 },
      );
    }

    // Assert apiKey is non-null for non-ollama providers (TypeScript guard)
    const effectiveApiKey: string = apiKey ?? "";

    // Determine base URL
    const baseUrl = customBaseUrl || getBaseUrl(provider);

    // Build API request
    let apiUrl = "";
    let headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    let requestBody: any = {};

    // Configure request based on provider
    if (
      [
        "openai",
        "groq",
        "deepseek",
        "openrouter",
        "megallm",
        "mistral",
        "fireworks",
        "xai",
        "together",
        "replicate",
        "perplexity",
        "ai21",
      ].includes(provider)
    ) {
      apiUrl = `${baseUrl}/chat/completions`;
      headers["Authorization"] = `Bearer ${effectiveApiKey}`;
      requestBody = {
        model,
        messages: [{ role: "user", content: prompt }],
        temperature,
        max_tokens: maxTokens,
      };
    } else if (provider === "cohere") {
      apiUrl = `${baseUrl}/chat`;
      headers["Authorization"] = `Bearer ${effectiveApiKey}`;
      requestBody = {
        model,
        message: prompt,
        temperature,
        max_tokens: maxTokens,
      };
    } else if (provider === "huggingface") {
      apiUrl = `${baseUrl}/models/${model}`;
      headers["Authorization"] = `Bearer ${effectiveApiKey}`;
      requestBody = {
        inputs: prompt,
        parameters: {
          temperature,
          max_new_tokens: maxTokens,
        },
      };
    } else if (provider === "anthropic") {
      apiUrl = `${baseUrl}/messages`;
      headers["x-api-key"] = effectiveApiKey;
      headers["anthropic-version"] = "2023-06-01";
      requestBody = {
        model,
        messages: [{ role: "user", content: prompt }],
        temperature,
        max_tokens: maxTokens,
      };
    } else if (provider === "google") {
      apiUrl = `${baseUrl}/models/${model}:generateContent?key=${effectiveApiKey}`;
      requestBody = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature,
          maxOutputTokens: maxTokens,
        },
      };
    } else if (provider === "ollama") {
      apiUrl = `${baseUrl}/api/chat`;
      requestBody = {
        model,
        messages: [{ role: "user", content: prompt }],
        stream: false,
      };
    }

    // Make API call with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      return NextResponse.json(
        { error: `API Error: ${response.status}`, details: errorText },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Extract response based on provider
    let extractedResponse = "";
    if (
      [
        "openai",
        "groq",
        "deepseek",
        "openrouter",
        "megallm",
        "mistral",
        "fireworks",
        "xai",
        "together",
        "replicate",
        "perplexity",
        "ai21",
      ].includes(provider)
    ) {
      extractedResponse =
        data.choices?.[0]?.message?.content || JSON.stringify(data);
    } else if (provider === "cohere") {
      extractedResponse = data.text || JSON.stringify(data);
    } else if (provider === "huggingface") {
      extractedResponse = Array.isArray(data)
        ? data[0]?.generated_text || JSON.stringify(data)
        : JSON.stringify(data);
    } else if (provider === "anthropic") {
      extractedResponse = data.content?.[0]?.text || JSON.stringify(data);
    } else if (provider === "google") {
      extractedResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text || JSON.stringify(data);
    } else if (provider === "ollama") {
      extractedResponse = data.message?.content || JSON.stringify(data);
    } else {
      extractedResponse = JSON.stringify(data);
    }

    return NextResponse.json({ response: extractedResponse });
  } catch (error) {
    console.error("Proxy error:", error);

    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json({ error: "Request timeout" }, { status: 504 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
