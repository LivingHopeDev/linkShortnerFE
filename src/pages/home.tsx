import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Link2, Copy, Check, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShortenResponse {
  shortUrl: string;
}

interface ErrorResponse {
  error: string;
}

function Home() {
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const { toast } = useToast();

  // Validate URL format
  const isValidUrl = (urlString: string): boolean => {
    return urlString.startsWith("http://") || urlString.startsWith("https://");
  };

  // Handle URL shortening
  const handleShorten = async (): Promise<void> => {
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

      const data: ShortenResponse | ErrorResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          (data as ErrorResponse).error || "Failed to shorten URL"
        );
      }

      setShortUrl((data as ShortenResponse).shortUrl);
      setUrl(""); // Clear input after success

      toast({
        title: "Success!",
        description: "Your URL has been shortened",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Copy to clipboard
  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);

      toast({
        title: "Copied!",
        description: "Short URL copied to clipboard",
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError("Failed to copy to clipboard");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleShorten();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Link2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your long URL here..."
                className="pl-10"
                onKeyPress={handleKeyPress}
              />
            </div>

            <Button
              onClick={handleShorten}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Shortening...
                </>
              ) : (
                "Shorten URL"
              )}
            </Button>

            {/* Error message */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Success result */}
      {shortUrl && (
        <Card className="mt-6 shadow-lg animate-fadeIn">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                Your shortened URL:
              </p>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-primary hover:underline break-all inline-flex items-center gap-2"
              >
                {shortUrl}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleCopy}
                className="flex-1"
                variant="secondary"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </>
                )}
              </Button>
              <Button
                onClick={() => {
                  const code = shortUrl.split("/").pop();
                  window.location.href = `/${code}`;
                }}
                className="flex-1"
                variant="outline"
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info section */}
      <div className="mt-8 text-center text-muted-foreground text-sm">
        <p>Free, fast, and secure URL shortening service</p>
      </div>
    </div>
  );
}

export default Home;
