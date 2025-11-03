'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from 'framer-motion';
import { SectionContainer } from '../SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import Image from 'next/image';

interface EventItem {
  id: number;
  banner: string;
  poster: string;
  name: string;
  artist: string;
  location: string;
  date: string;
  status: string;
  url: string;
  description: string;
}

export default function MobileEventSection() {
  const events: EventItem[] = [
    {
      id: 1,
      banner: '/riize-banner.png',
      poster: '/PlayWithPagaehun.jpg',
      name: 'Riize Rise Up and Realize Tour in Jakarta',
      artist: 'RIIZE',
      location: 'Jakarta, Indonesia',
      date: '15 January 2026',
      status: 'Available',
      url: '/events/riize-rise-up',
      description:
        'BRIIZE in Indonesia — it’s your turn to experience one of K-pop’s most anticipated new acts live in Jakarta. Don’t miss this — let’s RIIZE LOUD together!',
    },
    {
      id: 2,
      banner: '/riize-banner.png',
      poster: '/PlayWithPagaehun.jpg',
      name: 'Play with Pagaehun in Bali',
      artist: 'Pagaehun',
      location: 'Bali, Indonesia',
      date: '5 February 2026',
      status: 'Coming Soon',
      url: '/events/pagaehun-bali',
      description:
        'Experience an intimate live show with Pagaehun surrounded by the tropical vibe of Bali!',
    },
    {
      id: 3,
      banner: '/riize-banner.png',
      poster: '/PlayWithPagaehun.jpg',
      name: 'Event 3',
      artist: 'Artist 3',
      location: 'Surabaya, Indonesia',
      date: '28 February 2026',
      status: 'Sold Out',
      url: '/events/event-3',
      description:
        'A fully sold-out show that captured the hearts of fans across Indonesia.',
    },
  ];
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const isDragging = useRef(false);

  // Duplicate items for infinite scroll
  const duplicatedEvents = [...events, ...events, ...events];
  const totalItems = events.length;

  useEffect(() => {
    // Set initial position to show the middle set of items
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const cards = Array.from(inner.children) as HTMLElement[];
    if (cards.length === 0) return;

    // Position at the start of the second set (middle)
    const initialOffset =
      cards[totalItems].offsetLeft -
      (outer.offsetWidth / 2 - cards[totalItems].offsetWidth / 2);
    x.set(-initialOffset);
  }, [events]);

  const handleSnap = () => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const cards = Array.from(inner.children) as HTMLElement[];
    const outerRect = outer.getBoundingClientRect();
    const containerCenter = outerRect.left + outerRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    const targetCard = cards[closestIndex];
    const currentX = x.get();

    const targetCardRect = targetCard.getBoundingClientRect();
    const targetCardCenter = targetCardRect.left + targetCardRect.width / 2;
    const offset = containerCenter - targetCardCenter;

    animate(x, currentX + offset, {
      type: 'spring',
      stiffness: 220,
      damping: 28,
    }).then(() => {
      // After animation, check if we need to loop
      handleInfiniteLoop(closestIndex);
    });

    // Update selected index to the logical position
    setSelectedIndex(closestIndex % totalItems);
  };

  const handleCardClick = (clickedIndex: number) => {
    // Don't trigger click if user was dragging
    if (isDragging.current) return;

    const outer = outerRef.current;
    if (!outer) return;

    const outerRect = outer.getBoundingClientRect();
    const containerCenter = outerRect.left + outerRect.width / 2;

    const inner = innerRef.current;
    if (!inner) return;

    const cards = Array.from(inner.children) as HTMLElement[];
    const clickedCard = cards[clickedIndex];

    if (!clickedCard) return;

    const currentX = x.get();
    const clickedCardRect = clickedCard.getBoundingClientRect();
    const clickedCardCenter = clickedCardRect.left + clickedCardRect.width / 2;
    const offset = containerCenter - clickedCardCenter;

    // Animate to center the clicked card
    animate(x, currentX + offset, {
      type: 'spring',
      stiffness: 220,
      damping: 28,
    }).then(() => {
      // After animation, check if we need to loop
      handleInfiniteLoop(clickedIndex);
    });

    // Update selected index to the logical position
    setSelectedIndex(clickedIndex % totalItems);
  };

  const handleInfiniteLoop = (snappedIndex: number) => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const cards = Array.from(inner.children) as HTMLElement[];
    const currentX = x.get();

    // If we're in the first set, jump to equivalent card in middle set
    if (snappedIndex < totalItems) {
      const equivalentIndex = snappedIndex + totalItems;
      const currentCard = cards[snappedIndex];
      const targetCard = cards[equivalentIndex];

      // Calculate the offset difference between the two equivalent cards
      const offsetDifference = targetCard.offsetLeft - currentCard.offsetLeft;
      x.set(currentX - offsetDifference);
    }

    // If we're in the last set, jump to equivalent card in middle set
    else if (snappedIndex >= totalItems * 2) {
      const equivalentIndex = snappedIndex - totalItems;
      const currentCard = cards[snappedIndex];
      const targetCard = cards[equivalentIndex];

      // Calculate the offset difference between the two equivalent cards
      const offsetDifference = targetCard.offsetLeft - currentCard.offsetLeft;
      x.set(currentX - offsetDifference);
    }
  };

  return (
    <SectionContainer
      name="events"
      className="relative mt-12 flex flex-col items-center gap-6 md:hidden"
    >
      {/* === Heading === */}
      <SectionHeading sectionName="Events" id="event-heading" />
      {/* === Event Banner === */}
      <AnimatePresence mode="wait">
        <motion.div
          key={events[selectedIndex]?.id}
          className="w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={events[selectedIndex]?.banner}
            alt={events[selectedIndex]?.name}
            draggable={false}
            className="h-auto w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* === Slider === */}
      <div ref={outerRef} className="w-full overflow-hidden px-6 pb-4">
        <motion.div
          ref={innerRef}
          drag="x"
          dragConstraints={{ left: -Infinity, right: Infinity }}
          dragElastic={0.05}
          style={{ x }}
          whileTap={{ cursor: 'grabbing' }}
          onDragStart={() => {
            isDragging.current = true;
          }}
          onDragEnd={() => {
            handleSnap();
            // Reset dragging flag after a short delay to prevent click firing
            setTimeout(() => {
              isDragging.current = false;
            }, 100);
          }}
          className="scrollbar-hide flex w-max cursor-grab gap-4 active:cursor-grabbing"
        >
          {duplicatedEvents.map((event, index) => (
            <motion.div
              key={`${index}-${event.name}`}
              className="relative flex aspect-[4/5] w-[80dvw] flex-shrink-0 snap-center items-center justify-center overflow-hidden rounded-2xl bg-neutral-200 text-lg font-bold"
              onClick={() => handleCardClick(index)}
            >
              <Image
                src={event.poster}
                alt={event.name}
                fill
                className="object-cover"
                priority={index < totalItems * 2 && index >= totalItems} // Prioritize middle set
                draggable={false}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* === Event Details === */}
      <div className="mt-2 flex flex-col gap-2 px-6 text-center text-black">
        <p className="text-2xl font-bold">{events[selectedIndex].artist}</p>
        <h3 className="text-xl font-semibold">{events[selectedIndex].name}</h3>
        <p className="text-sm text-black/80">
          {events[selectedIndex].location} — {events[selectedIndex].date}
        </p>

        <Button
          size="responsive"
          className="bg-primary-500 hover:bg-primary-600 mt-4"
        >
          <p className="font-semibold tracking-wide">
            {events[selectedIndex].status === 'Available'
              ? 'Get Ticket'
              : events[selectedIndex].status}
          </p>
        </Button>
      </div>
    </SectionContainer>
  );
}
