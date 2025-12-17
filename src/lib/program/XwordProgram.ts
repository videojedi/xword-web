// XWORD Crossword Solving Aid - State Machine
// Replicates the original 1988 AppleSoft BASIC program behavior

import { getTerminal, Terminal } from '../terminal/TerminalCommands';
import { getDictionary, Dictionary } from './Dictionary';
import { getWordSearch, WordSearch } from './WordSearch';
import { getAnagramSolver, AnagramSolver } from './AnagramSolver';
import { isYes, isNo } from '../terminal/InputHandler';

export enum ProgramState {
  INIT,
  LOADING,
  MAIN_MENU,
  ADD_WORDS,
  REMOVE_WORDS,
  WORD_SEARCH,
  WORD_SEARCH_INPUT,
  ANAGRAM_SOLVE,
  QUIT_CONFIRM,
  QUIT
}

export class XwordProgram {
  private terminal: Terminal;
  private dictionary: Dictionary;
  private wordSearch: WordSearch;
  private anagramSolver: AnagramSolver;
  private state: ProgramState = ProgramState.INIT;
  private running: boolean = false;

  constructor() {
    this.terminal = getTerminal();
    this.dictionary = getDictionary();
    this.wordSearch = getWordSearch();
    this.anagramSolver = getAnagramSolver();
  }

  async start(): Promise<void> {
    this.running = true;
    this.state = ProgramState.LOADING;
    await this.runLoadingSequence();

    while (this.running) {
      switch (this.state) {
        case ProgramState.MAIN_MENU:
          await this.showMainMenu();
          break;
        case ProgramState.ADD_WORDS:
          await this.addWordsMode();
          break;
        case ProgramState.REMOVE_WORDS:
          await this.removeWordsMode();
          break;
        case ProgramState.WORD_SEARCH:
          await this.wordSearchMode();
          break;
        case ProgramState.ANAGRAM_SOLVE:
          await this.anagramMode();
          break;
        case ProgramState.QUIT_CONFIRM:
          await this.quitConfirm();
          break;
        case ProgramState.QUIT:
          this.running = false;
          break;
        default:
          this.state = ProgramState.MAIN_MENU;
      }
    }
  }

  // Simulate loading files from disk
  private async runLoadingSequence(): Promise<void> {
    for (let length = 3; length <= 8; length++) {
      for (let bucket = 1; bucket <= 8; bucket++) {
        this.terminal.HOME();
        this.terminal.VTAB(12);
        this.terminal.PRINT(`        LOADING FILE L${length}.${bucket} INTO RAM`);
        await this.terminal.wait(30); // Quick loading simulation
      }
    }
    await this.terminal.wait(200);
    this.state = ProgramState.MAIN_MENU;
  }

  // Display main menu (lines 240-390 of original)
  private async showMainMenu(): Promise<void> {
    this.terminal.HOME();

    // Title - centered on 40 columns
    const title = 'CROSSWORD SOLVING AID';
    const author = 'BY C.A. SMALL ... APRIL 1988';

    this.terminal.VTAB(2);
    this.terminal.HTAB(Math.floor((40 - title.length) / 2) + 1);
    this.terminal.PRINT(title);

    this.terminal.VTAB(4);
    this.terminal.HTAB(Math.floor((40 - author.length) / 2) + 1);
    this.terminal.PRINT(author);

    // Menu options
    this.terminal.VTAB(8);
    this.terminal.HTAB(3);
    this.terminal.PRINT('ENTER NEW WORDS IN DICTIONARY ......A');

    this.terminal.VTAB(10);
    this.terminal.HTAB(3);
    this.terminal.PRINT('REMOVE DICTIONARY ENTRIES ..........B');

    this.terminal.VTAB(12);
    this.terminal.HTAB(3);
    this.terminal.PRINT('RECALL - PART WORD .................C');

    this.terminal.VTAB(14);
    this.terminal.HTAB(3);
    this.terminal.PRINT('SOLVE ANAGRAM ......................D');

    this.terminal.VTAB(16);
    this.terminal.HTAB(3);
    this.terminal.PRINT('QUIT ...............................E');

    // Word count
    this.terminal.VTAB(18);
    this.terminal.HTAB(3);
    this.terminal.PRINT(`DICTIONARY CONTAINS ${this.dictionary.getTotalCount()} WORDS`);

    this.terminal.VTAB(20);
    this.terminal.HTAB(7);
    this.terminal.PRINT('ENTER LETTER OF YOUR CHOICE');

    // Get menu choice
    const choice = await this.terminal.GET();

    switch (choice.toUpperCase()) {
      case 'A':
        this.state = ProgramState.ADD_WORDS;
        break;
      case 'B':
        this.state = ProgramState.REMOVE_WORDS;
        break;
      case 'C':
        this.state = ProgramState.WORD_SEARCH;
        break;
      case 'D':
        this.state = ProgramState.ANAGRAM_SOLVE;
        break;
      case 'E':
        this.state = ProgramState.QUIT_CONFIRM;
        break;
      default:
        this.terminal.BEEP();
        // Stay on main menu
    }
  }

