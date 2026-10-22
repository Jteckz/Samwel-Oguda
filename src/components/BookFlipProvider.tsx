import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { BookFlipContext } from './BookFlipContext';
import type { FlipState } from './BookFlipContext';
import BookFlipLayer from './BookFlipLayer';
import { directionFor } from '../lib/flip';

function lockScroll() {
  const scrollbar = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
}

function unlockScroll() {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}

function scrollToTopInstant() {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previous;
}

export default function BookFlipProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const [flip, setFlip] = useState<FlipState | null>(null);

  const locationRef = useRef(location);
  const internalNavRef = useRef(false);
  const busyRef = useRef(false);
  const flipIdRef = useRef(0);
  const pageRef = useRef<HTMLElement | null>(null);
  /** Snapshot of the page we are currently on, refreshed on every arrival. */
  const arrivalSnapshotRef = useRef<HTMLElement | null>(null);

  const beginFlip = useCallback((fromPath: string, toPath: string, snapshot: HTMLElement | null) => {
    if (busyRef.current) return;
    busyRef.current = true;
    lockScroll();
    setFlip({
      id: ++flipIdRef.current,
      fromPath,
      toPath,
      direction: directionFor(fromPath, toPath),
      scrollY: window.scrollY,
      snapshot,
    });
  }, []);

  const flipTo = useCallback(
    (path: string) => {
      const current = locationRef.current.pathname;
      if (current === path) return;
      if (busyRef.current) return;

      if (reduceMotion) {
        internalNavRef.current = true;
        navigate(path);
        return;
      }

      // Snapshot the outgoing page *before* the router swaps the DOM, so the
      // leaf shows exactly what the visitor was looking at.
      const snapshot = pageRef.current ? (pageRef.current.cloneNode(true) as HTMLElement) : null;
      beginFlip(current, path, snapshot);

      scrollToTopInstant();
      internalNavRef.current = true;
      navigate(path);
    },
    [beginFlip, navigate, reduceMotion],
  );

  const completeFlip = useCallback(() => {
    unlockScroll();
    busyRef.current = false;
    setFlip(null);
  }, []);

  // Detect location changes that did not come from `flipTo`
  // (browser back / forward, or a manual URL change).
  useEffect(() => {
    const previous = locationRef.current;
    if (previous.pathname === location.pathname) return;
    locationRef.current = location;

    if (internalNavRef.current) {
      internalNavRef.current = false;
    } else if (!reduceMotion && !busyRef.current) {
      // The DOM already shows the new page, so we reuse the snapshot that was
      // taken when we arrived on the previous page.
      beginFlip(previous.pathname, location.pathname, arrivalSnapshotRef.current);
    }

    // Refresh the snapshot of the page we just landed on.
    arrivalSnapshotRef.current = pageRef.current
      ? (pageRef.current.cloneNode(true) as HTMLElement)
      : null;
  }, [beginFlip, location, reduceMotion]);

  // Capture the very first page.
  useEffect(() => {
    arrivalSnapshotRef.current = pageRef.current
      ? (pageRef.current.cloneNode(true) as HTMLElement)
      : null;
  }, []);

  useEffect(() => () => unlockScroll(), []);

  const api = useMemo(
    () => ({ flipTo, isFlipping: flip !== null, pageRef, flip, completeFlip }),
    [completeFlip, flip, flipTo],
  );

  return (
    <BookFlipContext.Provider value={api}>
      {children}
      <BookFlipLayer />
    </BookFlipContext.Provider>
  );
}
