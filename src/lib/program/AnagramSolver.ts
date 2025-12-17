// Anagram solver using log-hash algorithm from XWORD.TXT
// Each letter is mapped to log of a prime number
// Sum of logs is unique per anagram set - efficient O(n) comparison

import { getDictionary, Dictionary } from './Dictionary';

// Prime numbers for each letter position (a=2, b=3, c=5, ...)
// From original BASIC code lines 150-190
const PRIMES = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
  31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101
];

// Precompute log values (scaled by 1E8 as in original)
const LOG_VALUES: number[] = PRIMES.map(p => Math.round(Math.log(p) * 1e8));

export class AnagramSolver {
  private dictionary: Dictionary;

  constructor() {
    this.dictionary = getDictionary();
  }

  // Calculate hash for a word/letters
  // Sum of log values for each letter
  private calculateHash(text: string): number {
    let hash = 0;
    const normalized = text.toLowerCase();

    for (let i = 0; i < normalized.length; i++) {
      const charCode = normalized.charCodeAt(i);
      // a = 97, so index = charCode - 97
      if (charCode >= 97 && charCode <= 122) {
        hash += LOG_VALUES[charCode - 97];
      }
    }

    return hash;
  }

  // Find anagrams of the given letters
  findAnagrams(letters: string): string[] {
    const normalized = letters.toLowerCase().replace(/[^a-z]/g, '');
    const length = normalized.length;

    if (length < 3 || length > 16) {
      return [];
    }

    // Calculate target hash
    const targetHash = this.calculateHash(normalized);

    // Determine which buckets might contain anagrams
    // Based on sorted letters, find unique first letters
    const sortedLetters = normalized.split('').sort();
    const bucketsToSearch = this.getBucketsFromLetters(sortedLetters);

    const matches: string[] = [];

    // Search relevant buckets
    for (const bucket of bucketsToSearch) {
      const words = this.dictionary.getWords(length, bucket);

      for (const word of words) {
        const wordHash = this.calculateHash(word);
        if (wordHash === targetHash) {
          // Hash matches - this is an anagram
          matches.push(word);
        }
      }
    }

    return matches;
  }

  // Determine which buckets to search based on available letters
  // An anagram can only start with letters we have
  private getBucketsFromLetters(sortedLetters: string[]): number[] {
    const buckets = new Set<number>();

    for (const letter of sortedLetters) {
      buckets.add(Dictionary.getBucket(letter));
    }

    return Array.from(buckets).sort((a, b) => a - b);
  }

  // Get the highest letter in each bucket from the input
  // This matches the Q$(I) optimization in the original BASIC code
  private getMaxLettersPerBucket(letters: string): Map<number, string> {
    const maxLetters = new Map<number, string>();

    for (const letter of letters) {
      const bucket = Dictionary.getBucket(letter);
      const current = maxLetters.get(bucket);
      if (!current || letter > current) {
        maxLetters.set(bucket, letter);
      }
    }

    return maxLetters;
  }

  // Format results for display
  formatResults(words: string[]): string[] {
    return words.map((word, i) => `${i + 1}. ${word.toUpperCase()}`);
  }
}

// Singleton instance
let solverInstance: AnagramSolver | null = null;

export function getAnagramSolver(): AnagramSolver {
  if (!solverInstance) {
    solverInstance = new AnagramSolver();
  }
  return solverInstance;
}
