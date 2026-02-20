import React from 'react';
import EventSection from '@/components/sections/EventSection';
import MobileEventSection from '@/components/sections/MobileEventSection';
import { Event } from '@/lib/events';

interface EventsArchiveRendererProps {
    events: any[]; // Using any because we don't have strong types for Payload docs here, or we could define a partial type
    blockName?: string;
    introContent?: any;
}

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001';

export const EventsArchiveRenderer: React.FC<EventsArchiveRendererProps> = ({ events, blockName, introContent }) => {

    // Map Payload events to the Event interface expected by the sections
    const mappedEvents: Event[] = events.map(doc => {
        const bannerUrl = doc.bannerImage?.sizes?.large?.url
            || doc.bannerImage?.sizes?.medium?.url
            || doc.bannerImage?.url;

        const posterUrl = doc.posterImage?.sizes?.medium?.url
            || doc.posterImage?.sizes?.small?.url
            || doc.posterImage?.url;

        return {
            id: doc.id,
            slug: doc.slug,
            title: doc.title,
            description: doc.description || doc.eventDescription || '',
            content: '', // Not used in the list view
            startAt: doc.startDate,
            endAt: doc.endDate,
            location: doc.location?.venue || '',
            price: '', // Not available in payload yet
            status: doc.eventStatus === 'published' ? 'Available' :
                doc.eventStatus === 'scheduled' ? 'Coming Soon' :
                    doc.eventStatus === 'finished' ? 'Ended' :
                        doc.eventStatus === 'cancelled' ? 'Unavailable' :
                            doc.eventStatus, // Fallback
            bannerUrl: bannerUrl ? `${CMS_URL}${bannerUrl}` : '/riize-banner.png',
            posterUrl: posterUrl ? `${CMS_URL}${posterUrl}` : '/PlayWithPagaehun.jpg',
            artist: '', // Not in payload
            ticketLink: doc.ticketLink || '',
        };
    });

    if (!mappedEvents || mappedEvents.length === 0) return null;

    return (
        <div className="w-full relative">
            {/* Desktop View */}
            <div className="hidden md:block">
                <EventSection events={mappedEvents} title={blockName} />
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
                <MobileEventSection events={mappedEvents} title={blockName} />
            </div>
        </div>
    );
};
