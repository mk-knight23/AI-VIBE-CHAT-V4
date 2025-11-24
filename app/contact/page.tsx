export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
        <p className="text-gray-300 mb-6">
          Have questions, suggestions, or want to report outdated information? We'd love to hear from you!
        </p>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">Email</h2>
            <p className="text-gray-300">contact@aiapiproviders.com</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">Updates</h2>
            <p className="text-gray-300">
              This site is regularly updated to reflect the latest changes in AI API pricing, features, and availability. All information is based on official documentation and industry research as of 2025.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-400 mb-2">Disclaimer</h2>
            <p className="text-gray-300">
              Pricing and features are subject to change. Always verify current information on the official provider websites before making decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
