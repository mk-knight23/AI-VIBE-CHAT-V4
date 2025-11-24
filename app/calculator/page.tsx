"use client";

import { useState } from "react";
import { providers } from "@/data/providers";

export default function Calculator() {
  const [inputTokens, setInputTokens] = useState(1000000);
  const [outputTokens, setOutputTokens] = useState(1000000);
  const [apiCalls, setApiCalls] = useState(1000);

  const calculateCost = (provider: typeof providers[0]) => {
    const pricingText = provider.pricing.paid.toLowerCase();
    
    // Extract pricing from text (simplified estimation)
    let inputCost = 0;
    let outputCost = 0;
    
    if (pricingText.includes('$')) {
      const matches = pricingText.match(/\$(\d+\.?\d*)/g);
      if (matches && matches.length >= 2) {
        inputCost = parseFloat(matches[0].replace('$', ''));
        outputCost = parseFloat(matches[1].replace('$', ''));
      }
    }
    
    const totalCost = (inputTokens / 1000000) * inputCost + (outputTokens / 1000000) * outputCost;
    return totalCost > 0 ? totalCost : null;
  };

  const providersWithCosts = providers
    .map(p => ({ provider: p, cost: calculateCost(p) }))
    .filter(p => p.cost !== null)
    .sort((a, b) => (a.cost || 0) - (b.cost || 0));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Pricing Calculator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-1">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 sticky top-20">
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Usage Inputs</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Input Tokens (per month)
                </label>
                <input
                  type="number"
                  value={inputTokens}
                  onChange={(e) => setInputTokens(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {(inputTokens / 1000000).toFixed(2)}M tokens
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Output Tokens (per month)
                </label>
                <input
                  type="number"
                  value={outputTokens}
                  onChange={(e) => setOutputTokens(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {(outputTokens / 1000000).toFixed(2)}M tokens
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  API Calls (per month)
                </label>
                <input
                  type="number"
                  value={apiCalls}
                  onChange={(e) => setApiCalls(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {(apiCalls / 1000).toFixed(1)}K calls
                </p>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <h3 className="font-semibold mb-2">Quick Presets</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setInputTokens(100000);
                      setOutputTokens(100000);
                      setApiCalls(100);
                    }}
                    className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                  >
                    Small Project
                  </button>
                  <button
                    onClick={() => {
                      setInputTokens(1000000);
                      setOutputTokens(1000000);
                      setApiCalls(1000);
                    }}
                    className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                  >
                    Medium Project
                  </button>
                  <button
                    onClick={() => {
                      setInputTokens(10000000);
                      setOutputTokens(10000000);
                      setApiCalls(10000);
                    }}
                    className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                  >
                    Large Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 text-blue-400">Cost Estimates</h2>
          
          {providersWithCosts.length > 0 ? (
            <div className="space-y-4">
              {providersWithCosts.map(({ provider, cost }, index) => (
                <div
                  key={provider.slug}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-blue-400">{provider.name}</h3>
                      <p className="text-sm text-gray-400">{provider.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-400">
                        ${cost?.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-400">per month</div>
                    </div>
                  </div>
                  
                  {index === 0 && (
                    <div className="bg-green-900/30 border border-green-700 rounded px-3 py-1 inline-block text-sm text-green-400 mb-2">
                      Best Value
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-300 mb-3">{provider.pricing.paid}</p>
                  
                  <a
                    href={`/${provider.slug}`}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    View Details →
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-400">
                Cost estimates available for providers with clear pricing information
              </p>
            </div>
          )}
        </div>
      </div>

      <section className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Cost Optimization Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 rounded p-4">
            <h3 className="font-semibold mb-2 text-green-400">💰 Use Caching</h3>
            <p className="text-sm text-gray-300">
              Enable prompt caching to save 75-90% on repeated inputs (Anthropic, AWS Bedrock)
            </p>
          </div>
          <div className="bg-gray-900 rounded p-4">
            <h3 className="font-semibold mb-2 text-green-400">⚡ Batch Processing</h3>
            <p className="text-sm text-gray-300">
              Use batch APIs for 50% discounts on non-urgent workloads
            </p>
          </div>
          <div className="bg-gray-900 rounded p-4">
            <h3 className="font-semibold mb-2 text-green-400">🎯 Model Selection</h3>
            <p className="text-sm text-gray-300">
              Use smaller models for simple tasks, reserve premium models for complex reasoning
            </p>
          </div>
          <div className="bg-gray-900 rounded p-4">
            <h3 className="font-semibold mb-2 text-green-400">🔄 Router Services</h3>
            <p className="text-sm text-gray-300">
              Use OpenRouter or MegaLLM to automatically select the most cost-effective provider
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
