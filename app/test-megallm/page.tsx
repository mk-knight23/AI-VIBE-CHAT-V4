"use client";

import { useState } from "react";

export default function TestMegaLLM() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    setResponse("");

    try {
      const apiKey = "sk-mega-0eaa0b2c2bae3ced6afca8651cfbbce07927e231e4119068f7f7867c20cdc820";
      const baseUrl = "https://ai.megallm.io/v1";

      // Test 1: List models
      const modelsResponse = await fetch(`${baseUrl}/models`, {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
        },
      });

      const modelsData = await modelsResponse.json();
      setResponse(prev => prev + "Models Response:\n" + JSON.stringify(modelsData, null, 2) + "\n\n");

      // Test 2: Chat completion
      const chatResponse = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.3-70b-instruct",
          messages: [{ role: "user", content: "Say hello in one sentence" }],
          max_tokens: 100,
        }),
      });

      const chatData = await chatResponse.json();
      setResponse(prev => prev + "Chat Response:\n" + JSON.stringify(chatData, null, 2));

    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">MegaLLM API Test</h1>
      
      <button
        onClick={testAPI}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white px-6 py-3 rounded mb-6"
      >
        {loading ? "Testing..." : "Test MegaLLM API"}
      </button>

      {response && (
        <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm text-green-400">
          {response}
        </pre>
      )}
    </div>
  );
}
