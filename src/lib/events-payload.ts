import { graphqlRequest } from "./graphql-client";
import { PaginatedResponse } from "./payload";

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'

export interface Event {
    id: string
    title: string
    description: string
    slug: string
    dateStatus?: string
    startDate: string
    endDate?: string
    eventStatus: string
    location: {
        showLocation: boolean
        venue?: string
        address?: string
        linkMaps?: string
    }
    bannerImage?: {
        alt: string
        url: string
        filename: string
        sizes: {
            small?: {
                url: string
                width: number
                height: number
            }
            medium?: {
                url: string
                width: number
                height: number
            }
            large?: {
                url: string
                width: number
                height: number
            }
            og?: {
                url: string
                width: number
                height: number
            }
        }
    }
    posterImage?: {
        alt: string
        url: string
        filename: string
        sizes: {
            small?: {
                url: string
                width: number
                height: number
            }
            medium?: {
                url: string
                width: number
                height: number
            }
            large?: {
                url: string
                width: number
                height: number
            }
            og?: {
                url: string
                width: number
                height: number
            }
        }
    }
    meta?: {
        title?: string
        description?: string
        image?: {
            thumbnailURL?: string
        }
    }
    content: any
    ticketAvailability: boolean
    ticketLink?: string
}

export async function getEventsList(options: {
    limit?: number
    page?: number
    revalidate?: number
}): Promise<PaginatedResponse<Event>> {
    const { limit = 10, page = 1, revalidate = 60 } = options

    const query = `
        query GetEvents($limit: Int, $page: Int) {
            Events(limit: $limit, page: $page, sort: "-startDate") {
                docs {
                    id
                    title
                    slug
                    artistOrBrand
                    eventStatus
                    dateStatus
                    startDate
                    description
                    location {
                        showLocation
                        venue
                    }
                    bannerImage {
                        alt
                        url
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
                            large {
                                url
                                width
                                height
                            }
                        }
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
    const data = await graphqlRequest<{ Events: PaginatedResponse<Event> }>(
        query,
        { limit, page },
        { revalidate, tags: ['events'] }
    )

    return data.Events
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
    const query = `
        query GetEventBySlug($slug: String!) {
            Events(where: { slug: { equals: $slug } }, limit: 1) {
                docs {
                    id
                    title
                    description
                    artistOrBrand
                    slug
                    dateStatus
                    startDate
                    endDate
                    eventStatus
                    ticketAvailability
                    ticketLink
                    location {
                        showLocation
                        venue
                        address
                        linkMaps
                    }
                    bannerImage {
                        alt
                        url
                        filename
                        sizes {
                            medium {
                                url
                                width
                                height
                            }
                            large {
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
                        url
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
                    content
                }
            }
        }
    `
    const data = await graphqlRequest<{ Events: { docs: Event[] } }>(query, { slug }, { tags: ['event'] })
    return data.Events.docs[0] || null
}