'use client';
import React from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionContainer } from '../SectionContainer';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SwipeableImageStack } from '@/components/SwipableImageStack';
import { PiArrowUpRightLight } from 'react-icons/pi';

type Props = {};

export default function ServiceSection({}: Props) {
  const services = [
    {
      name: 'Event Organizer',
      images: [
        '/event-organizer.jpg',
        '/h2h_debut_photo.jpeg',
        '/h2h_group_selfie.jpg',
        '/h2h_style_photo.jpg',
      ],
      description:
        'We bring K-Pop–inspired experiences to life. From fan meetings and fan sign events to concerts and brand activations, every event is designed to connect people, celebrate culture, and strengthen your brand through unforgettable moments.',
    },
    {
      name: 'Influencer Promotion',
      images: [
        '/event-organizer.jpg',
        '/h2h_debut_photo.jpeg',
        '/h2h_group_selfie.jpg',
        '/h2h_style_photo.jpg',
      ],
      description:
        'We believe in the power of connection. By collaborating with influencers who share your brand’s energy and values, we create authentic stories that spark engagement and build genuine relationships with your audience.',
    },
    {
      name: 'Media Promotion',
      images: [
        '/event-organizer.jpg',
        '/h2h_debut_photo.jpeg',
        '/h2h_group_selfie.jpg',
        '/h2h_style_photo.jpg',
      ],
      description:
        'Your story deserves to be seen and heard. Through strategic media placements and trusted partnerships, we help your brand gain meaningful exposure — reaching the right audience and leaving a lasting impression.',
    },
    {
      name: 'Digital Marketing',
      images: [
        '/event-organizer.jpg',
        '/h2h_debut_photo.jpeg',
        '/h2h_group_selfie.jpg',
        '/h2h_style_photo.jpg',
      ],
      description:
        'We combine creativity and strategy to help your brand grow in the digital space. From social media management to content marketing and SEO, we build campaigns that not only reach people but truly resonate with them.',
    },
  ];

  const [selectedService, setSelectedService] = React.useState(services[0]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [direction, setDirection] = useState(0);

  const handleServiceHover = (service: (typeof services)[0], index: number) => {
    const newDirection = index > selectedIndex ? 1 : -1;
    console.log(
      'Current:',
      selectedIndex,
      'New:',
      index,
      'Direction:',
      newDirection
    );
    setDirection(newDirection);
    setSelectedIndex(index);
    setSelectedService(service);
  };

  const variants = {
    enter: (dir: number) => {
      console.log('Enter with direction:', dir);
      return {
        x: dir > 0 ? 100 : -100,
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => {
      console.log('Exit with direction:', dir);
      return {
        x: dir > 0 ? -100 : 100,
        opacity: 0,
      };
    },
  };

  return (
    <SectionContainer
      name="services"
      className="bg-primary-500 gap-4 pt-18 text-white"
    >
      <SectionHeader
        sectionName="Our Services"
        firstHeadline="Where passion"
        secondHeadline="meets promotion."
        secondHeadlineColor="text-white"
      />
      <div
        id="section-content"
        className="bg-primary-500 relative z-20 flex min-h-screen justify-between gap-16 overflow-hidden px-4 pt-8 pb-16"
      >
        <div id="service-selections" className="w-1/2">
          <div className="flex flex-col pb-8">
            {services.map((service, index) => (
              <div
                key={index}
                onMouseEnter={() => handleServiceHover(service, index)}
                className={`border-primary-400 hover:bg-primary-600 ${selectedIndex === index ? 'bg-primary-600 px-6' : ''} flex items-center justify-between border-b-1 py-12 transition-all duration-300 ease-in-out hover:cursor-pointer hover:px-6`}
              >
                <h4 className="font-regular text-[36px]">{service.name}</h4>
                <PiArrowUpRightLight className="h-12 w-12 shrink-0 text-white" />
              </div>
            ))}
          </div>
        </div>
        <div id="service-details" className="mr-8 flex w-1/2 flex-col">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={selectedService.name}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="bg-primary-100 relative flex h-full w-full flex-col items-center rounded-[32px] p-6"
            >
              <SwipeableImageStack images={selectedService.images} />
              <p className="mt-4 text-justify text-[18px] text-black">
                {selectedService.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionContainer>
  );
}
