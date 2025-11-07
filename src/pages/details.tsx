import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

interface UrlInfoResponse {
  success: boolean;
  message: string;
  data: {
    originalUrl: string;
    createdAt: string;
    visitCount: number;
  };
  status_code: number;
}

export default function Details() {
  const { code } = useParams<{ code: string }>();
  const [info, setInfo] = useState<UrlInfoResponse["data"] | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/info/${code}`);
        const data: UrlInfoResponse = await res.json();
        if (!res.ok) throw new Error(data.message || "Not found");
        setInfo(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, [code]);

  if (loading)
    return <p className="text-gray-600 text-center">Loading URL info...</p>;

  if (error)
    return (
      <div className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Link to="/" className="text-indigo-600 hover:underline font-semibold">
          Go back home
        </Link>
      </div>
    );

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        URL Details
      </h2>
      <div className="text-gray-600 space-y-2">
        <p>
          <span className="font-medium">Original URL:</span>{" "}
          <a
            href={info?.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline break-all"
          >
            {info?.originalUrl}
          </a>
        </p>
        <p>
          <span className="font-medium">Created:</span>{" "}
          {info?.createdAt ? new Date(info.createdAt).toLocaleString() : "N/A"}
        </p>
        <p>
          <span className="font-medium">Visits:</span> {info?.visitCount}
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/"
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Shorten Another
        </Link>
      </div>
    </div>
  );
}
