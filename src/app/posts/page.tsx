import React from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { getPosts } from "@/lib/posts";
import { Metadata } from "next";
import { fetchPayload } from "@/lib/payload";
import PostList from "@/components/PostList";
import { getPostsList } from "@/lib/posts-payload";
import PayloadPostsList from "@/components/posts/PayloadPostsList";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Posts",
  description: "Read our latest articles and updates.",
};

export default async function Posts({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  // const posts = await getPosts();
  const params = await searchParams
  const currentPage = Number(params.page) || 1

  const { docs: posts, totalPages, page, hasNextPage, hasPrevPage } = await getPostsList({
    limit: 12,
    page: currentPage,
    revalidate: 60,
  })
  // console.log(posts)
  return (
    <div>
      <main className="container section-padding py-24">
        <div className="mb-6">
          <Breadcrumb items={[{ label: 'Posts' }]} />
        </div>
        <h1 className="mb-12 font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">
          Latest <span className="text-primary">Insights</span>
        </h1>
        
        <PayloadPostsList posts={posts} />

        {/* <PostList posts={posts} /> */}
        {/* Pagination */}
      <div className="flex justify-center gap-4 mt-12">
        {hasPrevPage && (
          <Link
            href={`/posts?page=${page - 1}`}
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
            href={`/posts?page=${page + 1}`}
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
