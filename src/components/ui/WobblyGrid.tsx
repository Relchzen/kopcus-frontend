'use client';

import React, { useEffect, useRef } from 'react';

interface WobblyGridProps {
  className?: string;
  gridSize?: number;
  dotSize?: number;
  lineColor?: string;
  activeColor?: string;
}

export function WobblyGrid({
  className = '',
  gridSize = 40,
  lineColor = 'rgba(255, 255, 255, 0.1)',
  activeColor = 'rgba(242, 123, 169, 0.5)', // primary-500 with opacity
}: WobblyGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let points: { x: number; y: number; originX: number; originY: number; vx: number; vy: number }[] = [];

    const initPoints = () => {
      points = [];
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          points.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        initPoints();
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const update = () => {
      const mouse = mouseRef.current;
      const radius = 200; // Interaction radius
      const force = 0.15; // Push force
      const friction = 0.9; // Damping
      const returnSpeed = 0.05; // Speed to return to origin

      points.forEach((point) => {
        const dx = mouse.x - point.x;
        const dy = mouse.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < radius) {
          const angle = Math.atan2(dy, dx);
          const push = (radius - distance) * force;
          point.vx -= Math.cos(angle) * push * 0.05; // Push away
          point.vy -= Math.sin(angle) * push * 0.05;
        }

        // Return to origin
        const homeDx = point.originX - point.x;
        const homeDy = point.originY - point.y;
        
        point.vx += homeDx * returnSpeed;
        point.vy += homeDy * returnSpeed;

        // Apply physics
        point.vx *= friction;
        point.vy *= friction;
        point.x += point.vx;
        point.y += point.vy;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid lines
      ctx.beginPath();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      // We need to connect points. 
      // Since points is a flat array, we need to know grid dimensions.
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = i * rows + j;
          const point = points[index];
          if (!point) continue;

          // Connect right
          if (i < cols - 1) {
            const rightPoint = points[(i + 1) * rows + j];
            if (rightPoint) {
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(rightPoint.x, rightPoint.y);
            }
          }

          // Connect down
          if (j < rows - 1) {
            const downPoint = points[i * rows + (j + 1)];
            if (downPoint) {
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(downPoint.x, downPoint.y);
            }
          }
        }
      }
      ctx.stroke();

      // Optional: Draw active points near mouse
      const mouse = mouseRef.current;
      points.forEach(point => {
        const dx = mouse.x - point.x;
        const dy = mouse.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
            const alpha = 1 - (dist / 150);
            ctx.beginPath();
            ctx.fillStyle = activeColor.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
            ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
      });
    };

    const animate = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gridSize, lineColor, activeColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
}
