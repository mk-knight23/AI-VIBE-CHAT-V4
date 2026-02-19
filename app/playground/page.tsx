"use client";

import { useState, useEffect } from "react";
import { PROVIDERS, getProvider } from "@/lib/registry";
import { Play, Copy, Check, Settings, AlertCircle, Info } from "lucide-react";

export default function Playground() {
  const [selectedProviderId, setSelectedProviderId] = useState("openai");
  const [selectedModelId, setSelectedModelId] = useState("");
  const [prompt, setPrompt] = useState("Hello! Can you introduce yourself?");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(500);
  const [mode, setMode] = useState<"chat" | "code" | "summarize">("chat");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [error, setError] = useState("");

  const provider = getProvider(selectedProviderId);
  const availableModels = provider?.models || [];

  useEffect(() => {
    if (availableModels.length > 0 && !selectedModelId) {
      setSelectedModelId(availableModels[0].id);
    }
  }, [selectedProviderId, availableModels, selectedModelId]);

  // Update prompt based on mode
  useEffect(() => {
    if (mode === "code") {
      setPrompt("Write a Python function to reverse a string.");
    } else if (mode === "summarize") {
      setPrompt("Summarize the benefits of using TypeScript in web development.");
    } else {
      setPrompt("Hello! Can you introduce yourself?");
    }
  }, [mode]);

  const handleRun = async () => {
    if (!provider || !selectedModelId) return;

    setLoading(true);
    setResponse("");
    setError("");

    try {
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: provider.id,
          model: selectedModelId,
          prompt,
          temperature,
          maxTokens,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `API Error: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data.response || "No response content");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
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
          <p className="text-gray-400">Test <span className="text-blue-400 font-semibold">30 AI providers</span> with server-side API calls</p>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Settings size={18} />
          {showSettings ? "Hide" : "Show"} Settings
        </button>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="text-blue-400 mt-0.5 flex-shrink-0" size={18} />
          <div>
            <h3 className="text-blue-400 font-semibold mb-1">Server-Side API Proxy</h3>
            <p className="text-sm text-gray-300">
              API keys are stored securely on the server. Configure API keys via environment variables.
              See the <code className="bg-gray-800 px-2 py-0.5 rounded text-xs">.env.example</code> file for details.
            </p>
          </div>
        </div>
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
            <div className="p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg">
              <p className="text-sm text-yellow-300">
                <strong>Note:</strong> This provider requires an API key configured on the server.
                Set the <code className="bg-gray-800 px-1 rounded text-xs">{provider.id.toUpperCase()}_API_KEY</code> environment variable.
              </p>
            </div>
          )}
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
              disabled={loading}
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

          {error && (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
              <div className="flex items-center gap-2 text-red-400 mb-2">
                <AlertCircle size={18} />
                <h3 className="font-semibold">Error</h3>
              </div>
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {response && !error && (
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
                <span className="text-gray-400">API Mode:</span>
                <span className="text-green-400">Server-Side Proxy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
