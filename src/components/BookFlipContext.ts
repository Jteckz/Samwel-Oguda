import { createContext, useContext } from 'react';
import type { RefObject } from 'react';

export interface FlipState {
  /** Unique id, used as the React key of the animated leaf. */
  id: number;
  /** Pathname of the page that is being turned away. */
  fromPath: string;
  /** Pathname of the page that is revealed underneath. */
  toPath: string;
  /** +1 = forward through the book, -1 = backwards. */
  direction: 1 | -1;
  /** Window scroll offset when the turn started (keeps the leaf aligned). */
  scrollY: number;
  /** Static DOM snapshot of the outgoing page, used as the leaf surface. */
  snapshot: HTMLElement | null;
}

export interface BookFlipApi {
  /** Turn the book to `path`. */
  flipTo: (path: string) => void;
  /** True while a page turn is running. */
  isFlipping: boolean;
  /** The element that holds the current page (used to snapshot it). */
  pageRef: RefObject<HTMLElement>;
  /** Active turn, or null when the book is at rest. */
  flip: FlipState | null;
  /** Called by the animation layer when the turn has finished. */
  completeFlip: () => void;
}

export const BookFlipContext = createContext<BookFlipApi | null>(null);

export function useBookFlip(): BookFlipApi {
  const ctx = useContext(BookFlipContext);
  if (!ctx) throw new Error('useBookFlip() must be used inside <BookFlipProvider>');
  return ctx;
}
