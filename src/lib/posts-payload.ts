import { graphqlRequest } from "./graphql-client";
import { PaginatedResponse } from "./payload";

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'

export interface Post {
    id: string;
    title: string;
    slug: string;
    heroImage?: any;
    content?: any;
    relatedPosts?: Post[];
    categories?: any[];
    meta?: any;
    publishedAt: string;
}

export async function getPostsList(options: {
    limit?: number
    page?: number
    revalidate?: number
} = {}): Promise<PaginatedResponse<Post>> {
    const { limit = 10, page = 1, revalidate = 60 } = options

    const query = `
    query GetPosts($limit: Int, $page: Int) {
      Posts(limit: $limit, page: $page, sort: "-createdAt") {
        docs {
          id
          title
          slug
          heroImage{
            alt
            sizes {
                small {
                    url
                    width
                    height
                }
            }
          }
          categories {
            title
            slug
          }
          publishedAt
          meta {
            title
            description
          }
        }
        totalDocs
        limit
        totalPages
        page
        hasPrevPage
        hasNextPage
        prevPage
        nextPage
      }
    }
  `

    const data = await graphqlRequest<{ Posts: PaginatedResponse<Post> }>(
        query,
        { limit, page },
        { revalidate, tags: ['posts'] }
    )

    return data.Posts
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const query = `
        query GetPost($slug: String!) {
            Posts(where: { slug: {equals: $slug}}, limit: 1) {
                docs {
                    id
                    title
                    slug
                    categories {
                        title
                        slug
                    }
                    heroImage{
                        alt
                        url
                        sizes {
                            small {
                                url
                                width
                                height
                            }
                            large {
                                url
                                width
                                height
                            }
                        }
                    }
                    content
                    relatedPosts {
                        id
                        title
                        slug
                        heroImage{
                            alt
                            url
                            thumbnailURL
                        }
                        publishedAt
                    }
                    meta {
                        title
                        image {
                            thumbnailURL    
                        }
                        description
                    }
                    publishedAt
                }
            }
        }
    `

    const post = await graphqlRequest<{ Posts: { docs: Post[] } }>(
        query,
        { slug },
        {
            revalidate: 1800,
            tags: ['posts', `post-${slug}`]
        }
    )

    return post.Posts.docs[0] || null
}

export async function searchPosts(
    searchTerm: string,
    options: {
        limit?: number
        page?: number
        revalidate?: number
    } = {}
): Promise<PaginatedResponse<Post>> {
    const { limit = 10, page = 1, revalidate = 0 } = options

    const query = `
    query SearchPosts($searchTerm: String!, $limit: Int, $page: Int) {
      Posts(
        where: { 
          OR: [
            { title: { contains: $searchTerm } }
            { excerpt: { contains: $searchTerm } }
          ]
        }
        limit: $limit
        page: $page
        sort: "-createdAt"
      ) {
        docs {
          id
          title
          slug
          excerpt
          featuredImage {
            url
            alt
            sizes {
              card {
                url
                width
                height
              }
              thumbnail {
                url
                width
                height
              }
            }
          }
          publishedDate
          createdAt
        }
        totalDocs
        limit
        totalPages
        page
        pagingCounter
        hasPrevPage
        hasNextPage
        prevPage
        nextPage
      }
    }
  `

    const data = await graphqlRequest<{ Posts: PaginatedResponse<Post> }>(
        query,
        { searchTerm, limit, page },
        { revalidate, tags: ['search'] }
    )

    return data.Posts
}

export async function getPostsByCategory(
    categorySlug: string,
    options: { limit?: number; page?: number } = {}
): Promise<PaginatedResponse<Post>> {
    const { limit = 12, page = 1 } = options

    // Step 1: Get the category ID by slug
    const categoryQuery = `
    query GetCategory($slug: String!) {
      Categories(where: { slug: { equals: $slug } }, limit: 1) {
        docs {
          id
        }
      }
    }
  `

    const categoryData = await graphqlRequest<{ Categories: { docs: { id: string }[] } }>(
        categoryQuery,
        { slug: categorySlug },
        { revalidate: 120, tags: [`category-${categorySlug}`] }
    )

    const categoryId = categoryData.Categories.docs[0]?.id

    if (!categoryId) {
        // Return empty result if category not found
        return {
            docs: [],
            totalDocs: 0,
            limit,
            totalPages: 0,
            page,
            pagingCounter: 0,
            hasPrevPage: false,
            hasNextPage: false,
            prevPage: null,
            nextPage: null,
        }
    }

    // Step 2: Get posts filtered by category ID
    const query = `
    query GetPostsByCategory($limit: Int, $page: Int) {
      Posts(
        where: { categories: { equals: ${categoryId} } }
        limit: $limit
        page: $page
        sort: "-createdAt"
      ) {
        docs {
          id
          title
          slug
          heroImage {
            alt
            sizes {
              small {
                url
                width
                height
              }
            }
          }
          categories {
            title
            slug
          }
          publishedAt
          meta {
            title
            description
          }
        }
        totalDocs
        totalPages
        page
        hasNextPage
        hasPrevPage
      }
    }
  `

    const data = await graphqlRequest<{ Posts: PaginatedResponse<Post> }>(
        query,
        { limit, page },
        { revalidate: 120, tags: [`category-${categorySlug}`] }
    )

    return data.Posts
}

export async function recentPosts(limit: number = 3, slug: string): Promise<Post[]> {
    const query = `
    query GetRecentPosts($limit: Int!, $slug: String!) {
      Posts(limit: $limit, sort: "-createdAt", where: { slug: { not_equals: $slug } }) {
        docs {
          id
          title
          slug
          heroImage{
            alt
            thumbnailURL
          }
          publishedAt
          meta {
            description
          }
        }
      }
    }
  `

    const data = await graphqlRequest<{ Posts: { docs: Post[] } }>(
        query,
        { limit, slug },
        { revalidate: 60, tags: ['posts'] }
    )

    return data.Posts.docs
}
