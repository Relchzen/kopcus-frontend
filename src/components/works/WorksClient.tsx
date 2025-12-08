'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '@/components/ui/Button';
import { Work } from '@/lib/works';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface WorksClientProps {
  works: Work[];
}

export function WorksClient({ works }: WorksClientProps) {
  const featuredWork = works[0];
  const remainingWorks = works.slice(1);

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Simple Hero Section */}
      <SectionContainer name="works-hero" className="pt-32 pb-16 md:pt-48 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="mb-6">
              <Breadcrumb items={[{ label: 'Works' }]} />
            </div>
            <h1 className="font-display text-6xl font-bold uppercase leading-tight md:text-8xl lg:text-9xl">
              Our Works.
            </h1>
            <p className="mt-6 max-w-xl text-xl text-neutral-500 md:text-2xl">
              A curated collection of our most impactful projects. We blend creativity with strategy to build brands that matter.
            </p>
            <div className="mt-8">
              <Button href="/contact" size="lg" className="bg-neutral-900 text-white hover:bg-neutral-800">
                Start a Project
              </Button>
            </div>
          </motion.div>
        </div>
      </SectionContainer>

      {/* Featured Work Section */}
      {featuredWork && (
        <SectionContainer name="featured-work" className="pb-24">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="font-display text-2xl font-bold uppercase md:text-3xl">Featured Project</h2>
            </div>
            <Link href={`/works/${featuredWork.slug}`} className="group block">
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-neutral-100">
                <Image
                  src={featuredWork.coverImage || '/placeholder-work.jpg'}
                  alt={featuredWork.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />

                <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white w-full">
                  <div className="mb-2 md:mb-4 flex items-center gap-3 md:gap-4">
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs md:text-sm font-medium backdrop-blur-md">
                      {featuredWork.service}
                    </span>
                    <span className="text-xs md:text-sm font-medium opacity-80">{featuredWork.year}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase md:text-6xl lg:text-7xl leading-tight">
                    {featuredWork.title}
                  </h3>
                  <p className="mt-2 md:mt-4 max-w-2xl text-sm md:text-xl opacity-90 line-clamp-2">
                    {featuredWork.description}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </SectionContainer>
      )}

      {/* Remaining Works Grid */}
      {remainingWorks.length > 0 && (
        <SectionContainer name="works-grid" className="pb-32">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-12 flex items-end justify-between">
              <h2 className="font-display text-2xl font-bold uppercase md:text-3xl">More Projects</h2>
              <div className="text-neutral-500 font-medium">{remainingWorks.length} Projects</div>
            </div>

            <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {remainingWorks.map((work) => (
                <Link
                  key={work.id}
                  href={`/works/${work.slug}`}
                  className="group cursor-pointer block"
                >
                  <div className="relative mb-6 overflow-hidden rounded-2xl bg-neutral-100">
                    <div className="aspect-[4/5] w-full">
                      <Image
                        src={work.coverImage || '/placeholder-work.jpg'}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary-600 uppercase tracking-wider">
                        {work.service}
                      </span>
                      <span className="text-sm text-neutral-400">{work.year}</span>
                    </div>

                    <div className="relative w-fit max-w-full overflow-hidden pb-1">
                      <h3 className="font-display text-2xl font-bold uppercase leading-tight text-neutral-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-neutral-900 after:origin-right after:scale-x-0 after:transition-transform after:duration-600 group-hover:after:origin-left group-hover:after:scale-x-100">
                        {work.title}
                      </h3>
                    </div>

                    <p className="text-neutral-500">{work.client}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </SectionContainer>
      )}
    </main>
  );
}
