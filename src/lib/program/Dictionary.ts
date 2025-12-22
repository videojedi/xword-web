// Dictionary storage matching original XWORD.TXT bucket organization
// Words organized by length (3-16) and first-letter bucket (1-8)
// Buckets: 1=a-b, 2=c-d, 3=e-g, 4=h-k, 5=l-o, 6=p-r, 7=s, 8=t-z

import { loadWordFile, parseWordFile, type ProgressCallback } from './WordFileLoader';

const STORAGE_KEY = 'xword_dictionary';
const DATA_LOADED_KEY = 'xword_data_loaded';

export class Dictionary {
  // Map key format: "L{length}.{bucket}" matching original ProDOS filenames
  private words: Map<string, string[]> = new Map();
  private loaded: boolean = false;

  constructor() {
    this.loadFromStorage();
  }

  // Check if data files have been loaded
  isDataLoaded(): boolean {
    return localStorage.getItem(DATA_LOADED_KEY) === 'true';
  }

  // Mark data as loaded
  private markDataLoaded(): void {
    localStorage.setItem(DATA_LOADED_KEY, 'true');
  }

  // Get bucket number (1-8) for a word based on first letter
  static getBucket(word: string): number {
    const firstChar = word.toLowerCase().charCodeAt(0);

    if (firstChar <= 98) return 1; // a-b (97-98)
    if (firstChar <= 100) return 2; // c-d (99-100)
    if (firstChar <= 103) return 3; // e-g (101-103)
    if (firstChar <= 107) return 4; // h-k (104-107)
    if (firstChar <= 111) return 5; // l-o (108-111)
    if (firstChar <= 114) return 6; // p-r (112-114)
    if (firstChar === 115) return 7; // s (115)
    return 8; // t-z (116-122)
  }

  // Get the key for a word
  static getKey(word: string): string {
    const length = word.length;
    const bucket = Dictionary.getBucket(word);
    return `L${length}.${bucket}`;
  }

  // Add a word to the dictionary
  addWord(word: string): boolean {
    const normalized = word.toLowerCase().trim();

    // Validate: 3-16 characters, letters only
    if (normalized.length < 3 || normalized.length > 16) return false;
    if (!/^[a-z]+$/.test(normalized)) return false;

    const key = Dictionary.getKey(normalized);
    const bucket = this.words.get(key) || [];

    // Check for duplicates
    if (bucket.includes(normalized)) return false;

    bucket.push(normalized);
    bucket.sort();
    this.words.set(key, bucket);
    this.save();
    return true;
  }

  // Remove a word from the dictionary
  removeWord(word: string): boolean {
    const normalized = word.toLowerCase().trim();
    const key = Dictionary.getKey(normalized);
    const bucket = this.words.get(key);

    if (!bucket) return false;

    const index = bucket.indexOf(normalized);
    if (index === -1) return false;

    bucket.splice(index, 1);
    this.save();
    return true;
  }

  // Get all words of a specific length and bucket
  getWords(length: number, bucket: number): string[] {
    const key = `L${length}.${bucket}`;
    return this.words.get(key) || [];
  }

  // Get all words of a specific length
  getWordsByLength(length: number): string[] {
    const allWords: string[] = [];
    for (let bucket = 1; bucket <= 8; bucket++) {
      allWords.push(...this.getWords(length, bucket));
    }
    return allWords.sort();
  }

  // Get total word count
  getTotalCount(): number {
    let count = 0;
    this.words.forEach(bucket => {
      count += bucket.length;
    });
    return count;
  }

  // Get count for a specific file
  getFileCount(length: number, bucket: number): number {
    return this.getWords(length, bucket).length;
  }

  // Save to localStorage
  private save(): void {
    try {
      const data: Record<string, string[]> = {};
      this.words.forEach((value, key) => {
        data[key] = value;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save dictionary:', e);
    }
  }

  // Load from localStorage (synchronous, called from constructor)
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored) as Record<string, string[]>;
        this.words = new Map(Object.entries(data));
        this.loaded = true;
      }
    } catch (e) {
      console.error('Failed to load dictionary from storage:', e);
    }
  }

  // Load a single file from DATA directory
  async loadFile(length: number, bucket: number): Promise<number> {
    const key = `L${length}.${bucket}`;

    // Skip if already loaded
    if (this.words.has(key) && this.words.get(key)!.length > 0) {
      return this.words.get(key)!.length;
    }

    try {
      const words = await loadWordFile(length, bucket);
      if (words.length > 0) {
        this.words.set(key, words);
        this.save();
        return words.length;
      }
    } catch (e) {
      console.warn(`Failed to load ${key}:`, e);
    }

    return 0;
  }

  // Load all word files from DATA directory
  async loadAllFiles(onProgress?: (file: string, count: number) => void): Promise<void> {
    for (let length = 3; length <= 16; length++) {
      for (let bucket = 1; bucket <= 8; bucket++) {
        const count = await this.loadFile(length, bucket);
        if (onProgress) {
          onProgress(`L${length}.${bucket}`, count);
        }
      }
    }
    this.markDataLoaded();
    this.loaded = true;
  }

  // Legacy load method - no longer loads sample words
  private load(): void {
    this.loadFromStorage();
  }

  // Reset dictionary - clears localStorage flags to force reload
  resetAndReload(): void {
    localStorage.removeItem(DATA_LOADED_KEY);
    localStorage.removeItem(STORAGE_KEY);
    this.words.clear();
    this.loaded = false;
  }

  // Clear the dictionary
  clear(): void {
    this.words.clear();
    this.save();
  }

  // Export all words as flat array
  getAllWords(): string[] {
    const allWords: string[] = [];
    this.words.forEach(bucket => {
      allWords.push(...bucket);
    });
    return allWords.sort();
  }
}

// Singleton instance
let dictionaryInstance: Dictionary | null = null;

export function getDictionary(): Dictionary {
  if (!dictionaryInstance) {
    dictionaryInstance = new Dictionary();
  }
  return dictionaryInstance;
}
