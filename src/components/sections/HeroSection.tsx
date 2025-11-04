'use client';
import React, { useState, useEffect, useRef } from 'react';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';
import { SectionContainer } from '../SectionContainer';
import { Button } from '../ui/Button';
import { HeroData, HeroImage } from '@/types/hero';
import { AnimatePresence, motion } from 'framer-motion';

interface HeroSectionProps {
  data: HeroData;
}

interface HeroImageSectionProps {
  hero_images: HeroImage[];
}

export const HeroImageSection = ({ hero_images }: HeroImageSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const hasImages = hero_images && hero_images.length > 0;
  const DURATION = 8000; // 8 seconds per image
  const TICK_RATE = 50; // Update progress every 50ms

  useEffect(() => {
    if (!hasImages) return;

    if (timerRef.current) clearInterval(timerRef.current);
    if (isPaused) return;

    let elapsed = 0;

    timerRef.current = setInterval(() => {
      elapsed += TICK_RATE;
      const percent = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(percent);

      if (elapsed >= DURATION) {
        handleNext();
        elapsed = 0;
      }
    }, TICK_RATE);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hero_images.length, currentIndex, isPaused]);

  // Preload images
  useEffect(() => {
    if (!hasImages) return;

    hero_images.forEach((img) => {
      const image = new Image();
      image.src = img.full_image_url;
    });
  }, [hero_images, hasImages]);

  const handlePrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + hero_images.length) % hero_images.length
    );
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % hero_images.length);
    setProgress(0);
  };

  const handleMouseDown = () => {
    setIsPaused(true);
  };

  const handleMouseUp = () => {
    setIsPaused(false);
  };

  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  if (!hasImages) {
    return (
      <div className="flex h-96 items-center justify-center rounded-3xl bg-neutral-800/30">
        <p className="text-sm text-white/70">No hero images found.</p>
      </div>
    );
  }

  const current = hero_images[currentIndex];

  return (
    <div
      id="hero-section-image"
      className="relative z-10 flex items-center justify-end py-12 md:w-2/5"
    >
      {/* Corner accent */}
      <div className="border-primary-200/50 absolute -top-6 -right-6 h-24 w-24 rounded-2xl border-2"></div>

      {/* Story container */}
      <div className="group relative aspect-[9/16] w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
        {/* Progress bars */}
        <div className="absolute top-4 right-4 left-4 z-20 flex gap-2">
          {hero_images.map((_, i) => (
            <div
              key={i}
              className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/30"
            >
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width:
                    i === currentIndex
                      ? `${progress}%`
                      : i < currentIndex
                        ? '100%'
                        : '0%',
                }}
              ></div>
            </div>
          ))}
        </div>
        <div
          className="absolute inset-0 scale-110 blur-xl"
          style={{
            backgroundImage: `url(${current.full_image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Image */}
        <img
          src={current.full_image_url}
          alt={current.title || 'Hero image'}
          className="relative z-10 h-full w-full object-contain"
        />

        {/* Invisible touch zones */}
        <div className="absolute inset-0 z-10 flex">
          {/* Left side - Previous */}
          <button
            className="w-1/2 cursor-pointer"
            onClick={handlePrevious}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-label="Previous image"
          />
          {/* Right side - Next */}
          <button
            className="w-1/2 cursor-pointer"
            onClick={handleNext}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-label="Next image"
          />
        </div>
      </div>
    </div>
  );
};

export default function HeroSection({ data }: HeroSectionProps) {
  if (!data) return null;

  console.log(data);

  const {
    hero_headline_firstline,
    hero_subheadline,
    hero_cta_text,
    hero_cta_link,
    hero_images,
  } = data;

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
          {hero_headline_firstline}
        </h1>

        <p className="md:text-md mb-10 w-full text-sm leading-relaxed text-neutral-600 lg:text-lg">
          {hero_subheadline}
        </p>

        <div className="justfy-center flex flex-wrap justify-center gap-4 md:justify-start">
          <Button size={'responsive-sm'} href={hero_cta_link}>
            <span className="font-medium md:font-semibold lg:font-bold">
              {hero_cta_text}
            </span>
            <LiaLongArrowAltRightSolid className="ml-2 h-5 w-5 md:h-6 md:w-6" />
          </Button>

          <Button size={'responsive-sm'} variant="outline" href="#portfolio">
            <span className="font-medium md:font-semibold lg:font-bold">
              View Our Work
            </span>
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

      <HeroImageSection hero_images={hero_images || []} />
    </SectionContainer>
  );
}
