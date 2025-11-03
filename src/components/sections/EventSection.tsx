'use client';
import React, { useEffect } from 'react';
import { SectionContainer } from '../SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { EventCard } from '@/components/EventCard';
import { useRef } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

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
    {
      id: 5,
      image: '/PlayWithPagaehun.jpg',
      name: 'Event 4',
      artist: 'Artist 4',
      location: 'Location 4',
      date: '10 March 2025',
      status: 'Ended',
      url: '/events/event-1',
    },
    {
      id: 6,
      image: '/PlayWithPagaehun.jpg',
      name: 'Event 4',
      artist: 'Artist 4',
      location: 'Location 4',
      date: '10 March 2025',
      status: 'Ended',
      url: '/events/event-1',
    },
  ];

  useEffect(() => {
    const container = document.getElementById('event-list');
    const progress = document.getElementById('scroll-progress');

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

  return (
    <SectionContainer
      name="events"
      className="relative mt-16 hidden aspect-[16/9] flex-col justify-between md:mt-24 md:flex lg:mt-32"
    >
      {/* === Background with gradient bridge from white to black === */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
        linear-gradient(to bottom, var(--color-white) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.3) 100%),
        url(riize-banner.png)
      `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* === Section Header === */}
      <div
        id="events-section-header"
        className="relative z-10 flex flex-col items-center px-6 py-4 text-center md:py-8 lg:py-12"
      >
        {/* Badge */}
        <SectionHeading sectionName="Events" id="event-heading" />
      </div>

      {/* === Section Content === */}
      <div
        id="events-section-content"
        className="relative z-20 flex w-full flex-row items-start justify-between gap-8 self-end pl-4 lg:pb-8 lg:pl-12"
      >
        {/* === Event Details Card === */}
        <div
          id="event-details"
          className="mb-6 w-2/5 rounded-3xl border border-white/20 bg-white/10 p-3 text-white drop-shadow-2xl backdrop-blur-md lg:mb-12 lg:p-6"
        >
          <div className="mb-8 flex flex-col gap-2">
            <p className="font-bold md:text-3xl lg:text-5xl">Artist Name</p>
            <h3 className="font-semibold md:text-xl lg:text-3xl">
              Event Title
            </h3>
            <p className="font-medium md:text-lg lg:text-2xl">
              Location, Date Time
            </p>
            <p className="leading-relaxed text-white/90 md:text-xs lg:text-lg">
              BRIIZE in Indonesia — it’s your turn to experience one of K-pop’s
              most anticipated new acts live in Jakarta. Don’t miss this — let’s
              RIIZE LOUD together!
            </p>
          </div>

          <Button
            size="responsive"
            className="bg-primary-500 hover:bg-primary-600"
          >
            <p className="font-semibold tracking-wide">Get Ticket</p>
          </Button>
        </div>

        {/* === Event Carousel === */}
        <div
          id="event-list-container"
          className="flex w-3/5 flex-col justify-end"
        >
          <div
            id="event-list"
            className="scrollbar-hide flex snap-x snap-mandatory gap-2 overflow-x-auto py-4 lg:gap-4 lg:py-8"
          >
            {events.map((event) => (
              <div
                key={event.id}
                className="event-card flex aspect-[3/4] w-40 flex-shrink-0 cursor-pointer snap-start items-end rounded-[8px] drop-shadow-lg transition-transform hover:scale-105 lg:w-60 lg:rounded-[16px]"
                style={{
                  backgroundImage: `url(${event.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                onClick={() => console.log('Open event:', event.id)}
              >
                <div className="m-1 w-full rounded-[12px] bg-white p-2 text-black">
                  Test
                </div>
              </div>
            ))}
          </div>

          {/* === Navigation Buttons + Progress === */}
          <div className="mt-2 flex items-center gap-3 lg:mt-6">
            <button
              onClick={() => {
                const container = document.getElementById('event-list');
                container?.scrollBy({ left: -280, behavior: 'smooth' });
              }}
              className="rounded-full p-3 text-white transition-all hover:scale-110 hover:bg-white/10"
              aria-label="Previous event"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => {
                const container = document.getElementById('event-list');
                container?.scrollBy({ left: 280, behavior: 'smooth' });
              }}
              className="rounded-full p-3 text-white transition-all hover:scale-110 hover:bg-white/10"
              aria-label="Next event"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="h-1 w-32 rounded-full bg-white/30">
              <div
                id="scroll-progress"
                className="h-full rounded-full bg-white transition-all duration-300"
                style={{ width: '0%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
