import { Book, CocabEntry } from "./types";

export function calculateCoverage(
  book: Book,
  vocabularySize: number,
  cocaList: CocabEntry[]
): number {
  const knownRankCutoff = vocabularySize;

  const wordToRank = new Map<string, number>();
  for (const entry of cocaList) {
    wordToRank.set(entry.word.toLowerCase(), entry.rank);
  }

  let matched = 0;
  let total = book.uniqueWords.length;

  if (total === 0) return 0;

  for (const word of book.uniqueWords) {
    const rank = wordToRank.get(word.toLowerCase());
    if (rank !== undefined && rank <= knownRankCutoff) {
      matched++;
    }
  }

  return matched / total;
}

export function calculateCoverageFromWordList(
  bookUniqueWords: string[],
  knownWords: string[]
): number {
  if (bookUniqueWords.length === 0) return 0;

  const knownSet = new Set(knownWords.map((w) => w.toLowerCase()));
  let matched = 0;

  for (const word of bookUniqueWords) {
    if (knownSet.has(word.toLowerCase())) {
      matched++;
    }
  }

  return matched / bookUniqueWords.length;
}

export function applyAICorrection(
  baseCoverage: number,
  correctionFactor: number
): number {
  return Math.min(baseCoverage * correctionFactor, 1.0);
}

export function getCoverageColor(coverage: number): string {
  if (coverage >= 0.8) return "coverage-high";
  if (coverage >= 0.6) return "coverage-mid";
  return "coverage-low";
}

export function getCoverageLabel(coverage: number): string {
  if (coverage >= 0.85) return "轻松阅读";
  if (coverage >= 0.8) return "适合阅读";
  if (coverage >= 0.7) return "略有挑战";
  if (coverage >= 0.6) return "较大挑战";
  return "非常困难";
}
