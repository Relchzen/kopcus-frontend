import React from "react";
import { notFound } from "next/navigation";
import { getPostsByTag } from "@/lib/posts";
import PostList from "@/components/PostList";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Footer } from "@/components/Footer";
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
    description: `Read our latest articles tagged with ${title}.`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getPostsByTag(slug);

  if (!posts) {
    notFound();
  }

  // Format slug for display
  const tagName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div>
      <main className="container section-padding py-24">
        <div className="mb-6">
          <Breadcrumb 
            items={[
              { label: 'Posts', href: '/posts' },
              { label: tagName }
            ]} 
          />
        </div>
        <h1 className="mb-12 font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">
          Tag: <span className="text-primary">{tagName}</span>
        </h1>
        
        <PostList posts={posts} />
      </main>
      <Footer />
    </div>
  );
}
