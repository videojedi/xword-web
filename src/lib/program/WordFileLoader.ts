// Word File Loader - Parses DATA/*.txt files
// File format: First characters are count, followed by concatenated words

export interface LoadProgress {
  file: string;
  wordsLoaded: number;
}

export type ProgressCallback = (progress: LoadProgress) => void;

/**
 * Parse a word file content into individual words
 * Format: "1109aamamaabbabcabu..." where 1109 is the count and words are concatenated
 */
export function parseWordFile(content: string, wordLength: number): string[] {
  // Find where the count ends and words begin
  // The count is at the start, followed by concatenated words
  // We can determine the split by finding where letters start
  const match = content.match(/^(\d+)/);
  if (!match) {
    return [];
  }

  const wordData = content.slice(match[1].length);
  const words: string[] = [];

  // Split into words of the specified length
  for (let i = 0; i < wordData.length; i += wordLength) {
    const word = wordData.slice(i, i + wordLength);
    if (word.length === wordLength && /^[a-z]+$/.test(word)) {
      words.push(word);
    }
  }

  return words;
}

/**
 * Load all word files from the DATA directory
 */
export async function loadAllWordFiles(
  onProgress?: ProgressCallback
): Promise<Map<string, string[]>> {
  const words = new Map<string, string[]>();

  // Load files L3.1 through L16.8
  for (let length = 3; length <= 16; length++) {
    for (let bucket = 1; bucket <= 8; bucket++) {
      const key = `L${length}.${bucket}`;
      const fileName = `${key}.txt`;

      try {
        const response = await fetch(`/DATA/${fileName}`);
        if (response.ok) {
          const content = await response.text();
          const fileWords = parseWordFile(content, length);
          words.set(key, fileWords);

          if (onProgress) {
            onProgress({ file: key, wordsLoaded: fileWords.length });
          }
        }
      } catch (e) {
        console.warn(`Failed to load ${fileName}:`, e);
      }
    }
  }

  return words;
}

/**
 * Load a single word file
 */
export async function loadWordFile(
  length: number,
  bucket: number
): Promise<string[]> {
  const fileName = `L${length}.${bucket}.txt`;

  try {
    const response = await fetch(`/DATA/${fileName}`);
    if (response.ok) {
      const content = await response.text();
      return parseWordFile(content, length);
    }
  } catch (e) {
    console.warn(`Failed to load ${fileName}:`, e);
  }

  return [];
}
