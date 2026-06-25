const GUTENBERG_BASE_URL = "https://www.gutenberg.org/cache/epub";

interface GutenbergResult {
  text: string;
  uniqueWords: string[];
  wordCount: number;
}

const cache = new Map<string, GutenbergResult>();

export async function fetchGutenbergText(
  gutenbergId: number
): Promise<GutenbergResult> {
  const cacheKey = `gutenberg-${gutenbergId}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const url = `${GUTENBERG_BASE_URL}/${gutenbergId}/pg${gutenbergId}.txt`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Gutenberg text: ${response.status} ${response.statusText}`
      );
    }

    const text = await response.text();

    const cleanedText = cleanGutenbergText(text);

    const uniqueWords = extractUniqueWords(cleanedText);
    const wordCount = countWords(cleanedText);

    const result: GutenbergResult = {
      text: cleanedText,
      uniqueWords,
      wordCount,
    };

    cache.set(cacheKey, result);

    return result;
  } catch (error) {
    console.error(`Error fetching Gutenberg text for ID ${gutenbergId}:`, error);
    throw error;
  }
}

function cleanGutenbergText(text: string): string {
  const startMarkers = [
    "*** START OF THE PROJECT GUTENBERG EBOOK",
    "*** START OF THIS PROJECT GUTENBERG EBOOK",
    "***START OF THE PROJECT GUTENBERG EBOOK",
  ];

  const endMarkers = [
    "*** END OF THE PROJECT GUTENBERG EBOOK",
    "*** END OF THIS PROJECT GUTENBERG EBOOK",
    "***END OF THE PROJECT GUTENBERG EBOOK",
    "End of the Project Gutenberg",
  ];

  let cleaned = text;

  for (const marker of startMarkers) {
    const startIndex = cleaned.indexOf(marker);
    if (startIndex !== -1) {
      const lineEnd = cleaned.indexOf("\n", startIndex);
      if (lineEnd !== -1) {
        cleaned = cleaned.substring(lineEnd + 1);
      }
      break;
    }
  }

  for (const marker of endMarkers) {
    const endIndex = cleaned.indexOf(marker);
    if (endIndex !== -1) {
      cleaned = cleaned.substring(0, endIndex);
    }
    break;
  }

  return cleaned.trim();
}

function extractUniqueWords(text: string): string[] {
  const words = text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) || [];
  const uniqueWords = new Set(words);
  return Array.from(uniqueWords).sort();
}

function countWords(text: string): number {
  const words = text.match(/[a-zA-Z]+(?:'[a-zA-Z]+)?/g) || [];
  return words.length;
}
