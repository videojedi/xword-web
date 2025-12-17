import { ScreenBuffer } from './ScreenBuffer';
import { updateScreen } from '../stores/screenStore';

// Terminal controller wrapping ScreenBuffer with BASIC-like commands
export class Terminal {
  private screen: ScreenBuffer;
  private inputMode: 'none' | 'input' | 'get' = 'none';
  private inputBuffer: string = '';
  private inputPrompt: string = '';
  private inputMaxLength: number = 40;
  private inputResolver: ((value: string) => void) | null = null;
  private keyHandler: ((e: KeyboardEvent) => void) | null = null;
  private audioContext: AudioContext | null = null;

  constructor() {
    this.screen = new ScreenBuffer(updateScreen);
  }

  // HOME - Clear screen
  HOME(): void {
    this.screen.home();
  }

  // VTAB - Set row (1-24)
  VTAB(row: number): void {
    this.screen.vtab(row);
  }

  // HTAB - Set column (1-40)
  HTAB(col: number): void {
    this.screen.htab(col);
  }

  // PRINT - Output text
  PRINT(text: string): void {
    this.screen.print(text);
  }

  // PRINTLN - Output text with newline
  PRINTLN(text: string = ''): void {
    this.screen.println(text);
  }

  // BEEP - Make a sound (CHR$(7))
  BEEP(): void {
    try {
      if (!this.audioContext) {
        this.audioContext = new AudioContext();
      }
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = 1000; // 1kHz beep
      oscillator.type = 'square';
      gainNode.gain.value = 0.1;

      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.1);
    } catch (e) {
      // Audio not available, silent fail
    }
  }

  // INPUT - Get line input with prompt
  async INPUT(prompt: string = '', maxLength: number = 40): Promise<string> {
    return new Promise((resolve) => {
      this.PRINT(prompt);
      this.inputMode = 'input';
      this.inputBuffer = '';
      this.inputPrompt = prompt;
      this.inputMaxLength = maxLength;
      this.inputResolver = resolve;
      this.screen.setCursorVisible(true);
      this.setupKeyHandler();
    });
  }

  // GET - Get single character
  async GET(): Promise<string> {
    return new Promise((resolve) => {
      this.inputMode = 'get';
      this.inputResolver = resolve;
      this.screen.setCursorVisible(true);
      this.setupKeyHandler();
    });
  }

  private setupKeyHandler(): void {
    if (this.keyHandler) {
      document.removeEventListener('keydown', this.keyHandler);
    }

    this.keyHandler = (e: KeyboardEvent) => {
      this.handleKeyDown(e);
    };
    document.addEventListener('keydown', this.keyHandler);
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (!this.inputResolver) return;

    e.preventDefault();

    if (this.inputMode === 'get') {
      // Single character mode
      let char = e.key;
      if (char.length === 1) {
        char = char.toUpperCase();
        this.finishInput(char);
      } else if (e.key === 'Enter') {
        this.finishInput('\n');
      } else if (e.key === 'Escape') {
        this.finishInput('\x1b');
      }
    } else if (this.inputMode === 'input') {
      // Line input mode
      if (e.key === 'Enter') {
        this.PRINTLN();
        this.finishInput(this.inputBuffer);
      } else if (e.key === 'Backspace') {
        if (this.inputBuffer.length > 0) {
          this.inputBuffer = this.inputBuffer.slice(0, -1);
          this.screen.deleteChar();
        } else {
          this.BEEP();
        }
      } else if (e.key.length === 1 && this.inputBuffer.length < this.inputMaxLength) {
        const char = e.key.toUpperCase();
        this.inputBuffer += char;
        this.screen.printChar(char);
      } else if (e.key.length === 1) {
        this.BEEP(); // Buffer full
      }
    }
  }

  private finishInput(value: string): void {
    if (this.keyHandler) {
      document.removeEventListener('keydown', this.keyHandler);
      this.keyHandler = null;
    }
    this.inputMode = 'none';
    this.screen.setCursorVisible(false);
    if (this.inputResolver) {
      this.inputResolver(value);
      this.inputResolver = null;
    }
  }

  // Utility: Print centered text
  printCentered(text: string, row: number): void {
    const col = Math.floor((40 - text.length) / 2) + 1;
    this.VTAB(row);
    this.HTAB(col);
    this.PRINT(text);
  }

  // Utility: Clear and reset
  clear(): void {
    this.HOME();
  }

  // Utility: Wait for specified milliseconds
  wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get the screen buffer for direct manipulation if needed
  getScreen(): ScreenBuffer {
    return this.screen;
  }
}

// Singleton terminal instance
let terminalInstance: Terminal | null = null;

export function getTerminal(): Terminal {
  if (!terminalInstance) {
    terminalInstance = new Terminal();
  }
  return terminalInstance;
}
