'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Event } from '@/lib/events';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface Props {
  events: Event[];
}

export default function EventsSlider({ events }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = React.useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % events.length);
  }, [events.length]);

  useEffect(() => {
    if (events.length <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [events.length, nextSlide]);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (events.length === 0) return null;

  const currentEvent = events[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (

    <div className="w-full pb-12 pt-24">
      <div className="container section-padding">
        <div className="mb-6">
          <Breadcrumb items={[{ label: 'Events' }]} />
        </div>
        <div className="relative h-[60vh] w-full overflow-hidden rounded-3xl md:h-[70vh]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0 h-full w-full"
            >
              <Link href={`/events/${currentEvent.slug}`} className="block h-full w-full">
                <Image
                  src={currentEvent.bannerUrl || currentEvent.posterUrl || '/placeholder-event.jpg'}
                  alt={currentEvent.title}
                  fill
                  className="object-cover"
                  priority
                />
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {events.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/20 p-4 text-white backdrop-blur-sm transition-colors hover:bg-black/40 md:left-8"
                aria-label="Previous slide"
              >
                <FaChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/20 p-4 text-white backdrop-blur-sm transition-colors hover:bg-black/40 md:right-8"
                aria-label="Next slide"
              >
                <FaChevronRight className="h-6 w-6" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
                {events.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      idx === currentIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
