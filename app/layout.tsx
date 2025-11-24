import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI API Providers - Comprehensive Guide",
  description: "Explore and compare 30 AI API providers including OpenAI, Anthropic, AWS Bedrock, Google Gemini, MegaLLM, and more. Find the best AI API for your needs with pricing, models, and setup guides.",
  keywords: "AI API, LLM providers, OpenAI, Anthropic, Claude, GPT, Gemini, machine learning API, MegaLLM, Cohere, Together AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100 min-h-screen">
        <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link href="/" className="flex items-center text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
                  AI API Providers
                </Link>
                <Link href="/" className="flex items-center text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
                <Link href="/compare" className="flex items-center text-gray-300 hover:text-white transition-colors">
                  Compare
                </Link>
                <Link href="/calculator" className="flex items-center text-gray-300 hover:text-white transition-colors">
                  Calculator
                </Link>
                <Link href="/benchmarks" className="flex items-center text-gray-300 hover:text-white transition-colors">
                  Benchmarks
                </Link>
                <Link href="/playground" className="flex items-center text-gray-300 hover:text-white transition-colors">
                  Playground
                </Link>
                <Link href="/market-overview" className="flex items-center text-gray-300 hover:text-white transition-colors">
                  Market
                </Link>
                <Link href="/about" className="flex items-center text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/contact" className="flex items-center text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-gray-800 border-t border-gray-700 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-400">Resources</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/compare" className="hover:text-white transition-colors">Compare Providers</Link></li>
                  <li><Link href="/calculator" className="hover:text-white transition-colors">Pricing Calculator</Link></li>
                  <li><Link href="/benchmarks" className="hover:text-white transition-colors">Benchmarks</Link></li>
                  <li><Link href="/market-overview" className="hover:text-white transition-colors">Market Overview</Link></li>
                  <li><Link href="/sources" className="hover:text-white transition-colors">Sources</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-400">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-400">Stay Updated</h3>
                <p className="text-gray-400 text-sm">Get the latest updates on AI API providers</p>
              </div>
            </div>
            <div className="text-center text-gray-400 pt-6 border-t border-gray-700">
              <p>&copy; 2025 AI API Providers. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
