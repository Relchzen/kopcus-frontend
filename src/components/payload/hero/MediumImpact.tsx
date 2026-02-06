'use client';
import React, { useState, useEffect, useRef } from 'react';
import NextImage from 'next/image';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';
import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '@/components/ui/Button';
import { HeroImage } from '@/types/hero';
import { motion } from 'motion/react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import Link from 'next/link';

interface MediumImpactProps {
  hero: {
    type: 'mediumImpact';
    richText: {
      root: {
        children: any[];
      };
    };
    links: any[];
    images: any[];
  };
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

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % hero_images.length);
    setProgress(0);
  }, [hero_images.length]);

  const handlePrevious = React.useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + hero_images.length) % hero_images.length
    );
    setProgress(0);
  }, [hero_images.length]);

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
  }, [hero_images.length, currentIndex, isPaused, hasImages, handleNext]);

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

  // Helper to ensure URL is valid
  const getImageUrl = (image: any) => {
    let imgObj = image;
    if (image && image.image && !image.url) {
        imgObj = image.image;
    }

    if (!imgObj) return '';
    if (typeof imgObj === 'string') return imgObj;

    const sizes = imgObj.sizes;
    const url = sizes?.medium?.url || sizes?.small?.url || sizes?.og?.url || imgObj.url;

    if (!url) return '';
    return `${process.env.NEXT_PUBLIC_CMS_URL || ''}${url}`;
  };

  const currentUrl = getImageUrl(current);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      id="hero-section-image"
      className="relative z-10 flex items-center justify-end py-4 md:w-[30%] lg:max-w-md"
    >
      {/* Story container */}
      <div className="group relative aspect-[9/16] w-full overflow-hidden rounded-2xl shadow-2xl shadow-neutral-900/10 ring-1 ring-neutral-200 transition-transform duration-500 hover:scale-[1.02]">
        {/* Progress bars */}
        <div className="absolute top-6 right-6 left-6 z-20 flex gap-2">
          {hero_images.map((_, i) => (
            <div
              key={i}
              className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/20 backdrop-blur-sm"
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
        <div className="absolute inset-0 scale-110 blur-xl">
          {currentUrl && (
            <NextImage
              src={currentUrl}
              alt=""
              fill
              className="object-cover"
              priority /* Ensure background loads quickly */
            />
          )}
        </div>

        {/* Image */}
        <div className="relative z-10 h-full w-full">
          {currentUrl && (
            <NextImage
              src={currentUrl}
              alt={current.alternativeText || 'Hero image'}
              fill
              className="object-contain"
            />
          )}
        </div>

        {/* Invisible touch zones */}
        <div className="absolute inset-0 z-10 flex">
          {/* Left side - Previous */}
          <button
            className="w-1/2 cursor-pointer outline-none"
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
            className="w-1/2 cursor-pointer outline-none"
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
    </motion.div>
  );
};

// Helper function to extract text from Lexical nodes
const extractText = (node: any): string => {
    if (!node) return '';
    if (node.text) return node.text;
    if (node.children) {
        return node.children.map((child: any) => extractText(child)).join('');
    }
    return '';
};

export default function MediumImpact({ hero }: MediumImpactProps) {
    if (!hero) return null;

  // Extract content from richText
  let hero_headline = '';
  let hero_subheadline = '';

  if (hero.richText?.root?.children) {
      const children = hero.richText.root.children;
      // Assume first heading is headline, first paragraph is subheadline
      const headingNode = children.find((c: any) => c.type === 'heading');
      const paragraphNode = children.find((c: any) => c.type === 'paragraph');

      if (headingNode) hero_headline = extractText(headingNode);
      if (paragraphNode) hero_subheadline = extractText(paragraphNode);

      // Fallback if no specific types found
      if (!hero_headline && children.length > 0) hero_headline = extractText(children[0]);
      if (!hero_subheadline && children.length > 1) hero_subheadline = extractText(children[1]);
  }

  // Extract links
  const primaryLink = hero.links && hero.links.length > 0 ? hero.links[0] : null;
  const hero_cta_text = primaryLink?.link?.label || primaryLink?.label || 'Learn More';
  const hero_cta_link = primaryLink?.link?.url || primaryLink?.url || '#';

  const hero_images = hero.images as HeroImage[];

  return (
    <SectionContainer
      name="hero"
      className="section-padding relative flex min-h-[90vh] flex-col justify-center overflow-hidden bg-white pt-8 pb-8 md:flex-row md:items-center md:justify-between md:gap-12 md:pt-12 md:pb-12 lg:gap-16"
    >
      {/* Minimalist Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Subtle Dot Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.4]" 
          style={{ 
            backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }} 
        />
        
        {/* Very subtle light leak for depth */}
        <div className="absolute top-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-gradient-to-b from-neutral-100/80 to-transparent blur-[100px]" />
      </div>

      <div
        id="hero-section-details"
        className="relative z-10 flex flex-col justify-center md:w-[60%]"
      >
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.15,
                        delayChildren: 0.2
                    }
                }
            }}
        >
            {/* Minimalist Badge */}
            <SectionHeading sectionName='Digital Marketing Agency' id='hero-heading' />

            {/* Modern Typography */}
            <div className="mb-8 overflow-hidden">
                <motion.h1 
                    variants={{
                        hidden: { y: '100%' },
                        visible: { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                    }}
                    className="text-5xl leading-[1.1] font-bold tracking-tight text-neutral-900 lg:text-7xl xl:text-8xl"
                >
                    {hero_headline}
                </motion.h1>
            </div>

            <motion.p 
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
                }}
                className="mb-10 max-w-2xl text-lg leading-relaxed text-neutral-700 md:text-xl"
            >
                {hero_subheadline}
            </motion.p>

            <motion.div 
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
                }}
                className="flex flex-wrap gap-4"
            >
                {/* Matte Primary Button */}
                {primaryLink && (
                  <Button 
                      size={'responsive-md'} 
                      href={hero_cta_link}
                      className="group bg-neutral-900 text-white shadow-lg shadow-neutral-900/10 transition-all duration-300 hover:bg-neutral-800 hover:shadow-neutral-900/20 hover:-translate-y-0.5"
                  >
                      <span className="font-medium">
                      {hero_cta_text}
                      </span>
                      <LiaLongArrowAltRightSolid className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                )}

                {/* Clean Secondary Button */}
                <Button 
                    size={'responsive-md'} 
                    variant="outline" 
                    onClick={() => {
                        const element = document.getElementById('portfolio');
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="border-neutral-200 bg-white text-neutral-900 transition-all duration-300 hover:bg-neutral-50 hover:border-neutral-300"
                >
                    <span className="font-medium">
                    View Our Works
                    </span>
                </Button>
            </motion.div>
        </motion.div>
      </div>

      <HeroImageSection hero_images={hero_images || []} />
    </SectionContainer>
  );
}