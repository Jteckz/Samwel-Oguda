import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/* ------------------------------------------------------------------ *
 * Tunables
 * ------------------------------------------------------------------ */

/** Fallback size of the character in px (the real size is measured at
 *  runtime so the figure can be scaled with CSS breakpoints). */
const CHARACTER_HEIGHT = 96;
/** Height of the SVG viewBox; the figure is drawn ~150 units tall. */
const VIEWBOX_HEIGHT = 200;
/** Keep the character this far away from the edges of the content column. */
const EDGE_MARGIN = 14;
/** Maximum walking speed in px/s, so the character chases the cursor
 *  instead of teleporting when the mouse jumps across the screen. */
const MAX_SPEED = 720;
/** How fast the character turns around (in "facing" units per second). */
const TURN_SPEED = 9;
/** A full stride (two steps) is this fraction of the character height. */
const STRIDE_FACTOR = 0.85;

/* ------------------------------------------------------------------ *
 * Skeleton geometry (SVG user units)
 * ------------------------------------------------------------------ */

const HIP_Y = 124; // pelvis height when standing
const THIGH = 34;
const SHIN = 32;
const SHOULDER_Y = -42; // relative to the pelvis
const UPPER_ARM = 26;
const FOREARM = 24;
const SEAT_DROP = 44; // how much the pelvis drops when sitting on the floor

/* ------------------------------------------------------------------ *
 * Shared animation state.
 *
 * It lives outside of React on purpose: the character is re-mounted on
 * every route change (each page owns its own instance), but it should
 * keep walking where it left off instead of jumping back to the middle.
 * ------------------------------------------------------------------ */

interface CharacterState {
  x: number;
  targetX: number;
  pointerX: number | null;
  facing: number;
  facingTarget: number;
  phase: number;
  sit: number;
  sitTarget: number;
  walk: number;
  placed: boolean;
}

