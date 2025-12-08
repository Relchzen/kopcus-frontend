'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Event } from '@/lib/events';

interface Props {
  events: Event[];
}

export default function EventsCarousel({ events }: Props) {
  // Duplicate events to create seamless loop
  const duplicatedEvents = [...events, ...events, ...events];

  if (events.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden bg-neutral-900 py-12">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-transparent to-neutral-900" />
      </div>

      <div className="relative z-10 flex">
        <motion.div
          className="flex gap-6 px-6"
          animate={{
            x: ['0%', '-33.33%'],
          }}
          transition={{
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {duplicatedEvents.map((event, idx) => (
            <Link
              key={`${event.id}-${idx}`}
              href={`/events/${event.slug}`}
              className="group relative h-[60vh] w-[80vw] flex-none overflow-hidden rounded-3xl md:w-[40vw] lg:w-[30vw]"
            >
              <Image
                src={event.bannerUrl || event.posterUrl || '/placeholder-event.jpg'}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <div className="mb-2 inline-block rounded-full bg-primary-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  {event.status}
                </div>
                <h3 className="font-display text-3xl font-bold uppercase leading-tight md:text-4xl">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-neutral-300">
                  {new Date(event.startAt).toLocaleDateString()} • {event.location}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
