export interface Event {
    id: string;
    slug: string;
    title: string;
    description: string;
    content: string;
    startAt: string;
    endAt: string | null;
    location: string;
    price: string;
    status: string;
    bannerUrl: string;
    posterUrl: string;
    artist?: string;
    ticketLink?: string;
}

interface ApiVenue {
    id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    mapUrl: string;
}

interface ApiMedia {
    id: string;
    url: string;
    type: string;
    mime: string;
    width: number;
    height: number;
    altText: string;
}

interface ApiOrganizer {
    id: string;
    name: string;
    slug: string;
    type: string;
}

interface ApiEventOrganizer {
    id: string;
    role: string;
    organizer: ApiOrganizer;
}

interface ApiEvent {
    id: string;
    slug: string;
    title: string;
    shortDesc: string;
    status: string;
    visibility: string;
    startAt: string;
    endAt: string | null;
    venue?: ApiVenue;
    poster?: ApiMedia;
    banner?: ApiMedia;
    organizers?: ApiEventOrganizer[];
    // content is missing in sample, assuming it might be added later or fetched differently
    content?: string;
    // price is missing in sample
    price?: string;
    // ticketLink is missing in sample
    ticketLink?: string;
}

interface ApiResponse {
    data: ApiEvent[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

const API_URL = process.env.CHUSEYO_API_URL;

function mapApiEvent(item: ApiEvent): Event {
    // Map status to frontend expected values if needed, or pass through
    // Frontend expects: 'Available' | 'Coming Soon' | 'Sold Out'
    // API returns: 'DRAFT', 'PUBLISHED' (assumed), etc.
    // For now, we'll capitalize or map specifically if we know the values.
    // Let's default to 'Available' if public, or use the status string.

    const artist = item.organizers?.find(o => o.role === 'Headliner')?.organizer.name
        || item.organizers?.[0]?.organizer.name
        || 'Unknown Artist';

    return {
        id: item.id,
        slug: item.slug,
        title: item.title,
        description: item.shortDesc || '',
        content: item.content || '', // Placeholder if missing
        startAt: item.startAt,
        endAt: item.endAt,
        location: item.venue ? `${item.venue.name}${item.venue.city ? `, ${item.venue.city}` : ''}` : 'TBA',
        price: item.price || 'TBA',
        status: item.status === 'DRAFT' ? 'Coming Soon' : 'Available', // Simple mapping for now
        bannerUrl: item.banner?.url || '',
        posterUrl: item.poster?.url || '',
        artist: artist,
        ticketLink: item.ticketLink || '#',
    };
}

export async function fetchEvents(): Promise<Event[]> {
    if (!API_URL) {
        console.error('NEXT_PUBLIC_CHUSEYO_API_URL is not defined');
        return [];
    }

    try {
        const res = await fetch(`${API_URL}/events`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch events');
        }

        const response: ApiResponse = await res.json();
        return response.data.map(mapApiEvent);
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
    if (!API_URL) {
        console.error('NEXT_PUBLIC_CHUSEYO_API_URL is not defined');
        return null;
    }

    try {
        // Try fetching single event by slug if API supports it
        // Assuming /events/:slug or similar. If not, we filter from list.
        // Based on standard REST, usually ID is used, but slug is common for public.
        // Let's try to fetch list with filter if possible, or just fetch all and find.
        // Given the previous instruction "fetch not from backend strapi but from our own backend", 
        // and no specific single event endpoint doc, I'll stick to fetching all and filtering 
        // OR try a direct endpoint if standard.
        // Let's try fetching all for now as a safe fallback, or assuming /events?slug=...

        // Optimistic approach: Fetch all and filter (safe for small number of events)
        // If list grows, we need a specific endpoint.

        const res = await fetch(`${API_URL}/events`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch events');
        }

        const response: ApiResponse = await res.json();
        const event = response.data.find(e => e.slug === slug);

        return event ? mapApiEvent(event) : null;

    } catch (error) {
        console.error(`Error fetching event with slug ${slug}:`, error);
        return null;
    }
}

export async function fetchStrapiEvent(slug: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/events?filters[event_slug][$eq]=${slug}&populate[event_content][populate]=*&populate[seo][populate]=*`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_READ_ONLY_API_KEY}`,
                },
                next: { revalidate: 60 },
            }
        );

        if (!res.ok) {
            console.error('Failed to fetch Strapi event:', await res.text());
            return null;
        }

        const data = await res.json();
        return data.data[0] || null;
    } catch (error) {
        console.error('Error fetching Strapi event:', error);
        return null;
    }
}
