import { useState } from "react";
import Button from "../components/Button";
import Input from "@/components/Input";
interface ShortenResponse {
  success: boolean;
  message: string;
  data: { shortUrl: string };
  status_code: number;
}

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleShorten = async () => {
    setError("");
    setCopied(false);
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data: ShortenResponse = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      setShortUrl(data.data.shortUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        Shorten your URL
      </h2>

      <Input
        placeholder="Enter a long URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <Button onClick={handleShorten} disabled={loading}>
        {loading ? "Shortening..." : "Shorten"}
      </Button>

      {error && (
        <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
      )}

      {shortUrl && (
        <div className="mt-6 text-center">
          <p className="text-gray-600">Your short URL:</p>
          <div className="flex justify-center items-center gap-2 mt-2">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-semibold hover:underline break-all"
            >
              {shortUrl}
            </a>
            <button
              onClick={copyToClipboard}
              className="text-sm text-indigo-500 hover:text-indigo-700"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
