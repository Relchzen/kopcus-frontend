import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts } from "@/lib/posts";
import BlockRenderer from "@/components/BlockRenderer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post?.seo) {
    return {
      title: post?.title || "Post Not Found",
    };
  }

  const { seo } = post;

  return {
    title: seo.metaTitle || post.title,
    description: seo.metaDescription || post.excerpt,
    keywords: seo.keywords,
    robots: seo.metaRobots,
    alternates: {
      canonical: seo.canonicalURL,
    },
    openGraph: {
      title: seo.metaTitle || post.title,
      description: seo.metaDescription || post.excerpt,
      images: seo.metaImage?.url ? [seo.metaImage.url] : post.coverImage?.url ? [post.coverImage.url] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch related posts if category exists
  const relatedPosts = post.categories && post.categories.length > 0
    ? await getRelatedPosts(post.categories[0].slug, post.slug, 3)
    : [];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="container section-padding flex-1 py-12 md:py-24">
        <div className="mb-8">
          <Breadcrumb 
            items={[
              { label: 'Posts', href: '/posts' },
              { label: post.title }
            ]} 
          />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Content - 8 columns */}
          <article className="lg:col-span-8">
            {/* Header */}
            <header className="mb-12">
              {post.categories && post.categories.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {post.categories.map((cat) => (
                    <Link 
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-black transition-colors hover:bg-primary hover:text-primary-400"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
              
              <h1 className="mb-6 font-display text-4xl font-bold uppercase leading-tight md:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                {/* Add author if available in the future */}
              </div>
            </header>

            {/* Cover Image */}
            {post.coverImage?.url && (
              <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={post.coverImage.url}
                  alt={post.coverImage.alternativeText || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg prose-neutral max-w-none dark:prose-invert">
              {post.content && Array.isArray(post.content) ? (
                <BlockRenderer content={post.content} />
              ) : post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content as string }} />
              ) : null}
            </div>
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 border-t pt-8">
                <span className="mr-2 font-bold text-neutral-900">Tags:</span>
                {post.tags.map((tag) => (
                  <Link 
                    key={tag.slug}
                    href={`/tag/${tag.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}
          </article>

          {/* Sidebar - 4 columns */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="rounded-2xl bg-neutral-200 p-6">
                  <h3 className="mb-6 font-display text-lg font-bold uppercase tracking-wide text-primary">
                    Related Articles
                  </h3>
                  <div className="space-y-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link 
                        key={relatedPost.slug} 
                        href={`/posts/${relatedPost.slug}`}
                        className="group flex gap-4"
                      >
                        {relatedPost.coverImage?.url && (
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl shadow-sm">
                            <Image
                              src={relatedPost.coverImage.url}
                              alt={relatedPost.coverImage.alternativeText || relatedPost.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        )}
                        <div className="flex flex-col justify-center">
                          <h4 className="line-clamp-2 font-medium leading-snug transition-colors duration-300 group-hover:text-primary">
                            {relatedPost.title}
                          </h4>
                          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                            <time>
                              {new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </time>
                            <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-primary">
                              →
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories Widget (Optional - can be added later) */}
              {/* <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <h3 className="mb-4 font-display text-xl font-bold uppercase">Categories</h3>
                ...
              </div> */}
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
