const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'

interface GraphqlResponse<T> {
    data: T;
    errors?: any;
}

interface CacheOptions {
    revalidate?: number | false;
    tags?: string[];
}

export async function graphqlRequest<T>
    (query: string, variables?: Record<string, any>, cacheOptions?: CacheOptions): Promise<T> {
    const { revalidate = 60, tags = [] } = cacheOptions || {};

    try {
        const res = await fetch(`${CMS_URL}/api/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
            next: {
                revalidate,
                tags
            }
        })

        if (!res.ok) {
            throw new Error(`Failed to fetch GraphQL data: ${res.status} ${res.statusText}`)
        }

        const json: GraphqlResponse<T> = await res.json()

        if (json.errors) {
            throw new Error(json.errors[0].message)
        }

        if (!json.data) {
            throw new Error('No data returned from GraphQL query')
        }

        return json.data
    } catch (err) {
        console.error('Error fetching GraphQL data:', err)
        throw err
    }
}

// Helper function to build where clause from filters
export function buildWhereClause(filters: Record<string, any>): string {
    const conditions = Object.entries(filters)
        .map(([key, value]) => {
            if (value === null || value === undefined) return null

            if (typeof value === 'string') {
                return `${key}: { equals: "${value}" }`
            }

            if (typeof value === 'number' || typeof value === 'boolean') {
                return `${key}: { equals: ${value} }`
            }

            if (Array.isArray(value)) {
                return `${key}: { in: [${value.map(v => `"${v}"`).join(', ')}]}`
            }

            return null
        })
        .filter(Boolean)
        .join(', ')

    return conditions ? `where: { ${conditions} }` : ''
}
