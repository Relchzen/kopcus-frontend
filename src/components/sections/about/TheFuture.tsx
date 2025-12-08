'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';
import { SectionContainer } from '@/components/SectionContainer';
import { MouseEvent, useRef } from 'react';

export default function TheFuture() {
  const ref = useRef<HTMLDivElement>(null);
  
  // Mouse position for holographic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth spring animation
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  // Transform values for 3D tilt
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  // Holographic gradient position
  const bgX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <SectionContainer name="the-future" className="section-padding relative overflow-hidden bg-neutral-950 py-24 text-white md:py-32">
      {/* Concert Laser Beams Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-primary-500/20 to-transparent blur-[1px] transform -skew-x-12"></div>
        <div className="absolute top-0 right-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent blur-[1px] transform skew-x-12"></div>
        <div className="absolute top-1/2 left-1/2 h-[1px] w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-[1px] transform -rotate-45"></div>
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-24">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-1"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-primary-500"></span>
              <span className="font-display text-sm font-bold uppercase tracking-widest text-primary-500">
                Next Era
              </span>
            </div>
            <h2 className="mb-8 font-display text-4xl font-bold uppercase leading-tight md:text-5xl">
              The Vision
            </h2>
            <div className="space-y-6 font-body text-lg text-neutral-400 md:text-xl">
              <motion.div
                whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.03)' }}
                className="group rounded-lg border border-transparent p-6 transition-colors hover:border-neutral-800"
              >
                <h3 className="mb-2 font-display text-xl font-bold uppercase text-white group-hover:text-primary-400 transition-colors">Our Mission</h3>
                <p>
                  To become Indonesia’s leading K-Pop digital marketing and event activation agency.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.03)' }}
                className="group rounded-lg border border-transparent p-6 transition-colors hover:border-neutral-800"
              >
                <h3 className="mb-2 font-display text-xl font-bold uppercase text-white group-hover:text-primary-400 transition-colors">Our Vision</h3>
                <p>
                  To grow into a full-scale concert and event promoter rooted in cultural authenticity and community insight.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Visual Side - The Holographic Prism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex-1 perspective-1000"
          >
            <motion.div
              ref={ref}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto cursor-pointer"
            >
              {/* Card Container */}
              <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-2xl">
                
                {/* Holographic Gradient Layer */}
                <motion.div 
                  style={{
                    background: useMotionTemplate`
                      linear-gradient(
                        115deg,
                        transparent 0%,
                        rgba(255, 0, 128, 0.1) 30%,
                        rgba(0, 255, 255, 0.1) 50%,
                        rgba(255, 0, 128, 0.1) 70%,
                        transparent 100%
                      )
                    `,
                    backgroundSize: "200% 200%",
                    backgroundPosition: useMotionTemplate`${bgX} ${bgY}`,
                  }}
                  className="absolute inset-0 opacity-80 mix-blend-overlay transition-opacity duration-300"
                />

                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-30 bg-[url('/noise.png')] mix-blend-overlay"></div>

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-8">
                  
                  {/* Decorative "Album" Details */}
                  <div className="absolute top-6 left-6 font-mono text-[10px] text-primary-400 tracking-widest">
                     KOPCUS DIGITAL
                  </div>
                  <div className="absolute top-6 right-6 font-mono text-[10px] text-neutral-500 tracking-widest">
                     VOL. 2025
                  </div>
                  
                  {/* Barcode / Tech Element */}
                  <div className="absolute bottom-6 left-6 flex gap-1 h-4 items-end opacity-50">
                    {[3, 5, 2, 6, 3, 7, 4, 6, 2, 4].map((h, i) => (
                      <div key={i} className="w-[2px] bg-white" style={{ height: `${h * 10}%` }}></div>
                    ))}
                  </div>

                  {/* Main Typography */}
                  <div className="relative z-10 text-center transform translate-z-20">
                    <motion.div
                      style={{ transform: "translateZ(30px)" }}
                      className="relative"
                    >
                      <span className="block font-display text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 drop-shadow-lg md:text-9xl">
                        2025
                      </span>
                      {/* Iridescent Glow behind text */}
                      <span className="absolute inset-0 block font-display text-8xl font-bold tracking-tighter text-primary-500/30 blur-xl md:text-9xl" aria-hidden="true">
                        2025
                      </span>
                    </motion.div>
                    
                    <motion.div
                      style={{ transform: "translateZ(20px)" }}
                      className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1 backdrop-blur-sm"
                    >
                        <div className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse"></div>
                        <span className="text-xs font-bold uppercase tracking-widest text-white">
                          Coming Soon
                        </span>
                    </motion.div>
                  </div>
                </div>
                
                {/* Prismatic Border */}
                <div className="absolute inset-0 rounded-xl border border-white/5 ring-1 ring-white/10"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
}
