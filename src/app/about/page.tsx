import React from 'react';
import { Footer } from '@/components/Footer';
import AboutHero from '@/components/sections/about/AboutHero';
import OurOrigins from '@/components/sections/about/OurOrigins';
import ThePivot from '@/components/sections/about/ThePivot';
import AboutServices from '@/components/sections/about/AboutServices';
import OurAdvantage from '@/components/sections/about/OurAdvantage';
import Leadership from '@/components/sections/about/Leadership';
import TrackRecord from '@/components/sections/about/TrackRecord';
import TheFuture from '@/components/sections/about/TheFuture';
import AboutCTA from '@/components/sections/about/AboutCTA';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: "From a K-Pop café to a digital agency. Learn about Kopi Chuseyo's journey, our K-Pop culture roots, and our vision for the future of community-driven marketing.",
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutHero />
      <OurOrigins />
      <ThePivot />
      <AboutServices />
      <OurAdvantage />
      <Leadership />
      <TrackRecord />
      <TheFuture />
      <AboutCTA />
    </main>
  );
}
