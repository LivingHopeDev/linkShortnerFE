import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  MousePointerClick,
} from "lucide-react";

interface UrlInfo {
  originalUrl: string;
  createdAt: string;
  visitCount: number;
}

interface ErrorResponse {
  error: string;
}

function Details() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<UrlInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchDetails();
  }, [code]);

  const fetchDetails = async (): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:5000/info/${code}`);
      const result: UrlInfo | ErrorResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          (result as ErrorResponse).error || "Failed to fetch details"
        );
      }

      setData(result as UrlInfo);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not find this shortened URL"
      );
    } finally {
      setLoading(false);
    }
  };

  // Format date to relative time
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // seconds

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <CardTitle className="text-2xl mb-2">URL Not Found</CardTitle>
            <p className="text-muted-foreground mb-6">
              {error ||
                "This shortened URL does not exist or has been removed."}
            </p>
            <Button onClick={() => navigate("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg animate-fadeIn">
        <CardHeader>
          <CardTitle className="text-2xl">URL Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Original URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Original URL
            </label>
            <a
              href={data.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline break-all"
            >
              <ExternalLink className="h-4 w-4 flex-shrink-0" />
              {data.originalUrl}
            </a>
          </div>

          {/* Short URL */}
          <div className="space-y-2 pb-4 border-b">
            <label className="text-sm font-medium text-muted-foreground">
              Short URL
            </label>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono">
                http://localhost:5000/{code}
              </Badge>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="text-lg font-semibold">
                      {formatDate(data.createdAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MousePointerClick className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Clicks
                    </p>
                    <p className="text-lg font-semibold">
                      {data.visitCount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button
            onClick={() => navigate("/")}
            className="w-full"
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Create Another Short URL
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Details;
