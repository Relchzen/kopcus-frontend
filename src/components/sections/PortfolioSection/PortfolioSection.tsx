import React from 'react';
import Link from 'next/link';
import { SectionHeader } from '@/components/SectionHeader';
import { SectionContainer } from '@/components/SectionContainer';
import { PortfolioLayout } from './PortfolioLayout';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';
import Layout from '../../../../.next/types/routes';

type Props = {};

const portfolioItems = [
  {
    title: 'ASC2NT First Fansign',
    description:
      'Combining live interaction and digital engagement to bring fans and artists closer.',
    images: ['/asc2nt-performance.jpg', '/asc2nt-with-fans.jpg'],
    year: 2025,
    layout: 'default',
  },
  {
    title: 'Wynn Esavya First Fansign',
    description:
      'Combining live interaction and digital engagement to bring fans and artists closer.',
    images: ['/wynn-performance.png', '/wynn-with-fans.png'],
    year: 2025,
    layout: 'reverse',
  },
  {
    title: 'ASC2NT First Fansign',
    description:
      'Combining live interaction and digital engagement to bring fans and artists closer.',
    images: ['/asc2nt-performance.jpg', '/asc2nt-with-fans.jpg'],
    year: 2025,
    layout: 'default',
  },
];

function portfolioRenderer(): React.ReactNode {
  return portfolioItems.map((item, index) => (
    <PortfolioLayout
      key={index}
      title={item.title}
      description={item.description}
      images={item.images}
      year={item.year}
      isEven={(index + 1) % 2 === 0}
      layout={item.layout}
    />
  ));
}

export default function PortfolioSection({}: Props) {
  return (
    <SectionContainer name="portfolio">
      <SectionHeader
        sectionName="Our Works"
        firstHeadline="You deserve a stage."
        secondHeadline="We build it."
      />
      <div id="section-content" className="relative z-20 overflow-y-visible">
        {portfolioRenderer()}
        <div
          className="flex h-[200px] items-center justify-center bg-white"
          // style={{
          //   background: `linear-gradient(to bottom, var(--color-white) 0%, var(--color-primary-500) 100%)`,
          // }}
        >
          <Link href={''} className="flex gap-4">
            <span className="text-neutral-850 text-[40px] font-semibold">
              View More
            </span>
            <span className="flex items-center justify-center">
              <LiaLongArrowAltRightSolid className="text-neutral-850 h-[48px] w-[48px]" />
            </span>
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}
