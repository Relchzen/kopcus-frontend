'use client';
import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

type HorizontalScrollerProps = {
  children: ReactNode;
  /** optional spacing between items */
  gap?: number;
  /** optional padding on left & right */
  paddingX?: number;
  /** Whether to allow drag horizontally */
  draggable?: boolean;
};

export const HorizontalScroller: React.FC<HorizontalScrollerProps> = ({
  children,
  gap = 16,
  paddingX = 16,
  draggable = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (container && content) {
      const containerWidth = container.clientWidth;
      const contentWidth = content.scrollWidth;
      const maxDragVal = Math.max(0, contentWidth - containerWidth);
      setMaxDrag(maxDragVal);
    }
  }, [children, gap, paddingX]);

  // Optional: clamp the x value so it doesn’t drag beyond the content
  const clampX = useTransform(x, (latest) => {
    if (latest > 0) return 0;
    if (latest < -maxDrag) return -maxDrag;
    return latest;
  });

  return (
    <div
      ref={containerRef}
      style={{
        overflow: 'hidden',
        width: '100%',
        padding: `0 ${paddingX}px`,
      }}
    >
      <motion.div
        ref={contentRef}
        style={{
          display: 'flex',
          gap: gap,
          x: clampX,
          cursor: draggable ? 'grab' : 'auto',
        }}
        drag={draggable ? 'x' : undefined}
        dragConstraints={{ left: -maxDrag, right: 0 }}
        dragElastic={0.2}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
