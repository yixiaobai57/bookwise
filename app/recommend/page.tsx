"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookRecommendation } from "@/lib/types";
import { BookCard } from "@/components/BookCard";
import { FilterBar } from "@/components/FilterBar";
import { SkeletonCard } from "@/components/SkeletonCard";
import { loadVocabulary } from "@/lib/storage";

export default function RecommendPage() {
  const [recommendations, setRecommendations] = useState<BookRecommendation[]>(
    []
  );
  const [allBooks, setAllBooks] = useState<BookRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [vocabularySize, setVocabularySize] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);

  useEffect(() => {
    const vocab = loadVocabulary();
    if (vocab) {
      setVocabularySize(vocab.vocabularySize);
      fetchRecommendations(vocab.vocabularySize);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchRecommendations = async (vocabSize: number) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vocabularySize: vocabSize,
          targetCoverage: 0.8,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setRecommendations(data.recommendations);
      setAllBooks(data.recommendations);

      const cats = Array.from(
        new Set(data.recommendations.map((b: BookRecommendation) => b.category))
      ) as string[];
      const diffs = Array.from(
        new Set(
          data.recommendations.map((b: BookRecommendation) => b.difficulty)
        )
      ) as string[];

      setCategories(cats.sort());
      setDifficulties(diffs.sort());
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = allBooks;
    if (selectedCategory) {
      filtered = filtered.filter((b) => b.category === selectedCategory);
    }
    if (selectedDifficulty) {
      filtered = filtered.filter((b) => b.difficulty === selectedDifficulty);
    }
    setRecommendations(filtered);
  }, [selectedCategory, selectedDifficulty, allBooks]);

  if (!vocabularySize && !isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">📚</div>
          <h1 className="text-3xl font-bold mb-4">请先测试词汇量</h1>
          <p className="text-muted mb-8">
            我们需要了解你的词汇水平才能推荐合适的书籍
          </p>
          <a
            href="/test"
            className="btn-gradient inline-block px-8 py-3 rounded-full text-lg font-semibold"
          >
            去测试 →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            为你推荐的书籍
          </h1>
          <p className="text-muted">
            基于你的词汇量{" "}
            <span className="font-semibold text-foreground">
              {vocabularySize?.toLocaleString()}
            </span>{" "}
            词，筛选出词汇覆盖率 ≥ 80% 的书籍
          </p>
        </motion.div>

        <div className="mb-8">
          <FilterBar
            categories={categories}
            difficulties={difficulties}
            selectedCategory={selectedCategory}
            selectedDifficulty={selectedDifficulty}
            onCategoryChange={setSelectedCategory}
            onDifficultyChange={setSelectedDifficulty}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : recommendations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">😕</div>
            <h2 className="text-2xl font-bold mb-2">暂无匹配书籍</h2>
            <p className="text-muted">
              试试调整筛选条件，或提升词汇量后再来
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
