"use client";

import { useState } from "react";
import Link from "next/link";
import { providers } from "@/data/providers";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { ArrowRight, TrendingDown } from "lucide-react";

const categories = ["All", "Cloud Giant", "Specialized", "Local/Open-Source", "Router/Gateway", "Emerging/Niche"];

const categoryColors = {
  "Cloud Giant": "bg-purple-600",
  "Specialized": "bg-blue-600",
  "Local/Open-Source": "bg-green-600",
  "Router/Gateway": "bg-orange-600",
  "Emerging/Niche": "bg-pink-600",
};

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [quickCompare, setQuickCompare] = useState<string[]>([]);

  const filtered = providers.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const featured = providers.filter(p => 
    ["openai", "anthropic", "google-gemini", "aws-bedrock", "openrouter", "ollama"].includes(p.slug)
  );

  const toggleQuickCompare = (slug: string) => {
    if (quickCompare.includes(slug)) {
      setQuickCompare(quickCompare.filter(s => s !== slug));
    } else if (quickCompare.length < 3) {
      setQuickCompare([...quickCompare, slug]);
    }
  };

  const quickCompareProviders = providers.filter(p => quickCompare.includes(p.slug));

  const categoryData = [
    { name: 'Cloud Giant', value: 4 },
    { name: 'Specialized', value: 7 },
    { name: 'Local/Open-Source', value: 2 },
    { name: 'Router/Gateway', value: 7 },
    { name: 'Emerging/Niche', value: 8 },
  ];

  const priceData = [
    { month: 'Jan', price: 100 },
    { month: 'Feb', price: 85 },
    { month: 'Mar', price: 70 },
    { month: 'Apr', price: 55 },
    { month: 'May', price: 45 },
    { month: 'Jun', price: 35 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          AI API Providers
        </h1>
        <p className="text-2xl text-gray-400 mb-2 max-w-3xl mx-auto">
          Discover, compare, and choose from <span className="text-blue-400 font-bold">30 AI API providers</span> for your next project
        </p>
        <p className="text-lg text-gray-500 mb-8">
          Complete with pricing, models, and API key setup guides
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/providers"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all flex items-center gap-2 text-lg"
          >
            Explore Providers <ArrowRight size={20} />
          </Link>
          <Link
            href="/playground"
            className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg transition-all text-lg border border-gray-700"
          >
            Try Playground
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-blue-400">Provider Categories</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-bold text-blue-400">Price War Trend</h3>
            <TrendingDown className="text-green-400" size={24} />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={priceData}>
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-400 mt-2">Average cost per 1M tokens (indexed)</p>
        </div>
      </div>

      <div className="text-center mb-8">
        <input
          type="text"
          placeholder="Search providers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-2xl px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
        />
      </div>

      {quickCompare.length > 0 && (
        <div className="mb-8 bg-blue-900/20 border border-blue-700 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-blue-400">Quick Compare ({quickCompare.length}/3)</h3>
            <button
              onClick={() => setQuickCompare([])}
              className="text-sm text-gray-400 hover:text-white"
            >
              Clear All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {quickCompareProviders.map(p => (
              <div key={p.slug} className="bg-gray-800 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-blue-400">{p.name}</div>
                    <div className="text-xs text-gray-400">{p.category}</div>
                  </div>
                  <button
                    onClick={() => toggleQuickCompare(p.slug)}
                    className="text-red-400 hover:text-red-300"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/compare"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
          >
            Full Comparison →
          </Link>
        </div>
      )}

      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg transition-all ${
                category === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {search === "" && category === "All" && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-400">Featured Providers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((provider) => (
              <div
                key={provider.slug}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-blue-400">
                    {provider.name}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded ${categoryColors[provider.category]} text-white`}>
                    {provider.category}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{provider.description}</p>
                <div className="flex gap-2">
                  <Link
                    href={`/${provider.slug}`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-all hover:shadow-lg"
                  >
                    Learn More
                  </Link>
                  <button
                    onClick={() => toggleQuickCompare(provider.slug)}
                    disabled={!quickCompare.includes(provider.slug) && quickCompare.length >= 3}
                    className={`px-4 py-2 rounded transition-all ${
                      quickCompare.includes(provider.slug)
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    } ${!quickCompare.includes(provider.slug) && quickCompare.length >= 3 ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {quickCompare.includes(provider.slug) ? "✓" : "+"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-3xl font-bold mb-6 text-blue-400">
          {category === "All" ? "All Providers" : category}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((provider) => (
            <div
              key={provider.slug}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold text-blue-400">
                  {provider.name}
                </h3>
                <span className={`text-xs px-2 py-1 rounded ${categoryColors[provider.category]} text-white`}>
                  {provider.category}
                </span>
              </div>
              <p className="text-gray-300 mb-4">{provider.description}</p>
              <div className="flex gap-2">
                <Link
                  href={`/${provider.slug}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                >
                  Learn More
                </Link>
                <button
                  onClick={() => toggleQuickCompare(provider.slug)}
                  disabled={!quickCompare.includes(provider.slug) && quickCompare.length >= 3}
                  className={`px-4 py-2 rounded transition-all ${
                    quickCompare.includes(provider.slug)
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  } ${!quickCompare.includes(provider.slug) && quickCompare.length >= 3 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {quickCompare.includes(provider.slug) ? "✓" : "+"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-8">
          No providers found matching your search.
        </p>
      )}
    </div>
  );
}
