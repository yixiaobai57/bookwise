import { Book, CocabEntry } from "./types";

export function calculateCoverage(
  book: Book,
  vocabularySize: number,
  _cocaList: CocabEntry[]
): number {
  if (!book.wordFrequencyDistribution) return 0.5;

  const bands = [
    { key: "top1000", maxRank: 1000 },
    { key: "1001-2000", maxRank: 2000 },
    { key: "2001-3000", maxRank: 3000 },
    { key: "3001-4000", maxRank: 4000 },
    { key: "4001-5000", maxRank: 5000 },
    { key: "5001-6000", maxRank: 6000 },
    { key: "6001-8000", maxRank: 8000 },
    { key: "8001-10000", maxRank: 10000 },
    { key: "10001-15000", maxRank: 15000 },
    { key: "15000+", maxRank: 20000 },
  ];

  let coverage = 0;

  for (const band of bands) {
    const percentage = book.wordFrequencyDistribution[band.key] || 0;

    if (vocabularySize >= band.maxRank) {
      coverage += percentage / 100;
    } else {
      const prevMax =
        band === bands[0]
          ? 0
          : bands[bands.indexOf(band) - 1].maxRank;
      const bandRange = band.maxRank - prevMax;
      const knownInRange = vocabularySize - prevMax;
      const ratio = Math.max(0, Math.min(1, knownInRange / bandRange));
      coverage += (percentage / 100) * ratio;
      break;
    }
  }

  return Math.min(coverage, 1.0);
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
