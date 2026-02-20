'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import {JustifiedGallery as ReactJustifiedGallery} from '@n-ivan/react-justified-gallery';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001';

interface GalleryImage {
    id: string
    url: string
    alt: string | null
    caption: string | null
    width: number
    height: number
    filename: string
    sizes: {
        thumbnail: {
            url: string
            width: number
            height: number
        },
        small: {
            url: string
            width: number
            height: number
        },
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
    }
}

interface GalleryProps {
    images: GalleryImage[]
    columns?: number
    gap?: 'small' | 'medium' | 'large'
    layout?: 'grid' | 'masonry' | 'justified' | 'carousel'
}

function getOptimizedImageUrl(image: GalleryImage, context: GalleryProps['layout'] | 'thumbnail', containerWidth?: number): string {
    const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001';

    let optimalSize: string | undefined = undefined;

    switch (context) {
        case 'thumbnail':
            optimalSize = 
                image.sizes?.thumbnail?.url || 
                image.sizes?.small?.url || 
                image.url
            break
        case 'grid':
            if (containerWidth) {
                if (containerWidth <= 400) {
                optimalSize = image.sizes?.small?.url || image.sizes?.medium?.url
                } else if (containerWidth <= 800) {
                optimalSize = image.sizes?.medium?.url || image.sizes?.large?.url
                } else {
                optimalSize = image.sizes?.large?.url || image.sizes?.medium?.url
                }
            } else {
                // Default to medium for grids
                optimalSize = image.sizes?.medium?.url || image.sizes?.large?.url || image.sizes?.small?.url
            }
            break
        case 'masonry':
            optimalSize = 
                image.sizes?.large?.url || 
                image.sizes?.medium?.url || 
                image.sizes?.small?.url
            break

        case 'carousel':
            optimalSize = 
                image.sizes?.large?.url || 
                image.sizes?.medium?.url || 
                image.url
            break
        default:
            optimalSize = 
                image.sizes?.medium?.url || 
                image.sizes?.large?.url || 
                image.sizes?.small?.url || 
                image.url
            break
    }
    // Ensure we have a URL
    const finalUrl = optimalSize || image.url
    
    // Add CMS URL prefix if needed
    return finalUrl.startsWith('http') ? finalUrl : `${CMS_URL}${finalUrl}`
}

function getImageDimensions(
  image: GalleryImage,
  context: 'thumbnail' | 'grid' | 'masonry' | 'carousel' | 'lightbox' = 'grid'
): { width: number; height: number } {
  switch (context) {
    case 'thumbnail':
      return {
        width: image.sizes?.thumbnail?.width || 300,
        height: image.sizes?.thumbnail?.height || 300,
      }
    
    case 'grid':
    case 'masonry':
      return {
        width: image.sizes?.medium?.width || image.width || 800,
        height: image.sizes?.medium?.height || image.height || 600,
      }
    
    case 'carousel':
      return {
        width: image.sizes?.large?.width || image.width || 1400,
        height: image.sizes?.large?.height || image.height || 934,
      }
    
    case 'lightbox':
      return {
        width: image.width,
        height: image.height,
      }
    
    default:
      return {
        width: image.width || 800,
        height: image.height || 600,
      }
  }
}

function getContainerWidth(columns: number = 3): number {
  if (typeof window === 'undefined') return 400 // SSR default
  
  const viewportWidth = window.innerWidth
  
  // Account for container padding and gaps
  const containerPadding = 32 // 16px on each side
  const gap = 16 // gap between items
  const totalGaps = (columns - 1) * gap
  
  const availableWidth = viewportWidth - containerPadding - totalGaps
  return Math.floor(availableWidth / columns)
}

function getGapClass(gap: string): string {
  const gapMap = {
    small: 'gap-2',
    medium: 'gap-4',
    large: 'gap-6',
  }
  return gapMap[gap as keyof typeof gapMap] || 'gap-4'
}

