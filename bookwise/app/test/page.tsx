"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { VocabularyTest } from "@/components/VocabularyTest";
import { ManualInput } from "@/components/ManualInput";
import { ExamInput } from "@/components/ExamInput";
import { WordlistImport } from "@/components/WordlistImport";

const tabs = [
  { id: "test", label: "在线测试", icon: "📝" },
  { id: "manual", label: "直接输入", icon: "⌨️" },
  { id: "exam", label: "考试成绩", icon: "📊" },
  { id: "wordlist", label: "导入词表", icon: "📋" },
];

export default function TestPage() {
  const [activeTab, setActiveTab] = useState("test");
  const router = useRouter();

  const handleComplete = (vocabularySize: number) => {
    localStorage.setItem(
      "bookwise_vocabulary",
      JSON.stringify({
        vocabularySize,
        testMethod: activeTab === "test" ? "adaptive" : activeTab,
        testedAt: new Date().toISOString(),
      })
    );
    router.push("/recommend");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            测试你的<span className="text-gradient">词汇量</span>
          </h1>
          <p className="text-muted text-lg">
            选择一种方式，了解你的英语词汇水平
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-accent rounded-2xl p-1.5 border border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "text-white dark:text-slate-900"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary-start to-primary-end rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "test" && (
              <VocabularyTest onComplete={handleComplete} />
            )}
            {activeTab === "manual" && (
              <ManualInput onComplete={handleComplete} />
            )}
            {activeTab === "exam" && (
              <ExamInput onComplete={handleComplete} />
            )}
            {activeTab === "wordlist" && (
              <WordlistImport onComplete={handleComplete} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
