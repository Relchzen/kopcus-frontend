'use client';
import React from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { motion } from 'motion/react';
import { PiQuotesFill } from 'react-icons/pi';

const testimonials = [
  {
    quote: "Kopcus Digital transformed our event into a viral sensation. Their understanding of the K-Pop community is unmatched.",
    author: "Sarah J.",
    role: "Marketing Director, K-Fashion Brand",
  },
  {
    quote: "Professional, creative, and incredibly fast. They delivered a campaign that exceeded our KPIs by 200%.",
    author: "Michael T.",
    role: "CEO, Tech Startup",
  },
  {
    quote: "The team's attention to detail and passion for their work is evident in every deliverable. Highly recommended.",
    author: "Jessica L.",
    role: "Event Coordinator",
  },
];

export default function ServicesTestimonialSection() {
  return (
    <SectionContainer name="services-testimonials" className="section-padding py-24 bg-neutral-50">
      <div className="mb-16 text-center">
        <SectionHeading sectionName="Testimonials" id="services-testimonial-heading" className="justify-center" />
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
          Trusted by Industry Leaders
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col rounded-2xl bg-white p-8 shadow-sm"
          >
            <PiQuotesFill className="mb-6 h-8 w-8 text-primary-200" />
            <p className="mb-6 flex-1 text-lg leading-relaxed text-neutral-700 italic">
              &quot;{testimonial.quote}&quot;
            </p>
            <div>
              <h4 className="font-bold text-neutral-900">{testimonial.author}</h4>
              <p className="text-sm text-neutral-500">{testimonial.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}
