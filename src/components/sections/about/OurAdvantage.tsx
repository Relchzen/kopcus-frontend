'use client';

import { motion } from 'motion/react';
import { SectionContainer } from '@/components/SectionContainer';

const advantages = [
  {
    title: 'Cultural Roots',
    description: 'We grew with K-Pop fandoms, not outside them.',
  },
  {
    title: 'Network-Driven Results',
    description: 'Direct access to creators, influencers, and cultural touchpoints through Daniel’s long-established relationships.',
  },
  {
    title: 'Direct Communication',
    description: 'Execution-focused, transparent, and no unnecessary layers.',
  },
  {
    title: 'Cultural Precision',
    description: 'We build campaigns grounded in deep fandom insight, not surface-level trends.',
  },
];

export default function OurAdvantage() {
  return (
    <SectionContainer name="our-advantage" className="section-padding bg-neutral-50 py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
          {/* Text/Heading Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-1 lg:sticky lg:top-32"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-primary-600"></span>
              <span className="font-display text-sm font-bold uppercase tracking-widest text-primary-600">
                Why Work With Us
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold uppercase leading-tight text-neutral-950 md:text-5xl">
              The Kopcus Advantage
            </h2>
          </motion.div>

          {/* List Side */}
          <div className="flex-1 space-y-12">
            {advantages.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className="border-l-2 border-neutral-200 pl-8 transition-colors duration-300 hover:border-primary-600"
              >
                <h3 className="mb-2 font-display text-2xl font-bold uppercase text-neutral-950">
                  {item.title}
                </h3>
                <p className="font-body text-lg text-neutral-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
