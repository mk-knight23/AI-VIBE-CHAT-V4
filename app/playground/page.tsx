"use client";

import { useState, useEffect } from "react";
import { PROVIDERS, getProvider, getApiKeySteps } from "@/lib/registry";
import { Play, Copy, Check, Settings, AlertCircle, CheckCircle, ExternalLink, HelpCircle } from "lucide-react";

export default function Playground() {
  const [selectedProviderId, setSelectedProviderId] = useState("openai");
  const [selectedModelId, setSelectedModelId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [prompt, setPrompt] = useState("Hello! Can you introduce yourself?");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(500);
  const [mode, setMode] = useState<"chat" | "code" | "summarize">("chat");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [keyValidated, setKeyValidated] = useState(false);
  const [validating, setValidating] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [configured, setConfigured] = useState(false);
  const [showKeyHelp, setShowKeyHelp] = useState(false);

  const provider = getProvider(selectedProviderId);
  const availableModels = provider?.models || [];
  const keySteps = getApiKeySteps(selectedProviderId);

  useEffect(() => {
    if (availableModels.length > 0 && !selectedModelId) {
      setSelectedModelId(availableModels[0].id);
    }
  }, [selectedProviderId, availableModels, selectedModelId]);

  useEffect(() => {
    if (provider) {
      setBaseUrl(provider.baseUrl);
      setKeyValidated(false);
      setConfigured(false);
    }
  }, [selectedProviderId, provider]);

  const validateApiKey = async () => {
    if (!provider) return;

    if (provider.requiresApiKey && !apiKey.trim()) {
      setValidationError("API key is required");
      return;
    }

    if (provider.requiresBaseUrl && !baseUrl.trim()) {
      setValidationError("Base URL is required");
      return;
    }

    setValidating(true);
    setValidationError("");

    try {
      // Test API call based on provider
      let testUrl = "";
      let headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (provider.id === "openai" || provider.id === "groq" || provider.id === "deepseek" || provider.id === "megallm" || 
          provider.id === "mistral" || provider.id === "fireworks" || provider.id === "xai" || provider.id === "cohere" ||
          provider.id === "together" || provider.id === "huggingface") {
        testUrl = `${baseUrl}/models`;
        headers["Authorization"] = `Bearer ${apiKey}`;
      } else if (provider.id === "anthropic") {
        testUrl = `${baseUrl}/messages`;
        headers["x-api-key"] = apiKey;
        headers["anthropic-version"] = "2023-06-01";
      } else if (provider.id === "google") {
        testUrl = `${baseUrl}/models?key=${apiKey}`;
      } else if (provider.id === "openrouter") {
        testUrl = `${baseUrl}/models`;
        headers["Authorization"] = `Bearer ${apiKey}`;
      } else if (provider.id === "ollama") {
        testUrl = `${baseUrl}/api/tags`;
      } else {
        // Generic validation
        setKeyValidated(true);
        setConfigured(true);
        setValidating(false);
        return;
      }

      const response = await fetch(testUrl, {
        method: "GET",
        headers,
      });

      if (response.ok) {
        setKeyValidated(true);
        setConfigured(true);
        setValidationError("");
      } else {
        setKeyValidated(false);
        setValidationError(`Validation failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setKeyValidated(false);
      setValidationError(`Connection error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setValidating(false);
    }
  };

  const handleRun = async () => {
    if (!configured) {
      setValidationError("Please configure and test your API settings first");
      return;
    }

    if (!provider || !selectedModelId) return;

    setLoading(true);
    setResponse("");
    setValidationError("");

    try {
      let apiUrl = "";
      let headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      let body: any = {};

      // Build request based on provider
      if (provider.id === "openai" || provider.id === "groq" || provider.id === "deepseek" || provider.id === "openrouter" || 
          provider.id === "megallm" || provider.id === "mistral" || provider.id === "fireworks" || provider.id === "xai" ||
          provider.id === "together" || provider.id === "replicate" || provider.id === "perplexity" || provider.id === "ai21") {
        apiUrl = `${baseUrl}/chat/completions`;
        headers["Authorization"] = `Bearer ${apiKey}`;
        body = {
          model: selectedModelId,
          messages: [{ role: "user", content: prompt }],
          temperature,
          max_tokens: maxTokens,
        };
      } else if (provider.id === "cohere") {
        apiUrl = `${baseUrl}/chat`;
        headers["Authorization"] = `Bearer ${apiKey}`;
        body = {
          model: selectedModelId,
          message: prompt,
          temperature,
          max_tokens: maxTokens,
        };
      } else if (provider.id === "huggingface") {
        apiUrl = `${baseUrl}/models/${selectedModelId}`;
        headers["Authorization"] = `Bearer ${apiKey}`;
        body = {
          inputs: prompt,
          parameters: {
            temperature,
            max_new_tokens: maxTokens,
          },
        };
      } else if (provider.id === "anthropic") {
        apiUrl = `${baseUrl}/messages`;
        headers["x-api-key"] = apiKey;
        headers["anthropic-version"] = "2023-06-01";
        body = {
          model: selectedModelId,
          messages: [{ role: "user", content: prompt }],
          temperature,
          max_tokens: maxTokens,
        };
      } else if (provider.id === "google") {
        apiUrl = `${baseUrl}/models/${selectedModelId}:generateContent?key=${apiKey}`;
        body = {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature,
            maxOutputTokens: maxTokens,
          },
        };
      } else if (provider.id === "ollama") {
        apiUrl = `${baseUrl}/api/chat`;
        body = {
          model: selectedModelId,
          messages: [{ role: "user", content: prompt }],
          stream: false,
        };
      }

      const apiResponse = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (!apiResponse.ok) {
        throw new Error(`API Error: ${apiResponse.status} ${apiResponse.statusText}`);
      }

      const data = await apiResponse.json();

      // Extract response based on provider
      let extractedResponse = "";
      if (provider.id === "openai" || provider.id === "groq" || provider.id === "deepseek" || provider.id === "openrouter" || 
          provider.id === "megallm" || provider.id === "mistral" || provider.id === "fireworks" || provider.id === "xai" ||
          provider.id === "together" || provider.id === "replicate" || provider.id === "perplexity" || provider.id === "ai21") {
        extractedResponse = data.choices?.[0]?.message?.content || JSON.stringify(data, null, 2);
      } else if (provider.id === "cohere") {
        extractedResponse = data.text || JSON.stringify(data, null, 2);
      } else if (provider.id === "huggingface") {
        extractedResponse = Array.isArray(data) ? data[0]?.generated_text || JSON.stringify(data, null, 2) : JSON.stringify(data, null, 2);
      } else if (provider.id === "anthropic") {
        extractedResponse = data.content?.[0]?.text || JSON.stringify(data, null, 2);
      } else if (provider.id === "google") {
        extractedResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || JSON.stringify(data, null, 2);
      } else if (provider.id === "ollama") {
        extractedResponse = data.message?.content || JSON.stringify(data, null, 2);
      } else {
        extractedResponse = JSON.stringify(data, null, 2);
      }

      setResponse(extractedResponse);
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">API Playground</h1>
          <p className="text-gray-400">Test <span className="text-blue-400 font-semibold">30 AI providers</span> with real API calls</p>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Settings size={18} />
          {showSettings ? "Hide" : "Show"} Settings
        </button>
      </div>

      {showSettings && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Provider</label>
              <select
                value={selectedProviderId}
                onChange={(e) => setSelectedProviderId(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {PROVIDERS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Model</label>
              <select
                value={selectedModelId}
                onChange={(e) => setSelectedModelId(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {availableModels.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              {availableModels.find(m => m.id === selectedModelId) && (
                <p className="text-xs text-gray-400 mt-1">
                  {availableModels.find(m => m.id === selectedModelId)?.description}
                </p>
              )}
            </div>
          </div>

          {provider?.requiresApiKey && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">API Key</label>
                <button
                  onClick={() => setShowKeyHelp(!showKeyHelp)}
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                >
                  <HelpCircle size={14} />
                  How to get API key?
                </button>
              </div>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setKeyValidated(false);
                  setConfigured(false);
                }}
                placeholder="Enter your API key"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              {showKeyHelp && (
                <div className="mt-3 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-400">Get your {provider.name} API Key:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300 mb-3">
                    {keySteps.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                  <a
                    href={keySteps.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
                  >
                    <ExternalLink size={14} />
                    Visit {provider.name} →
                  </a>
                </div>
              )}
            </div>
          )}

          {provider?.requiresBaseUrl && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Base URL</label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => {
                  setBaseUrl(e.target.value);
                  setKeyValidated(false);
                  setConfigured(false);
                }}
                placeholder="Enter base URL"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="flex items-center gap-4">
            <button
              onClick={validateApiKey}
              disabled={validating}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white rounded transition-colors"
            >
              {validating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Testing...
                </>
              ) : (
                <>
                  <Play size={16} />
                  Test Connection
                </>
              )}
            </button>

            {keyValidated && (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={18} />
                <span className="text-sm">Connected successfully</span>
              </div>
            )}

            {validationError && (
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle size={18} />
                <span className="text-sm">{validationError}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex gap-2 mb-4">
              {(["chat", "code", "summarize"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-4 py-2 rounded transition-all ${
                    mode === m
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>

            <label className="block text-sm font-medium mb-2">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white font-mono text-sm"
              placeholder="Enter your prompt here..."
            />

            <button
              onClick={handleRun}
              disabled={loading || !configured}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Running...
                </>
              ) : (
                <>
                  <Play size={18} />
                  Run
                </>
              )}
            </button>
          </div>

          {response && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-blue-400">Response</h3>
                <button
                  onClick={handleCopy}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="bg-gray-900 p-4 rounded overflow-x-auto whitespace-pre-wrap">
                <code className="text-sm text-green-400">{response}</code>
              </pre>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Parameters</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Temperature: {temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Precise</span>
                  <span>Creative</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Max Tokens: {maxTokens}
                </label>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-blue-400">Status</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Provider:</span>
                <span className="text-white">{provider?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Model:</span>
                <span className="text-white text-xs">{availableModels.find(m => m.id === selectedModelId)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className={configured ? "text-green-400" : "text-yellow-400"}>
                  {configured ? "Ready" : "Not Configured"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
