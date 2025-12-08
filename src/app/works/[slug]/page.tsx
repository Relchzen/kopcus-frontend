import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/BlockRenderer';
import { Footer } from '@/components/Footer';
import { fetchStrapiWork } from '@/lib/works';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = await fetchStrapiWork(slug);

  if (!work?.seo) {
    return {
      title: 'Work Not Found',
    };
  }

  const { seo } = work;

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
      // images: seo.metaImage?.url ? [seo.metaImage.url] : undefined,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = await fetchStrapiWork(slug);

  if (!work) {
    notFound();
  }

  // coverImage is already a full URL or relative path from the mapper
  const coverImageUrl = work.coverImage.startsWith('http')
      ? work.coverImage
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${work.coverImage}`;

  return (
    <>
      {work?.seo?.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(work.seo.structuredData),
          }}
        />
      )}
      <main className="min-h-screen bg-white pb-20 text-neutral-900">
        {/* Hero Section */}
        <section className="w-full bg-neutral-900 text-white md:relative">
          {/* Banner Image */}
          <div className="relative w-full">
            {coverImageUrl ? (
              <Image
                src={coverImageUrl}
                alt={`${work.title} Cover`}
                width={1920}
                height={1080}
                className="h-auto w-full object-cover"
                priority
              />
            ) : (
              <div className="h-[60vh] w-full bg-neutral-800 md:h-[85vh]" />
            )}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="container section-padding relative z-20 flex flex-col items-start pb-12 pt-8 md:absolute md:inset-0 md:justify-end md:pb-12 md:pt-0">
            <div className="mb-8">
                <Link href="/works">
                    <Button variant="outline" size="sm" className="gap-2 border-white/20 bg-black/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm">
                        <FaArrowLeft className="h-4 w-4" />
                        Back to Works
                    </Button>
                </Link>
            </div>
            
            <h1 className="font-display text-5xl font-bold uppercase tracking-wider md:text-7xl lg:text-8xl">
              {work.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-light text-neutral-200 md:text-xl">
              {work.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-8 text-sm font-medium uppercase tracking-widest text-primary-400">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-neutral-400">Client</span>
                <span>{work.client}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-neutral-400">Year</span>
                <span>{work.year}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="container section-padding py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
            {/* Main Content */}
            <div className="prose prose-lg prose-neutral max-w-none">
              <BlockRenderer content={work.content} />
            </div>

            {/* Sidebar (Project Info) */}
            <div className="space-y-8">
              <div className="rounded-2xl bg-neutral-50 p-8 sticky top-24">
                <h3 className="font-display text-2xl font-bold uppercase text-neutral-900">
                  Project Info
                </h3>
                <ul className="mt-6 space-y-6 text-neutral-600">
                  <li className="flex flex-col gap-1">
                    <span className="font-bold text-neutral-900 uppercase text-xs tracking-wider">Client</span>
                    <span className="text-lg">{work.client}</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <span className="font-bold text-neutral-900 uppercase text-xs tracking-wider">Year</span>
                    <span className="text-lg">{work.year}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
