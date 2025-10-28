'use client';
import React from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionContainer } from '../SectionContainer';
import { EventCard } from '@/components/EventCard';
import { useRef } from 'react';

type Props = {};

export default function EventSection({}: Props) {
  const events = [
    {
      id: 1,
      image: '/PlayWithPagaehun.jpg',
      name: 'Event 1',
      artist: 'Artist 1',
      location: 'Location 1',
      date: '31 December 2025',
      status: 'Available',
      url: '/events/event-1',
    },
    {
      id: 2,
      image: '/PlayWithPagaehun.jpg',
      name: 'Riize Rise Up and Realize Tour in Jakarta',
      artist: 'Artist 2',
      location: 'Location 2',
      date: '15 January 2026',
      status: 'Coming Soon',
      url: '/events/event-1',
    },
    {
      id: 3,
      image: '/PlayWithPagaehun.jpg',
      name: 'Event 3',
      artist: 'Artist 3',
      location: 'Location 3',
      date: '28 February 2026',
      status: 'Sold Out',
      url: '/events/event-1',
    },
    {
      id: 4,
      image: '/PlayWithPagaehun.jpg',
      name: 'Event 4',
      artist: 'Artist 4',
      location: 'Location 4',
      date: '10 March 2025',
      status: 'Ended',
      url: '/events/event-1',
    },
  ];

  return (
    <SectionContainer name="events">
      <SectionHeader
        sectionName="Events"
        firstHeadline="Setting the next stage."
        secondHeadline="Stay tuned."
      />
      <div id="section-content" className="z-20 overflow-y-visible bg-white">
        <div
          id="events-container"
          className="relative grid grid-cols-2 justify-between gap-4 px-4 pt-18 pb-8 md:grid-cols-4"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, var(--color-primary-200) 30%, var(--color-primary-200) 70%, var(--color-white) 100%)',
          }}
        >
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              eventUrl={event.url}
              imageUrl={event.image}
              name={event.name}
              artist={event.artist}
              location={event.location}
              date={event.date}
              status={event.status}
              index={index}
            />
          ))}
        </div>
        <div className="flex flex-row-reverse bg-white px-8">View More</div>
      </div>
    </SectionContainer>
  );
}
