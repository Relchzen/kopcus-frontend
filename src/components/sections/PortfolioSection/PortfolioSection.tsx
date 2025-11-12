import React from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PortfolioData } from '../../../types/portfolio';
import Image from 'next/image';

// const portfolioItems = [
//   {
//     title: 'ASC2NT First Fansign',
//     description:
//       'Combining live interaction and digital engagement to bring fans and artists closer.',
//     images: ['/asc2nt-performance.jpg', '/asc2nt-with-fans.jpg'],
//     year: 2025,
//     layout: 'default',
//     client: 'ASC2NT',
//   },
//   {
//     title: 'ASC2NT First Fansign',
//     description:
//       'Combining live interaction and digital engagement to bring fans and artists closer.',
//     images: ['/asc2nt-performance.jpg', '/asc2nt-with-fans.jpg'],
//     year: 2025,
//     layout: 'default',
//     client: 'ASC2NT',
//   },
//   {
//     title: 'Wynn Esavya First Fansign',
//     description:
//       'Combining live interaction and digital engagement to bring fans and artists closer.',
//     images: ['/wynn-performance.png', '/wynn-with-fans.png'],
//     year: 2025,
//     layout: 'reverse',
//     client: 'Esavya',
//   },
// ];

type PortfolioProps = {
  data: PortfolioData;
};

// Text styling
const cardTitleStyles = 'text-md md:text-lg lg:text-2xl font-semibold';
const cardClientStyles = 'text-sm md:text-md lg:text-lg font-medium';
// Underline animation
const underlineAnimation =
  'relative after:absolute after:bottom-[-8px] after:left-0 after:h-[2px] after:w-full after:bg-black after:origin-right after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:origin-left group-hover:after:scale-x-100';

export default function PortfolioSection({ data }: PortfolioProps) {
  const {
    portfolio_heading,
    portfolio_headline,
    portfolio_text,
    portfolio_featured,
  } = data;

  return (
    <SectionContainer name="portfolio" className="section-margin mt-16 pt-8">
      <div
        id="portfolio-section-header"
        className="flex flex-col justify-between px-2 md:mb-4 md:flex-row md:items-end md:px-0 lg:mb-8"
      >
        <div className="md:max-w-1/3">
          <SectionHeading
            sectionName={portfolio_heading}
            id="portfolio-heading"
          />
          <h3
            id="portfolio-subheading"
            className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-7xl"
          >
            {portfolio_headline}
          </h3>
        </div>
        <div className="md:max-w-1/3">
          <p
            id="portfolio-text"
            className="text-sm font-light md:text-lg md:font-normal lg:text-2xl"
          >
            {portfolio_text}
          </p>
        </div>
      </div>
      <div id="portfolio-section-content" className="gap-8 py-8 md:columns-2">
        {portfolio_featured.map((item, index) => (
          <Link
            href={''}
            key={index}
            className="event-card group flex cursor-pointer break-inside-avoid flex-col gap-2 pb-4 md:pb-6 lg:pb-8"
          >
            <div className="relative mb-2 w-full overflow-hidden rounded-3xl">
              <div className="relative flex max-h-[640px] w-full items-center justify-center">
                <Image
                  src={item.acf.portfolio_image.url}
                  alt={item.acf.portfolio_image.alt || 'Portfolio image'}
                  width={800}
                  height={640}
                  className="h-auto w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    maxHeight: '640px',
                  }}
                  priority
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex w-full items-center justify-between gap-8 text-end align-baseline text-neutral-800">
                <h4 className={cardClientStyles}>
                  {item.acf.portfolio_artist_brand}
                </h4>
                <p className={cardClientStyles}>{item.acf.portfolio_year}</p>
              </div>
              <div className="relative w-fit max-w-full overflow-hidden pb-8">
                <h5 className={`${cardTitleStyles} ${underlineAnimation}`}>
                  {item.acf.portfolio_title}
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
