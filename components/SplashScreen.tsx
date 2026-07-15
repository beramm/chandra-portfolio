"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SEEN_KEY = "splash-seen";
const HOLD_MS = 1400;

/**
 * Full-screen intro shown once per browser session on the first page
 * open. Skipped on admin routes and under prefers-reduced-motion.
 */
export default function SplashScreen() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduced || pathname.startsWith("/admin")) return;
    if (sessionStorage.getItem(SEEN_KEY)) return;
    sessionStorage.setItem(SEEN_KEY, "1");
    const raf = requestAnimationFrame(() => setShow(true));
    const timer = setTimeout(() => setShow(false), HOLD_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
    // Run once on first mount only — later navigations shouldn't retrigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          aria-hidden
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="font-heading text-4xl font-bold tracking-tight sm:text-6xl"
            >
              chandra
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="text-accent"
              >
                .
              </motion.span>
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
