"use client";

import { motion } from "framer-motion";
import { BookRecommendation } from "@/lib/types";
import { CoverageCircle } from "./CoverageCircle";
import { BookCover } from "./BookCover";

interface BookCardProps {
  book: BookRecommendation;
  index?: number;
}

export function BookCard({ book, index = 0 }: BookCardProps) {
  const difficultyColors: Record<string, string> = {
    四级: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    六级: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    考研: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    托福: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    雅思: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  };

  return (
    <motion.a
      href={`/book/${book.id}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="glass-card rounded-3xl overflow-hidden group cursor-pointer block"
    >
      <div className="h-52 relative overflow-hidden">
        <BookCover
          title={book.title}
          author={book.author}
          category={book.category}
          coverUrl={book.coverUrl}
          className="h-52 group-hover:scale-105 transition-transform duration-500"
        />
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 mr-3">
            <h3 className="font-semibold text-lg truncate group-hover:text-primary-start transition-colors duration-300">
              {book.title}
            </h3>
            <p className="text-muted text-sm truncate mt-0.5">
              {book.titleCN}
            </p>
          </div>
          <CoverageCircle coverage={book.coverage} size={56} />
        </div>

        <p className="text-muted text-sm mb-4">{book.author}</p>

        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
              difficultyColors[book.difficulty] ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            {book.difficulty}
          </span>
          <span className="glass-pill px-2.5 py-1 rounded-lg text-xs font-medium text-muted">
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
