import { Navbar } from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import EventSection from '@/components/sections/EventSection';
import ServiceSection from '@/components/sections/ServiceSection';
import PortfolioSection from '@/components/sections/PortfolioSection/PortfolioSection';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import ContactSection from '@/components/sections/ContactSection';
import MobileEventSection from '@/components/sections/MobileEventSection';
import { Footer } from '@/components/Footer';

async function getHomeData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API_URL}/pages?slug=homepage`,
    {
      next: { revalidate: 60 }, // revalidate every minute
    }
  );
  if (!res.ok) throw new Error('Failed to fetch WordPress data');

  const page = await res.json();
  return page[0]?.acf ?? {};
}

export default async function Home() {
  const acf = await getHomeData();

  console.log(acf);

  const heroData = Object.fromEntries(
    Object.entries(acf).filter(([key]) => key.startsWith('hero_'))
  );
  const aboutData = Object.fromEntries(
    Object.entries(acf).filter(([key]) => key.startsWith('about_'))
  );

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <HeroSection data={heroData} />
        <EventSection />
        <MobileEventSection />
        <AboutSection data={aboutData} />
        <PortfolioSection />
        <ServiceSection />
        <TestimonialSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
