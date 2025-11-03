import { Navbar } from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import EventSection from '@/components/sections/EventSection';
import ServiceSection from '@/components/sections/ServiceSection';
import PortfolioSection from '@/components/sections/PortfolioSection/PortfolioSection';
import { HorizontalScroller } from '@/components/HorizontalScroller';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import ContactSection from '@/components/sections/ContactSection';
import MobileEventSection from '@/components/sections/MobileEventSection';

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <HeroSection />
        <EventSection />
        <MobileEventSection />
        <AboutSection />
        <PortfolioSection />
        <ServiceSection />
        <TestimonialSection />
        <ContactSection />
        {/* <ServiceSection /> */}
        {/* <main className="min-h-[200dvh]">
        <HeroSection />
        <EventSection />
        <PortfolioSection />
        <ServiceSection />
        <section id="about">About</section>
        <section id="contact">Contact</section>
      </main>
      <footer>Footer</footer> */}
      </main>
    </>
  );
}

{
  /* <div className="">
          <h1>Home Page</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
          <p>Paragraph</p>
          <button>Button</button>
          </div> */
}
