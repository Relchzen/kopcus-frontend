import { graphqlRequest, buildWhereClause } from "./graphql-client";
const CMS_API = process.env.NEXT_PUBLIC_PAYLOAD_URL;
const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'

export interface PaginatedResponse<T> {
    docs: T[]
    totalDocs: number
    limit: number
    totalPages: number
    page: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number | null
    nextPage: number | null
}

export interface FetchOptions {
    depth?: number;
    limit?: number;
    page?: number;
    sort?: string;
    where?: Record<string, any>;
    select?: string[];
    revalidate?: number | false;
    tags?: string[];
}


export async function fetchPayload(endpoint: string, options: RequestInit = {}) {
    if (!CMS_API) {
        throw new Error('CMS URL is not defined')
    }

    const url = `${CMS_API}${endpoint}`
    console.log(url)

    try {
        const res = await fetch(url, {
            ...options,
            next: {
                revalidate: 60,
                ...(options.next || {}),
            },
        })

        if (!res.ok) {
            throw new Error(`Failed to fetch Payload data: ${res.status} ${res.statusText}`)
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching Payload data:', error)
        throw error
    }
}

export async function fetchFromPayload<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> {
    const {
        depth = 1,
        limit,
        page,
        sort,
        where,
        select,
        revalidate = 60,
        tags = [],
    } = options

    const params = new URLSearchParams()

    if (depth !== undefined) params.append('depth', depth.toString())
    if (limit) params.append('limit', limit.toString())
    if (page) params.append('page', page.toString())
    if (sort) params.append('sort', sort)
    if (select?.length) params.append('select', select.join(','))

    // Build where clause for REST API
    if (where) {
        Object.entries(where).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                params.append(`where[${key}][equals]`, String(value))
            }
        })
    }

    const url = `${CMS_URL}/api${endpoint}?${params.toString()}`

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                revalidate,
                tags,
            },
        })

        if (!response.ok) {
            throw new Error(`Payload API error: ${response.statusText}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Payload fetch error:', error)
        throw error
    }
}

export async function getHomePage() {
    const slug = 'home'
    const query = `
        query getPage($slug: String!) {
            Pages(where: { slug: { equals: $slug } }) {
                docs {
                    id
                    title
                    slug
                    meta {
                        title
                        description
                        image {
                            thumbnailURL
                        }
                    }
                    hero {
                        type
                        richText
                        links {
                            link {
                                type
                                label
                                url
                                appearance
                            }
                        }
                        images {
                            id
                            image {
                                alt
                                filename
                                sizes {
                                    small {
                                        url
                                        width
                                        height
                                    }
                                    medium {
                                        url
                                        width
                                        height
                                    }
                                    og {
                                        url
                                        width
                                        height
                                    }
                                }
                            }
                        }
                    }
                    layout {
                        ... on ContentBlock {
                            blockType
                            blockName
                            columns {
                                size
                                richText
                                enableLink
                                link {
                                    type
                                    label
                                    url
                                    appearance
                                }
                            }
                        }
                        ... on ArchiveBlock {
                            blockName
                            blockType
                            introContent
                            populateBy
                            relationTo
                            showFeaturedOnly
                            limit
                            selectedDocs {
                                value {
                                    ... on Portfolio {
                                        title
                                        artistOrBrand
                                        projectDate
                                        portfolioSlug: slug
                                        heroImage {
                                            alt
                                            filename
                                            sizes {
                                                medium {
                                                    url
                                                }
                                                small {
                                                    url
                                                }
                                                og {
                                                    url
                                                }
                                            }
                                        }
                                        meta{
                                            image{
                                                alt
                                                filename
                                                sizes {
                                                    medium {
                                                        url
                                                        width
                                                        height
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    ... on Service {
                                        name
                                        serviceDescription: description
                                        images {
                                            image {
                                                alt
                                                filename
                                                thumbnailURL
                                            }
                                        }
                                        serviceSlug: slug
                                    }
                                    ... on Post {
                                        title
                                        categories {
                                            title
                                            slug
                                        }
                                        postSlug: slug
                                        meta {
                                            description
                                        }
                                        publishedAt
                                        heroImage {
                                            alt
                                            filename
                                            sizes {
                                                small {
                                                    url
                                                    width
                                                    height
                                                }
                                            }
                                        }
                                    }
                                    ... on Event {
                                        title
                                        slug
                                        artistOrBrand
                                        eventStatus
                                        dateStatus
                                        startDate
                                        endDate
                                        location {
                                            venue
                                            showLocation
                                        }
                                        description
                                        bannerImage {
                                            alt
                                            filename
                                            sizes {
                                                large {
                                                    url
                                                    width
                                                    height
                                                }
                                                medium {
                                                    url
                                                    width
                                                    height
                                                }
                                                og {
                                                    url
                                                    width
                                                    height
                                                }
                                            }
                                        }
                                        posterImage {
                                            alt
                                            filename
                                            sizes {
                                                small {
                                                    url
                                                    width
                                                    height
                                                }
                                                medium {
                                                    url
                                                    width
                                                    height
                                                }
                                                og {
                                                    url
                                                    width
                                                    height
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            link {
                                type
                                label
                                url
                                appearance
                            }
                        }
                    }
                }
            }
        }
    `

    const response: any = await graphqlRequest(query,
        { slug },
        {
            revalidate: 1800,
            tags: ['home']
        }
    )

    return response.Pages.docs[0]

}