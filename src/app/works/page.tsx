

import { fetchWorks } from '@/lib/works';
import { WorksClient } from '@/components/works/WorksClient';
import { getWorksList } from '@/lib/works-payload';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Works',
  description: 'Explore our portfolio of successful K-Pop campaigns, event activations, and digital strategies for top brands.',
};

export default async function WorksPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams
    const currentPage = Number(params.page) || 1
  
    const works = await getWorksList({
      limit: 12,
      page: currentPage,
      revalidate: 60,
    })
  
  console.log("Works: ", works)
  return (
    <>
      <WorksClient works={works.docs} />
    </>
  );
}