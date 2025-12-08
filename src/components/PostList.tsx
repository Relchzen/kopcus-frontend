import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/posts";

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed text-center">
        <p className="text-lg font-medium text-muted-foreground">No posts found.</p>
        <p className="text-sm text-muted-foreground/60">Check back later for updates.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
      {posts.map((post) => (
        <Link 
          key={post.id} 
          href={`/posts/${post.slug}`}
          className="group flex flex-col"
        >
          <div className="relative mb-3 aspect-[3/2] w-full overflow-hidden rounded-xl bg-neutral-100 shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl dark:bg-neutral-800 md:mb-6">
            {post.coverImage?.url ? (
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alternativeText || post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-neutral-400">
                <span className="text-4xl">📷</span>
              </div>
            )}
            
            {/* Date Badge */}
            <div className="absolute left-2 top-2 flex items-center rounded-full bg-neutral-200/90 px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm md:left-4 md:top-4 md:px-3 md:py-1 md:text-xs">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1 md:mb-3 md:gap-2">
                {post.categories.slice(0, 2).map((cat) => (
                  <span 
                    key={cat.slug}
                    className="text-[10px] font-semibold uppercase tracking-wider text-primary md:text-xs"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            )}

            <h2 className="mb-2 font-display text-base font-bold leading-tight transition-colors group-hover:text-primary md:mb-3 md:text-2xl">
              {post.title}
            </h2>
            
            <p className="mb-2 line-clamp-2 text-xs text-muted-foreground md:mb-4 md:line-clamp-3 md:text-base">
              {post.excerpt}
            </p>

            <div className="mt-auto flex items-center text-xs font-medium text-primary md:text-sm">
              <span className="relative">
                Read Article
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </span>
              <svg 
                className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 md:ml-2 md:h-4 md:w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
