"use client";

import { useEffect, useState } from "react";
import { healthService } from "@/services/health";

export default function HealthPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkHealth() {
      try {
        const response = await healthService.check();
        setStatus(response.data.data.status);
        setError(null);
      } catch (err) {
        setError("Failed to connect to backend API");
        setStatus(null);
      } finally {
        setLoading(false);
      }
    }

    checkHealth();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        API Health Check
      </h1>

      {loading && (
        <div className="flex items-center gap-3 text-gray-600">
          <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full" />
          <span>Checking backend status...</span>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-medium">Status:</span>
            <span className="text-red-500">{error}</span>
          </div>
          <p className="text-sm text-red-400 mt-1">
            Make sure the Laravel backend is running at{" "}
            <code className="bg-red-100 px-1 rounded">
              http://localhost:8000
            </code>
          </p>
        </div>
      )}

      {status && (
        <div className="rounded-lg bg-green-50 border border-green-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-medium">Backend Status:</span>
            <span className="text-green-500 capitalize">{status}</span>
          </div>
          <p className="text-sm text-green-400 mt-1">
            The Laravel API is running and healthy.
          </p>
        </div>
      )}
    </div>
  );
}
