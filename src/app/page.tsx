import Image from 'next/image';
import Link from 'next/link';
import {
  InversePopUpButton,
  PopUpButton,
  TransparentInversePopUpButton,
} from '@/components/Button';

import { Navbar } from '@/components/Navbar';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';
import EventSection from '@/components/sections/EventSection';
import ServiceSection from '@/components/sections/ServiceSection';
import PortfolioSection from '@/components/sections/PortfolioSection/PortfolioSection';
import { HorizontalScroller } from '@/components/HorizontalScroller';

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="min-h-[200dvh]">
        <section id="hero" className="min-h-dvh px-12 pb-4">
          <div id="text-hero-section" className="mt-16 max-w-1/2">
            <h1 className={`mb-2 text-[88px]/[88px] text-[#212529]`}>
              YOUR MARKETING SOLUTION FOR <span>K-POP</span> IN INDONESIA
            </h1>
            <p className="text-5/6 text-primary-900 mb-6 font-normal">
              A 360° digital marketing agency connecting K-Pop artists and
              Korean companies with Indonesian fans through creativity,
              strategy, and culture.
            </p>
            <div className="flex gap-8">
              <PopUpButton href="#contact">
                <span className="text-5 font-medium">Get in touch</span>
                <span className="flex items-center justify-center">
                  <LiaLongArrowAltRightSolid className="h-[28px] w-[28px]" />
                </span>
              </PopUpButton>

              <TransparentInversePopUpButton href="#portofolio">
                <span className="text-5 font-medium">Our works</span>
                <span className="flex items-center justify-center">
                  <LiaLongArrowAltRightSolid className="h-[28px] w-[28px]" />
                </span>
              </TransparentInversePopUpButton>
            </div>
          </div>
          <div id="image-hero-section"></div>
        </section>
        <EventSection />
        <PortfolioSection />
        <ServiceSection />
        <section id="about">About</section>
        <section id="contact">Contact</section>
        {/* <div className="">
          <h1>Home Page</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
          <p>Paragraph</p>
          <button>Button</button>
          </div> */}
      </main>
      <footer>Footer</footer>
    </>
  );
}
