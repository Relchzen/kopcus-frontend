
import { Footer } from '@/components/Footer';
import { fetchWorks } from '@/lib/works';
import { WorksClient } from '@/components/works/WorksClient';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Works',
  description: 'Explore our portfolio of successful K-Pop campaigns, event activations, and digital strategies for top brands.',
};

export default async function WorksPage() {
  const works = await fetchWorks();

  return (
    <>
      <WorksClient works={works} />
    </>
  );
}