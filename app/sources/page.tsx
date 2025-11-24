export const metadata = {
  title: "Sources - AI API Providers",
  description: "References and sources for AI API provider information",
};

export default function Sources() {
  const sources = [
    {
      title: "LLM Pricing: Top 15+ Providers Compared",
      url: "https://research.aimultiple.com/llm-pricing/",
      description: "Comprehensive pricing comparison across major LLM providers"
    },
    {
      title: "LLM API Pricing Comparison (2025): OpenAI, Gemini, Claude",
      url: "https://intuitionlabs.ai/articles/llm-api-pricing-comparison-2025",
      description: "Detailed 2025 pricing analysis for leading providers"
    },
    {
      title: "API Pricing - OpenAI",
      url: "https://openai.com/api/pricing/",
      description: "Official OpenAI API pricing documentation"
    },
    {
      title: "LLM API Pricing Comparison 2025: Complete Cost Analysis Guide",
      url: "https://www.binadox.com/blog/llm-api-pricing-comparison-2025-complete-cost-analysis-guide/",
      description: "In-depth cost analysis and comparison guide"
    },
    {
      title: "Free OpenAI & every-LLM API Pricing Calculator",
      url: "https://docsbot.ai/tools/gpt-openai-api-pricing-calculator",
      description: "Interactive pricing calculator for various LLM APIs"
    },
    {
      title: "Comparing API Pricing of Leading AI Models",
      url: "https://www.pipemind.com/en/post/comparing-api-pricing-of-leading-ai-models-for-chatbots-analytics-and-embeddings",
      description: "Pricing comparison for chatbots and analytics use cases"
    },
    {
      title: "AI APIs Compared: Which Provider Delivers Best Value in 2025?",
      url: "https://aijourn.com/ai-apis-compared-which-provider-delivers-best-value-in-2025/",
      description: "Value analysis of AI API providers"
    },
    {
      title: "Pricing | Claude",
      url: "https://www.anthropic.com/pricing",
      description: "Official Anthropic Claude pricing"
    },
    {
      title: "Pricing - AWS Bedrock",
      url: "https://aws.amazon.com/bedrock/pricing/",
      description: "Official AWS Bedrock pricing documentation"
    },
    {
      title: "Vertex AI pricing",
      url: "https://cloud.google.com/vertex-ai/pricing",
      description: "Official Google Cloud Vertex AI pricing"
    },
    {
      title: "AI Endpoints – OVHcloud",
      url: "https://endpoints.ai.cloud.ovh.net/pricing",
      description: "OVHcloud AI Endpoints pricing information"
    },
    {
      title: "API | xAI",
      url: "https://x.ai/api",
      description: "Official xAI Grok API documentation"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-6">Sources & References</h1>
      
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
        <p className="text-gray-300">
          All information on this website is compiled from official documentation, industry research, and pricing comparisons as of 2025. 
          We strive to keep information accurate and up-to-date, but pricing and features are subject to change. 
          Always verify current information on official provider websites before making decisions.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-blue-400">Key References</h2>
      <div className="space-y-4">
        {sources.map((source, index) => (
          <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors">
            <h3 className="text-lg font-semibold mb-2">
              <a 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                {source.title}
              </a>
            </h3>
            <p className="text-gray-400 text-sm mb-2">{source.description}</p>
            <a 
              href={source.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-400 break-all"
            >
              {source.url}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Additional Resources</h2>
        <ul className="space-y-2 text-gray-300">
          <li>• Official provider documentation and API references</li>
          <li>• Industry reports and market analysis from 2025</li>
          <li>• Community feedback and user reviews</li>
          <li>• Pricing calculators and comparison tools</li>
        </ul>
      </div>
    </div>
  );
}
