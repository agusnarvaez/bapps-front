"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const enterTransition = {
  duration: 0.5,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
};

// ponytail: AnimatePresence's exit-before-unmount was getting stuck
// permanently (Framer Motion 12 / React 19 exit-animation completion never
// fired in this setup), which froze the whole app on the first page —
// navigation stopped working entirely, not just the fade-out. Plain `key`
// swap unmounts the old page the normal React way (guaranteed, no animation
// dependency) and only animates the incoming page in. Losing the fade-out
// is a fair trade for navigation actually working.
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={enterTransition}
    >
      {children}
    </motion.div>
  );
}
