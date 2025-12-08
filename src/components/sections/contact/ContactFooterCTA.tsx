'use client';

import { SectionContainer } from '@/components/SectionContainer';
import Link from 'next/link';

export default function ContactFooterCTA() {
  return (
    <SectionContainer name="contact-footer-cta" className="bg-white pb-24">
      <div className="container text-center">
        <p className="font-body text-neutral-500">
          Looking for something else? Visit our{' '}
          <Link href="/about" className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900">
            About
          </Link>{' '}
          or{' '}
          <Link href="/services" className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900">
            Services
          </Link>{' '}
          page.
        </p>
      </div>
    </SectionContainer>
  );
}
