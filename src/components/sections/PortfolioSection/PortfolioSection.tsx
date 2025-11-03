import React from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
type Props = {};

const portfolioItems = [
  {
    title: 'ASC2NT First Fansign',
    description:
      'Combining live interaction and digital engagement to bring fans and artists closer.',
    images: ['/asc2nt-performance.jpg', '/asc2nt-with-fans.jpg'],
    year: 2025,
    layout: 'default',
    client: 'ASC2NT',
  },
  {
    title: 'ASC2NT First Fansign',
    description:
      'Combining live interaction and digital engagement to bring fans and artists closer.',
    images: ['/asc2nt-performance.jpg', '/asc2nt-with-fans.jpg'],
    year: 2025,
    layout: 'default',
    client: 'ASC2NT',
  },
  {
    title: 'Wynn Esavya First Fansign',
    description:
      'Combining live interaction and digital engagement to bring fans and artists closer.',
    images: ['/wynn-performance.png', '/wynn-with-fans.png'],
    year: 2025,
    layout: 'reverse',
    client: 'Esavya',
  },
];

// Text styling
const cardTitleStyles = 'text-lg md:text-2xl lg:text-4xl font-semibold';
const cardClientStyles = 'text-sm md:text-lg lg:text-2xl font-medium';
// Underline animation
const underlineAnimation =
  'relative after:absolute after:bottom-[-8px] after:left-0 after:h-[2px] after:w-full after:bg-black after:origin-right after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:origin-left group-hover:after:scale-x-100';

export default function PortfolioSection({}: Props) {
  return (
    <SectionContainer name="portfolio" className="section-margin mt-16 pt-8">
      <div
        id="portfolio-section-header"
        className="flex flex-col justify-between md:mb-4 md:flex-row md:items-end lg:mb-8"
      >
        <div className="md:max-w-1/3">
          <SectionHeading sectionName="Portfolio" id="portfolio-heading" />
          <h3
            id="portfolio-subheading"
            className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-7xl"
          >
            Our works
          </h3>
        </div>
        <div className="md:max-w-1/3">
          <p
            id="portfolio-text"
            className="text-sm font-light md:text-lg md:font-normal lg:text-2xl"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            elementum feugiat aliquam.
          </p>
        </div>
      </div>
      <div id="portfolio-section-content" className="gap-8 py-8 md:columns-2">
        {portfolioItems.map((item, index) => (
          <Link
            href={''}
            key={index}
            className="event-card group flex cursor-pointer break-inside-avoid flex-col gap-2 pb-4 md:pb-6 lg:pb-8"
          >
            <div className="mb-2 overflow-hidden rounded-3xl">
              <img
                src={item.images[0]}
                className="w-full transition-transform duration-300 group-hover:scale-101"
              />
            </div>
            <div>
              <div className="mb-2 flex w-full items-center justify-between gap-8 text-end align-baseline text-neutral-800">
                <h4 className={`${cardClientStyles}`}>{item.client}</h4>
                <p className={`${cardClientStyles}`}>{item.year}</p>
              </div>
              <div className="relative w-fit max-w-full overflow-hidden pb-8">
                <h5 className={`${cardTitleStyles} ${underlineAnimation}`}>
                  {item.title}
                </h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div id="section-footer" className="flex justify-center">
        <Button size={'none'} variant={'ghost'} href="">
          <p className="text-xl font-medium">View all projects</p>
        </Button>
      </div>
    </SectionContainer>
  );
}
