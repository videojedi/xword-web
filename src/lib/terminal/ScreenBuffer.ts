// Apple II Screen Buffer - 40 columns x 24 rows

export const COLS = 40;
export const ROWS = 24;

export interface ScreenState {
  buffer: string[][];
  cursorX: number;
  cursorY: number;
  cursorVisible: boolean;
}

export function createEmptyBuffer(): string[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ' ')
  );
}

export function createScreenState(): ScreenState {
  return {
    buffer: createEmptyBuffer(),
    cursorX: 0,
    cursorY: 0,
    cursorVisible: true
  };
}

export class ScreenBuffer {
  private state: ScreenState;
  private onUpdate: (state: ScreenState) => void;

  constructor(onUpdate: (state: ScreenState) => void) {
    this.state = createScreenState();
    this.onUpdate = onUpdate;
  }

  private notify(): void {
    this.onUpdate({ ...this.state, buffer: this.state.buffer.map(row => [...row]) });
  }

  getState(): ScreenState {
    return this.state;
  }

  // HOME - Clear screen and move cursor to top-left
  home(): void {
    this.state.buffer = createEmptyBuffer();
    this.state.cursorX = 0;
    this.state.cursorY = 0;
    this.notify();
  }

  // VTAB - Set vertical cursor position (1-indexed in BASIC)
  vtab(row: number): void {
    // BASIC uses 1-24, we use 0-23
    this.state.cursorY = Math.max(0, Math.min(ROWS - 1, row - 1));
    this.notify();
  }

  // HTAB - Set horizontal cursor position (1-indexed in BASIC)
  htab(col: number): void {
    // BASIC uses 1-40, we use 0-39
    this.state.cursorX = Math.max(0, Math.min(COLS - 1, col - 1));
    this.notify();
  }

  // Print a single character at cursor position
  printChar(char: string): void {
    if (char === '\n') {
      this.newLine();
      return;
    }

    // Convert to uppercase (Apple II style)
    const c = char.toUpperCase();

    if (this.state.cursorX >= COLS) {
      this.newLine();
    }

    this.state.buffer[this.state.cursorY][this.state.cursorX] = c;
    this.state.cursorX++;
    this.notify();
  }

  // Print a string, handling newlines and wrapping
  print(text: string): void {
    for (const char of text) {
      this.printChar(char);
    }
  }

  // Print text and move to next line
  println(text: string = ''): void {
    this.print(text);
    this.newLine();
  }

  // Move to next line, scrolling if necessary
  newLine(): void {
    this.state.cursorX = 0;
    this.state.cursorY++;

    if (this.state.cursorY >= ROWS) {
      this.scroll();
      this.state.cursorY = ROWS - 1;
    }
    this.notify();
  }

  // Scroll screen up one line
  private scroll(): void {
    this.state.buffer.shift();
    this.state.buffer.push(Array.from({ length: COLS }, () => ' '));
  }

  // Clear a specific line
  clearLine(row: number): void {
    if (row >= 0 && row < ROWS) {
      this.state.buffer[row] = Array.from({ length: COLS }, () => ' ');
      this.notify();
    }
  }

  // Set character at specific position without moving cursor
  setChar(row: number, col: number, char: string): void {
    if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
      this.state.buffer[row][col] = char.toUpperCase();
      this.notify();
    }
  }

  // Get cursor position
  getCursor(): { x: number; y: number } {
    return { x: this.state.cursorX, y: this.state.cursorY };
  }

  // Set cursor visibility
  setCursorVisible(visible: boolean): void {
    this.state.cursorVisible = visible;
    this.notify();
  }

  // Delete character at cursor (for backspace)
  deleteChar(): void {
    if (this.state.cursorX > 0) {
      this.state.cursorX--;
      this.state.buffer[this.state.cursorY][this.state.cursorX] = ' ';
      this.notify();
    }
  }
}
