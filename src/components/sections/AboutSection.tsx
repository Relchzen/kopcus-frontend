import React from 'react';
import { SectionContainer } from '../SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/Button';

interface AboutProps {
  data?: {
    about_headline?: string;
    about_subheadline?: string;
    about_text?: string;
    about_image?: string;
  };
}

export default function AboutSection({ data }: AboutProps) {
  if (!data) return null;

  return (
    <SectionContainer name="about" className="section-padding pt-32">
      <div className="flex w-full flex-col-reverse gap-8 md:flex-row">
        <div
          id="about-image"
          className="relative aspect-square w-full md:w-1/2"
        >
          <Image
            src={`${data.about_image}`}
            fill
            alt="about-profile"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            className="rounded-3xl"
          />
        </div>
        <div
          id="about-section-content"
          className="my-auto flex w-full flex-col gap-3 p-2 md:w-1/2 md:gap-4 md:p-8 lg:gap-8"
        >
          <SectionHeading id="about-heading" sectionName="About us" />
          <h3
            id="about-subheading"
            className="text-3xl font-semibold tracking-tighter md:text-4xl lg:text-5xl"
          >
            {data.about_headline}
          </h3>
          <p
            id="about-text"
            className="md:text-md text-sm font-light md:font-normal lg:text-lg"
          >
            {data.about_text}
          </p>
          <Button href="" className="w-fit px-4" size={'responsive'}>
            <p className="font-semibold">Get to know us</p>
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
