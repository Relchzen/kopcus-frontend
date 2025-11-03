import React from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '../ui/Button';

type Props = {};

export default function ContactSection({}: Props) {
  return (
    <SectionContainer
      name="contact"
      className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-transparent to-white px-6 py-24 text-center md:py-32 lg:py-40"
    >
      {/* Animated gradient background */}
      <div className="from-primary-100/60 via-secondary-100/40 to-primary-200/60 absolute inset-0 bg-gradient-to-br opacity-80 blur-3xl"></div>

      {/* Decorative elements */}
      <div className="bg-primary-300/20 absolute top-20 left-1/4 h-72 w-72 animate-pulse rounded-full blur-3xl"></div>
      <div className="bg-secondary-300/20 absolute right-1/4 bottom-20 h-96 w-96 animate-pulse rounded-full blur-3xl delay-1000"></div>

      {/* Content container */}
      <div className="relative z-10 max-w-4xl">
        {/* Small label */}
        {/* <div className="text-primary-600 mb-6 inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur-sm">
          <span className="bg-primary-500 h-2 w-2 animate-pulse rounded-full"></span>
          Ready to create something amazing?
        </div> */}

        {/* Headline */}
        <h2 className="mb-6 text-4xl leading-tight font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
          Turn Your Vision Into a{' '}
          <span className="relative inline-block">
            <span className="from-primary-500 via-primary-400 to-secondary-400 bg-gradient-to-r bg-clip-text text-transparent">
              Movement
            </span>
            {/* Underline accent */}
            <span className="from-primary-500 to-secondary-400 absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r opacity-40"></span>
          </span>
        </h2>

        {/* Subtext */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-neutral-700 md:text-xl">
          We help{' '}
          <strong className="text-primary-600 font-semibold">
            brands connect with fans
          </strong>{' '}
          and{' '}
          <strong className="text-secondary-600 font-semibold">
            artists amplify their impact
          </strong>{' '}
          through creative campaigns and unforgettable K-pop experiences.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="responsive-md"
            variant="primary"
            href="/contact"
            className="group relative overflow-hidden shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10">Let's Collaborate</span>
            <span className="from-primary-600 to-secondary-400 absolute inset-0 -z-0 bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-100"></span>
          </Button>

          <Button
            size="responsive-md"
            variant="outline"
            href="/portfolio"
            className="border-2 bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            View Our Work
          </Button>
        </div>

        {/* Social proof or trust indicator (optional) */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-600">
          <div className="flex items-center gap-2">
            <span className="text-primary-600 font-semibold">50+</span>
            Events Organized
          </div>
          <span className="text-neutral-300">•</span>
          <div className="flex items-center gap-2">
            <span className="text-secondary-600 font-semibold">100K+</span>
            Fans Engaged
          </div>
          <span className="text-neutral-300">•</span>
          <div className="flex items-center gap-2">
            <span className="text-primary-600 font-semibold">30+</span>
            Brand Partners
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
