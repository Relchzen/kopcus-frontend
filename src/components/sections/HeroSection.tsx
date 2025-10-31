import React from 'react';
import { PopUpButton, TransparentInversePopUpButton } from '../Button';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';
import { SectionContainer } from '../SectionContainer';
import { Button } from '../ui/Button';

type Props = {};

export default function HeroSection({}: Props) {
  return (
    <SectionContainer
      name="hero"
      className="section-padding relative flex h-max flex-col justify-center overflow-x-clip md:flex-row md:justify-between md:gap-8"
    >
      {/* Subtle background elements - more refined */}
      <div className="bg-primary-500/5 absolute top-1/3 -left-32 h-[500px] w-[500px] rounded-full blur-3xl"></div>
      <div className="bg-secondary-500/5 absolute -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full blur-3xl"></div>

      {/* Clean accent line */}
      <div className="from-primary-500/40 absolute top-1/2 left-0 h-px w-20 bg-gradient-to-r to-transparent"></div>

      <div
        id="hero-section-details"
        className="relative z-10 flex flex-col justify-center py-12 text-center align-middle md:w-1/2 md:text-left"
      >
        {/* Refined badge */}
        <div className="border-primary-200 text-primary-700 mx-auto mb-8 inline-flex w-fit items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-sm font-medium shadow-sm md:mx-0">
          <span className="bg-primary-500 h-1.5 w-1.5 rounded-full"></span>
          Digital Marketing Agency
        </div>

        {/* Clean, bold headline */}
        <h1 className="mb-6 text-5xl leading-[1.1] font-bold text-neutral-900 lg:text-6xl xl:text-7xl 2xl:text-8xl">
          Connect K-Pop Culture
          <br />
          with <span className="text-primary-500">Indonesian Fans</span>
        </h1>

        <p className="md:text-md mb-10 w-full text-sm leading-relaxed text-neutral-600 lg:text-lg">
          We help brands and artists grow their reach in Indonesia through
          creative strategy and cultural insight.
        </p>

        <div className="justfy-center flex flex-wrap justify-center gap-4 md:justify-start">
          <Button size={'responsive'} href="#contact">
            <span className="font-bold">Get in Touch</span>
            <LiaLongArrowAltRightSolid className="ml-2 h-5 w-5 md:h-6 md:w-6" />
          </Button>

          <Button size={'responsive'} variant="outline" href="#portfolio">
            <span className="font-bold">View Our Work</span>
          </Button>
        </div>

        {/* Minimal stats - clean and professional */}
        {/* <div className="mt-16 flex items-center gap-8 text-sm">
          <div>
            <div className="text-2xl font-bold text-neutral-900">50+</div>
            <div className="text-neutral-500">Events</div>
          </div>
          <div className="h-8 w-px bg-neutral-200"></div>
          <div>
            <div className="text-2xl font-bold text-neutral-900">100K+</div>
            <div className="text-neutral-500">Fans Reached</div>
          </div>
          <div className="h-8 w-px bg-neutral-200"></div>
          <div>
            <div className="text-2xl font-bold text-neutral-900">30+</div>
            <div className="text-neutral-500">Partners</div>
          </div>
        </div> */}
      </div>

      <div
        id="hero-section-image"
        className="relative z-10 flex items-center justify-end py-12 md:w-2/5"
      >
        {/* Subtle decorative element - single corner accent */}
        <div className="border-primary-200/50 absolute -top-6 -right-6 h-24 w-24 rounded-2xl border-2"></div>

        {/* Clean media container - story/reel style */}
        <div className="group relative aspect-[9/16] w-full overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl ring-1 ring-black/5">
          {/* Video/Image placeholder with Instagram story feel */}
          <div className="from-primary-400/20 to-secondary-400/20 absolute inset-0 bg-gradient-to-br">
            {/* Story progress bars at top */}
            <div className="absolute top-4 right-4 left-4 flex gap-2">
              <div className="h-1 flex-1 rounded-full bg-neutral-300"></div>
              <div className="h-1 flex-1 rounded-full bg-neutral-300"></div>
              <div className="h-1 flex-1 rounded-full bg-neutral-300"></div>
            </div>

            {/* Content area */}
            <div className="flex h-full items-center justify-center p-8">
              <div className="text-center">
                <div className="mb-4 text-7xl opacity-50">📱</div>
                <p className="text-sm font-medium text-white/90">
                  Stories & Reels
                </p>
                <p className="mt-1 text-xs text-white/60">
                  Showcase your content here
                </p>
              </div>
            </div>

            {/* Bottom gradient overlay for readability */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Hover effect - subtle scale */}
          <div className="bg-primary-500/0 group-hover:bg-primary-500/5 absolute inset-0 transition-all duration-500"></div>
        </div>
      </div>
    </SectionContainer>
  );
}
