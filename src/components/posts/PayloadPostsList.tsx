import React from 'react'
import { Post } from '@/lib/posts-payload'
import PostCard from './PostCard'

interface PayloadPostsListProps {
    posts: Post[]
}

export default function PayloadPostsList({ posts }: PayloadPostsListProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}