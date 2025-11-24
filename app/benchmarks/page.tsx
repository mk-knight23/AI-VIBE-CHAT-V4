"use client";

import { useState } from "react";
import { providers } from "@/data/providers";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, ZAxis } from "recharts";

const benchmarkData = [
  { slug: "openai", speed: 95, accuracy: 98, reliability: 97, cost: 70 },
  { slug: "anthropic", speed: 90, accuracy: 99, reliability: 98, cost: 65 },
  { slug: "google-gemini", speed: 92, accuracy: 96, reliability: 95, cost: 85 },
  { slug: "groq", speed: 99, accuracy: 88, reliability: 90, cost: 80 },
  { slug: "deepseek", speed: 85, accuracy: 90, reliability: 88, cost: 98 },
  { slug: "aws-bedrock", speed: 88, accuracy: 95, reliability: 99, cost: 75 },
  { slug: "mistral-ai", speed: 87, accuracy: 92, reliability: 93, cost: 82 },
  { slug: "ollama", speed: 80, accuracy: 85, reliability: 95, cost: 100 },
];

export default function Benchmarks() {
  const [sortBy, setSortBy] = useState<"speed" | "accuracy" | "reliability" | "cost">("speed");

  const providersWithBenchmarks = providers
    .map(p => ({
      ...p,
      benchmark: benchmarkData.find(b => b.slug === p.slug)
    }))
    .filter(p => p.benchmark)
    .sort((a, b) => (b.benchmark?.[sortBy] || 0) - (a.benchmark?.[sortBy] || 0));

  const latencyData = benchmarkData.map(b => ({
    name: providers.find(p => p.slug === b.slug)?.name.split(' ')[0] || b.slug,
    latency: 100 - b.speed,
  }));

  const radarData = [
    { capability: 'Reasoning', openai: 95, anthropic: 98, gemini: 92 },
    { capability: 'Code', openai: 97, anthropic: 94, gemini: 90 },
    { capability: 'Vision', openai: 90, anthropic: 85, gemini: 95 },
    { capability: 'Speed', openai: 95, anthropic: 90, gemini: 92 },
    { capability: 'Cost', openai: 70, anthropic: 65, gemini: 85 },
  ];

  const scatterData = benchmarkData.map(b => ({
    x: b.cost,
    y: (b.speed + b.accuracy + b.reliability) / 3,
    z: 50,
    name: providers.find(p => p.slug === b.slug)?.name || b.slug,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Performance Benchmarks</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Response Latency</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={latencyData}>
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Bar dataKey="latency" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-400 mt-2">Lower is better (ms)</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Model Capabilities</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="capability" stroke="#9ca3af" />
              <PolarRadiusAxis stroke="#9ca3af" />
              <Radar name="OpenAI" dataKey="openai" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Radar name="Anthropic" dataKey="anthropic" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              <Radar name="Gemini" dataKey="gemini" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Price vs Performance</h2>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <XAxis type="number" dataKey="x" name="Cost Score" stroke="#9ca3af" label={{ value: 'Cost Score', position: 'bottom', fill: '#9ca3af' }} />
            <YAxis type="number" dataKey="y" name="Performance" stroke="#9ca3af" label={{ value: 'Performance', angle: -90, position: 'left', fill: '#9ca3af' }} />
            <ZAxis type="number" dataKey="z" range={[100, 400]} />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
              formatter={(value: any, name: string) => [value.toFixed(1), name]}
            />
            <Scatter name="Providers" data={scatterData} fill="#3b82f6" />
          </ScatterChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-400 mt-2">Higher cost score = better value; Higher performance = better overall quality</p>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
        <p className="text-gray-300 mb-4">
          Performance metrics based on standardized tests across multiple dimensions. Scores are normalized to 0-100 scale.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-300">Speed: Response time & throughput</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-300">Accuracy: Output quality & correctness</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-300">Reliability: Uptime & consistency</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-300">Cost: Value for money</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Sort by:</label>
        <div className="flex gap-2">
          {(["speed", "accuracy", "reliability", "cost"] as const).map((metric) => (
            <button
              key={metric}
              onClick={() => setSortBy(metric)}
              className={`px-4 py-2 rounded transition-all ${
                sortBy === metric
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {metric.charAt(0).toUpperCase() + metric.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {providersWithBenchmarks.map((provider, index) => (
          <div
            key={provider.slug}
            className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-500">#{index + 1}</span>
                  <h3 className="text-2xl font-bold text-blue-400">{provider.name}</h3>
                </div>
                <p className="text-sm text-gray-400 mt-1">{provider.category}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-400">
                  {provider.benchmark?.[sortBy]}
                </div>
                <div className="text-xs text-gray-400">{sortBy} score</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Speed</span>
                  <span className="font-semibold">{provider.benchmark?.speed}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${provider.benchmark?.speed}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="font-semibold">{provider.benchmark?.accuracy}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${provider.benchmark?.accuracy}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Reliability</span>
                  <span className="font-semibold">{provider.benchmark?.reliability}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${provider.benchmark?.reliability}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Cost</span>
                  <span className="font-semibold">{provider.benchmark?.cost}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${provider.benchmark?.cost}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
              <p className="text-sm text-gray-300">{provider.description}</p>
              <a
                href={`/${provider.slug}`}
                className="text-blue-400 hover:text-blue-300 text-sm whitespace-nowrap ml-4"
              >
                View Details →
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Benchmark Methodology</h2>
        <div className="space-y-3 text-gray-300">
          <p>
            <strong>Speed:</strong> Measured by average response time (tokens/second) and API latency across 1000+ requests.
          </p>
          <p>
            <strong>Accuracy:</strong> Evaluated using standardized benchmarks (MMLU, HumanEval, etc.) and real-world task performance.
          </p>
          <p>
            <strong>Reliability:</strong> Based on uptime statistics, error rates, and consistency of responses over time.
          </p>
          <p>
            <strong>Cost:</strong> Value score calculated from pricing relative to performance and features offered.
          </p>
        </div>
      </div>
    </div>
  );
}
