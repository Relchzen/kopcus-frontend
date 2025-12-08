'use client';

import { AnimatePresence } from 'motion/react';
import { ReactNode } from 'react';

export default function TransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      {children}
    </AnimatePresence>
  );
}
