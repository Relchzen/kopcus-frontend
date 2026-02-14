import { getPostBySlug, recentPosts } from "@/lib/posts-payload"
import { notFound } from "next/navigation"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import Link from "next/link"
import Image from "next/image"
import { parseLexicalContent } from "@/components/PayloadBlockRenderer"
import GalleryHydrator from "@/components/GalleryHydrator"

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const post = await getPostBySlug((await params).slug)

    if (!post) return {}

    return {
        title: post.meta?.title || post.title,
        description: post.meta?.description,
        openGraph: {
            title: post.meta?.title || post.title,
            description: post.meta?.description,
            images: `${CMS_URL}${post.meta?.image?.sizes?.small?.url}`,
            type: 'article',
            publishedTime: post.publishedAt,
        },
    }
}

export default async function PostPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const post = await getPostBySlug((await params).slug)
    const contentHtml = post!.content ? parseLexicalContent(post!.content) : ''


    if (!post) {
        notFound()
    }
    const recent = await recentPosts(3, (await params)!.slug)

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
                    <article className="lg:col-span-8">
                        <header className="mb-12">
                            {post.categories && post.categories.length > 0 && (
                                <div className="mb-6 flex flex-wrap gap-2">
                                    {post.categories.map((cat) => (
                                        <Link
                                            key={cat.slug}
                                            href={`/category/${cat.slug}`}
                                            className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-black transition-colors hover:bg-primary hover:text-primary-400"
                                        >
                                            {cat.title}
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
                            </div>
                        </header>
                        {post.heroImage && (
                            <div className="relative mb-12 shadow-lg">
                                <Image
                                    src={`${CMS_URL}/${post.heroImage.sizes.large.url}`}
                                    alt={post.heroImage.alt || post.title}
                                    width={post.heroImage.sizes.large.width}
                                    height={post.heroImage.sizes.large.height}
                                    className="object-cover rounded-2xl"
                                />
                            </div>
                        )}

                        <div
                            className="prose prose-lg prose-neutral max-w-none"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />
                        <GalleryHydrator />
                    </article>
                    <aside className="lg:col-span-4">
                        {/* Related Posts */}
                        {post.relatedPosts && post.relatedPosts.length > 0 && (
                            <div className="mb-12">
                                <h2 className="mb-6 font-display text-2xl font-bold uppercase tracking-tight">
                                    Related Posts
                                </h2>
                                <div className="grid gap-4">
                                    {post.relatedPosts.map((relatedPost) => (
                                        <Link
                                            key={relatedPost.id}
                                            href={`/posts/${relatedPost.slug}`}
                                            className="group flex gap-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-3 transition-all duration-300 hover:shadow-md hover:border-primary/30"
                                        >
                                            {/* Thumbnail */}
                                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                                                {relatedPost.heroImage?.thumbnailURL ? (
                                                    <Image
                                                        src={`${CMS_URL}${relatedPost.heroImage.thumbnailURL}`}
                                                        alt={relatedPost.heroImage.alt || relatedPost.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                        sizes="96px"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                                        <svg
                                                            className="h-8 w-8 text-gray-400"
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
                                            <div className="flex flex-1 flex-col justify-center overflow-hidden">
                                                <h3 className="mb-1 line-clamp-3 font-display text-sm font-bold leading-tight text-gray-900 transition-colors group-hover:text-primary">
                                                    {relatedPost.title}
                                                </h3>
                                                <time className="text-xs text-gray-500">
                                                    {new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </time>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Recent Posts */}
                        {recent && recent.length > 0 && (
                            <div className="mb-12">
                                <h2 className="mb-6 font-display text-2xl font-bold uppercase tracking-tight">
                                    Recent Posts
                                </h2>
                                <div className="grid gap-4">
                                    {recent.map((post) => (
                                        <Link
                                            key={post.id}
                                            href={`/posts/${post.slug}`}
                                            className="group flex gap-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-3 transition-all duration-300 hover:shadow-md hover:border-primary/30"
                                        >
                                            {/* Thumbnail */}
                                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                                                {post.heroImage?.thumbnailURL ? (
                                                    <Image
                                                        src={`${CMS_URL}${post.heroImage.thumbnailURL}`}
                                                        alt={post.heroImage.alt || post.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                        sizes="96px"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                                        <svg
                                                            className="h-8 w-8 text-gray-400"
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
                                            <div className="flex flex-1 flex-col justify-center overflow-hidden">
                                                <h3 className="mb-1 line-clamp-3 font-display text-sm font-bold leading-tight text-gray-900 transition-colors group-hover:text-primary">
                                                    {post.title}
                                                </h3>
                                                <time className="text-xs text-gray-500">
                                                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </time>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </main>
        </div>
    )
}