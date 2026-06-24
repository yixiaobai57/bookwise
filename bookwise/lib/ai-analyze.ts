interface AIAnalysisResult {
  difficultyScore: number;
  analysis: string;
  correctionFactor: number;
}

export async function analyzeBookDifficulty(
  textSnippet: string
): Promise<AIAnalysisResult> {
  const sentences = splitIntoSentences(textSnippet);
  const avgSentenceLength = calculateAverageSentenceLength(sentences);
  const rareWordRatio = calculateRareWordRatio(textSnippet);
  const complexWordRatio = calculateComplexWordRatio(textSnippet);

  let difficultyScore = 0;

  if (avgSentenceLength <= 12) {
    difficultyScore += 0.1;
  } else if (avgSentenceLength <= 18) {
    difficultyScore += 0.3;
  } else if (avgSentenceLength <= 25) {
    difficultyScore += 0.5;
  } else {
    difficultyScore += 0.7;
  }

  difficultyScore += rareWordRatio * 0.3;
  difficultyScore += complexWordRatio * 0.2;

  difficultyScore = Math.min(1, Math.max(0, difficultyScore));

  let correctionFactor: number;
  if (difficultyScore < 0.3) {
    correctionFactor = 1.05;
  } else if (difficultyScore < 0.5) {
    correctionFactor = 1.0;
  } else if (difficultyScore < 0.7) {
    correctionFactor = 0.95;
  } else {
    correctionFactor = 0.9;
  }

  const analysis = generateAnalysisText(
    avgSentenceLength,
    rareWordRatio,
    complexWordRatio,
    difficultyScore
  );

  return {
    difficultyScore: Math.round(difficultyScore * 100) / 100,
    analysis,
    correctionFactor: Math.round(correctionFactor * 100) / 100,
  };
}

function splitIntoSentences(text: string): string[] {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  return sentences.map((s) => s.trim());
}

function calculateAverageSentenceLength(sentences: string[]): number {
  if (sentences.length === 0) return 0;

  const totalWords = sentences.reduce((sum, sentence) => {
    const words = sentence.match(/[a-zA-Z]+(?:'[a-zA-Z]+)?/g) || [];
    return sum + words.length;
  }, 0);

  return totalWords / sentences.length;
}

function calculateRareWordRatio(text: string): number {
  const commonWords = new Set([
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
    "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
    "this", "but", "his", "by", "from", "they", "we", "her", "she",
    "or", "an", "will", "my", "one", "all", "would", "there", "their",
    "what", "so", "up", "out", "if", "about", "who", "get", "which",
    "go", "me", "when", "make", "can", "like", "time", "no", "just",
    "him", "know", "take", "people", "into", "year", "your", "good",
    "some", "could", "them", "see", "other", "than", "then", "now",
    "look", "only", "come", "its", "over", "think", "also", "back",
    "after", "use", "two", "how", "our", "work", "first", "well",
    "way", "even", "new", "want", "because", "any", "these", "give",
    "day", "most", "us",
  ]);

  const words = text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || [];
  if (words.length === 0) return 0;

  const rareWords = words.filter((w) => !commonWords.has(w));
  return rareWords.length / words.length;
}

function calculateComplexWordRatio(text: string): number {
  const words = text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || [];
  if (words.length === 0) return 0;

  const complexWords = words.filter((w) => w.length >= 8);
  return complexWords.length / words.length;
}

function generateAnalysisText(
  avgSentenceLength: number,
  rareWordRatio: number,
  complexWordRatio: number,
  difficultyScore: number
): string {
  const parts: string[] = [];

  if (avgSentenceLength <= 15) {
    parts.push("句子结构简洁，平均句长较短");
  } else if (avgSentenceLength <= 22) {
    parts.push("句子长度适中，适合中级学习者");
  } else {
    parts.push("句子较长，包含复杂句式");
  }

  if (rareWordRatio < 0.3) {
    parts.push("词汇以常见词为主");
  } else if (rareWordRatio < 0.5) {
    parts.push("包含一定比例的非常见词汇");
  } else {
    parts.push("大量使用高级词汇，对词汇量要求较高");
  }

  if (complexWordRatio > 0.15) {
    parts.push("包含较多长难词");
  }

  if (difficultyScore < 0.3) {
    parts.push("整体难度较低，适合入门阅读");
  } else if (difficultyScore < 0.5) {
    parts.push("整体难度适中");
  } else if (difficultyScore < 0.7) {
    parts.push("整体难度偏高，建议有一定基础后再阅读");
  } else {
    parts.push("整体难度较高，适合高级学习者");
  }

  return parts.join("，") + "。";
}
