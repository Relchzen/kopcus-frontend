import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

// import { getEventBySlug, fetchStrapiEvent } from '@/lib/events';
import { notFound } from 'next/navigation';
import BlockRenderer from '@/components/BlockRenderer';
import { parseLexicalContent } from "@/components/PayloadBlockRenderer"
import { getEventBySlug } from '@/lib/events-payload';
import GalleryHydrator from '@/components/GalleryHydrator';

import type { Metadata } from 'next';

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }): Promise<Metadata> {
//   const { slug } = await params;
//   const strapiEvent = await fetchStrapiEvent(slug);

//   if (!strapiEvent?.seo) {
//     return {
//       title: 'Event Not Found',
//     };
//   }

//   const { seo } = strapiEvent;

//   return {
//     title: seo.metaTitle,
//     description: seo.metaDescription,
//     keywords: seo.keywords,
//     robots: seo.metaRobots,
//     alternates: {
//       canonical: seo.canonicalURL,
//     },
//     openGraph: {
//       title: seo.metaTitle,
//       description: seo.metaDescription,
//       // images: seo.metaImage?.url ? [seo.metaImage.url] : undefined, // metaImage is optional and might be missing in sample
//     },
//     // structuredData is handled via script tag usually, but Next.js doesn't support it directly in Metadata object for JSON-LD
//     // We can inject it in the page component if needed, but user asked to generate metadata based on structure.
//     // For JSON-LD, it's better to put it in the Page component.
//   };
// }

function formatDateRange(start?: string, end?: string) {
  if (!start) return null

  const startDate = new Date(start)
  const endDate = end ? new Date(end) : null

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  if (!endDate) {
    return startDate.toLocaleDateString(undefined, options)
  }

  return `${startDate.toLocaleDateString(undefined, options)} – ${endDate.toLocaleDateString(undefined, options)}`
}

function statusBadgeColor(status: string) {
  switch (status) {
    case 'upcoming':
      return 'bg-blue-100 text-blue-800'
    case 'ongoing':
      return 'bg-green-100 text-green-800'
    case 'finished':
      return 'bg-gray-100 text-gray-600'
    default:
      return 'bg-neutral-100 text-neutral-700'
  }
}

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001';

export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  return {
    title: event.meta?.title,
    description: event.meta?.description,
    openGraph: {
      title: event.meta?.title,
      description: event.meta?.description,
      images: `${CMS_URL}${event.meta?.image?.thumbnailURL}`
    },
  };
}


