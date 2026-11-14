"use client";
import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
const preference = "(prefers-reduced-motion: reduce)";
const subscribe = (callback: () => void) => {
  const m = window.matchMedia(preference);
  m.addEventListener("change", callback);
  return () => m.removeEventListener("change", callback);
};
const MotionContext = createContext({ paused: false, reduced: false });
export const useMotion = () => useContext(MotionContext);
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(preference).matches,
    () => false,
  );
  const [manual, setManual] = useState(false),
    paused = reduced || manual;
  return (
    <MotionContext.Provider value={{ paused, reduced }}>
      {children}
      <button
        className="motion-toggle"
        disabled={reduced}
        onClick={() => setManual(!manual)}
        aria-pressed={paused}
        aria-label={
          reduced
            ? "Reduced motion enabled"
            : paused
              ? "Resume animations and videos"
              : "Pause animations and videos"
        }
      >
        <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
        {reduced ? "Reduced motion" : paused ? "Resume motion" : "Pause motion"}
      </button>
    </MotionContext.Provider>
  );
}
