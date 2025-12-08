import React from 'react';
import { Footer } from '@/components/Footer';
import ContactHero from '@/components/sections/contact/ContactHero';
import QualificationSection from '@/components/sections/contact/QualificationSection';
import ContactForm from '@/components/sections/contact/ContactForm';
import CredibilitySection from '@/components/sections/contact/CredibilitySection';
import ContactFooterCTA from '@/components/sections/contact/ContactFooterCTA';

export default function ContactPage() {
  return (
    <main className="bg-white">
      <ContactHero />
      <QualificationSection />
      <ContactForm />
      <CredibilitySection />
      <ContactFooterCTA />
      <Footer />
    </main>
  );
}
