'use client';
import React from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { motion } from 'motion/react';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into your brand, audience, and goals to understand the full picture.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'We craft a tailored roadmap that aligns with your objectives and market trends.',
  },
  {
    number: '03',
    title: 'Execution',
    description: 'Our team brings the strategy to life with precision, creativity, and technical expertise.',
  },
  {
    number: '04',
    title: 'Delivery & Support',
    description: 'We launch, monitor, and optimize to ensure sustained success and growth.',
  },
];

export default function ProcessSection() {
  return (
    <SectionContainer name="process" className="section-padding py-24 bg-white">
      <div className="mb-16 text-center">
        <SectionHeading sectionName="Our Process" id="process-heading" className="justify-center" />
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
          How We Make It Happen
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex flex-col items-center text-center"
          >
            {/* Connector Line (except for last item) */}
            {index !== steps.length - 1 && (
              <div className="absolute top-8 left-1/2 hidden h-0.5 w-full -translate-y-1/2 translate-x-1/2 bg-neutral-200 lg:block" />
            )}

            <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 text-xl font-bold text-white shadow-lg">
              {step.number}
            </div>
            
            <h3 className="mb-3 text-xl font-bold text-neutral-900">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}
