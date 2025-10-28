import Link from "next/link";
import React from "react";

export default async function Posts() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_WP_API_URL + "posts?_embed&per_page=5",
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts = await res.json();
  //   console.log(posts);

  return (
    <div>
      <main>
        <h1>Posts</h1>
        <div>
          <ul>
            {posts.map((post: any) => (
              <li key={post.id}>
                <Link href={`/posts/${post.slug}`}>{post.title.rendered}</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
