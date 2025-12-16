import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

import { getEventBySlug, fetchStrapiEvent } from '@/lib/events';
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/BlockRenderer';
import { Footer } from '@/components/Footer';

import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const strapiEvent = await fetchStrapiEvent(slug);

  if (!strapiEvent?.seo) {
    return {
      title: 'Event Not Found',
    };
  }

  const { seo } = strapiEvent;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    robots: seo.metaRobots,
    alternates: {
      canonical: seo.canonicalURL,
    },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      // images: seo.metaImage?.url ? [seo.metaImage.url] : undefined, // metaImage is optional and might be missing in sample
    },
    // structuredData is handled via script tag usually, but Next.js doesn't support it directly in Metadata object for JSON-LD
    // We can inject it in the page component if needed, but user asked to generate metadata based on structure.
    // For JSON-LD, it's better to put it in the Page component.
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const event = await getEventBySlug(slug);
  const strapiEvent = await fetchStrapiEvent(slug);

  if (!event) {
    notFound();
  }

  // Use Strapi content if available, otherwise fallback to event.content (which might be HTML string)
  const content = strapiEvent?.event_content || event.content;


  return (
    <>
      {strapiEvent?.seo?.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(strapiEvent.seo.structuredData),
          }}
        />
      )}
      <main className="min-h-screen bg-white pb-20 text-neutral-900">
      {/* Hero Section */}
      <section className="w-full bg-neutral-900 text-white md:relative">
        {/* Banner Image (Natural Height) */}
        <div className="relative w-full">
          <Image
            src={event.bannerUrl || '/riize-banner.png'}
            alt={`${event.title} Banner`}
            width={1920}
            height={1080}
            className="h-auto w-full object-contain"
            priority
          />
          {/* Desktop Overlay (Only visible on md+) */}
          <div className="hidden md:absolute md:inset-0 md:block md:bg-black/40" />
          <div className="hidden md:absolute md:inset-0 md:block md:bg-gradient-to-t md:from-neutral-900 md:via-transparent md:to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="container section-padding relative z-10 flex flex-col items-center pb-12 pt-8 md:absolute md:inset-0 md:flex-row md:items-end md:justify-start md:gap-12 md:pb-12 md:pt-0">
          {/* Poster */}
          <div className="relative aspect-[3/4] w-48 shrink-0 overflow-hidden rounded-xl shadow-2xl md:w-64 lg:w-80">
            <Image
              src={event.posterUrl || '/PlayWithPagaehun.jpg'}
              alt={`${event.title} Poster`}
              fill
              className="object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="mt-8 flex flex-col items-center text-center md:mt-0 md:items-start md:text-left">
            <h1 className="font-display text-5xl font-bold uppercase tracking-wider md:text-7xl lg:text-8xl">
              {event.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-light text-neutral-200 md:text-xl">
              {event.description}
            </p>
            
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm font-medium uppercase tracking-widest text-primary-400 md:justify-start">
              <span>{new Date(event.startAt).toLocaleDateString()}</span>
              <span className="hidden md:inline">•</span>
              <span>{event.location}</span>
            </div>

            <div className="mt-8">
              <Button size="lg" className="px-8 text-lg">
                Buy Tickets - {event.price}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container section-padding py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          {/* Main Content */}
          <div className="prose prose-lg prose-neutral max-w-none">
            {/* If content is array (Strapi dynamic zone), use BlockRenderer. If string (HTML), use dangerouslySetInnerHTML */}
            {Array.isArray(content) ? (
              <BlockRenderer content={content} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: content as string }} />
            )}
          </div>

          {/* Sidebar (Optional Details) */}
          <div className="space-y-8">
            <div className="rounded-2xl bg-neutral-50 p-8">
              <h3 className="font-display text-2xl font-bold uppercase text-neutral-900">
                Event Details
              </h3>
              <ul className="mt-6 space-y-4 text-neutral-600">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-neutral-900">Date:</span>
                  <span>{new Date(event.startAt).toLocaleDateString()}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-neutral-900">Time:</span>
                  <span>{new Date(event.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-neutral-900">Location:</span>
                  <span>{event.location}</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button className="w-full">Get Directions</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
