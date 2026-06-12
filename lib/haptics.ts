/**
 * Haptic feedback.
 *
 * Keep this native-only. The old CSS fallback pulsed button scale and forced a
 * synchronous reflow on every tap, which made route changes feel jittery on
 * mobile browsers.
 */

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
    void el;
    tryVibrate(8);
  },

  /** Standard click — nav pills, close buttons, selections */
  medium: (el?: Element | null) => {
    void el;
    tryVibrate(22);
  },

  /** Strong impact — opening / closing full-screen sections */
  heavy: (el?: Element | null) => {
    void el;
    tryVibrate(48);
  },

  /** Success confirmation */
  success: (el?: Element | null) => {
    void el;
    tryVibrate([12, 60, 18]);
  },

  /** Error / dismiss */
  error: (el?: Element | null) => {
    void el;
    tryVibrate([30, 40, 30, 40, 30]);
  },
};
