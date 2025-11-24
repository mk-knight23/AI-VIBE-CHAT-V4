import { providers } from "@/data/providers";

export const metadata = {
  title: "Market Overview - AI API Providers",
  description: "Comprehensive overview of the AI API market including trends, pricing, and provider categories",
};

export default function MarketOverview() {
  const categoryCount = providers.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const freeProviders = providers.filter(p => p.pricing.free !== "None." && p.pricing.free !== "None");
  const localProviders = providers.filter(p => p.category === "Local/Open-Source");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Market Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-6">
          <div className="text-4xl font-bold mb-2">30</div>
          <div className="text-blue-100">Total Providers</div>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6">
          <div className="text-4xl font-bold mb-2">{freeProviders.length}</div>
          <div className="text-green-100">Free Tier Available</div>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6">
          <div className="text-4xl font-bold mb-2">{localProviders.length}</div>
          <div className="text-purple-100">Local/Open-Source</div>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-lg p-6">
          <div className="text-4xl font-bold mb-2">{categoryCount["Router/Gateway"] || 0}</div>
          <div className="text-orange-100">Routers/Gateways</div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">Provider Categories</h2>
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Count</th>
                <th className="px-6 py-4 text-left">Key Strengths</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-700">
                <td className="px-6 py-4 font-semibold">Cloud Giant</td>
                <td className="px-6 py-4">{categoryCount["Cloud Giant"] || 0}</td>
                <td className="px-6 py-4 text-gray-300">Scalability, integrations, multimodal</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="px-6 py-4 font-semibold">Specialized</td>
                <td className="px-6 py-4">{categoryCount["Specialized"] || 0}</td>
                <td className="px-6 py-4 text-gray-300">Safety/reasoning, efficiency, speed</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="px-6 py-4 font-semibold">Local/Open-Source</td>
                <td className="px-6 py-4">{categoryCount["Local/Open-Source"] || 0}</td>
                <td className="px-6 py-4 text-gray-300">No cost, privacy, offline capability</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="px-6 py-4 font-semibold">Router/Gateway</td>
                <td className="px-6 py-4">{categoryCount["Router/Gateway"] || 0}</td>
                <td className="px-6 py-4 text-gray-300">Flexibility, cost optimization</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="px-6 py-4 font-semibold">Emerging/Niche</td>
                <td className="px-6 py-4">{categoryCount["Emerging/Niche"] || 0}</td>
                <td className="px-6 py-4 text-gray-300">Low prices, specialized features</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">Market Trends 2025</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">Price Wars</h3>
            <p className="text-gray-300">
              Chinese models like DeepSeek have driven costs down significantly, with token rates nearing zero for basic models. This challenges Western providers to compete on price.
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">Context Windows</h3>
            <p className="text-gray-300">
              Context windows have expanded dramatically, with some providers offering up to 2M tokens, enabling complex document analysis and long-form content generation.
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">Multimodal Capabilities</h3>
            <p className="text-gray-300">
              Most major providers now support text, image, audio, and video processing, enabling richer AI applications across multiple content types.
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">Cost Optimization</h3>
            <p className="text-gray-300">
              Caching and batch processing offer 50-90% savings. Hybrid approaches using routers can save an additional 40% through intelligent model selection.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">Cost-Saving Strategies</h2>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">1</div>
              <div>
                <h4 className="font-semibold mb-1">Token Optimization</h4>
                <p className="text-gray-300">Use shorter prompts and enable caching for 75-90% savings on repeated inputs</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">2</div>
              <div>
                <h4 className="font-semibold mb-1">Model Mixing</h4>
                <p className="text-gray-300">Use cheaper models (e.g., Haiku) for simple tasks, premium models (e.g., Opus) for complex reasoning</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">3</div>
              <div>
                <h4 className="font-semibold mb-1">Batch Processing</h4>
                <p className="text-gray-300">Use batch APIs for 50% discounts on non-urgent workloads (OpenAI, Anthropic, AWS Bedrock)</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">4</div>
              <div>
                <h4 className="font-semibold mb-1">Local Alternatives</h4>
                <p className="text-gray-300">Use Ollama or LM Studio for development and testing to avoid cloud costs entirely</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">5</div>
              <div>
                <h4 className="font-semibold mb-1">Router Services</h4>
                <p className="text-gray-300">Use OpenRouter or MegaLLM to automatically select the most cost-effective provider for each request</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-blue-400">Recommendations by Use Case</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">Budget-Conscious</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• DeepSeek - Ultra-low pricing</li>
              <li>• Google Gemini Flash - Competitive rates</li>
              <li>• Ollama - Free local deployment</li>
            </ul>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-purple-400">Quality-Focused</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• OpenAI GPT-5 - Leading performance</li>
              <li>• Anthropic Claude - Safety & reasoning</li>
              <li>• Google Gemini Pro - Multimodal</li>
            </ul>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-orange-400">Speed-Critical</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Groq - Fastest inference</li>
              <li>• Fireworks AI - Optimized open-source</li>
              <li>• LM Studio - Local with no latency</li>
            </ul>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-400">Enterprise</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• AWS Bedrock - Full AWS integration</li>
              <li>• GCP Vertex AI - Google ecosystem</li>
              <li>• Anthropic - Safety & compliance</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
