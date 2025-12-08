'use client';

import { motion } from 'motion/react';
import { SectionContainer } from '@/components/SectionContainer';

const services = [
  {
    title: 'Event Activation',
    description: 'We design and execute experiences that resonate with K-Pop audiences, from brand pop-ups to fan-centric offline events.',
  },
  {
    title: 'Influencer Marketing & Promotion',
    description: 'We develop creator-led campaigns powered by Daniel’s network and years of community engagement.',
  },
  {
    title: 'Media Promotion',
    description: 'Strategic content distribution, digital amplification, and placements tailored for fandom-heavy audiences.',
  },
  {
    title: 'Content Creation',
    description: 'Production crafted for cultural accuracy, platform relevance, and trend alignment.',
  },
];

export default function AboutServices() {
  return (
    <SectionContainer name="about-services" className="section-padding bg-white py-24 md:py-32">
      <div className="container">
        <div className="mb-16">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-12 bg-primary-600"></span>
            <span className="font-display text-sm font-bold uppercase tracking-widest text-primary-600">
              What We Do
            </span>
          </div>
          <h2 className="font-display text-4xl font-bold uppercase leading-tight text-neutral-950 md:text-5xl">
            Our Expertise
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              className="group flex flex-col border border-neutral-200 bg-white p-8 transition-colors duration-300 hover:border-neutral-900"
            >
              <h3 className="mb-4 font-display text-2xl font-bold uppercase text-neutral-950">
                {service.title}
              </h3>
              <p className="font-body text-lg text-neutral-600">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
