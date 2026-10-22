/**
 * Shared configuration for the 3D book-flip page transition.
 *
 * The portfolio is modelled as a book: every route is a "page" in the book.
 * `SECTION_ORDER` defines the reading order, which is what determines the
 * direction of the page turn (forward = page lifts away to the left).
 */
import type { Easing } from 'framer-motion';

export const SECTION_ORDER = [
  '/',
  '/about',
  '/skills',
  '/projects',
  '/experience',
  '/contact',
] as const;

export type SectionPath = (typeof SECTION_ORDER)[number];

/** Total length of one page turn, in seconds. */
export const FLIP_DURATION = 1.05;

/**
 * Keyframe distribution for the turn.
 *
 *  0.00 -> 0.16 : the page is "lifted" off the spine (very little rotation)
 *  0.16 -> 0.56 : the page is released and sweeps across the screen
 *  0.56 -> 0.86 : the page is nearly vertical (foreshortened to a sliver)
 *  0.86 -> 1.00 : the page falls behind the spine and the new page is revealed
 */
export const FLIP_TIMES = [0, 0.16, 0.56, 0.86, 1];

/**
 * Per-segment easing. Each entry is the easing used *inside* one segment.
 *  easeOut  -> slow lift off the spine
 *  easeIn   -> gravity takes over, the page accelerates
 *  easeOut  -> the page is grabbed by the air and slows down
 *  easeInOut-> soft landing on the other side of the book
 */
export const FLIP_EASES: Easing[] = ['easeOut', 'easeIn', 'easeOut', 'easeInOut'];

/** Rotation keyframes of the turning leaf (degrees). */
export const FLIP_ROTATE_FORWARD = [0, 4, 48, 84, 95];
export const FLIP_ROTATE_BACKWARD = [0, -4, -48, -84, -95];

/**
 * Horizontal scale of the shadow cast on the page underneath.
 * These are `cos(angle)` samples for the angles above, clamped at 0 so the
 * shadow never flips to the wrong side of the screen.
 */
export const FLIP_SHADOW_SCALE = [1, 0.997, 0.669, 0.105, 0];
export const FLIP_SHADOW_OPACITY = [0.4, 0.55, 0.78, 0.94, 1];

/** Opacity of the darkening overlay painted on the leaf as it turns away. */
export const FLIP_SHADE_OPACITY = [0, 0.04, 0.34, 0.62, 0.78];

/** Returns +1 when `to` is further along in the book than `from`, else -1. */
export function directionFor(from: string, to: string): 1 | -1 {
  const fromIndex = SECTION_ORDER.indexOf(from as SectionPath);
  const toIndex = SECTION_ORDER.indexOf(to as SectionPath);
  if (fromIndex === -1 || toIndex === -1 || toIndex === fromIndex) return 1;
  return toIndex > fromIndex ? 1 : -1;
}

/** Builds a router-compatible location object for a given pathname. */
export function makeLocation(pathname: string) {
  return { pathname, search: '', hash: '', state: null, key: `flip-${pathname}` };
}
