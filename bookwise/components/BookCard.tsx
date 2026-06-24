"use client";

import { motion } from "framer-motion";
import { BookRecommendation } from "@/lib/types";
import { CoverageCircle } from "./CoverageCircle";

interface BookCardProps {
  book: BookRecommendation;
  index?: number;
}

export function BookCard({ book, index = 0 }: BookCardProps) {
  const difficultyColors: Record<string, string> = {
    四级: "bg-blue-100 text-blue-700",
    六级: "bg-purple-100 text-purple-700",
    考研: "bg-orange-100 text-orange-700",
    托福: "bg-green-100 text-green-700",
    雅思: "bg-red-100 text-red-700",
  };

  return (
    <motion.a
      href={`/book/${book.id}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="block bg-card rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
        <div className="text-4xl">📖</div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 mr-3">
            <h3 className="font-semibold text-lg truncate">{book.title}</h3>
            <p className="text-muted text-sm truncate">{book.titleCN}</p>
          </div>
          <CoverageCircle coverage={book.coverage} size={56} />
        </div>

        <p className="text-muted text-sm mb-3">{book.author}</p>

        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              difficultyColors[book.difficulty] || "bg-gray-100 text-gray-700"
            }`}
          >
            {book.difficulty}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {book.category}
          </span>
          <span className="text-xs text-muted ml-auto">
            {(book.wordCount / 1000).toFixed(0)}k 词
          </span>
        </div>
      </div>
    </motion.a>
  );
}
