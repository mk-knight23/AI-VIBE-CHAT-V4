export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-6">About AI API Providers</h1>
      
      <div className="space-y-6 text-gray-300">
        <p className="text-lg">
          Welcome to AI API Providers, your comprehensive guide to navigating the rapidly evolving landscape of artificial intelligence APIs.
        </p>

        <p>
          In 2025, the AI API market has become highly competitive with over 50 providers offering diverse solutions. This platform showcases <span className="text-blue-400 font-bold">30 key providers</span>, helping you make informed decisions for your AI integration needs.
        </p>

        <h2 className="text-2xl font-bold text-blue-400 mt-8 mb-4">Market Overview</h2>
        <p>
          The AI API landscape features intense competition, particularly from Chinese models like DeepSeek that have driven costs down significantly. Providers differentiate through specialization:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Safety and reliability (Anthropic)</li>
          <li>Speed and performance (Groq)</li>
          <li>Local deployment (Ollama, LM Studio)</li>
          <li>Multi-provider routing (OpenRouter)</li>
          <li>European compliance (OVHcloud, Mistral AI)</li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-400 mt-8 mb-4">Our Mission</h2>
        <p>
          We aim to provide accurate, up-to-date information on AI API providers, including their features, pricing, models, and use cases. Whether you're building chatbots, generating content, or developing complex AI agents, we help you find the right provider for your needs.
        </p>

        <h2 className="text-2xl font-bold text-blue-400 mt-8 mb-4">Key Trends</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Token-based pricing with competitive rates nearing zero for basic models</li>
          <li>Expanded context windows (up to 2M tokens for some providers)</li>
          <li>Multimodal capabilities (text, image, audio, video)</li>
          <li>Cost optimization through caching and batch processing (50-90% savings)</li>
          <li>Hybrid approaches using routers for flexibility and cost savings</li>
        </ul>
      </div>
    </div>
  );
}