  // Add words mode (Option A)
  private async addWordsMode(): Promise<void> {
    this.terminal.HOME();

    while (true) {
      this.terminal.VTAB(1);
      this.terminal.HTAB(1);
      const word = await this.terminal.INPUT('ENTER WORD (3 TO 16 CHARACTERS): ');

      if (word === '') {
        this.state = ProgramState.MAIN_MENU;
        return;
      }

      // Validate word
      if (word.length < 3 || word.length > 16) {
        this.terminal.PRINTLN();
        this.terminal.PRINTLN('WORD MUST BE 3 TO 16 CHARACTERS');
        this.terminal.BEEP();
        await this.terminal.wait(1000);
        this.terminal.HOME();
        continue;
      }

      if (!/^[A-Za-z]+$/.test(word)) {
        this.terminal.PRINTLN();
        this.terminal.PRINTLN('LETTERS ONLY PLEASE');
        this.terminal.BEEP();
        await this.terminal.wait(1000);
        this.terminal.HOME();
        continue;
      }

      // Add to dictionary
      const added = this.dictionary.addWord(word);

      this.terminal.PRINTLN();
      if (added) {
        this.terminal.PRINTLN(`"${word.toUpperCase()}" ADDED TO DICTIONARY`);
      } else {
        this.terminal.PRINTLN(`"${word.toUpperCase()}" ALREADY EXISTS`);
      }

      this.terminal.PRINTLN();
      this.terminal.PRINT('ADD ANOTHER WORD? Y(ES) OR N(O) ');
      const response = await this.terminal.GET();

      if (isNo(response)) {
        this.state = ProgramState.MAIN_MENU;
        return;
      }

      this.terminal.HOME();
    }
  }

