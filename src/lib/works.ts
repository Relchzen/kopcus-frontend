/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Work {
    id: string;
    slug: string;
    title: string;
    description: string;
    client: string;
    service: string; // Assuming we might want this, or map from something
    year: string;
    coverImage: string;
    content: any; // Dynamic zone content
    seo?: any;
}

interface ApiMedia {
    id: number;
    url: string;
    alternativeText: string;
    width: number;
    height: number;
}

interface ApiWork {
    id: number;
    documentId: string;
    slug: string;
    portfolioTitle: string;
    portfolioDescription: string;
    artistBrand: string;
    date: string;
    featuredImage: ApiMedia;
    pageContent: any;
    seo: any;
    // Add other fields if they exist in API response
    service?: string; // Placeholder if it exists
}

interface ApiResponse {
    data: ApiWork[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const API_KEY = process.env.STRAPI_READ_ONLY_API_KEY;

function mapApiWork(item: ApiWork): Work {
    return {
        id: item.documentId || item.id.toString(),
        slug: item.slug,
        title: item.portfolioTitle,
        description: item.portfolioDescription || '',
        client: item.artistBrand || '',
        service: item.service || 'Portfolio', // Default or map from somewhere
        year: item.date ? new Date(item.date).getFullYear().toString() : '',
        coverImage: item.featuredImage?.url || '',
        content: item.pageContent,
        seo: item.seo,
    };
}

export async function fetchWorks(): Promise<Work[]> {
    if (!API_URL) {
        console.error('NEXT_PUBLIC_STRAPI_URL is not defined');
        return [];
    }

    try {
        const res = await fetch(
            `${API_URL}/api/portfolios?populate[featuredImage][populate]=*&sort[0]=date:desc`,
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
                next: { revalidate: 60 },
            }
        );

        if (!res.ok) {
            console.error('Failed to fetch Strapi works:', await res.text());
            return [];
        }

        const response: ApiResponse = await res.json();
        return response.data.map(mapApiWork);
    } catch (error) {
        console.error('Error fetching Strapi works:', error);
        return [];
    }
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
    if (!API_URL) {
        console.error('NEXT_PUBLIC_STRAPI_URL is not defined');
        return null;
    }

    try {
        const res = await fetch(
            `${API_URL}/api/portfolios?filters[slug][$eq]=${slug}&populate[pageContent][populate]=*&populate[seo][populate]=*&populate[featuredImage][populate]=*`,
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
                next: { revalidate: 60 },
            }
        );

        if (!res.ok) {
            console.error('Failed to fetch Strapi work:', await res.text());
            return null;
        }

        const response: ApiResponse = await res.json();
        const item = response.data[0];

        return item ? mapApiWork(item) : null;
    } catch (error) {
        console.error('Error fetching Strapi work:', error);
        return null;
    }
}

// Deprecated: Alias for backward compatibility if needed, or can be removed if we update all usages
export const fetchStrapiWork = getWorkBySlug;
