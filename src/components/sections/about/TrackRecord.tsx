'use client';

import { motion } from 'motion/react';
import { SectionContainer } from '@/components/SectionContainer';

const records = [
  'Kostcon',
  'Korea360',
  'Esavya',
];

export default function TrackRecord() {
  return (
    <SectionContainer name="track-record" className="section-padding border-y border-neutral-100 bg-white py-16">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="md:w-1/3">
            <h2 className="font-display text-2xl font-bold uppercase text-neutral-950">
              What We’ve Been Part Of
            </h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-8 md:w-2/3 md:justify-end md:gap-12">
            {records.map((item, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="font-display text-xl font-bold uppercase text-neutral-400 transition-colors hover:text-neutral-900"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
