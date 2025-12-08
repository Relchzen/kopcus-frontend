'use client';

import { SectionContainer } from '@/components/SectionContainer';

const partners = [
  'Kostcon',
  'Korea360',
  'Esavya',
];

export default function CredibilitySection() {
  return (
    <SectionContainer name="credibility" className="bg-white pb-24 section-padding">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <p className="font-body text-sm text-neutral-500">
            Trusted by partners in K-Pop activations and community-driven campaigns.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {partners.map((partner, index) => (
              <span
                key={index}
                className="font-display text-lg font-bold uppercase text-neutral-300 transition-colors hover:text-neutral-400"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
