"use client";

import { useEffect, useRef } from "react";
import { SITE_PROFILE } from "@/lib/site-config";

const YEAR_MS = 365.2425 * 24 * 60 * 60 * 1000;
const UPDATE_MS = 1000;

export default function LiveAge() {
  const ageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const birth = new Date(SITE_PROFILE.birthDateISO).getTime();

    const update = () => {
      const years = (Date.now() - birth) / YEAR_MS;
      if (ageRef.current) {
        ageRef.current.textContent = years.toFixed(9);
      }
    };

    update();
    const timer = window.setInterval(update, UPDATE_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span ref={ageRef} className="tabular-nums">
      21.338187960
    </span>
  );
}