export function GridGallery({ images, columns = 3, gap = 'medium' }: GalleryProps) {
    const gapClass = getGapClass(gap)

    return (
        <>
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} ${gapClass} my-8`}>
                {images.map((image, index) => {
                    const imageUrl = getOptimizedImageUrl(image, 'grid')
                    const { width, height } = getImageDimensions(image, 'grid')
                    return (
                        <div key={index} className='relative overflow-hidden rounded-lg'>
                            <Image
                                src={imageUrl}
                                alt={image.alt || image.filename || 'Gallery Image'}
                                width={width}
                                height={height}
                                className='w-full h-full object-cover'
                                sizes={`(max-width: 640px) 100vw, (max-width: 1024px) ${100 / 2}vw, ${100 / columns}vw`}
                            />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export function MasonryGallery({ images, columns = 3, gap = 'medium' }: GalleryProps) {
    // Convert gap to pixel values for masonry
    const gapValue = gap === 'small' ? 8 : gap === 'large' ? 24 : 16;
    
    // Calculate responsive breakpoints based on columns prop
    const breakpointCols = {
        default: columns,
        1024: Math.min(columns, 2),
        640: 1
    };

    return (
        <>
            <Masonry
                breakpointCols={breakpointCols}
                className="flex -ml-4 md:-ml-6 w-auto my-8"
                columnClassName="pl-4 md:pl-6 bg-clip-padding"
            >
                {images.map((image) => {
                    const imageUrl = getOptimizedImageUrl(image, 'masonry')
                    const { height, width } = getImageDimensions(image, 'masonry')
                    return (
                        <div key={image.id} className="relative mb-4 md:mb-6 overflow-hidden rounded-lg">
                            <Image
                                src={imageUrl}
                                alt={image.alt || image.filename || 'Gallery image'}
                                width={width}
                                height={height}
                                className="w-full h-auto"
                                sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${100 / columns}vw`}
                            />
                        </div>
                    )
                })}
            </Masonry>
        </>
     )
}

export function JustifiedGallery({
  images,
  gap = "medium",
}: GalleryProps) {
  const gapValue = gap === "small" ? 8 : gap === "large" ? 24 : 16;

  const formattedImages = images.map((image) => ({
    src: getOptimizedImageUrl(image, "justified"),
    width: image.width,
    height: image.height,
    alt: image.alt || image.filename || "Gallery image",
    id: image.id,
    filename: image.filename,
  }));

    const imageRows = [];
  let i = 0;
  
  while (i < formattedImages.length) {
    // Randomly choose between 2-4 images per row for visual variety
    const imagesInThisRow = Math.min(
      Math.floor(Math.random() * 2) + 2, // Random number between 2-3
      formattedImages.length - i // Don't exceed remaining images
    );
    
    imageRows.push(formattedImages.slice(i, i + imagesInThisRow));
    i += imagesInThisRow;
  }

  return (
    <div className="my-8">
      <ReactJustifiedGallery
        images={imageRows}  // ✅ Pass the array directly
        gap={gapValue}
        renderImage={({ image }) => (
          <Image
            src={image.src}
            alt={image.alt!}
            width={image.width}
            height={image.height}
            className="w-full h-full object-cover rounded-lg"
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 50vw,
                   33vw"
          />
        )}
      />
    </div>
  );
}

export function CarouselGallery({ images }: GalleryProps) {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') prevSlide()
        if (e.key === 'ArrowRight') nextSlide()
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const currentImage = images[currentSlide]
    const imageUrl = getOptimizedImageUrl(currentImage, 'carousel')
    const { width, height } = getImageDimensions(currentImage, 'carousel')
    
    return (
    <>
      <div className="relative my-8 rounded-lg overflow-hidden bg-gray-100">
        {/* Main Image */}
        <div 
          className="relative w-full aspect-video"        >
          <Image
            src={imageUrl}
            alt={currentImage.alt || currentImage.filename || 'Gallery image'}
            width={width}
            height={height}
            className="w-full h-full object-contain"
            priority={currentSlide === 0}
            sizes="100vw"
          />
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-3 rounded-full transition"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-3 rounded-full transition"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Slide Counter */}
        {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
          {currentSlide + 1} / {images.length}
        </div> */}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 my-4">
          {images.map((image, index) => {
            const thumbUrl = getOptimizedImageUrl(image, 'thumbnail')

            return (
              <button
                key={image.id}
                onClick={() => setCurrentSlide(index)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                  index === currentSlide
                    ? 'border-blue-500 ring-2 ring-blue-300'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Image
                  src={thumbUrl}
                  alt={image.alt || `Thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}

export default function Gallery({ images, layout, columns, gap }: GalleryProps) {
  switch (layout) {
    case 'grid':
      return <GridGallery images={images} layout={layout} columns={columns} gap={gap} />
    
    case 'masonry':
      return <MasonryGallery images={images} layout={layout} columns={columns} gap={gap} />
    
    case 'justified':
      return <JustifiedGallery images={images} layout={layout} gap={gap} />
    
    case 'carousel':
      return <CarouselGallery images={images} layout={layout} />
    
    default:
      return <GridGallery images={images} layout="grid" columns={columns} gap={gap} />
  }
}