export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const event = await getEventBySlug(slug);
  // const strapiEvent = await fetchStrapiEvent(slug);

  if (!event) {
    notFound();
  }

  // Determine image URLs with fallbacks
  const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001';

  const bannerUrl = event.bannerImage?.sizes?.large?.url 
    || event.bannerImage?.sizes?.medium?.url 
    || event.bannerImage?.url;
  const optimizedBannerUrl = bannerUrl ? `${CMS_URL}${bannerUrl}` : '/riize-banner.png';

  const posterUrl = event.posterImage?.sizes?.medium?.url 
    || event.posterImage?.sizes?.small?.url 
    || event.posterImage?.url;
  const optimizedPosterUrl = posterUrl ? `${CMS_URL}${posterUrl}` : '/PlayWithPagaehun.jpg';

  const content = event.content ? parseLexicalContent(event.content) : '';


  return (
    <main className="min-h-screen bg-white pb-20 text-neutral-900">
      {/* Hero Section */}
      <section className="w-full bg-neutral-900 text-white md:relative">
          {/* Hero Image */}
        <div className="relative w-full">
          <Image
            src={optimizedBannerUrl}
            alt={event.bannerImage?.alt || `${event.title} Banner`}
            width={1920}
            height={1080}
            className="h-auto w-full object-contain"
            priority
          />
          <div className="hidden md:absolute md:inset-0 md:block md:bg-black/40" />
          <div className="hidden md:absolute md:inset-0 md:block md:bg-gradient-to-t md:from-neutral-900 md:via-transparent md:to-transparent" />
        </div>
        {/* Hero Content */}
        <div className="container section-padding relative z-10 flex flex-col items-center pb-12 pt-8 md:absolute md:inset-0 md:flex-row md:items-end md:justify-start md:gap-12 md:pb-12 md:pt-0">
          {/* Poster */}
          <div className="relative aspect-[3/4] w-48 shrink-0 overflow-hidden rounded-xl shadow-2xl md:w-64 lg:w-80">
            <Image
              src={optimizedPosterUrl}
              alt={`${event.title} Poster`}
              fill
              className="object-cover"
            />
          </div>
          {/* Text Content */}
           <div className="mt-8 flex flex-col items-center text-center md:mt-0 md:items-start md:text-left">
             <h1 className="font-display text-5xl font-bold uppercase tracking-wider md:text-7xl lg:text-8xl">
               {event.title}
             </h1>
             <p className="mt-4 max-w-2xl text-lg font-light text-neutral-200 md:text-xl">
               {event.description}
             </p>
            
             <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm font-medium uppercase tracking-widest text-primary-400 md:justify-start">
               <span>{event.dateStatus === 'scheduled' ? new Date(event.startDate).toLocaleDateString() : 'Coming Soon'}</span>
              {(event.location.showLocation || event.eventStatus === 'finished') && (<>
                <span className="hidden md:inline">•</span>
                 <span>{event.location.venue}</span>
              </>
              )} 
             </div>

            {event.ticketAvailability && event.eventStatus === 'scheduled' && (
              <div className="mt-6">
              <Button size="lg" className="px-8 text-lg">
                Get Ticket
              </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container section-padding py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div className="prose prose-lg prose-neutral max-w-none dark:prose-invert">
            {content && (
              <>
                <div 
                  className="prose prose-lg prose-neutral max-w-none"
                  dangerouslySetInnerHTML={{ __html: content }}
                  />
                <GalleryHydrator />
              </>
            )}
          </div>
          {/* Sidebar (Optional Details) */}
          <aside className="space-y-6 rounded-lg border border-neutral-200 p-4">
      {/* Status */}
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusBadgeColor(
            event.eventStatus,
          )}`}
        >
          {event.eventStatus}
        </span>

        {event.dateStatus === 'tba' && (
          <span className="text-xs text-neutral-500">Coming Soon</span>
        )}
      </div>

      {/* Poster Image */}
      {event.posterImage && (
        <div className="overflow-hidden rounded-md">
          <Image
            src={optimizedPosterUrl}
            alt={event.posterImage.alt || 'Event poster'}
            width={event.posterImage.sizes.medium?.width || 400}
            height={event.posterImage.sizes.medium?.height || 600}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {/* Date */}
      {event.dateStatus === 'scheduled' && (
        <div>
          <h4 className="text-lg font-semibold text-neutral-900">Date</h4>
          <p className="mt-1 text-md font-medium text-neutral-700">{formatDateRange(event.startDate, event.endDate)}</p>
        </div>
      )}

      {/* Location */}
      {(event.location.showLocation || event.eventStatus === 'finished') && (
        <div>
          <h4 className="text-lg font-semibold text-neutral-900">Location</h4>

          {event.location.venue && (
            <p className="mt-1 text-md font-medium text-neutral-700">
              {event.location.venue}
            </p>
          )}

          {event.location.address && (
            <p className="text-sm text-neutral-500">
              {event.location.address}
            </p>
          )}

          {(event.location.venue || event.location.address) && (
            <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  [event.location.venue, event.location.address]
                    .filter(Boolean)
                    .join(', '),
                )}&hl=en&z=14&output=embed`}
              ></iframe>
            </div>
          )}
          
                {event.ticketAvailability && event.eventStatus === 'scheduled' && (
                  <div className="mt-6">
                    <Button size="lg" className="px-8 text-lg">
                      Get Ticket
                    </Button>
                  </div>
                )}

          {event.location.linkMaps && (
            <a
              href={event.location.linkMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline"
            >
              Open in Google Maps
            </a>
          )}
        </div>
      )}

      
    </aside>
        </div>
      </section>
    </main>
  );
}

    // <>
    //   <main className="min-h-screen bg-white pb-20 text-neutral-900">
    //   {/* Hero Section */}
    //   <section className="w-full bg-neutral-900 text-white md:relative">
    //     {/* Banner Image (Natural Height) */}
    //     <div className="relative w-full">
    //       <Image
    //         src={event.bannerUrl || '/riize-banner.png'}
    //         alt={`${event.title} Banner`}
    //         width={1920}
    //         height={1080}
    //         className="h-auto w-full object-contain"
    //         priority
    //       />
    //       {/* Desktop Overlay (Only visible on md+) */}
    //       <div className="hidden md:absolute md:inset-0 md:block md:bg-black/40" />
    //       <div className="hidden md:absolute md:inset-0 md:block md:bg-gradient-to-t md:from-neutral-900 md:via-transparent md:to-transparent" />
    //     </div>

    //     {/* Hero Content */}
    //     <div className="container section-padding relative z-10 flex flex-col items-center pb-12 pt-8 md:absolute md:inset-0 md:flex-row md:items-end md:justify-start md:gap-12 md:pb-12 md:pt-0">
    //       {/* Poster */}
    //       <div className="relative aspect-[3/4] w-48 shrink-0 overflow-hidden rounded-xl shadow-2xl md:w-64 lg:w-80">
    //         <Image
    //           src={event.posterUrl || '/PlayWithPagaehun.jpg'}
    //           alt={`${event.title} Poster`}
    //           fill
    //           className="object-cover"
    //         />
    //       </div>

    //       {/* Text Content */}
    //       <div className="mt-8 flex flex-col items-center text-center md:mt-0 md:items-start md:text-left">
    //         <h1 className="font-display text-5xl font-bold uppercase tracking-wider md:text-7xl lg:text-8xl">
    //           {event.title}
    //         </h1>
    //         <p className="mt-4 max-w-2xl text-lg font-light text-neutral-200 md:text-xl">
    //           {event.description}
    //         </p>
            
    //         <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm font-medium uppercase tracking-widest text-primary-400 md:justify-start">
    //           <span>{new Date(event.startAt).toLocaleDateString()}</span>
    //           <span className="hidden md:inline">•</span>
    //           <span>{event.location}</span>
    //         </div>

    //         {/* <div className="mt-8">
    //           <Button size="lg" className="px-8 text-lg">
    //             Buy Tickets - {event.price}
    //           </Button>
    //         </div> */}
    //       </div>
    //     </div>
    //   </section>

    //   {/* Content Section */}
    //   <section className="container section-padding py-16 md:py-24">
    //     <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
    //       {/* Main Content */}
    //       <div className="prose prose-lg prose-neutral max-w-none">
    //         {/* If content is array (Strapi dynamic zone), use BlockRenderer. If string (HTML), use dangerouslySetInnerHTML */}
    //         {Array.isArray(content) ? (
    //           <BlockRenderer content={content} />
    //         ) : (
    //           <div dangerouslySetInnerHTML={{ __html: content as string }} />
    //         )}
    //       </div>

    //       {/* Sidebar (Optional Details) */}
    //       <div className="space-y-8">
    //         <div className="rounded-2xl bg-neutral-50 p-8">
    //           <h3 className="font-display text-2xl font-bold uppercase text-neutral-900">
    //             Event Details
    //           </h3>
    //           <ul className="mt-6 space-y-4 text-neutral-600">
    //             <li className="flex items-start gap-3">
    //               <span className="font-bold text-neutral-900">Date:</span>
    //               <span>{new Date(event.startAt).toLocaleDateString()}</span>
    //             </li>
    //             <li className="flex items-start gap-3">
    //               <span className="font-bold text-neutral-900">Time:</span>
    //               <span>{new Date(event.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    //             </li>
    //             <li className="flex items-start gap-3">
    //               <span className="font-bold text-neutral-900">Location:</span>
    //               <span>{event.location}</span>
    //             </li>
    //           </ul>
    //           {/* <div className="mt-8">
    //             <Button className="w-full">Get Directions</Button>
    //           </div> */}
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </main>
    // </>