import { writable, type Writable } from 'svelte/store';
import { createScreenState, type ScreenState } from '../terminal/ScreenBuffer';

// Create the reactive screen store
export const screenStore: Writable<ScreenState> = writable(createScreenState());

// Export a function to update the store
export function updateScreen(state: ScreenState): void {
  screenStore.set(state);
}
