'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from 'motion/react';
import { SectionContainer } from '../SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import Image from 'next/image';
import { Event } from '@/lib/events';
import Link from 'next/link';

type Props = {
  events: Event[];
  title?: string;
};

export default function MobileEventSection({ events, title = "Events" }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const isDragging = useRef(false);

  // Duplicate items for infinite scroll
  // Only duplicate if we have more than 1 event
  const duplicatedEvents = events.length > 1 ? [...events, ...events, ...events] : events;
  const totalItems = events.length;
  const isInfinite = events.length > 1;

  useEffect(() => {
    if (!isInfinite) return;

    // Set initial position to show the middle set of items
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const cards = Array.from(inner.children) as HTMLElement[];
    if (cards.length === 0) return;

    // Position at the start of the second set (middle)
    // We need to wait for render to get correct offsets, but this runs after render
    const initialOffset =
      cards[totalItems].offsetLeft -
      (outer.offsetWidth / 2 - cards[totalItems].offsetWidth / 2);
    x.set(-initialOffset);
  }, [events, totalItems, x, isInfinite]);

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
      if (isInfinite) {
        handleInfiniteLoop(closestIndex);
      }
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
      if (isInfinite) {
        handleInfiniteLoop(clickedIndex);
      }
    });

    // Update selected index to the logical position
    setSelectedIndex(clickedIndex % totalItems);
  };

  const handleInfiniteLoop = (snappedIndex: number) => {
    if (!isInfinite) return;

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

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <SectionContainer
      name="events"
      className="relative mt-12 flex flex-col items-center gap-6 md:hidden"
    >
      {/* === Heading === */}
      <SectionHeading sectionName={title} id="event-heading" />
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
          <Image
            src={events[selectedIndex]?.bannerUrl || '/riize-banner.png'}
            alt={events[selectedIndex]?.title}
            width={800}
            height={450}
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
          dragConstraints={isInfinite ? { left: -Infinity, right: Infinity } : { left: 0, right: 0 }} // Disable drag constraints if not infinite? Or maybe just limit it.
          // Better to allow drag but with bounds if not infinite, but for single item, maybe no drag needed?
          // If single item, we can just center it and disable drag or make it spring back.
          // Let's keep it simple: if single item, dragConstraints might need adjustment or just disable drag if we want.
          // But user asked "don't make it infinite loop".
          // If 1 item, dragConstraints should probably prevent moving too far or just center it.
          // Let's try to center it by default and maybe allow small drag with spring back.
          // For now, let's set constraints to keep it in view if not infinite.
          // Actually, if 1 item, we might not need drag at all.
          // Let's use left/right constraints based on content width if not infinite.
          // For single item, it's centered.

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
          className={`scrollbar-hide flex w-max cursor-grab gap-4 active:cursor-grabbing ${!isInfinite ? 'justify-center' : ''}`}
        >
          {duplicatedEvents.map((event, index) => (
            <motion.div
              key={`${index}-${event.title}`}
              className="relative flex aspect-[4/5] w-[80dvw] flex-shrink-0 snap-center items-center justify-center overflow-hidden rounded-2xl bg-neutral-200 text-lg font-bold"
              onClick={() => handleCardClick(index)}
            >
              <Image
                src={event.posterUrl}
                alt={event.title}
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
        {events[selectedIndex].artist && (
          <p className="text-2xl font-bold">{events[selectedIndex].artist}</p>
        )}
        <h3 className={`${events[selectedIndex].artist ? 'text-xl font-semibold' : 'text-2xl font-bold'}`}>
          {events[selectedIndex].title}
        </h3>
        <p className="text-sm text-black/80">
          {events[selectedIndex].location} — {new Date(events[selectedIndex].startAt).toLocaleDateString()}
        </p>

        <Link href={`/events/${events[selectedIndex].slug}`} className="w-full">
          <Button
            size="responsive"
            className="bg-primary-500 hover:bg-primary-600 mt-4 w-full"
          >
            <p className="font-semibold tracking-wide">
              {events[selectedIndex].status === 'Available'
                ? 'Get Ticket'
                : events[selectedIndex].status}
            </p>
          </Button>
        </Link>
      </div>
    </SectionContainer>
  );
}
