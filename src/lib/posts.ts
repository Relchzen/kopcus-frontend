/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchStrapiAPI, fetchStrapi } from './strapi';

export interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: any;
    publishedAt: string;
    coverImage?: {
        url: string;
        alternativeText?: string;
        width?: number;
        height?: number;
    };
    categories: Array<{
        slug: string;
        name: string;
    }>;
    tags: Array<{
        slug: string;
        name: string;
    }>;
    seo?: any;
}

interface StrapiPost {
    id: number;
    documentId: string;
    post_title: string;
    post_slug: string;
    post_excerpt: string;
    post_content: any;
    post_date: string;
    publishedAt: string;
    post_featured_image?: {
        url: string;
        alternativeText?: string;
        width?: number;
        height?: number;
    };
    categories?: Array<{
        category_slug: string;
        category_name: string;
    }>;
    tags?: Array<{
        tag_slug: string;
        tag_name: string;
    }>;
    seo?: any;
}

function transformPost(strapiPost: StrapiPost): Post {
    return {
        id: strapiPost.documentId || strapiPost.id.toString(),
        slug: strapiPost.post_slug,
        title: strapiPost.post_title,
        excerpt: strapiPost.post_excerpt || '',
        content: strapiPost.post_content,
        publishedAt: strapiPost.post_date || strapiPost.publishedAt,
        coverImage: strapiPost.post_featured_image,
        categories: strapiPost.categories?.map(cat => ({
            slug: cat.category_slug,
            name: cat.category_name,
        })) || [],
        tags: strapiPost.tags?.map(tag => ({
            slug: tag.tag_slug,
            name: tag.tag_name,
        })) || [],
        seo: strapiPost.seo,
    };
}

// For list pages - MINIMAL data
export async function getPosts(filters?: {
    category?: string;
    tags?: string[];
    excludeSlug?: string;
    limit?: number;
}): Promise<Post[]> {
    const apiFilters: Record<string, any> = {};

    if (filters?.category) {
        apiFilters['categories.category_slug[$eq]'] = filters.category;
    }

    if (filters?.tags && filters.tags.length > 0) {
        apiFilters['tags.tag_slug[$in]'] = filters.tags.join(',');
    }

    if (filters?.excludeSlug) {
        apiFilters['post_slug[$ne]'] = filters.excludeSlug;
    }

    const data = await fetchStrapiAPI('/api/posts', {
        fields: ['post_title', 'post_slug', 'post_excerpt', 'post_date', 'publishedAt', 'documentId'],
        populate: {
            categories: ['category_name', 'category_slug'],
            tags: ['tag_name', 'tag_slug'],
            post_featured_image: ['url', 'alternativeText'],
        },
        filters: apiFilters,
        sort: ['post_date:desc'],
        pagination: {
            pageSize: filters?.limit || 100,
        },
    });

    return data.data.map(transformPost);
}

// For individual post page - FULL data
export async function getPostBySlug(slug: string): Promise<Post | null> {
    const data = await fetchStrapi(`/api/posts?filters[post_slug][$eq]=${slug}&populate=*`);

    if (!data.data || data.data.length === 0) {
        return null;
    }

    return transformPost(data.data[0]);
}

// For category/tag pages
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
    return getPosts({ category: categorySlug });
}

export async function getPostsByTag(tagSlug: string): Promise<Post[]> {
    return getPosts({ tags: [tagSlug] });
}

export async function getRelatedPosts(categorySlug: string, currentSlug: string, limit: number = 3): Promise<Post[]> {
    return getPosts({ category: categorySlug, excludeSlug: currentSlug, limit });
}

// For generateStaticParams - Only slugs
export async function getAllPostSlugs(): Promise<string[]> {
    const data = await fetchStrapiAPI('/api/posts', {
        fields: ['post_slug'],
        pagination: {
            pageSize: 1000,
        },
    });

    return data.data.map((post: any) => post.post_slug);
}