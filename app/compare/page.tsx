"use client";

import { useState } from "react";
import { providers } from "@/data/providers";
import Link from "next/link";

export default function Compare() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleProvider = (slug: string) => {
    if (selected.includes(slug)) {
      setSelected(selected.filter(s => s !== slug));
    } else if (selected.length < 4) {
      setSelected([...selected, slug]);
    }
  };

  const selectedProviders = providers.filter(p => selected.includes(p.slug));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Compare Providers</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Select up to 4 providers to compare</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {providers.map((provider) => (
            <button
              key={provider.slug}
              onClick={() => toggleProvider(provider.slug)}
              disabled={!selected.includes(provider.slug) && selected.length >= 4}
              className={`p-3 rounded-lg border-2 transition-all text-left ${
                selected.includes(provider.slug)
                  ? "border-blue-500 bg-blue-900/30"
                  : "border-gray-700 bg-gray-800 hover:border-gray-600"
              } ${!selected.includes(provider.slug) && selected.length >= 4 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="font-semibold text-sm">{provider.name}</div>
              <div className="text-xs text-gray-400">{provider.category}</div>
            </button>
          ))}
        </div>
      </div>

      {selectedProviders.length > 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left sticky left-0 bg-gray-900">Feature</th>
                {selectedProviders.map((provider) => (
                  <th key={provider.slug} className="px-4 py-3 text-left min-w-[200px]">
                    <Link href={`/${provider.slug}`} className="text-blue-400 hover:text-blue-300">
                      {provider.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-700">
                <td className="px-4 py-3 font-semibold sticky left-0 bg-gray-800">Category</td>
                {selectedProviders.map((provider) => (
                  <td key={provider.slug} className="px-4 py-3 text-gray-300">{provider.category}</td>
                ))}
              </tr>
              <tr className="border-t border-gray-700">
                <td className="px-4 py-3 font-semibold sticky left-0 bg-gray-800">Description</td>
                {selectedProviders.map((provider) => (
                  <td key={provider.slug} className="px-4 py-3 text-gray-300 text-sm">{provider.description}</td>
                ))}
              </tr>
              <tr className="border-t border-gray-700">
                <td className="px-4 py-3 font-semibold sticky left-0 bg-gray-800">Free Tier</td>
                {selectedProviders.map((provider) => (
                  <td key={provider.slug} className="px-4 py-3 text-gray-300 text-sm">{provider.pricing.free}</td>
                ))}
              </tr>
              <tr className="border-t border-gray-700">
                <td className="px-4 py-3 font-semibold sticky left-0 bg-gray-800">Paid Pricing</td>
                {selectedProviders.map((provider) => (
                  <td key={provider.slug} className="px-4 py-3 text-gray-300 text-sm">{provider.pricing.paid}</td>
                ))}
              </tr>
              <tr className="border-t border-gray-700">
                <td className="px-4 py-3 font-semibold sticky left-0 bg-gray-800">Free Models</td>
                {selectedProviders.map((provider) => (
                  <td key={provider.slug} className="px-4 py-3 text-gray-300 text-sm">
                    {provider.models.free.length > 0 ? provider.models.free.join(", ") : "None"}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-700">
                <td className="px-4 py-3 font-semibold sticky left-0 bg-gray-800">Paid Models</td>
                {selectedProviders.map((provider) => (
                  <td key={provider.slug} className="px-4 py-3 text-gray-300 text-sm">
                    {provider.models.paid.slice(0, 3).join(", ")}
                    {provider.models.paid.length > 3 && "..."}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-700">
                <td className="px-4 py-3 font-semibold sticky left-0 bg-gray-800">API Key</td>
                {selectedProviders.map((provider) => (
                  <td key={provider.slug} className="px-4 py-3 text-gray-300 text-sm font-mono">{provider.apiKeyName}</td>
                ))}
              </tr>
              <tr className="border-t border-gray-700">
                <td className="px-4 py-3 font-semibold sticky left-0 bg-gray-800">Base URL</td>
                {selectedProviders.map((provider) => (
                  <td key={provider.slug} className="px-4 py-3 text-gray-300 text-sm font-mono break-all">{provider.baseUrl}</td>
                ))}
              </tr>
              <tr className="border-t border-gray-700">
                <td className="px-4 py-3 font-semibold sticky left-0 bg-gray-800">Use Cases</td>
                {selectedProviders.map((provider) => (
                  <td key={provider.slug} className="px-4 py-3 text-gray-300 text-sm">
                    {provider.useCases.slice(0, 3).join(", ")}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-gray-700">
                <td className="px-4 py-3 font-semibold sticky left-0 bg-gray-800">Documentation</td>
                {selectedProviders.map((provider) => (
                  <td key={provider.slug} className="px-4 py-3">
                    <a href={provider.docsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                      View Docs
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {selectedProviders.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-xl">Select providers above to start comparing</p>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">Use Case Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">For Chatbots</h3>
            <p className="text-gray-300 mb-3">Best: OpenAI, Anthropic, Google Gemini</p>
            <p className="text-sm text-gray-400">These providers offer strong conversational abilities with good context handling and safety features.</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">For Code Generation</h3>
            <p className="text-gray-300 mb-3">Best: Claude Code, OpenAI, DeepSeek</p>
            <p className="text-sm text-gray-400">Specialized models with strong programming capabilities and debugging support.</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">For Cost Optimization</h3>
            <p className="text-gray-300 mb-3">Best: OpenRouter, MegaLLM, DeepSeek</p>
            <p className="text-sm text-gray-400">Routers automatically select the cheapest provider, while DeepSeek offers ultra-low direct pricing.</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">For Privacy</h3>
            <p className="text-gray-300 mb-3">Best: Ollama, LM Studio</p>
            <p className="text-sm text-gray-400">Run models locally with no data leaving your infrastructure.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
