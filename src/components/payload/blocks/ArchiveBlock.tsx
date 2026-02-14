import Link from 'next/link';
import Image from 'next/image';
import { SectionContainer } from '@/components/SectionContainer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { graphqlRequest, buildWhereClause } from '@/lib/graphql-client';
import { ServiceArchiveRenderer } from './ServiceArchiveRenderer';
import { PortfolioArchiveRenderer } from './PortfolioArchiveRenderer';
import { PostsArchiveRenderer } from './PostsArchiveRenderer';
import { EventsArchiveRenderer } from './EventsArchiveRenderer';

interface ArchiveBlockProps {
    block: {
        blockName?: string
        blockType: 'archive'
        introContent?: any
        populateBy: 'collection' | 'selection'
        relationTo?: 'portfolio' | 'services' | 'posts' | 'events'
        showFeaturedOnly?: boolean
        limit?: number
        selectedDocs?: {
            value: any
        }[]
        link?: {
            type?: 'reference' | 'custom'
            label: string
            url: string
            appearance?: 'default' | 'outline' | 'ghost'
        }
    }
}

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

const PORTFOLIOS_QUERY = `
    query Portfolios($limit: Int) {
        Portfolios(limit: $limit, WHERE_CLAUSE) {
            docs {
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
        }
    }
`;

const POSTS_QUERY = `
    query Posts($limit: Int) {
        Posts(limit: $limit, WHERE_CLAUSE) {
            docs {
                id
                title
                slug
                publishedAt
                categories {
                    title
                }
                heroImage {
                    url
                    alt
                    sizes {
                        medium {
                            url
                        }
                    }
                }
                meta {
                    description
                }
            }
        }
    }
`;

const SERVICES_QUERY = `
    query Services($limit: Int) {
        Services(limit: $limit, WHERE_CLAUSE) {
            docs {
                id
                name
                slug
                description
                images {
                    image {
                        url
                        alt
                        sizes {
                            medium {
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`;

const EVENTS_QUERY = `
    query Events($limit: Int) {
        Events(limit: $limit, WHERE_CLAUSE) {
            docs {
                id
                title
                slug
                eventStatus
                startDate
                endDate
                eventDescription:description
                ticketAvailability
                ticketLink
                location {
                    venue
                    showLocation
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
                        small {
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
                        medium {
                            url
                            width
                            height
                        }
                        small {
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
            totalDocs
            limit 
        }
    }
`


