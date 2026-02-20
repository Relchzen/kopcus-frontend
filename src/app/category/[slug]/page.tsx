import React from "react";
import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/posts-payload";
import PayloadPostsList from "@/components/posts/PayloadPostsList";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  // Simple title generation based on slug
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: `${title} - Posts`,
    description: `Read our latest articles in ${title}.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const searchParamsResolved = await searchParams;
  const currentPage = Number(searchParamsResolved.page) || 1;

  const { docs: posts, totalPages, page, hasNextPage, hasPrevPage } = await getPostsByCategory(slug, {
    limit: 12,
    page: currentPage,
  });

  if (!posts || posts.length === 0) {
    notFound();
  }

  // Format slug for display
  const categoryName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div>
      <main className="container section-padding py-24">
        <div className="mb-6">
          <Breadcrumb 
            items={[
              { label: 'Posts', href: '/posts' },
              { label: categoryName }
            ]} 
          />
        </div>
        <h1 className="mb-12 font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">
          Category: <span className="text-primary">{categoryName}</span>
        </h1>
        
        <PayloadPostsList posts={posts} />

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-12">
          {hasPrevPage && (
            <Link
              href={`/category/${slug}?page=${page - 1}`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Previous
            </Link>
          )}
          <span className="px-4 py-2 rounded">
            Page {page} of {totalPages}
          </span>
          {hasNextPage && (
            <Link
              href={`/category/${slug}?page=${page + 1}`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
