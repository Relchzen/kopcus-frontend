import React from 'react';
import { SectionContainer } from '@/components/SectionContainer';

export default function LowImpact({ hero }: { hero: any }) {
  return (
    <SectionContainer name="hero" className="py-20 text-center section-padding">
      <h1 className="text-4xl font-bold">Low Impact Hero</h1>
      <pre className="mt-4 text-left bg-gray-100 p-4 rounded overflow-auto text-sm">
        {JSON.stringify(hero, null, 2)}
      </pre>
    </SectionContainer>
  );
}