export const ArchiveBlock = async ({ block }: ArchiveBlockProps) => {
    let docs: any[] = [];

    // ... (existing fetching logic) ...
    if (block.populateBy === 'collection' && block.relationTo) {
        // ... (fetch logic) ...
        // ... (this part is unchanged, assuming it's correctly fetching docs)
        let query = '';
        const limit = block.limit || 10;
        const where: any = {};

        if (block.relationTo === 'portfolio' && block.showFeaturedOnly) {
            where['isFeatured'] = true;
        }

        if (block.relationTo === 'events') {
            where['eventStatus'] = { not_in: ['ENUM:cancelled'] };
        }

        const whereClause = buildWhereClause(where);

        if (block.relationTo === 'portfolio') {
            query = PORTFOLIOS_QUERY.replace('WHERE_CLAUSE', whereClause ? whereClause : '');
        } else if (block.relationTo === 'posts') {
            query = POSTS_QUERY.replace('WHERE_CLAUSE', whereClause ? whereClause : '');
        } else if (block.relationTo === 'services') {
            query = SERVICES_QUERY.replace('WHERE_CLAUSE', whereClause ? whereClause : '');
        } else if (block.relationTo === 'events') {
            query = EVENTS_QUERY.replace('WHERE_CLAUSE', whereClause ? whereClause : '');
        }

        if (query) {
            try {
                const data: any = await graphqlRequest(query, { limit });

                if (block.relationTo === 'portfolio') docs = data.Portfolios?.docs || [];
                else if (block.relationTo === 'posts') docs = data.Posts?.docs || [];
                else if (block.relationTo === 'services') docs = data.Services?.docs || [];
                else if (block.relationTo === 'events') docs = data.Events?.docs || [];

            } catch (error) {
                console.error('Error fetching archive data via GraphQL:', error);
            }
        }
    } else if (block.populateBy === 'selection' && block.selectedDocs) {
        docs = block.selectedDocs.map((item: any) => item.value);
    }

    if (!docs || docs.length === 0) return null;

    // Specialize rendering for Services
    if (block.relationTo === 'services') {
        return (
            <ServiceArchiveRenderer
                services={docs}
                heading={block.blockName}
                introContent={block.introContent}
            />
        );
    }

    // Specialize rendering for Portfolios
    if (block.relationTo === 'portfolio') {
        return (
            <PortfolioArchiveRenderer
                portfolios={docs}
                blockName={block.blockName}
                introContent={block.introContent}
            />
        );
    }

    if (block.relationTo === 'events') {
        return (
            <EventsArchiveRenderer
                events={docs}
                blockName={block.blockName}
                introContent={block.introContent}
            />
        );
    }

    // Specialize rendering for Posts (Articles) as Slider
    if (block.relationTo === 'posts') {
        return (
            <PostsArchiveRenderer
                posts={docs}
                blockName={block.blockName}
                introContent={block.introContent}
                link={block.link}
            />
        );
    }

    return (
        <SectionContainer name={block.blockName || 'archive-block'} className="py-20 section-padding">
            {block.blockName && (
                <SectionHeading
                    sectionName={block.blockName}
                    id={block.blockName.toLowerCase().replace(/\s+/g, '-') || 'section-heading'}
                    className="mb-8"
                />
            )}

            {block.introContent && (
                <div className="mb-12 max-w-2xl text-lg text-neutral-600">
                    {/* Render RichText here if needed, or simple passed content */}
                    {/* Assuming introContent is RichText, we might need the RichText component from ContentBlock or sharing it */}
                </div>
            )}

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {docs.map((doc: any, index: number) => {
                    // Normalize data structure based on collection type if needed
                    const title = doc.title || doc.name; // Service uses name
                    const slug = doc.slug; // Assuming all use slug
                    const image = doc.heroImage || doc.meta?.image || doc.images?.[0]?.image; // Fallbacks

                    // Determine href based on collection (fallback to root if unknown)
                    // We might need to know the collection type of the doc if it came from selection and is mixed
                    const collection = block.relationTo || (doc.artistOrBrand ? 'portfolio' : 'posts'); // Heuristic
                    const href = collection === 'portfolio' ? `/works/${slug}` :
                        collection === 'services' ? `/services/${slug}` :
                            `/blog/${slug}`;

                    return (
                        <Link key={doc.id || index} href={href} className="group block">
                            <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
                                {image && (
                                    <Image
                                        src={`${CMS_URL}${image.sizes?.medium?.url || image.url}`}
                                        alt={image.alt || title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}
                            </div>
                            <div>
                                {doc.artistOrBrand && (
                                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
                                        {doc.artistOrBrand}
                                    </div>
                                )}
                                {doc.categories && doc.categories.length > 0 && (
                                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-600">
                                        {doc.categories.map((c: any) => c.title).join(', ')}
                                    </div>
                                )}
                                <h3 className="text-xl font-bold leading-tight group-hover:underline decoration-2 underline-offset-4 decoration-primary-950/20">{title}</h3>
                                {doc.description && <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{doc.description}</p>}
                            </div>
                        </Link>
                    );
                })}
            </div>

            {block.link && block.link.url && (
                <div className="mt-12 flex justify-center">
                    <Button
                        href={block.link.url}
                        variant={
                            block.link.appearance === 'outline' ? 'outline' :
                                block.link.appearance === 'ghost' ? 'ghost' :
                                    'primary'
                        }
                    >
                        {block.link.label}
                    </Button>
                </div>
            )}
        </SectionContainer>
    );
};
