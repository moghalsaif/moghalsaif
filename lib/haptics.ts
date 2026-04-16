/**
 * Haptic feedback — three-tier fallback:
 *   1. navigator.vibrate()  → Android Chrome/Firefox (physical vibration)
 *   2. CSS micro-animation  → iOS Safari + desktop (visual scale pulse)
 *
 * All functions accept an optional DOM element. On platforms where vibration
 * isn't available the element gets a brief CSS class that plays a snappy
 * scale animation to simulate the physical feel.
 */

const CLASSES = ["haptic-light", "haptic-medium", "haptic-heavy"] as const;

/**
 * Apply a CSS haptic animation to `el`.
 * Removes any existing haptic class first, forces a reflow so the animation
 * restarts correctly even if triggered rapidly, then cleans up after it ends.
 */
const cssAnimate = (
  el: Element | null | undefined,
  cls: "haptic-light" | "haptic-medium" | "haptic-heavy",
  duration: number
) => {
  if (!el) return;
  el.classList.remove(...CLASSES);
  // Force reflow so re-triggering the same class restarts the animation
  void (el as HTMLElement).offsetWidth;
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), duration + 20);
};

/**
 * Attempt a native vibration. Returns true if the device will actually
 * vibrate (i.e. the API exists AND the call was accepted).
 */
const tryVibrate = (pattern: number | number[]): boolean => {
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") {
    return false;
  }
  return navigator.vibrate(pattern);
};

export const haptics = {
  /** Subtle — touchmove over interactive surfaces, hover-enter */
  light: (el?: Element | null) => {
    if (!tryVibrate(8)) cssAnimate(el, "haptic-light", 90);
  },

  /** Standard click — nav pills, close buttons, selections */
  medium: (el?: Element | null) => {
    if (!tryVibrate(22)) cssAnimate(el, "haptic-medium", 130);
  },

  /** Strong impact — opening / closing full-screen sections */
  heavy: (el?: Element | null) => {
    if (!tryVibrate(48)) cssAnimate(el, "haptic-heavy", 180);
  },

  /** Success confirmation */
  success: (el?: Element | null) => {
    if (!tryVibrate([12, 60, 18])) cssAnimate(el, "haptic-heavy", 180);
  },

  /** Error / dismiss */
  error: (el?: Element | null) => {
    if (!tryVibrate([30, 40, 30, 40, 30])) cssAnimate(el, "haptic-medium", 130);
  },
};
