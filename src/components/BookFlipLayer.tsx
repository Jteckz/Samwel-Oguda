import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useBookFlip } from './BookFlipContext';
import {
  FLIP_DURATION,
  FLIP_EASES,
  FLIP_ROTATE_BACKWARD,
  FLIP_ROTATE_FORWARD,
  FLIP_SHADE_OPACITY,
  FLIP_SHADOW_OPACITY,
  FLIP_SHADOW_SCALE,
  FLIP_TIMES,
} from '../lib/flip';

/**
 * The turning leaf.
 *
 * Layering (back -> front):
 *   1. the incoming page, rendered by <Layout> in normal document flow
 *   2. `.flip-shadow`  - the shadow the leaf casts on the page underneath
 *   3. `.flip-leaf`    - the outgoing page, hinged on the spine
 */
export default function BookFlipLayer() {
  const { flip, completeFlip } = useBookFlip();
  const hostRef = useRef<HTMLDivElement>(null);

  // Mount the static DOM snapshot of the outgoing page inside the leaf.
  useLayoutEffect(() => {
    if (!flip?.snapshot || !hostRef.current) return;
    hostRef.current.replaceChildren(flip.snapshot);
  }, [flip]);

  if (!flip) return null;

  const forward = flip.direction === 1;
  const hinge = forward ? 'left center' : 'right center';

  return (
    <div aria-hidden="true" className="flip-layer">
      {/* Shadow cast by the leaf onto the page underneath */}
      <motion.div
        className="flip-shadow"
        style={{ transformOrigin: hinge }}
        initial={{ scaleX: FLIP_SHADOW_SCALE[0], opacity: FLIP_SHADOW_OPACITY[0] }}
        animate={{ scaleX: FLIP_SHADOW_SCALE, opacity: FLIP_SHADOW_OPACITY }}
        transition={{ duration: FLIP_DURATION, times: FLIP_TIMES, ease: FLIP_EASES }}
      >
        <div className={`flip-shadow__wash ${forward ? 'is-forward' : 'is-backward'}`} />
      </motion.div>

      {/* The leaf itself */}
      <motion.div
        className="flip-leaf"
        style={{ transformOrigin: hinge, willChange: 'transform' }}
        initial={{ rotateY: 0, scale: 1, rotateZ: 0 }}
        animate={{
          rotateY: forward ? FLIP_ROTATE_FORWARD : FLIP_ROTATE_BACKWARD,
          // the page is lifted off the spine before it is released ...
          scale: [1, 1.014, 1.008, 1.002, 1],
          // ... and the whole book sways a little while the page falls
          rotateZ: forward ? [0, 0.4, -0.25, 0.12, 0] : [0, -0.4, 0.25, -0.12, 0],
        }}
        transition={{ duration: FLIP_DURATION, times: FLIP_TIMES, ease: FLIP_EASES }}
        onAnimationComplete={completeFlip}
      >
        <div className="flip-page">
          {/* Page surface (static snapshot of the outgoing page) */}
          <div
            ref={hostRef}
            className="flip-snapshot"
            style={{ transform: `translateY(${-flip.scrollY}px)` }}
          />

          {/* Paper shading: the leaf darkens as it turns away from the light */}
          <motion.div
            className={`flip-shade ${forward ? 'is-forward' : 'is-backward'}`}
            initial={{ opacity: FLIP_SHADE_OPACITY[0] }}
            animate={{ opacity: FLIP_SHADE_OPACITY }}
            transition={{ duration: FLIP_DURATION, times: FLIP_TIMES, ease: FLIP_EASES }}
          />

          {/* Specular sheen travelling across the paper */}
          <motion.div
            className="flip-gloss"
            initial={{ x: '0%' }}
            animate={{ x: forward ? '-72%' : '72%' }}
            transition={{ duration: FLIP_DURATION, ease: 'easeInOut' }}
          />

          {/* Bright fold line along the leading edge of the leaf */}
          <div className={`flip-edge ${forward ? 'is-forward' : 'is-backward'}`} />
        </div>
      </motion.div>
    </div>
  );
}
