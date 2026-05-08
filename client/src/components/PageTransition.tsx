import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  keyName: string;
}

const variants: Variants = {
  initial: { opacity: 0, scale: 0.96, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    y: -10,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export default function PageTransition({ children, keyName }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyName}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ width: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
