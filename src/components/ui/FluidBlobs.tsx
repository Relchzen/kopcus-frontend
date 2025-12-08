'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface FluidBlobsProps {
  className?: string;
}

export function FluidBlobs({ className = '' }: FluidBlobsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the blobs
  // Using different configs for each blob to create organic separation
  const springConfig1 = { damping: 25, stiffness: 150, mass: 1 };
  const springConfig2 = { damping: 35, stiffness: 120, mass: 1.2 };
  const springConfig3 = { damping: 45, stiffness: 100, mass: 1.4 };
  const springConfig4 = { damping: 50, stiffness: 90, mass: 1.5 };
  
  const blob1X = useSpring(mouseX, springConfig1);
  const blob1Y = useSpring(mouseY, springConfig1);

  const blob2X = useSpring(mouseX, springConfig2);
  const blob2Y = useSpring(mouseY, springConfig2);

  const blob3X = useSpring(mouseX, springConfig3);
  const blob3Y = useSpring(mouseY, springConfig3);

  const blob4X = useSpring(mouseX, springConfig4);
  const blob4Y = useSpring(mouseY, springConfig4);

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
      {/* SVG Filter for Gooey Effect */}
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Blobs Container with Filter */}
      <div 
        className="absolute inset-0 h-full w-full"
        style={{ filter: "url('#goo')" }}
      >
        {/* Blob 1 - Primary */}
        <motion.div
          style={{ x: blob1X, y: blob1Y }}
          className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500 opacity-80"
        />
        
        {/* Blob 2 - Secondary */}
        <motion.div
          style={{ x: blob2X, y: blob2Y }}
          className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-400 opacity-80"
        />

        {/* Blob 3 - Accent */}
        <motion.div
          style={{ x: blob3X, y: blob3Y }}
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500 opacity-80"
        />

        {/* Blob 4 - Trailing Small Blob */}
        <motion.div
          style={{ x: blob4X, y: blob4Y }}
          className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400 opacity-80"
        />
      </div>
    </div>
  );
}
