import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/lib/posts-payload'

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const imageUrl = post.heroImage?.sizes?.small?.url 
    ? `${CMS_URL}${post.heroImage.sizes.small.url}`
    : null
  const imageAlt = post.heroImage?.alt || post.title

  return (
    <Link 
      href={`/posts/${post.slug}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg hover:border-primary/30"
    >
      {/* Hero Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-102"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <svg
              className="h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Published Date */}
        <time className="mb-3 block text-sm font-medium text-gray-500">
          {formatDate(post.publishedAt)}
        </time>

        {/* Title */}
        <h3 className="mb-3 font-display text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        {/* Meta Description */}
        {post.meta?.description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
            {post.meta.description}
          </p>
        )}
      </div>
    </Link>
  )
}
