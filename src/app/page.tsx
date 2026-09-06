"use client";

import { useEffect, useState } from "react";
import LessonTabs from "@/components/LessonTabs";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hardcoded for MVP. In a real app, this would be from authentication.
  const userId = "user123";
  const currentDay = 1;

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await fetch(`/api/lesson?day=${currentDay}`);
        if (!res.ok) {
          throw new Error("Failed to load lesson");
        }
        const data = await res.json();
        setLesson(data.lesson);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [currentDay]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
        <h2 className="text-xl font-semibold text-slate-700 animate-pulse">Generating your AI lesson...</h2>
        <p className="text-sm text-slate-500 mt-2">This may take a few seconds.</p>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Oops!</h2>
          <p className="text-slate-600">{error || "Could not load the lesson."}</p>
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
          <div>
            <h1 className="text-xl font-bold text-slate-900">English Mastery</h1>
            <p className="text-sm text-blue-600 font-medium">Day {lesson.dayNumber || lesson.day} of 100</p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/history" 
              className="text-slate-500 hover:text-blue-600 transition-colors p-2 bg-slate-50 rounded-full"
              title="View History"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </Link>
            <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              🔥 1 Day Streak
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-8">
        <LessonTabs lesson={lesson} userId={userId} />
      </main>
    </div>
  );
}
