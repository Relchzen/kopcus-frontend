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