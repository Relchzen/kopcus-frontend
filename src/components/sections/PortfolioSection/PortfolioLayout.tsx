'use client';
import React, { useRef, useEffect } from 'react';
import { TransparentInversePopUpButton } from '@/components/Button';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';
import Image from 'next/image';
import Link from 'next/link';
import { useScroll } from 'motion/react';
import { motion, useTransform } from 'framer-motion';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description: string;
  images: string[];
  year: number;
  isEven?: boolean;
  layout?: string;
};

const DefaultLayout = ({
  description,
  images,
}: {
  description: string;
  images: string[];
}) => {
  return (
    <>
      <div
        id="portfolio-description"
        className="top-50 flex w-5/12 flex-col gap-8"
      >
        <p className="text-[22px] font-light">"{description}"</p>
        <Link
          className="group relative flex w-max items-center gap-4 pb-2 font-medium"
          href=""
        >
          <span className="absolute right-0 bottom-0 left-0 h-[3px] w-0 bg-black transition-all duration-300 ease-out group-hover:w-full" />

          <span className="text-[20px] font-medium">View Project</span>
          <span className="flex items-center justify-center">
            <LiaLongArrowAltRightSolid className="h-[28px] w-[28px]" />
          </span>
        </Link>
      </div>
      <div
        id="portfolio-images"
        className="flex w-full flex-col items-center gap-4 overflow-visible"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative aspect-[2/1] w-11/12 drop-shadow-md/20 ${
              index % 2 === 0 ? 'self-start' : 'self-end'
            }`}
          >
            <Image src={image} fill={true} objectFit="cover" alt={image} />
          </div>
        ))}
      </div>
    </>
  );
};

const ReverseLayout = ({
  description,
  images,
}: {
  description: string;
  images: string[];
}) => {
  return (
    <>
      <div
        id="portfolio-images"
        className="flex w-full flex-row items-start gap-4 overflow-visible"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative aspect-[5/8] w-6/12 drop-shadow-md/20 ${
              index % 2 === 0 ? 'mb-8' : 'mt-8'
            }`}
          >
            <Image src={image} fill={true} objectFit="cover" alt={image} />
          </div>
        ))}
      </div>
      <div
        id="portfolio-description"
        className="top-50 flex w-5/12 flex-col gap-8"
      >
        <p className="text-[22px] font-light">"{description}"</p>
        <Link
          className="group relative flex w-max items-center gap-4 pb-2 font-medium"
          href=""
        >
          <span className="absolute right-0 bottom-0 left-0 h-[3px] w-0 bg-black transition-all duration-300 ease-out group-hover:w-full" />

          <span className="text-[20px] font-medium">View Project</span>
          <span className="flex items-center justify-center">
            <LiaLongArrowAltRightSolid className="h-[28px] w-[28px]" />
          </span>
        </Link>
      </div>
    </>
  );
};

export const PortfolioLayout = ({
  title,
  description,
  images,
  year,
  isEven,
  layout,
  ...rest
}: Props) => {
  const bgColor = isEven ? '#F1F0F1' : '#F8F9FA';

  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [maxScroll, setMaxScroll] = React.useState(0);
  useEffect(() => {
    if (imagesRef.current) {
      // Calculate the total scrollable width
      const scrollWidth = imagesRef.current.scrollWidth;
      const clientWidth = imagesRef.current.clientWidth;
      setMaxScroll(-(scrollWidth - clientWidth));
    }
  }, [images]);

  const x = useTransform(scrollYProgress, [0, 1], [0, maxScroll]);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: bgColor,
        height: `${300}vh`, // Adjust this multiplier based on number of images
      }}
      {...rest}
    >
      <div className="sticky top-0 left-0 h-screen overflow-hidden">
        <div id="portfolio-header" className="px-8 py-8 text-black">
          <h4 className="text-[32px] font-medium">{title}</h4>
          <p className="font-neutral-600 text-[16px] font-medium">
            &#169; {year}
          </p>
        </div>
        <div
          id="portfolio-content"
          className={`z-20 flex items-center gap-8 px-12 py-6`}
          style={{
            background: `linear-gradient(to bottom, transparent 0%, ${bgColor} 20%)`,
          }}
        >
          <div
            id="portfolio-description"
            className="flex w-5/12 flex-shrink-0 flex-col gap-8"
          >
            <p className="text-[22px] font-light">"{description}"</p>
            <Link
              className="group relative flex w-max items-center gap-4 pb-2 font-medium"
              href=""
            >
              <span className="absolute right-0 bottom-0 left-0 h-[3px] w-0 bg-black transition-all duration-300 ease-out group-hover:w-full" />

              <span className="text-[20px] font-medium">View Project</span>
              <span className="flex items-center justify-center">
                <LiaLongArrowAltRightSolid className="h-[28px] w-[28px]" />
              </span>
            </Link>
          </div>
          <div className="flex-1 overflow-hidden">
            <motion.div
              ref={imagesRef}
              id="portfolio-images"
              className="flex gap-4"
              style={{ x }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[2/1] h-[400px] flex-shrink-0 drop-shadow-md/20"
                >
                  <Image
                    src={image}
                    fill={true}
                    className="rounded-lg object-cover"
                    alt={image}
                  />
                </div>
              ))}
            </motion.div>
          </div>
          {/* {layout === 'reverse' ? (
          <ReverseLayout description={description} images={images} />
        ) : (
          <DefaultLayout description={description} images={images} />
        )} */}
        </div>
      </div>
    </div>
  );
};
