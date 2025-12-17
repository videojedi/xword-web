// Input handling utilities for the Apple II terminal

export type InputMode = 'none' | 'input' | 'get';

export interface InputState {
  mode: InputMode;
  buffer: string;
  prompt: string;
  maxLength: number;
}

// Character validation - Apple II allowed printable ASCII
export function isValidChar(char: string): boolean {
  const code = char.charCodeAt(0);
  return code >= 32 && code <= 126;
}

// Convert to uppercase (Apple II default behavior)
export function toAppleIIChar(char: string): string {
  return char.toUpperCase();
}

// Check if a key is a control key we should handle
export function isControlKey(key: string): boolean {
  return ['Enter', 'Backspace', 'Escape', 'Tab'].includes(key);
}

// Parse Y/N response (flexible matching)
export function isYes(input: string): boolean {
  return input.toUpperCase() === 'Y' || input.toUpperCase() === 'YES';
}

export function isNo(input: string): boolean {
  return input.toUpperCase() === 'N' || input.toUpperCase() === 'NO';
}

// Validate numeric input
export function isNumeric(input: string): boolean {
  return /^\d+$/.test(input);
}

// Parse numeric input with bounds checking
export function parseNumber(input: string, min: number, max: number): number | null {
  if (!isNumeric(input)) return null;
  const num = parseInt(input, 10);
  if (num < min || num > max) return null;
  return num;
}
