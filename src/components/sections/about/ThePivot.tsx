'use client';

import { motion } from 'motion/react';
import { SectionContainer } from '@/components/SectionContainer';
import Image from 'next/image';

export default function ThePivot() {
  return (
    <SectionContainer name="the-pivot" className="section-padding bg-neutral-50 py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col-reverse gap-16 lg:flex-row lg:items-center lg:gap-24">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-1"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-neutral-200 transition-all duration-700">
               {/* Placeholder for Pivot Image */}
               {/* <div className="absolute inset-0 flex items-center justify-center bg-neutral-300 text-neutral-500">
                  <span className="font-display text-lg uppercase">Agency Evolution</span>
               </div> */}
               <Image src="/kopichuseyo_lotte.webp" alt="Agency Evolution" fill className="object-cover" />
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex-1"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-primary-600"></span>
              <span className="font-display text-sm font-bold uppercase tracking-widest text-primary-600">
                Why We Evolved
              </span>
            </div>
            <h2 className="mb-8 font-display text-4xl font-bold uppercase leading-tight text-neutral-950 md:text-5xl">
              Filling the Gap
            </h2>
            <div className="space-y-6 font-body text-lg text-neutral-600 md:text-xl">
              <p>
                As brands rushed to tap into the rising K-Pop wave, most struggled to activate audiences authentically. Generic strategies didn’t work. Cultural shortcuts backfired.
              </p>
              <p>
                We saw a gap—and we had the experience to fill it.
              </p>
              <p>
                Kopi Chuseyo transformed into a culture-driven marketing agency specializing in event activation and influencer marketing, built on the same fandom understanding that once fueled our cafés.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
}
