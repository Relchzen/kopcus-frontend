"use client"
import React from 'react';
import { SectionContainer } from '../SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';

export default function TestimonialSection() {
  return (
    <SectionContainer
      name="testimonial"
      className="section-margin mb-16 flex flex-col md:flex-row"
    >
      <div id="testimonial-header" className="flex-1">
        <SectionHeading sectionName="Testimonials" id="testimonial-heading" />
        <h3
          id="testimonial-subheading"
          className="mb-4 text-5xl font-semibold tracking-tighter md:text-6xl lg:text-8xl"
        >
          What our clients think
        </h3>
        <p
          id="testimonial-description"
          className="md:text-md text-sm font-light md:font-normal lg:text-lg"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue
          non nunc nec dapibus. Suspendisse bibendum urna a nibh iaculis, at
          eleifend metus finibus.
        </p>
      </div>
      <div className="aspect-[3/4] w-full flex-1 rounded-4xl bg-neutral-200 md:aspect-[9/16]">
        Big Testimonial
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="min-h-32 flex-1 rounded-4xl bg-neutral-200">
          Small Testimonial
        </div>
        <div className="min-h-32 flex-1 rounded-4xl bg-neutral-200">
          Small Testimonial
        </div>
      </div>
    </SectionContainer>
  );
}