  // Remove words mode (Option B)
  private async removeWordsMode(): Promise<void> {
    this.terminal.HOME();
    this.terminal.VTAB(10);
    this.terminal.HTAB(5);

    const lengthStr = await this.terminal.INPUT('WORD LENGTH TO REMOVE (3-16): ');
    const length = parseInt(lengthStr, 10);

    if (isNaN(length) || length < 3 || length > 16) {
      this.terminal.PRINTLN();
      this.terminal.PRINTLN('INVALID LENGTH');
      this.terminal.BEEP();
      await this.terminal.wait(1500);
      this.state = ProgramState.MAIN_MENU;
      return;
    }

    // Show bucket selection menu
    this.terminal.HOME();
    this.terminal.VTAB(2);
    this.terminal.HTAB(5);
    this.terminal.PRINTLN('WHICH SECTION CONTAINS FIRST LETTER');
    this.terminal.PRINTLN();
    this.terminal.HTAB(8);
    this.terminal.PRINTLN('A TO B ...................... 1');
    this.terminal.HTAB(8);
    this.terminal.PRINTLN('C TO D ...................... 2');
    this.terminal.HTAB(8);
    this.terminal.PRINTLN('E TO G ...................... 3');
    this.terminal.HTAB(8);
    this.terminal.PRINTLN('H TO K ...................... 4');
    this.terminal.HTAB(8);
    this.terminal.PRINTLN('L TO O ...................... 5');
    this.terminal.HTAB(8);
    this.terminal.PRINTLN('P TO R ...................... 6');
    this.terminal.HTAB(8);
    this.terminal.PRINTLN('S ........................... 7');
    this.terminal.HTAB(8);
    this.terminal.PRINTLN('T TO Z ...................... 8');
    this.terminal.PRINTLN();

    const bucketStr = await this.terminal.GET();
    const bucket = parseInt(bucketStr, 10);

    if (isNaN(bucket) || bucket < 1 || bucket > 8) {
      this.terminal.BEEP();
      this.state = ProgramState.MAIN_MENU;
      return;
    }

    // Display words in this bucket
    const words = this.dictionary.getWords(length, bucket);

    this.terminal.HOME();
    if (words.length === 0) {
      this.terminal.PRINTLN(`NO ${length}-LETTER WORDS IN SECTION ${bucket}`);
      await this.terminal.wait(1500);
      this.state = ProgramState.MAIN_MENU;
      return;
    }

    this.terminal.PRINTLN(`${words.length} WORDS IN FILE L${length}.${bucket}:`);
    this.terminal.PRINTLN();

    // Display words with numbers
    for (let i = 0; i < words.length; i++) {
      this.terminal.PRINT(`${(i + 1).toString().padStart(3)} ${words[i].toUpperCase()}  `);
      if ((i + 1) % 4 === 0) this.terminal.PRINTLN();
    }

    this.terminal.PRINTLN();
    this.terminal.PRINTLN();

    const numStr = await this.terminal.INPUT('NUMBER TO REMOVE (0 FOR NONE): ');
    const num = parseInt(numStr, 10);

    if (isNaN(num) || num === 0) {
      this.state = ProgramState.MAIN_MENU;
      return;
    }

    if (num < 1 || num > words.length) {
      this.terminal.PRINTLN('INVALID NUMBER');
      this.terminal.BEEP();
      await this.terminal.wait(1000);
      this.state = ProgramState.MAIN_MENU;
      return;
    }

    const wordToRemove = words[num - 1];
    this.terminal.PRINTLN();
    this.terminal.PRINT(`REMOVE "${wordToRemove.toUpperCase()}"? Y(ES) OR N(O) `);

    const confirm = await this.terminal.GET();
    if (isYes(confirm)) {
      this.dictionary.removeWord(wordToRemove);
      this.terminal.PRINTLN();
      this.terminal.PRINTLN('WORD REMOVED');
    }

    await this.terminal.wait(1000);
    this.state = ProgramState.MAIN_MENU;
  }

  // Word search mode (Option C)
  private async wordSearchMode(): Promise<void> {
    this.terminal.HOME();

    // Get word length
    this.terminal.PRINT('NUMBER OF CHARACTERS = ');
    const lengthStr = await this.terminal.INPUT('');
    const length = parseInt(lengthStr, 10);

    if (isNaN(length) || length < 3 || length > 16) {
      this.terminal.PRINTLN();
      this.terminal.PRINTLN('LENGTH MUST BE 3 TO 16');
      this.terminal.BEEP();
      await this.terminal.wait(1500);
      this.state = ProgramState.MAIN_MENU;
      return;
    }

    this.terminal.PRINTLN();
    this.terminal.PRINTLN('ENTER CHARACTER AGAINST POSITION NUMBER');
    this.terminal.PRINTLN();
    this.terminal.PRINTLN("     USE 'SPACEBAR' FOR UNKNOWN LETTERS");
    this.terminal.PRINTLN();

    // Build pattern character by character
    let pattern = '';
    for (let i = 1; i <= length; i++) {
      this.terminal.PRINT(`   ${i} = `);
      const char = await this.terminal.GET();
      this.terminal.PRINTLN(char === ' ' ? '_' : char);
      pattern += char;
    }

    this.terminal.PRINTLN();
    this.terminal.PRINTLN('SEARCHING -- PLEASE WAIT');
    this.terminal.PRINTLN();

    // Perform search
    const result = this.wordSearch.search(pattern, length);

    if (result.words.length === 0) {
      this.terminal.PRINTLN('NO MATCHING WORDS FOUND');
    } else {
      // Display results
      this.terminal.PRINTLN(`FOUND ${result.words.length} MATCHES:`);
      this.terminal.PRINTLN();

      let col = 0;
      for (const word of result.words) {
        const display = word.toUpperCase() + '  ';
        if (col + display.length > 38) {
          this.terminal.PRINTLN();
          col = 0;
        }
        this.terminal.PRINT(display);
        col += display.length;
      }
      this.terminal.PRINTLN();
    }

    this.terminal.PRINTLN();
    this.terminal.PRINT('SEARCH FOR ANOTHER WORD? Y(ES) OR N(O) ');
    const response = await this.terminal.GET();

    if (isYes(response)) {
      // Stay in word search mode
      return;
    }

    this.state = ProgramState.MAIN_MENU;
  }

