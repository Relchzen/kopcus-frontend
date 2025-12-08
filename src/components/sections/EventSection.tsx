'use client';
import React, { useEffect, useState, useRef } from 'react';
import { SectionContainer } from '../SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Event } from '@/lib/events';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { FaArrowRight, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

type Props = {
  events: Event[];
};

export default function EventSection({ events }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedEvent = events[selectedIndex];
  const listRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = listRef.current;
    const progress = progressRef.current;

    const handleScroll = () => {
      if (container && progress) {
        const scrollPercentage =
          (container.scrollLeft /
            (container.scrollWidth - container.clientWidth)) *
          100;
        progress.style.width = `${scrollPercentage}%`;
      }
    };

    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollList = (direction: 'left' | 'right') => {
      if (listRef.current) {
          const scrollAmount = 300;
          listRef.current.scrollBy({
              left: direction === 'left' ? -scrollAmount : scrollAmount,
              behavior: 'smooth'
          });
      }
  };

  if (!events || events.length === 0) {
    return null;
  }

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  return (
    <SectionContainer
      name="events"
      className="relative mt-16 hidden min-h-[850px] flex-col justify-between md:mt-24 md:flex lg:mt-32"
    >
      {/* === Immersive Background === */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-neutral-950">
        <AnimatePresence mode="popLayout">
            <motion.div
                key={selectedEvent?.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${selectedEvent?.bannerUrl || '/riize-banner.png'})` }}
                />
                {/* Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/40 to-transparent" />
                
                {/* Film Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.15] bg-[url('/noise.png')] mix-blend-overlay pointer-events-none"></div>
            </motion.div>
        </AnimatePresence>
      </div>

      {/* === Section Header === */}
      <div className="relative z-10 flex flex-col items-start px-12 py-12">
        <SectionHeading sectionName="Events" id="event-heading" className="text-white" />
      </div>

      {/* === Section Content === */}
      <div className="relative z-20 flex w-full flex-1 flex-row items-end justify-between gap-8 px-12 pb-12 lg:gap-16">
        
        {/* === Event Details Card === */}
        <AnimatePresence mode="wait">
            {selectedEvent && (
            <motion.div
                key={selectedEvent.id}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mb-8 w-1/2 max-w-lg lg:w-1/3"
            >
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition-colors hover:bg-white/10">
                    {/* Glow Effect */}
                    <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary-500/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                    
                    <div className="relative z-10">
                        <div className="mb-6">
                            <motion.h4 variants={itemVariants} className="mb-2 font-display text-lg font-bold uppercase tracking-widest text-primary-400">
                                {selectedEvent.artist}
                            </motion.h4>
                            <motion.h3 variants={itemVariants} className="font-display text-5xl font-bold leading-tight text-white">
                                {selectedEvent.title}
                            </motion.h3>
                        </div>

                        <div className="mb-8 space-y-4 text-neutral-300">
                            <motion.div variants={itemVariants} className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-primary-500">
                                  <FaCalendarAlt />
                                </div>
                                <span className="text-lg font-medium">
                                    {new Date(selectedEvent.startAt).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </motion.div>
                            <motion.div variants={itemVariants} className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-primary-500">
                                  <FaMapMarkerAlt />
                                </div>
                                <span className="text-lg font-medium">{selectedEvent.location}</span>
                            </motion.div>
                        </div>

                        <motion.p variants={itemVariants} className="mb-8 line-clamp-4 text-sm leading-relaxed text-neutral-400">
                            {selectedEvent.description}
                        </motion.p>

                        <motion.div variants={itemVariants}>
                          <Link href={`/events/${selectedEvent.slug}`} className="block">
                              <Button size="lg" className="w-full justify-between bg-primary-600 hover:bg-primary-700 border-none text-white shadow-lg shadow-primary-900/20">
                                  <span className="font-bold tracking-wide">{selectedEvent.status === 'Available' ? 'Get Tickets' : 'View Details'}</span>
                                  <FaArrowRight />
                              </Button>
                          </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
            )}
        </AnimatePresence>

        {/* === Event Carousel === */}
        <div className="flex w-1/2 flex-col justify-end pl-6 lg:w-2/3 lg:pl-12">
          <div className="mb-6 flex items-end justify-between border-b border-white/10 pb-6">
             <div>
                <h3 className="text-2xl font-bold text-white mb-1">Upcoming Events</h3>
                <p className="text-sm text-neutral-400">Don&apos;t miss out on the hype</p>
             </div>
             
             <div className="flex items-center gap-6">
                {/* Counter */}
                <div className="font-mono text-sm tracking-widest text-neutral-400">
                    <span className="text-white text-lg font-bold">{(selectedIndex + 1).toString().padStart(2, '0')}</span>
                    <span className="mx-2 opacity-50">/</span>
                    <span>{events.length.toString().padStart(2, '0')}</span>
                </div>

                {/* Navigation */}
                <div className="flex gap-2">
                    <button onClick={() => scrollList('left')} className="group rounded-full border border-white/10 bg-white/5 p-3 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black">
                        <svg className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={() => scrollList('right')} className="group rounded-full border border-white/10 bg-white/5 p-3 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black">
                        <svg className="h-5 w-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
             </div>
          </div>

          <div
            ref={listRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-8 pt-4"
          >
            {events.map((event, index) => (
              <div
                key={event.id}
                onClick={() => setSelectedIndex(index)}
                className={`group relative aspect-[3/4] w-60 flex-shrink-0 cursor-pointer snap-start overflow-hidden rounded-xl border transition-all duration-500 ${
                  index === selectedIndex 
                    ? 'border-primary-500 scale-100 shadow-[0_0_40px_rgba(var(--primary-500-rgb),0.4)] z-10' 
                    : 'border-white/5 scale-95 opacity-50 hover:opacity-80 hover:scale-95 grayscale hover:grayscale-0'
                }`}
              >
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${event.posterUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 w-full p-5 transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                    <p className="truncate text-lg font-bold text-white mb-1">{event.title}</p>
                    <div className="flex items-center gap-2 text-xs text-primary-400 font-medium uppercase tracking-wider">
                        <span>{new Date(event.startAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                        <span className="h-1 w-1 rounded-full bg-primary-500"></span>
                        <span>{event.location.split(',')[0]}</span>
                    </div>
                </div>

                {/* Active Indicator */}
                {index === selectedIndex && (
                    <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary-500 shadow-[0_0_10px_#ef4444] animate-pulse"></div>
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="h-px w-full bg-white/10 mt-2">
            <div
                ref={progressRef}
                className="h-full bg-primary-500 transition-all duration-300"
                style={{ width: '0%' }}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
