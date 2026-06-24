"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { BookRecommendation } from "@/lib/types";
import { CoverageCircle } from "@/components/CoverageCircle";
import { getCoverageLabel } from "@/lib/coverage";
import { loadVocabulary } from "@/lib/storage";

export default function BookDetailPage() {
  const params = useParams();
  const bookId = params.id as string;
  const [book, setBook] = useState<BookRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [vocabularySize, setVocabularySize] = useState<number | null>(null);

  useEffect(() => {
    const vocab = loadVocabulary();
    if (vocab) {
      setVocabularySize(vocab.vocabularySize);
      fetchBookDetail(vocab.vocabularySize);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchBookDetail = async (vocabSize: number) => {
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vocabularySize: vocabSize,
          targetCoverage: 0,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      const found = data.recommendations.find(
        (b: BookRecommendation) => b.id === bookId
      );
      setBook(found || null);
    } catch (error) {
      console.error("Error fetching book detail:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-start"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">😕</div>
          <h1 className="text-3xl font-bold mb-4">未找到书籍</h1>
          <a
            href="/recommend"
            className="text-primary-start hover:underline"
          >
            返回推荐列表
          </a>
        </div>
      </div>
    );
  }

  const coverageLabel = getCoverageLabel(book.coverage);
  const coveragePercent = Math.round(book.coverage * 100);

  const difficultyColors: Record<string, string> = {
    四级: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    六级: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    考研: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    托福: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    雅思: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href="/recommend"
            className="inline-flex items-center text-muted hover:text-foreground mb-8 transition-colors"
          >
            ← 返回推荐列表
          </a>

          <div className="bg-card rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-64 bg-gradient-to-br from-primary-start/20 to-primary-end/20 flex items-center justify-center">
              <div className="text-8xl">📖</div>
            </div>

            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    <span className="text-gradient">{book.title}</span>
                  </h1>
                  <p className="text-xl text-muted mb-4">{book.titleCN}</p>
                  <p className="text-lg mb-6">{book.author}</p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    <span
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        difficultyColors[book.difficulty] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {book.difficulty}
                    </span>
                    <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                      {book.category}
                    </span>
                    <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                      {(book.wordCount / 1000).toFixed(0)}k 词
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <CoverageCircle
                    coverage={book.coverage}
                    size={160}
                    strokeWidth={10}
                  />
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-bold">
                      你的词汇覆盖 {coveragePercent}%
                    </div>
                    <div className="text-muted mt-1">{coverageLabel}</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h2 className="text-xl font-bold mb-4">阅读建议</h2>
                <div className="bg-gray-50 rounded-2xl p-6">
                  {coveragePercent >= 80 ? (
                    <div>
                      <p className="text-green-700 font-semibold mb-2">
                        ✅ 推荐阅读
                      </p>
                      <p className="text-muted">
                        这本书的词汇覆盖率达到 {coveragePercent}%，适合你当前的词汇水平。你可以流畅阅读，遇到的生词不会影响理解。
                      </p>
                    </div>
                  ) : coveragePercent >= 60 ? (
                    <div>
                      <p className="text-yellow-700 font-semibold mb-2">
                        ⚠️ 有一定挑战
                      </p>
                      <p className="text-muted">
                        这本书的词汇覆盖率为 {coveragePercent}%，会有一定数量的生词。建议配合词典阅读，或先提升词汇量再来挑战。
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-red-700 font-semibold mb-2">
                        ❌ 暂不推荐
                      </p>
                      <p className="text-muted">
                        这本书的词汇覆盖率仅为 {coveragePercent}%，生词较多，阅读体验可能不佳。建议先阅读难度更低的书籍。
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
