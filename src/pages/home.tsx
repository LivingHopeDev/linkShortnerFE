import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Validate URL format
  const isValidUrl = (urlString) => {
    return urlString.startsWith("http://") || urlString.startsWith("https://");
  };

  // Handle URL shortening
  const handleShorten = async () => {
    // Reset states
    setError("");
    setShortUrl("");
    setCopied(false);

    // Validate input
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!isValidUrl(url)) {
      setError("URL must start with http:// or https://");
      return;
    }

    // Call API
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to shorten URL");
      }

      setShortUrl(data.shortUrl);
      setUrl(""); // Clear input after success
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError("Failed to copy to clipboard");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <div className="space-y-4">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your long URL here..."
            onKeyPress={(e) => e.key === "Enter" && handleShorten()}
          />

          <Button onClick={handleShorten} loading={loading} fullWidth>
            {loading ? "Shortening..." : "Shorten URL"}
          </Button>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Success result */}
      {shortUrl && (
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">
          <div className="text-center mb-4">
            <p className="text-gray-600 mb-2">Your shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold text-blue-600 hover:text-blue-700 break-all"
            >
              {shortUrl}
            </a>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleCopy} fullWidth variant="secondary">
              {copied ? "✓ Copied!" : "Copy Link"}
            </Button>
            <Button
              onClick={() => {
                const code = shortUrl.split("/").pop();
                window.location.href = `/${code}`;
              }}
              fullWidth
              variant="outline"
            >
              View Details
            </Button>
          </div>
        </div>
      )}

      {/* Info section */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Free, fast, and secure URL shortening service</p>
      </div>
    </div>
  );
}

export default Home;
