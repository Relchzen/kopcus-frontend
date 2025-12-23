import React from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getPosts } from "@/lib/posts";
import { Metadata } from "next";

import PostList from "@/components/PostList";

export const metadata: Metadata = {
  title: "Posts",
  description: "Read our latest articles and updates.",
};

export default async function Posts() {
  const posts = await getPosts();

  return (
    <div>
      <main className="container section-padding py-24">
        <div className="mb-6">
          <Breadcrumb items={[{ label: 'Posts' }]} />
        </div>
        <h1 className="mb-12 font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">
          Latest <span className="text-primary">Insights</span>
        </h1>
        
        <PostList posts={posts} />
      </main>
    </div>
  );
}
