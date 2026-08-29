import { Book, BookRecommendation } from "./types";
import { calculateCoverage } from "./coverage";
import booksData from "@/data/books.json";

const books = booksData as unknown as Book[];

export function getRecommendations(
  vocabularySize: number,
  targetCoverage: number = 0.8,
  filters?: { category?: string; difficulty?: string }
): BookRecommendation[] {
  const results: BookRecommendation[] = books.map((book) => ({
    id: book.id,
    title: book.title,
    titleCN: book.titleCN,
    author: book.author,
    coverage: calculateCoverage(book, vocabularySize),
    category: book.category,
    difficulty: book.difficulty,
    wordCount: book.wordCount,
    coverUrl: book.coverUrl,
    description: book.description,
  }));

  let filtered = results.filter((book) => book.coverage >= targetCoverage);

  if (filters?.category) {
    filtered = filtered.filter((b) => b.category === filters.category);
  }
  if (filters?.difficulty) {
    filtered = filtered.filter((b) => b.difficulty === filters.difficulty);
  }

  return filtered.sort((a, b) => b.coverage - a.coverage);
}

export function getAllRecommendations(
  vocabularySize: number
): BookRecommendation[] {
  const results: BookRecommendation[] = books.map((book) => ({
    id: book.id,
    title: book.title,
    titleCN: book.titleCN,
    author: book.author,
    coverage: calculateCoverage(book, vocabularySize),
    category: book.category,
    difficulty: book.difficulty,
    wordCount: book.wordCount,
    coverUrl: book.coverUrl,
    description: book.description,
  }));

  return results.sort((a, b) => b.coverage - a.coverage);
}

export function getBookById(id: string): Book | undefined {
  return books.find((book) => book.id === id);
}

export function getCategories(): string[] {
  const categories = new Set(books.map((b) => b.category));
  return Array.from(categories).sort();
}

export function getDifficulties(): string[] {
  const difficulties = new Set(books.map((b) => b.difficulty));
  const order = ["四级", "六级", "考研", "托福", "雅思"];
  return Array.from(difficulties).sort(
    (a, b) => order.indexOf(a) - order.indexOf(b)
  );
}
