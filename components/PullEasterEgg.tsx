"use client";

import { useEffect, useRef, useState } from "react";

const MESSAGE = "I see that you can pull. 😏";
const TRIGGER_DISTANCE = 56;
const WHEEL_TRIGGER_DISTANCE = 84;
const BLOCK_DISTANCE = 8;
const HIDE_DELAY_MS = 1700;
const COOLDOWN_MS = 2200;
const WHEEL_IDLE_MS = 180;

export default function PullEasterEgg() {
  const [visible, setVisible] = useState(false);
  const startYRef = useRef(0);
  const activeRef = useRef(false);
  const shownForPullRef = useRef(false);
  const pointerStartYRef = useRef(0);
  const pointerActiveRef = useRef(false);
  const pointerShownForPullRef = useRef(false);
  const wheelDistanceRef = useRef(0);
  const wheelShownForPullRef = useRef(false);
  const wheelTimerRef = useRef(0);
  const lastShownAtRef = useRef(0);
  const hideTimerRef = useRef(0);

  useEffect(() => {
    const resetWheelPull = () => {
      wheelDistanceRef.current = 0;
      wheelShownForPullRef.current = false;
    };

    const hide = () => {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = window.setTimeout(() => {
        setVisible(false);
      }, HIDE_DELAY_MS);
    };

    const show = () => {
      const now = Date.now();
      if (now - lastShownAtRef.current < COOLDOWN_MS) return;

      lastShownAtRef.current = now;
      shownForPullRef.current = true;
      wheelShownForPullRef.current = true;
      window.clearTimeout(hideTimerRef.current);
      setVisible(true);
      hide();
    };

    const normalizeWheelDelta = (event: WheelEvent) => {
      const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight : 1;
      return event.deltaY * unit;
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;

      activeRef.current = window.scrollY <= 1;
      shownForPullRef.current = false;
      startYRef.current = event.touches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!activeRef.current || event.touches.length !== 1) return;

      const pullDistance = event.touches[0].clientY - startYRef.current;
      if (pullDistance <= 0 || window.scrollY > 1) {
        activeRef.current = false;
        return;
      }

      if (pullDistance > BLOCK_DISTANCE) {
        if (event.cancelable) event.preventDefault();
      }

      if (pullDistance >= TRIGGER_DISTANCE && !shownForPullRef.current) {
        show();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!event.isPrimary) return;

      pointerActiveRef.current = window.scrollY <= 1;
      pointerShownForPullRef.current = false;
      pointerStartYRef.current = event.clientY;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!pointerActiveRef.current || !event.isPrimary) return;

      if (event.pointerType === "touch") return;

      const pullDistance = event.clientY - pointerStartYRef.current;
      if (pullDistance <= 0 || window.scrollY > 1) {
        pointerActiveRef.current = false;
        return;
      }

      if (pullDistance > BLOCK_DISTANCE && event.cancelable) {
        event.preventDefault();
      }

      if (pullDistance >= TRIGGER_DISTANCE && !pointerShownForPullRef.current) {
        pointerShownForPullRef.current = true;
        show();
      }
    };

    const onWheel = (event: WheelEvent) => {
      const pullDelta = -normalizeWheelDelta(event);

      if (window.scrollY > 1 || pullDelta <= 0) {
        resetWheelPull();
        return;
      }

      wheelDistanceRef.current += Math.min(pullDelta, 38);
      window.clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = window.setTimeout(resetWheelPull, WHEEL_IDLE_MS);

      if (wheelDistanceRef.current > BLOCK_DISTANCE && event.cancelable) {
        event.preventDefault();
      }

      if (wheelDistanceRef.current >= WHEEL_TRIGGER_DISTANCE && !wheelShownForPullRef.current) {
        wheelShownForPullRef.current = true;
        show();
      }
    };

    const onTouchEnd = () => {
      activeRef.current = false;
      hide();
    };

    const onPointerEnd = () => {
      pointerActiveRef.current = false;
      hide();
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerEnd);
    window.addEventListener("pointercancel", onPointerEnd);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.clearTimeout(hideTimerRef.current);
      window.clearTimeout(wheelTimerRef.current);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed left-1/2 top-4 z-[560] max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-full border border-white/10 bg-[var(--site-card)]/92 px-4 py-2 text-center text-sm text-[var(--site-fg)] shadow-2xl shadow-black/35 backdrop-blur-md transition duration-300 ease-[var(--motion-ease-out)] sm:top-5 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
      }`}
    >
      {visible ? MESSAGE : ""}
    </div>
  );
}
