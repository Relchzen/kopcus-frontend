'use client';

import { SectionContainer } from '@/components/SectionContainer';
import { PiConfettiLight, PiMegaphoneLight, PiNewspaperLight, PiVideoCameraLight } from 'react-icons/pi';

const qualifications = [
  {
    icon: PiConfettiLight,
    title: 'Event Activation & Brand Experiences',
  },
  {
    icon: PiMegaphoneLight,
    title: 'Influencer Marketing & Promotion',
  },
  {
    icon: PiNewspaperLight,
    title: 'Media Promotion & PR',
  },
  {
    icon: PiVideoCameraLight,
    title: 'Content Production & Social Media',
  },
];

export default function QualificationSection() {
  return (
    <SectionContainer name="qualification" className="bg-white pb-16 section-padding">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {qualifications.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start rounded-lg border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300"
            >
              <item.icon className="mb-4 h-8 w-8 text-neutral-400" />
              <h3 className="font-display text-lg font-bold leading-tight text-neutral-900">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
