'use client';

import { Button } from '@/components/ui/Button';
import { SectionContainer } from '@/components/SectionContainer';

import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { smoothScrollTo } from '@/lib/utils';

export default function AboutHero() {
  return (
    <SectionContainer
      name="about-hero"
      className="section-padding flex min-h-[90vh] flex-col justify-center bg-white pt-32 pb-20"
    >
      <div className="container">
        {/* Top Tier */}
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-16">
          {/* Left Column (Headline) */}
          <div className="flex flex-col lg:w-[60%]">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Breadcrumb items={[{ label: 'About' }]} />
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
              From K-Pop Culture Roots to a Future in Digital Impact
            </h1>
          </div>

          {/* Right Column (Paragraph) */}
          <div className="flex flex-col justify-end lg:w-[35%] lg:pb-2">
            <p className="font-body text-sm leading-relaxed text-neutral-600 md:text-lg">
              Kopi Chuseyo grew from Indonesia’s leading K-Pop café into a digital marketing and event activation agency—carrying our cultural roots into influencer-driven campaigns built on deep community networks.
            </p>
          </div>
        </div>

        {/* Bottom Tier (Images & CTAs) */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:h-[500px] md:grid-cols-2">
          {/* Left Image (Larger Portrait/Vertical - 60%) */}
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-neutral-100 md:h-full">
             {/* <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 text-neutral-400">
                <span className="font-display text-lg uppercase">Archive: Kopi Chuseyo Era</span>
             </div> */}
             <Image 
                src="/wynn_event.webp" 
                alt="Wynn First Fansign in Collaboration with Esavya held by Kopi Chuseyo" 
                fill 
                className="object-cover transition-all duration-700" 
             />
          </div>

          {/* Right Column (CTAs + Smaller Image - 40%) */}
          <div className="flex w-full flex-col-reverse md:flex-col gap-6">
            {/* CTAs */}
            <div className="flex flex-row justify-center md:justify-start gap-4">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => smoothScrollTo('origins', 2000)}
              >
                Our Story
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => smoothScrollTo('contact', 2000)}
              >
                Contact Team
              </Button>
            </div>

            {/* Right Image (Smaller Square/Landscape) */}
            <div className="relative h-full min-h-[250px] w-full overflow-hidden rounded-lg bg-neutral-100">
               <Image 
                src="/about_hero_sub.webp" 
                alt="Kopi Chuseyo Archive" 
                fill 
                className="object-cover transition-all duration-700" 
             />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
