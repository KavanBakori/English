"use client";

import { useEffect, useState } from "react";
import HistoryTabs from "@/components/HistoryTabs";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/history`);
        if (!res.ok) {
          throw new Error("Failed to load history");
        }
        const data = await res.json();
        setLessons(data.lessons || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
        <h2 className="text-xl font-semibold text-slate-700 animate-pulse">Loading history...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Oops!</h2>
          <p className="text-slate-600">{error || "Could not load history."}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 font-sans pb-20">
      <header className="bg-white border-b border-blue-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-blue-600 transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Learning History</h1>
              <p className="text-sm text-blue-600 font-medium">Review your past lessons</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-8">
        <HistoryTabs lessons={lessons} />
      </main>
    </div>
  );
}
