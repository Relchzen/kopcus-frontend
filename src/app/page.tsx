import ContactSection from '@/components/sections/ContactSection';
import { PayloadPageLayout } from '@/components/payload/PayloadPageLayout';
import { Hero } from '@/components/payload/hero';
import { Metadata } from 'next';
import { getHomePage } from '@/lib/payload';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URLS

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
  const data = await getHomePage()

  return (
    <>
      <main className='pt-12'>
        {data.hero && <Hero hero={data.hero} />}
        {data.layout && <PayloadPageLayout blocks={data.layout} />}
        <ContactSection />
      </main>
    </>
  );
}
