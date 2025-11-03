import React from 'react';
import { SectionContainer } from '../SectionContainer';
import { SectionHeading } from '../ui/SectionHeading';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/Button';

type Props = {};

export default function AboutSection({}: Props) {
  return (
    <SectionContainer name="about" className="section-padding pt-32">
      <div className="flex w-full flex-col-reverse gap-8 md:flex-row">
        <div
          id="about-image"
          className="relative aspect-square w-full md:w-1/2"
        >
          <Image
            src={'/profile_daniel_hermansyah.jpeg'}
            fill
            alt="about-profile"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            className="rounded-3xl"
          />
          <div></div>
        </div>
        <div
          id="about-section-content"
          className="my-auto flex w-full flex-col gap-3 md:w-1/2 md:gap-4 md:p-8 lg:gap-8"
        >
          <SectionHeading id="about-heading" sectionName="About us" />
          <h3
            id="about-subheading"
            className="text-3xl font-semibold tracking-tighter md:text-4xl lg:text-5xl"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h3>
          <p
            id="about-text"
            className="md:text-md text-sm font-light md:font-normal lg:text-lg"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mattis
            lorem malesuada nisl ultrices, vel cursus risus hendrerit. Maecenas
            lacinia nibh ac ipsum fermentum.
          </p>
          <Button href="" className="w-fit px-4" size={'responsive'}>
            <p className="font-semibold">Get to know us</p>
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
