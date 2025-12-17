import React from "react";
import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/posts";
import PostList from "@/components/PostList";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

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
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getPostsByCategory(slug);

  if (!posts) {
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
        
        <PostList posts={posts} />
      </main>
    </div>
  );
}
