import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { fetchEvents } from '@/lib/events';
import EventsSlider from '@/components/events/EventsSlider';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Discover upcoming K-Pop events, concerts, and community gatherings organized by Kopi Chuseyo. Join the excitement!',
};

export default async function Events() {
  const events = await fetchEvents();

  return (
    <>
      <main className="min-h-screen bg-white text-neutral-900">
        {/* Hero Section - Slider */}
        <EventsSlider events={events} />

        {/* All Events List */}
        <section className="container section-padding py-20">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">All Events</h2>
            <div className="text-neutral-500 font-medium">{events.length} Events</div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
             {events.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
                     <Image
                        src={event.bannerUrl || event.posterUrl || '/placeholder-event.jpg'}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-103"
                     />
                     <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase backdrop-blur-sm">
                        {event.status}
                     </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-primary-600 uppercase tracking-wider">
                            {new Date(event.startAt).toLocaleDateString()}
                        </span>
                        <span className="text-sm text-neutral-500">{event.location}</span>
                    </div>
                    <div className="relative w-fit max-w-full overflow-hidden pb-2">
                        <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-tight transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-neutral-900 after:origin-right after:scale-x-0 after:transition-transform after:duration-600 group-hover:after:origin-left group-hover:after:scale-x-100">
                            {event.title}
                        </h3>
                    </div>
                    <p className="mt-2 text-neutral-600 line-clamp-2">
                        {event.description}
                    </p>
                  </div>
                </Link>
             ))}
             {events.length === 0 && (
                <div className="col-span-full py-20 text-center">
                    <p className="text-xl text-neutral-400">No events found.</p>
                </div>
             )}
          </div>
        </section>
      </main>
    </>
  );
}
