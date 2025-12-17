// Wildcard word search matching XWORD.TXT RECALL - PART WORD functionality
// Uses space character as wildcard (matching any letter)

import { getDictionary, Dictionary } from './Dictionary';

export interface SearchResult {
  words: string[];
  searchedBuckets: number[];
}

export class WordSearch {
  private dictionary: Dictionary;

  constructor() {
    this.dictionary = getDictionary();
  }

  // Search for words matching a pattern
  // Pattern: letters for known positions, space for unknown
  // Example: "c t" matches "cat", "cot", "cut", etc.
  search(pattern: string, length: number): SearchResult {
    const normalizedPattern = pattern.toLowerCase();
    const matches: string[] = [];
    const searchedBuckets: number[] = [];

    // Determine which buckets to search based on first character
    let bucketsToSearch: number[];

    if (normalizedPattern.length > 0 && normalizedPattern[0] !== ' ') {
      // First letter is known - search only that bucket
      const bucket = Dictionary.getBucket(normalizedPattern[0]);
      bucketsToSearch = [bucket];
    } else {
      // First letter unknown - search all buckets
      bucketsToSearch = [1, 2, 3, 4, 5, 6, 7, 8];
    }

    // Search each relevant bucket
    for (const bucket of bucketsToSearch) {
      searchedBuckets.push(bucket);
      const words = this.dictionary.getWords(length, bucket);

      for (const word of words) {
        if (this.matchesPattern(word, normalizedPattern)) {
          matches.push(word);
        }
      }
    }

    return { words: matches, searchedBuckets };
  }

  // Check if a word matches a pattern
  // Space in pattern matches any character
  private matchesPattern(word: string, pattern: string): boolean {
    if (word.length !== pattern.length) return false;

    for (let i = 0; i < pattern.length; i++) {
      const patternChar = pattern[i];
      const wordChar = word[i];

      // Space is wildcard - matches anything
      if (patternChar === ' ') continue;

      // Otherwise must match exactly
      if (patternChar !== wordChar) return false;
    }

    return true;
  }

  // Format search results for display (matching original XWORD output)
  formatResults(words: string[], wordsPerLine: number = 5): string[] {
    const lines: string[] = [];
    let currentLine = '';
    let count = 0;

    for (const word of words) {
      if (count > 0 && count % wordsPerLine === 0) {
        lines.push(currentLine.trim());
        currentLine = '';
      }
      currentLine += word.padEnd(word.length + 2);
      count++;
    }

    if (currentLine.trim()) {
      lines.push(currentLine.trim());
    }

    return lines;
  }
}

// Singleton instance
let searchInstance: WordSearch | null = null;

export function getWordSearch(): WordSearch {
  if (!searchInstance) {
    searchInstance = new WordSearch();
  }
  return searchInstance;
}
