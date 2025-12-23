import HeroSection from '@/components/sections/HeroSection';
import EventSection from '@/components/sections/EventSection';
import ServiceSection from '@/components/sections/ServiceSection';
import PortfolioSection from '@/components/sections/PortfolioSection/PortfolioSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import MobileEventSection from '@/components/sections/MobileEventSection';

import { fetchStrapi } from '@/lib/strapi';
import { fetchEvents } from '@/lib/events';
import { Metadata } from 'next';

async function getHomeData() {
  return fetchStrapi('/api/homepage?pLevel=5', { next: { revalidate: 3600 } });
}

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getHomeData();
  const { seo } = data;

  if (!seo) {
      return {};
  }

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    robots: {
      index: seo.metaRobots?.includes('index'),
      follow: seo.metaRobots?.includes('follow'),
    },
    alternates: {
      canonical: seo.canonicalURL,
    },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: seo.canonicalURL,
      siteName: 'Kopi Chuseyo',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: seo.structuredData?.logo || '/logo.png',
          width: 1200,
          height: 630,
          alt: seo.metaTitle,
        }
      ]
    },
    icons: {
      icon: '/logo.png',
      shortcut: '/logo.png',
      apple: '/logo.png',
    },
  };
}

export default async function Home() {
  const [data, events] = await Promise.all([
    getHomeData(),
    fetchEvents()
  ]);

  const {
    HeroSection: heroData,
    AboutSection: aboutData,
    PortfolioSection: portfolioData,
    ServiceSection: serviceData,
    seo
  } = data.data;

  return (
    <>
      {seo?.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.structuredData) }}
        />
      )}
      <main className='pt-12'>
        <HeroSection data={heroData} />
        <EventSection events={events} />
        <MobileEventSection events={events} />
        <AboutSection data={aboutData} />
        <PortfolioSection data={portfolioData} />
        <ServiceSection data={serviceData} />
        {/* <TestimonialSection /> */}
        <ContactSection />
      </main>
    </>
  );
}
