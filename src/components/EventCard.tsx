import React from 'react';
import Image from 'next/image';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

type Props = {
  name: string;
  imageUrl: string;
  artist: string;
  location: string;
  date: string;

  eventUrl: string;
  index: number;
};

export const EventCard = (props: Props) => {
  const { name, imageUrl, artist, location, date, eventUrl, index } =
    props;
  const cardRef = useRef<HTMLAnchorElement>(null);

  // Track scroll progress of this card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Transform scroll progress to Y position and opacity
  // Add stagger effect based on index
  const y = useTransform(
    scrollYProgress,
    [0, 0.3 + index * 0.05, 1],
    [200, 0, 0]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3 + index * 0.05, 1],
    [0, 1, 1]
  );


  const MotionLink = motion(Link);

  return (
    <MotionLink
      ref={cardRef}
      href={eventUrl}
      className="group relative aspect-[3/4] h-min w-full cursor-pointer overflow-hidden drop-shadow-md/20"
      style={{ y, opacity }}
    >
      <Image
        fill={true}
        src={imageUrl}
        alt="Event Poster"
        className="h-full w-full scale-[1.02] object-cover transition-transform duration-300 group-hover:scale-100"
      />
      {/* Slide-up overlay */}
      <div className="absolute right-0 bottom-0 left-0 h-max translate-y-full bg-white px-4 py-4 transition-transform duration-300 ease-out group-hover:translate-y-0">
        <div className="mb-1 h-max">
          <h3 className="mb-1 text-xl/tight font-semibold text-black">
            {artist}
          </h3>
          <h4 className="text-sm font-medium text-black">{name}</h4>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col justify-end">
            <p className="text-xs text-black">{location}</p>
            <p className="text-xs text-black">{date}</p>
          </div>
        </div>
      </div>
    </MotionLink>
  );
};
