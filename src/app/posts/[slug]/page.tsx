import React from "react";

// type Props = {
//   slug: string;
// };

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const postRes = await fetch(
    process.env.NEXT_PUBLIC_WP_API_URL + `posts?slug=${slug}&_embed`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!postRes.ok) {
    throw new Error("Failed to fetch post");
  }

  const posts = await postRes.json();
  const postData = posts[0];
  console.log(postData);

  return (
    <div>
      <h1>{postData.title.rendered}</h1>
      <article
        dangerouslySetInnerHTML={{ __html: postData.content.rendered }}
      />
    </div>
  );
}