  // Anagram solving mode (Option D)
  private async anagramMode(): Promise<void> {
    this.terminal.HOME();
    this.terminal.VTAB(12);

    const letters = await this.terminal.INPUT('ENTER ANAGRAM LETTERS: ');

    if (letters.length < 3 || letters.length > 16) {
      this.terminal.PRINTLN();
      this.terminal.PRINTLN('ENTER 3 TO 16 LETTERS');
      this.terminal.BEEP();
      await this.terminal.wait(1500);
      this.state = ProgramState.MAIN_MENU;
      return;
    }

    if (!/^[A-Za-z]+$/.test(letters)) {
      this.terminal.PRINTLN();
      this.terminal.PRINTLN('LETTERS ONLY PLEASE');
      this.terminal.BEEP();
      await this.terminal.wait(1500);
      this.state = ProgramState.MAIN_MENU;
      return;
    }

    this.terminal.PRINTLN();
    this.terminal.PRINTLN('SEARCHING -- PLEASE WAIT');
    this.terminal.PRINTLN();

    // Find anagrams
    const anagrams = this.anagramSolver.findAnagrams(letters);

    if (anagrams.length === 0) {
      this.terminal.PRINTLN('NO ANAGRAMS FOUND');
    } else {
      this.terminal.PRINTLN(`FOUND ${anagrams.length} ANAGRAM(S):`);
      this.terminal.PRINTLN();
      for (const word of anagrams) {
        this.terminal.PRINTLN(`  ${word.toUpperCase()}`);
      }
    }

    this.terminal.PRINTLN();
    this.terminal.PRINT('SEARCH FOR OTHER ANAGRAMS? Y(ES) OR N(O) ');
    const response = await this.terminal.GET();

    if (isYes(response)) {
      // Stay in anagram mode
      return;
    }

    this.state = ProgramState.MAIN_MENU;
  }

  // Quit confirmation
  private async quitConfirm(): Promise<void> {
    this.terminal.HOME();
    this.terminal.VTAB(12);
    this.terminal.HTAB(8);
    this.terminal.PRINT('DO YOU WISH TO QUIT? (Y/N) ');

    const response = await this.terminal.GET();

    if (isYes(response)) {
      this.terminal.HOME();
      this.terminal.VTAB(12);
      this.terminal.HTAB(10);
      this.terminal.PRINTLN('THANK YOU FOR USING');
      this.terminal.HTAB(10);
      this.terminal.PRINTLN('CROSSWORD SOLVING AID');
      this.terminal.PRINTLN();
      this.terminal.HTAB(10);
      this.terminal.PRINTLN(`${this.dictionary.getTotalCount()} WORDS STORED`);
      this.state = ProgramState.QUIT;
    } else {
      this.state = ProgramState.MAIN_MENU;
    }
  }

  // Stop the program
  stop(): void {
    this.running = false;
  }
}

// Singleton instance
let programInstance: XwordProgram | null = null;

export function getXwordProgram(): XwordProgram {
  if (!programInstance) {
    programInstance = new XwordProgram();
  }
  return programInstance;
}
