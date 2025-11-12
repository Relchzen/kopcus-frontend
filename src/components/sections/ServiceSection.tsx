'use client';
import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionContainer } from '../SectionContainer';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SwipeableImageStack } from '@/components/SwipableImageStack';
import { PiArrowDownLight, PiArrowRightLight } from 'react-icons/pi';
import { Button } from '../ui/Button';

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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
      className="section-padding relative gap-8 py-18 text-black md:flex"
    >
      <div
        id="service-section-header"
        className="top-0 mb-8 flex flex-col gap-4 self-start px-2 md:sticky md:w-2/5 md:px-0"
      >
        <SectionHeading sectionName="Services" id="service-heading" />
        <h3
          id="service-subheading"
          className="text-lg font-semibold tracking-tighter md:text-2xl lg:text-4xl"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </h3>
        <p id="service-text" className="text-ms md:text-md lg:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue
          non nunc nec dapibus. Suspendisse bibendum urna a nibh iaculis, at
          eleifend metus finibus.
        </p>
        <div className="service-buttons hidden gap-6 md:flex">
          <Button size={'responsive-sm'}>
            <p className="font-medium">Call Button</p>
          </Button>
          <Button variant={'outline'} size={'responsive-sm'}>
            <p className="font-medium">More details</p>
          </Button>
        </div>
      </div>
      <div className="md:flex-3" id="service-details-container">
        {services.map((service, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`mb-4 overflow-hidden rounded-2xl transition-all duration-300 ${
                isOpen ? 'bg-white' : 'bg-white'
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className={`flex w-full items-center justify-between p-2 text-left transition-colors hover:cursor-pointer md:p-3 lg:p-4 ${
                  isOpen ? 'hover:bg-white' : 'hover:bg-neutral-200'
                }`}
              >
                <h4 className="text-lg font-medium md:text-xl lg:text-2xl">
                  {service.name}
                </h4>
                <div className="p-4">
                  <PiArrowDownLight
                    className={`h-6 w-6 text-black transition-transform duration-300 md:h-8 md:w-8 lg:h-10 lg:w-10 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Accordion Content */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-6">
                    {/* Description */}
                    <p className="md:text-md mb-6 text-xs leading-relaxed text-neutral-700">
                      {service.description}
                    </p>

                    {/* Images Grid */}
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {service.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="overflow-hidden rounded-lg"
                        >
                          <img
                            src={image}
                            alt={`${service.name} ${imgIndex + 1}`}
                            className="h-full w-full object-cover duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="service-buttons flex justify-center gap-6 md:hidden">
        <Button size={'sm'}>
          <p className="font-medium">Call Button</p>
        </Button>
        <Button variant={'outline'} size={'sm'}>
          <p className="font-medium">More details</p>
        </Button>
      </div>
    </SectionContainer>
  );
}

{
  /* <div
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
        </div> */
}
{
  /* <div id="service-details" className="mr-8 flex w-1/2 flex-col">
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
        </div> */
}
