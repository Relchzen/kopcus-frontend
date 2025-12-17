import React from 'react';

import { RecaptchaProvider } from '@/components/providers/RecaptchaProvider';
import ContactHero from '@/components/sections/contact/ContactHero';
import QualificationSection from '@/components/sections/contact/QualificationSection';
import ContactForm from '@/components/sections/contact/ContactForm';
import CredibilitySection from '@/components/sections/contact/CredibilitySection';
import ContactFooterCTA from '@/components/sections/contact/ContactFooterCTA';

export default function ContactPage() {
  return (
    <main className="bg-white">
      <RecaptchaProvider>
        <ContactHero />
        <QualificationSection />
        <ContactForm />
        <CredibilitySection />
        <ContactFooterCTA />
      </RecaptchaProvider>
    </main>
  );
}
