import { providers } from "@/data/providers";
import { notFound } from "next/navigation";
import Link from "next/link";

const categoryColors = {
  "Cloud Giant": "bg-purple-600",
  "Specialized": "bg-blue-600",
  "Local/Open-Source": "bg-green-600",
  "Router/Gateway": "bg-orange-600",
  "Emerging/Niche": "bg-pink-600",
};

export async function generateStaticParams() {
  return providers.map((provider) => ({
    slug: provider.slug,
  }));
}

export default async function ProviderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const provider = providers.find((p) => p.slug === slug);

  if (!provider) {
    notFound();
  }

  const similarProviders = providers.filter(
    p => p.category === provider.category && p.slug !== provider.slug
  ).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="text-blue-400 hover:text-blue-300 mb-6 inline-block transition-colors">
        ← Back to all providers
      </Link>

      <div className="flex items-start justify-between mb-4">
        <h1 className="text-4xl font-bold">{provider.name}</h1>
        <span className={`text-sm px-3 py-1 rounded ${categoryColors[provider.category]} text-white`}>
          {provider.category}
        </span>
      </div>
      <p className="text-xl text-gray-300 mb-8">{provider.description}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Overview</h2>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 mb-1">API Key Name</p>
              <p className="font-mono text-sm bg-gray-900 px-3 py-2 rounded">
                {provider.apiKeyName}
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Base URL</p>
              <p className="font-mono text-sm bg-gray-900 px-3 py-2 rounded break-all">
                {provider.baseUrl}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Use Cases</h2>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <ul className="list-disc list-inside space-y-2">
            {provider.useCases.map((useCase, i) => (
              <li key={i} className="text-gray-300">
                {useCase}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Documentation</h2>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <a
            href={provider.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline transition-colors"
          >
            {provider.docsUrl}
          </a>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Pricing</h2>
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left">Tier</th>
                <th className="px-6 py-3 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-700">
                <td className="px-6 py-4 font-semibold">Free</td>
                <td className="px-6 py-4 text-gray-300">{provider.pricing.free}</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="px-6 py-4 font-semibold">Paid</td>
                <td className="px-6 py-4 text-gray-300">{provider.pricing.paid}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Models</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Free Models</h3>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              {provider.models.free.length > 0 ? (
                <ul className="list-disc list-inside space-y-2">
                  {provider.models.free.map((model, i) => (
                    <li key={i} className="text-gray-300">
                      {model}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No free models available</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Paid Models</h3>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              {provider.models.paid.length > 0 ? (
                <ul className="list-disc list-inside space-y-2">
                  {provider.models.paid.map((model, i) => (
                    <li key={i} className="text-gray-300">
                      {model}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No paid models listed</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">API Setup</h2>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <ol className="list-decimal list-inside space-y-2">
            {provider.setupSteps.map((step, i) => (
              <li key={i} className="text-gray-300">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Code Examples</h2>
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="bg-gray-900 px-6 py-3 border-b border-gray-700">
            <span className="text-sm text-gray-400">Python</span>
          </div>
          <pre className="p-6 overflow-x-auto">
            <code className="text-sm text-gray-300">
{`import requests

url = "${provider.baseUrl}/chat/completions"
headers = {
    "Authorization": f"Bearer {${provider.apiKeyName}}",
    "Content-Type": "application/json"
}
data = {
    "model": "model-name",
    "messages": [{"role": "user", "content": "Hello!"}]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`}
            </code>
          </pre>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Other Details</h2>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <p className="text-gray-300">{provider.other}</p>
        </div>
      </section>

      {similarProviders.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Similar Providers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {similarProviders.map((similar) => (
              <Link
                key={similar.slug}
                href={`/${similar.slug}`}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-all"
              >
                <h3 className="font-semibold text-blue-400 mb-2">{similar.name}</h3>
                <p className="text-sm text-gray-300">{similar.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
