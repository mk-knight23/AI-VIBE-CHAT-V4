"use client";

import { useState } from "react";
import Link from "next/link";
import { providers } from "@/data/providers";
import { Filter } from "lucide-react";

const categoryColors = {
  "Cloud Giant": "bg-purple-600",
  "Specialized": "bg-blue-600",
  "Local/Open-Source": "bg-green-600",
  "Router/Gateway": "bg-orange-600",
  "Emerging/Niche": "bg-pink-600",
};

export default function ProvidersPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hasFreeTier, setHasFreeTier] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "category">("name");

  let filtered = providers.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    const matchesFreeTier = !hasFreeTier || (p.pricing.free !== "None." && p.pricing.free !== "None");
    return matchesSearch && matchesCategory && matchesFreeTier;
  });

  if (sortBy === "name") {
    filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    filtered = filtered.sort((a, b) => a.category.localeCompare(b.category));
  }

  const categories = Array.from(new Set(providers.map(p => p.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">All Providers</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 sticky top-20">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={20} className="text-blue-400" />
              <h2 className="text-xl font-bold text-blue-400">Filters</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Search</label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search providers..."
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded transition-colors ${
                      !selectedCategory ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Features</label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasFreeTier}
                    onChange={(e) => setHasFreeTier(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>Has Free Tier</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "name" | "category")}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Name</option>
                  <option value="category">Category</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mb-4 text-gray-400">
            Showing {filtered.length} of {providers.length} providers
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((provider) => (
              <Link
                key={provider.slug}
                href={`/${provider.slug}`}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-blue-400">
                    {provider.name}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded ${categoryColors[provider.category]} text-white`}>
                    {provider.category}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{provider.description}</p>
                <div className="flex flex-wrap gap-2">
                  {provider.pricing.free !== "None." && provider.pricing.free !== "None" && (
                    <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded border border-green-700">
                      Free Tier
                    </span>
                  )}
                  {provider.models.free.length > 0 && (
                    <span className="text-xs px-2 py-1 bg-blue-900/30 text-blue-400 rounded border border-blue-700">
                      Free Models
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-xl">No providers found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