const state: CharacterState = {
  x: 0,
  targetX: 0,
  pointerX: null,
  facing: 1,
  facingTarget: 1,
  phase: 0,
  sit: 0,
  sitTarget: 0,
  walk: 0,
  placed: false,
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ------------------------------------------------------------------ *
 * Poses
 * ------------------------------------------------------------------ */

interface Pose {
  hip: number;
  knee: number;
  shoulder: number;
  elbow: number;
}

/**
 * Neutral standing pose. The near and far limbs use slightly different
 * angles so they do not overlap into a single line.
 */
const STAND_NEAR: Pose = { hip: -5, knee: 0, shoulder: -13, elbow: 6 };
const STAND_FAR: Pose = { hip: 5, knee: 0, shoulder: 11, elbow: -5 };

/**
 * Sitting on the floor: the hips are down, the legs slope forward until the
 * heels touch the ground, the hands rest close to the knees.
 */
const SIT: Pose = { hip: -75, knee: 8, shoulder: -25, elbow: -15 };

/**
 * One frame of the walk cycle. `phase` is the position in the cycle
 * (0 -> 2*PI is one full stride), the sine drives every joint.
 */
function walkPose(phase: number, amount: number): Pose {
  const swing = Math.sin(phase);
  return {
    hip: -22 * swing * amount,
    // the knee only folds while the leg is swinging forward
    knee: 38 * Math.max(0, -swing) * amount,
    shoulder: 18 * swing * amount,
    elbow: (8 + 10 * Math.max(0, swing)) * amount,
  };
}

export default function Character() {
  const svgRef = useRef<SVGSVGElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const parts = useRef<Record<string, SVGGElement | null>>({});
  const shadowRef = useRef<SVGEllipseElement>(null);
  const reduceMotion = useReducedMotion();
  const reduceMotionRef = useRef(reduceMotion);
  reduceMotionRef.current = reduceMotion;

  const set = (name: string) => (node: SVGGElement | null) => {
    parts.current[name] = node;
  };

  useEffect(() => {
    const svg = svgRef.current;
    const stage = stageRef.current;
    if (!svg || !stage) return;

    let frame = 0;
    let last = performance.now();
    let lastScrollY = window.scrollY;
    let tickCount = 0;

    /* The real size of the figure is read from the DOM so the character can
     * be scaled with CSS breakpoints (see .character-svg in index.css). */
    let metrics = { width: CHARACTER_HEIGHT * (120 / VIEWBOX_HEIGHT), height: CHARACTER_HEIGHT, stage: 0 };
    const measure = () => {
      const box = svg.getBoundingClientRect();
      metrics = {
        width: box.width || metrics.width,
        height: box.height || metrics.height,
        stage: stage.getBoundingClientRect().width,
      };
    };
    measure();
    window.addEventListener('resize', measure);

    /* ---------------- input ---------------- */

    const onPointerMove = (event: PointerEvent) => {
      state.pointerX = event.clientX;
    };

    // Scrolling down -> sit down, scrolling up -> stand back up.
    const onWheel = (event: WheelEvent) => {
      if (event.deltaY !== 0) state.sitTarget = event.deltaY > 0 ? 1 : 0;
    };

    // Same intent, but also covers keyboard scrolling (space, arrows, PgDn).
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY;
      lastScrollY = y;
      if (Math.abs(delta) > 1) state.sitTarget = delta > 0 ? 1 : 0;
    };

    const onPointerLeave = () => {
      state.pointerX = null;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);

    /* ---------------- animation loop ---------------- */

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (++tickCount % 20 === 0) measure();

      const width = metrics.stage;
      const half = metrics.width / 2;

      /* 0. the very first placement: start in the middle of the column */
      if (!state.placed && width > 0) {
        state.x = width / 2;
        state.targetX = width / 2;
        state.placed = true;
      }

      /* 1. where does the cursor want the character to be?
       *    A seated character cannot walk, so it stays where it is and
       *    only turns its head towards the cursor.
       *    Visitors who prefer reduced motion get a static figure. */
      if (state.pointerX !== null && width > 0 && !reduceMotionRef.current) {
        const rect = stage.getBoundingClientRect();
        const local = state.pointerX - rect.left;
        state.targetX = clamp(local, half + EDGE_MARGIN, width - half - EDGE_MARGIN);
      }
      const seated = state.sit > 0.35;

      /* 2. walk towards it, with a speed limit so it looks like walking */
      const previousX = state.x;
      let step = (state.targetX - state.x) * (1 - Math.pow(0.001, dt));
      const maxStep = MAX_SPEED * dt;
      if (Math.abs(step) > maxStep) step = Math.sign(step) * maxStep;
      if (!seated && !reduceMotionRef.current) state.x += step;
      const velocity = dt > 0 ? (state.x - previousX) / dt : 0;

      /* 3. advance the walk cycle with the distance covered, so the feet
       *    never slide - they plant and push. */
      const stride = metrics.height * STRIDE_FACTOR;
      state.phase += ((state.x - previousX) / stride) * Math.PI * 2;

      /* 4. how "walking" does the pose look right now */
      const targetWalk = clamp(Math.abs(velocity) / 140, 0, 1);
      state.walk += (targetWalk - state.walk) * Math.min(1, dt * 8);

      /* 5. turn towards the direction of travel (2D squash turn).
       *    While seated the character only turns its head. */
      if (Math.abs(velocity) > 40 && !seated) state.facingTarget = velocity > 0 ? 1 : -1;
      if (state.facing !== state.facingTarget) {
        const turn = TURN_SPEED * dt;
        const sameSide = Math.sign(state.facing) === Math.sign(state.facingTarget);
        if (!sameSide && state.facing !== 0) {
          state.facing = Math.abs(state.facing) <= turn ? 0 : state.facing - Math.sign(state.facing) * turn;
        } else {
          const diff = state.facingTarget - state.facing;
          state.facing += Math.sign(diff) * Math.min(turn, Math.abs(diff));
        }
      }

      /* 6. ease between standing and sitting */
      if (!reduceMotionRef.current) state.sit += (state.sitTarget - state.sit) * Math.min(1, dt * 4.5);

      /* 7. blend the poses */
      const walk = walkPose(state.phase, state.walk);
      const sit = state.sit;
      const mix = (stand: number, moving: number, seated: number) =>
        lerp(lerp(stand, moving, state.walk), seated, sit);

      const hip = mix(STAND_NEAR.hip, walk.hip, SIT.hip);
      const knee = mix(STAND_NEAR.knee, walk.knee, SIT.knee);
      const shoulder = mix(STAND_NEAR.shoulder, walk.shoulder, SIT.shoulder);
      const elbow = mix(STAND_NEAR.elbow, walk.elbow, SIT.elbow);

      // the far limbs are half a cycle out of phase
      const phaseFar = state.phase + Math.PI;
      const hipFar = mix(STAND_FAR.hip, -22 * Math.sin(phaseFar) * state.walk, SIT.hip);
      const kneeFar = mix(STAND_FAR.knee, 38 * Math.max(0, -Math.sin(phaseFar)) * state.walk, SIT.knee);
      const shoulderFar = mix(STAND_FAR.shoulder, 18 * Math.sin(phaseFar) * state.walk, SIT.shoulder);
      const elbowFar = mix(STAND_FAR.elbow, (8 + 10 * Math.max(0, Math.sin(phaseFar))) * state.walk, SIT.elbow);

      // torso: leans forward while walking, back while sitting
      const torso = lerp(5 * state.walk, -6, sit);
      // the body rises twice per stride
      const bob = -2.6 * state.walk * Math.abs(Math.cos(state.phase));
      const bodyY = bob + sit * SEAT_DROP;

      // the seated character looks at the cursor
      const look = state.pointerX === null ? 0 : clamp((state.pointerX - state.x) / 70, -1, 1);
      const headTurn = look * 24 * state.facing * sit;

      /* 8. paint the rig */
      const p = parts.current;
      const write = (name: string, value: string) => {
        const node = p[name];
        if (node) node.setAttribute('transform', value);
      };

      svg.style.transform = `translate3d(${state.x - half}px, 0, 0)`;

      write('root', `translate(60 0) scale(${state.facing} 1) translate(-60 0)`);
      write('body', `translate(0 ${bodyY.toFixed(2)})`);
      write('pelvis', `translate(60 ${HIP_Y})`);
      write('torso', `rotate(${torso.toFixed(2)})`);
      // the head counter-rotates the torso so it stays upright, and turns
      // towards the cursor while the character is seated
      write('head', `translate(0 ${SHOULDER_Y - 4}) rotate(${(headTurn - torso).toFixed(2)})`);

      write('armFar', `translate(0 ${SHOULDER_Y}) rotate(${shoulderFar.toFixed(2)})`);
      write('elbowFar', `translate(0 ${UPPER_ARM}) rotate(${elbowFar.toFixed(2)})`);
      write('armNear', `translate(0 ${SHOULDER_Y}) rotate(${shoulder.toFixed(2)})`);
      write('elbowNear', `translate(0 ${UPPER_ARM}) rotate(${elbow.toFixed(2)})`);

      write('thighFar', `rotate(${hipFar.toFixed(2)})`);
      write('kneeFar', `translate(0 ${THIGH}) rotate(${kneeFar.toFixed(2)})`);
      write('ankleFar', `translate(0 ${SHIN}) rotate(${(-(hipFar + kneeFar) * 0.85).toFixed(2)})`);

      write('thighNear', `rotate(${hip.toFixed(2)})`);
      write('kneeNear', `translate(0 ${THIGH}) rotate(${knee.toFixed(2)})`);
      write('ankleNear', `translate(0 ${SHIN}) rotate(${(-(hip + knee) * 0.85).toFixed(2)})`);

      if (shadowRef.current) {
        const spread = 1 - 0.22 * state.walk + 0.12 * sit;
        shadowRef.current.setAttribute('rx', (26 * spread).toFixed(2));
        shadowRef.current.setAttribute('opacity', (0.38 - 0.12 * state.walk).toFixed(2));
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', measure);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0 select-none"
    >
      {/* The box below has its bottom edge on the content's top edge, so the
          character stands *on* the content instead of floating above it. */}
      <div ref={stageRef} className="absolute inset-x-0 bottom-0 h-24">
        <svg
          ref={svgRef}
          viewBox="0 0 120 200"
          className="character-svg absolute bottom-0 left-0 will-change-transform"
        >
          <ellipse ref={shadowRef} cx="60" cy="190" rx="26" ry="5" className="character-shadow" />

          <g ref={set('root')} className="character-limb">
            <g ref={set('body')}>
              <g ref={set('pelvis')}>
                {/* ---- far side limbs (drawn first = behind the body) ---- */}
                <g ref={set('thighFar')} className="character-far">
                  <line x1="0" y1="0" x2="0" y2={THIGH} />
                  <g ref={set('kneeFar')}>
                    <line x1="0" y1="0" x2="0" y2={SHIN} />
                    <g ref={set('ankleFar')}>
                      <line x1="0" y1="0" x2="11" y2="0" />
                    </g>
                  </g>
                </g>

                <g ref={set('armFar')} className="character-far">
                  <line x1="0" y1="0" x2="0" y2={UPPER_ARM} />
                  <g ref={set('elbowFar')}>
                    <line x1="0" y1="0" x2="0" y2={FOREARM} />
                    <circle cx="0" cy={FOREARM} r="3.4" className="character-hand" />
                  </g>
                </g>

                {/* ---- torso ---- */}
                <g ref={set('torso')}>
                  <line x1="0" y1="0" x2="0" y2={SHOULDER_Y} />
                  <g ref={set('head')}>
                    <circle cx="0" cy="-14" r="12.5" className="character-head" />
                  </g>
                </g>

                {/* ---- near side limbs ---- */}
                <g ref={set('armNear')}>
                  <line x1="0" y1="0" x2="0" y2={UPPER_ARM} />
                  <g ref={set('elbowNear')}>
                    <line x1="0" y1="0" x2="0" y2={FOREARM} />
                    <circle cx="0" cy={FOREARM} r="3.4" className="character-hand" />
                  </g>
                </g>

                <g ref={set('thighNear')}>
                  <line x1="0" y1="0" x2="0" y2={THIGH} />
                  <g ref={set('kneeNear')}>
                    <line x1="0" y1="0" x2="0" y2={SHIN} />
                    <g ref={set('ankleNear')}>
                      <line x1="0" y1="0" x2="11" y2="0" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
