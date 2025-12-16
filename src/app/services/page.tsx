import React from 'react';
import ServicesHeroSection from '@/components/sections/services/ServicesHeroSection';
import WhyUsSection from '@/components/sections/services/WhyUsSection';
import ServicesOverviewSection from '@/components/sections/services/ServicesOverviewSection';
import ServiceDetailsSection from '@/components/sections/services/ServiceDetailsSection';
import ProcessSection from '@/components/sections/services/ProcessSection';

import FinalCTASection from '@/components/sections/services/FinalCTASection';
import { Footer } from '@/components/Footer';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Comprehensive K-Pop marketing solutions: Campaign & Event Activations, Influencer & Community Marketing, Media & Public Relations, and Digital Strategy & Content Production.',
};

export default function ServicesPage() {
    return (
        <main className="pt-12">
            <ServicesHeroSection />
            <WhyUsSection />
            <ServicesOverviewSection />
            <ServiceDetailsSection />
            <ProcessSection />
            {/* <ServicesTestimonialSection /> */}
            <FinalCTASection />
        </main>
    );
}
