"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Briefcase, BookOpen, MessageCircle } from "lucide-react";

interface LessonTabsProps {
  lesson: any;
  userId: string;
}

export default function LessonTabs({ lesson, userId }: LessonTabsProps) {
  const [activeTab, setActiveTab] = useState("casual");

  const tabs = [
    { id: "casual", label: "Daily Phrases", icon: <Coffee size={18} /> },
    { id: "professional", label: "Workplace", icon: <Briefcase size={18} /> },
    { id: "grammar", label: "Grammar", icon: <BookOpen size={18} /> },
    { id: "vocabulary", label: "Vocabulary", icon: <MessageCircle size={18} /> },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative ${
              activeTab === tab.id ? "text-blue-600" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
              />
            )}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "casual" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-800 mb-6">Casual & Daily Phrases</h2>
                {lesson.casualPhrases.map((item: any, idx: number) => (
                  <PhraseCard key={idx} item={item} />
                ))}
              </div>
            )}

            {activeTab === "professional" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-800 mb-6">Professional & Workplace</h2>
                {lesson.professionalPhrases.map((item: any, idx: number) => (
                  <PhraseCard key={idx} item={item} />
                ))}
              </div>
            )}

            {activeTab === "grammar" && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{lesson.grammar.topic}</h2>
                <div className="bg-blue-50 text-blue-900 px-4 py-3 rounded-lg font-mono text-sm mb-6 border border-blue-100">
                  {lesson.grammar.rule}
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm uppercase tracking-wider font-bold text-slate-400 mb-2">When to use</h3>
                  <p className="text-slate-700">{lesson.grammar.whenToUse}</p>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-wider font-bold text-slate-400 mb-3">Examples</h3>
                  <div className="space-y-3">
                    {lesson.grammar.examples.map((ex: string, idx: number) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="font-medium text-slate-900">{ex}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "vocabulary" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lesson.vocabulary.map((item: any, idx: number) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
                    <h3 className="text-2xl font-bold text-blue-600 mb-1">{item.word}</h3>
                    <p className="text-slate-400 font-mono text-sm mb-4">{item.phonetic}</p>
                    <p className="text-lg font-medium text-slate-800 mb-2">{item.gujaratiMeaning}</p>
                    <p className="text-sm text-slate-600 mb-4 flex-1">{item.whenToUse}</p>
                    
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-auto">
                      <p className="font-medium text-slate-900">{item.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PhraseCard({ item }: { item: any }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-blue-600">{item.phrase}</h3>
        <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full font-medium border border-emerald-200">
          {item.meaning}
        </span>
      </div>
      <p className="text-sm text-slate-600 mb-4">{item.whenToUse}</p>
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
        <p className="font-medium text-slate-900">{item.example}</p>
      </div>
    </div>
  );
}
