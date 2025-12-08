'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticBlobsProps {
  className?: string;
}

export function MagneticBlobs({ className = '' }: MagneticBlobsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the blobs
  const springConfig = { damping: 20, stiffness: 150, mass: 1 };
  
  // Blob 1: Follows closely
  const blob1X = useSpring(mouseX, { ...springConfig, damping: 25 });
  const blob1Y = useSpring(mouseY, { ...springConfig, damping: 25 });

  // Blob 2: Follows with more delay/lag
  const blob2X = useSpring(mouseX, { ...springConfig, damping: 35, stiffness: 120 });
  const blob2Y = useSpring(mouseY, { ...springConfig, damping: 35, stiffness: 120 });

  // Blob 3: Even more lag
  const blob3X = useSpring(mouseX, { ...springConfig, damping: 45, stiffness: 100 });
  const blob3Y = useSpring(mouseY, { ...springConfig, damping: 45, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        // Center the coordinate system relative to the container center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        mouseX.set(e.clientX - rect.left - centerX);
        mouseY.set(e.clientY - rect.top - centerY);
      }
    };

    const container = containerRef.current;
    if (container) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Blob 1 - Primary Color */}
      <motion.div
        style={{ x: blob1X, y: blob1Y }}
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/30 blur-[80px]"
      />
      
      {/* Blob 2 - Secondary Color */}
      <motion.div
        style={{ x: blob2X, y: blob2Y }}
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-400/30 blur-[90px]"
      />

      {/* Blob 3 - Accent/Mix */}
      <motion.div
        style={{ x: blob3X, y: blob3Y }}
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-[70px]"
      />
    </div>
  );
}
