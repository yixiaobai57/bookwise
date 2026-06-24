export interface Book {
  id: string;
  title: string;
  titleCN: string;
  author: string;
  category: string;
  difficulty: string;
  wordCount: number;
  gutenbergId: number;
  uniqueWords: string[];
  wordFrequencyDistribution: Record<string, number>;
}

export interface CocabEntry {
  rank: number;
  word: string;
  frequency: number;
}

export interface ExamScoreRange {
  min: number;
  max: number;
  vocabMin: number;
  vocabMax: number;
}

export interface ExamMapping {
  exam: string;
  label: string;
  scoreRanges: ExamScoreRange[];
}

export interface UserVocabulary {
  vocabularySize: number;
  testMethod: "adaptive" | "manual" | "exam" | "wordlist";
  testedAt: string;
  knownWords?: string[];
}

export interface BookRecommendation {
  id: string;
  title: string;
  titleCN: string;
  author: string;
  coverage: number;
  category: string;
  difficulty: string;
  wordCount: number;
}

export interface TestAnswer {
  word: string;
  known: boolean;
}

export interface TestSession {
  answers: TestAnswer[];
  currentBand: number;
  consecutiveCorrect: number;
  consecutiveWrong: number;
  bandHistory: number[];
}
