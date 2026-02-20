import { graphqlRequest } from "./graphql-client";
import { PaginatedResponse } from "./payload";

const CMS_URL = process.env.NEXT_PUBLIC_CMS || 'http://localhost:3001'

export interface Work {
    id: number;
    title: string;
    slug: string;
    description: string;
    artistOrBrand: string;
    projectDate: string;
    featured: Boolean;
    heroImage: any;
    content?: any;
    meta?: any;
    publishedAt: string;
}

export async function getWorksList(options: {
    limit?: number
    page?: number
    revalidate?: number
}): Promise<PaginatedResponse<Work>> {
    const { limit = 10, page = 1, revalidate = 60 } = options

    const query = `
        query GetPortfolios($limit: Int, $page: Int) {
            Portfolios(limit: $limit, page: $page, sort: "-projectDate") {
                docs {
                    id
                    title
                    description
                    slug
                    projectDate
                    artistOrBrand
                    heroImage {
                        alt
                        sizes {
                            small {
                                url
                                height
                                width
                            }
                            medium {
                                url
                                height
                                width
                            }
                        }
                    }
                    featured
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

    const data = await graphqlRequest<{ Portfolios: PaginatedResponse<Work> }>(
        query,
        { limit, page },
        { revalidate, tags: ['portfolio'] }
    )

    return data.Portfolios
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
    const query = `
        query GetPortfolio($slug: String!) {
            Portfolios(where: {slug: {equals: $slug}}, limit: 1) {
                docs {
                    id
                    title
                    description
                    projectDate
                    slug
                    artistOrBrand
                    heroImage {
                        filename
                        alt
                        sizes {
                            large {
                                url
                                height
                                width
                            }
                            medium {
                                url
                                height
                                width
                            }
                        }
                    }
                    content
                    meta {
                        title
                        description
                        image {
                            thumbnailURL
                        }
                    }
                }
            }
        }
    `

    const work = await graphqlRequest<{ Portfolios: { docs: Work[] } }>(
        query,
        { slug },
        { revalidate: 1800, tags: ['portfolio', `portfolio-${slug}`] })
    return work.Portfolios.docs[0] || null
}