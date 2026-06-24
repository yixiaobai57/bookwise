import { CocabEntry, TestSession, TestAnswer } from "./types";

const BAND_SIZE = 2000;
const TOTAL_BANDS = 10;
const INITIAL_BAND = 2;
const MAX_QUESTIONS = 35;
const CONSECUTIVE_CORRECT_TO_MOVE_UP = 3;
const CONSECUTIVE_WRONG_TO_MOVE_DOWN = 2;

export function createTestSession(): TestSession {
  return {
    answers: [],
    currentBand: INITIAL_BAND,
    consecutiveCorrect: 0,
    consecutiveWrong: 0,
    bandHistory: [INITIAL_BAND],
  };
}

export function selectNextWord(
  session: TestSession,
  cocaList: CocabEntry[]
): CocabEntry | null {
  if (session.answers.length >= MAX_QUESTIONS) return null;

  const seenWords = new Set(session.answers.map((a) => a.word.toLowerCase()));

  const wordsInBand = getWordsInBand(session.currentBand, cocaList, seenWords);
  if (wordsInBand.length > 0) {
    return wordsInBand[Math.floor(Math.random() * wordsInBand.length)];
  }

  for (let offset = 1; offset <= TOTAL_BANDS; offset++) {
    for (const dir of [1, -1]) {
      const band = session.currentBand + offset * dir;
      if (band < 1 || band > TOTAL_BANDS) continue;
      const words = getWordsInBand(band, cocaList, seenWords);
      if (words.length > 0) {
        return words[Math.floor(Math.random() * words.length)];
      }
    }
  }
  return null;
}

function getWordsInBand(
  band: number,
  cocaList: CocabEntry[],
  seenWords: Set<string>
): CocabEntry[] {
  const bandStart = (band - 1) * BAND_SIZE;
  const bandEnd = band * BAND_SIZE;
  return cocaList.filter(
    (entry) =>
      entry.rank > bandStart &&
      entry.rank <= bandEnd &&
      !seenWords.has(entry.word.toLowerCase())
  );
}

export function processAnswer(
  session: TestSession,
  word: string,
  known: boolean
): TestSession {
  const newAnswers: TestAnswer[] = [...session.answers, { word, known }];
  let newConsecutiveCorrect = known ? session.consecutiveCorrect + 1 : 0;
  let newConsecutiveWrong = !known ? session.consecutiveWrong + 1 : 0;
  let newBand = session.currentBand;

  if (newConsecutiveCorrect >= CONSECUTIVE_CORRECT_TO_MOVE_UP) {
    newBand = Math.min(session.currentBand + 1, TOTAL_BANDS);
    newConsecutiveCorrect = 0;
  } else if (newConsecutiveWrong >= CONSECUTIVE_WRONG_TO_MOVE_DOWN) {
    newBand = Math.max(session.currentBand - 1, 1);
    newConsecutiveWrong = 0;
  }

  return {
    answers: newAnswers,
    currentBand: newBand,
    consecutiveCorrect: newConsecutiveCorrect,
    consecutiveWrong: newConsecutiveWrong,
    bandHistory: [...session.bandHistory, newBand],
  };
}

export function estimateVocabularySize(
  answers: TestAnswer[],
  cocaList: CocabEntry[]
): { size: number; confidence: number } {
  if (answers.length === 0) return { size: 0, confidence: 0 };

  const wordToRank = new Map<string, number>();
  for (const entry of cocaList) {
    wordToRank.set(entry.word.toLowerCase(), entry.rank);
  }

  const knownRanks: number[] = [];
  const unknownRanks: number[] = [];

  for (const answer of answers) {
    const rank = wordToRank.get(answer.word.toLowerCase());
    if (rank === undefined) continue;
    if (answer.known) {
      knownRanks.push(rank);
    } else {
      unknownRanks.push(rank);
    }
  }

  if (knownRanks.length === 0) {
    return { size: 1000, confidence: 0.5 };
  }

  const highestKnownRank = knownRanks.length > 0 ? Math.max(...knownRanks) : 0;
  const lowestUnknownRank = unknownRanks.length > 0 ? Math.min(...unknownRanks) : 20000;

  let estimatedSize: number;

  if (unknownRanks.length === 0) {
    const allKnown = answers.length > 0;
    if (allKnown) {
      const maxBand = Math.ceil(highestKnownRank / BAND_SIZE);
      estimatedSize = maxBand * BAND_SIZE + BAND_SIZE;
      estimatedSize = Math.max(estimatedSize, 8000);
    } else {
      estimatedSize = 3000;
    }
  } else if (highestKnownRank < lowestUnknownRank) {
    estimatedSize = Math.round((highestKnownRank + lowestUnknownRank) / 2);
  } else {
    const knownRatio = knownRanks.length / answers.length;
    const boundaryEstimate = Math.round(
      highestKnownRank * (0.5 + knownRatio * 0.5)
    );
    estimatedSize = boundaryEstimate;
  }

  estimatedSize = Math.max(1000, Math.min(estimatedSize, 20000));

  const totalAnswers = knownRanks.length + unknownRanks.length;
  const knownRatio = knownRanks.length / totalAnswers;
  const hasUnknown = unknownRanks.length > 0;
  const variance = hasUnknown
    ? Math.abs(highestKnownRank - lowestUnknownRank)
    : 0;

  let confidence: number;
  if (!hasUnknown) {
    confidence = Math.min(0.85, 0.6 + (totalAnswers / MAX_QUESTIONS) * 0.25);
  } else {
    confidence = Math.max(0.5, Math.min(0.95, 1 - variance / 20000));
  }

  return {
    size: Math.round(estimatedSize),
    confidence: Math.round(confidence * 100) / 100,
  };
}

export function isTestComplete(session: TestSession): boolean {
  if (session.answers.length >= MAX_QUESTIONS) return true;

  if (session.bandHistory.length >= 6) {
    const lastSix = session.bandHistory.slice(-6);
    if (lastSix.every((b) => b === lastSix[0])) {
      return true;
    }
  }

  return false;
}
