import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  data: {
    layout?: 'grid' | 'masonry' | 'carousel' | 'justified' | 'reel' | 'mosaic';
    images: {
      id: number;
      url: string;
      alternativeText: string;
      width: number;
      height: number;
    }[];
  };
}

export default function ImageGallery({ data }: Props) {

  const images = data.images || [];
  const layout = data.layout || 'grid';

  console.log(images);
  console.log(layout);

  if (images.length === 0) return null;

  const renderLayout = () => {
    switch (layout) {
      case 'masonry':
        return (
          <div className="columns-1 gap-4 space-y-4 md:columns-2 lg:columns-3">
            {images.map((img) => (
              <div key={img.id} className="break-inside-avoid overflow-hidden rounded-xl bg-neutral-100">
                <Image
                  src={img.url}
                  alt={img.alternativeText || 'Gallery Image'}
                  width={img.width}
                  height={img.height}
                  className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        );

      case 'carousel':
        return (
          <div className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative aspect-[4/3] w-[80vw] flex-none snap-center overflow-hidden rounded-xl bg-neutral-100 md:w-[60vw] lg:w-[40vw]"
              >
                <Image
                  src={img.url}
                  alt={img.alternativeText || 'Gallery Image'}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        );

      case 'justified':
        return (
          <>
            {/* Mobile: Masonry Layout */}
            <div className="block md:hidden">
              <div className="columns-2 gap-4 space-y-4">
                {images.map((img) => (
                  <div key={img.id} className="break-inside-avoid overflow-hidden rounded-xl bg-neutral-100">
                    <Image
                      src={img.url}
                      alt={img.alternativeText || 'Gallery Image'}
                      width={img.width}
                      height={img.height}
                      className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Justified Layout */}
            <div className="hidden md:flex flex-wrap gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="relative h-64 flex-grow overflow-hidden rounded-xl bg-neutral-100 md:h-80"
                  style={{ width: (img.width / img.height) * 320 }} // Approximate width based on aspect ratio
                >
                  <Image
                    src={img.url}
                    alt={img.alternativeText || 'Gallery Image'}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </>
        );

      case 'reel':
        return (
          <div className="group relative flex overflow-hidden">
            <div className="flex animate-marquee gap-4">
              {[...images, ...images].map((img, idx) => (
                <div
                  key={`${img.id}-${idx}`}
                  className="relative aspect-[3/4] w-48 flex-none overflow-hidden rounded-xl bg-neutral-100 md:w-64"
                >
                  <Image
                    src={img.url}
                    alt={img.alternativeText || 'Gallery Image'}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'mosaic':
        return (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className={cn(
                  "relative overflow-hidden rounded-xl bg-neutral-100",
                  idx % 3 === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                )}
              >
                <Image
                  src={img.url}
                  alt={img.alternativeText || 'Gallery Image'}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        );

      case 'grid':
      default:
        return (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {images.map((img) => (
              <div key={img.id} className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-100">
                <Image
                  src={img.url}
                  alt={img.alternativeText || 'Gallery Image'}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        );
    }
  };

  return <div className="my-12 w-full">{renderLayout()}</div>;
}
