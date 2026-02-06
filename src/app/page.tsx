import HeroSection from '@/components/sections/HeroSection';
import EventSection from '@/components/sections/EventSection';
import ServiceSection from '@/components/sections/ServiceSection';
import PortfolioSection from '@/components/sections/PortfolioSection/PortfolioSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import MobileEventSection from '@/components/sections/MobileEventSection';
import { Hero } from '@/components/payload/hero';
import { PayloadPageLayout } from '@/components/payload/PayloadPageLayout';

import { fetchStrapi } from '@/lib/strapi';
import { fetchEvents } from '@/lib/events';
import { Metadata } from 'next';
import { getHomePage } from '@/lib/payload';
const CMS_URL = process.env.NEXT_PUBLIC_CMS_URLS

async function getHomeData() {
  return fetchStrapi('/api/homepage?pLevel=5', { next: { revalidate: 3600 } });
}


export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePage();

  if (!data) {
      return {};
  }

  return {
    title: data.meta?.title || data.title,
    description: data.meta?.description,
    openGraph: {
      title: data.meta?.title || data.title,
      description: data.meta?.description,
      images: `${CMS_URL}${data.meta?.image?.sizes?.small?.url}`,
      type: 'article',
      publishedTime: data.publishedAt,
    },
  };
}

export default async function Home() {
  // const [data, events] = await Promise.all([
  //   getHomeData(),
  //   fetchEvents()
  // ]);

  // const {
  //   HeroSection: heroData,
  //   AboutSection: aboutData,
  //   PortfolioSection: portfolioData,
  //   ServiceSection: serviceData,
  //   seo
  // } = data.data;
  
  const data = await getHomePage()
  const events = await fetchEvents()
  console.log("home page data", data)

  return (
    <>
      <main className='pt-12'>
        <Hero hero={data.hero} />
        <EventSection events={events} />
        <MobileEventSection events={events} />
        {data.layout && <PayloadPageLayout blocks={data.layout} />}

        {/* <HeroSection data={heroData} />
        <EventSection events={events} />
        <MobileEventSection events={events} />
        <AboutSection data={aboutData} />
        <PortfolioSection data={portfolioData} />
        <ServiceSection data={serviceData} /> */}
        {/* <TestimonialSection /> */}
        <ContactSection />
      </main>
    </>
  );
}
