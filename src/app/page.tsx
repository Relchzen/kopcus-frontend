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
import { PortfolioData, PortfolioPost } from '@/types/portfolio';

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

  const heroData = Object.fromEntries(
    Object.entries(acf).filter(([key]) => key.startsWith('hero_'))
  );
  const aboutData = Object.fromEntries(
    Object.entries(acf).filter(([key]) => key.startsWith('about_'))
  );
  // Extract portfolio section ACF from page
  const portfolioSectionData = Object.fromEntries(
    Object.entries(acf).filter(([key]) => key.startsWith('portfolio_'))
  );

  // Get portfolio post IDs
  const portfolioIds = acf.portfolio_featured.map((post: any) => post.ID);

  // Fetch all portfolio posts with their ACF data
  const portfolioPostsWithACF: PortfolioPost[] = await Promise.all(
    portfolioIds.map(async (postId: number): Promise<PortfolioPost> => {
      const response = await fetch(
        `https://kopichuseyo.com/wp-json/wp/v2/posts/${postId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch post ${postId}`);
      }
      return await response.json();
    })
  );

  // Combine everything for the Portfolio Section component
  const portfolioData: PortfolioData = {
    ...portfolioSectionData,
    portfolio_featured: portfolioPostsWithACF,
  } as PortfolioData;

  console.log('Complete portfolio data:', portfolioData);

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
        <PortfolioSection data={portfolioData} />
        <ServiceSection />
        <TestimonialSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
