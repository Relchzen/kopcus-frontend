'use client';
import React from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { motion } from 'motion/react';
import { PiLightning, PiPaintBrush, PiCode, PiHandshake } from 'react-icons/pi';

const reasons = [
  {
    icon: PiLightning,
    title: 'Speed & Efficiency',
    description: 'We move fast without breaking things. Our streamlined process ensures quick turnarounds for your campaigns.',
  },
  {
    icon: PiPaintBrush,
    title: 'Creative Excellence',
    description: 'Design isn\'t just about looks; it\'s about impact. We craft visuals that capture attention and drive engagement.',
  },
  {
    icon: PiCode,
    title: 'Technical Precision',
    description: 'From clean code to seamless integrations, we ensure your digital products perform flawlessly.',
  },
  {
    icon: PiHandshake,
    title: 'Reliable Partnership',
    description: 'We are not just vendors; we are partners. We work closely with you to understand your goals and deliver results.',
  },
];

export default function WhyUsSection() {
  return (
    <SectionContainer name="why-us" className="section-padding py-24 bg-neutral-50">
      <div className="mb-16 md:w-2/3 lg:w-1/2">
        <SectionHeading sectionName="Why Work With Us" id="why-us-heading" />
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
          We bridge the gap between culture and brands.
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
              <reason.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-neutral-900">
              {reason.title}
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              {reason.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}
