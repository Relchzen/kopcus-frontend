/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Image from 'next/image';
import StrapiBlockRenderer from './StrapiBlockRenderer';

interface Props {
  data: {
    paragraph: any;
    image: {
      id: number;
      url: string;
      alternativeText: string;
      width: number;
      height: number;
    };
  };
}

export default function TwoColumnsParagraphImage({ data }: Props) {
  const imageUrl = data.image?.url;

  return (
    <div className="grid gap-8 md:grid-cols-2 items-center my-12">
      <div className="prose prose-lg prose-neutral">
        <StrapiBlockRenderer content={data.paragraph} />
      </div>
      {imageUrl && (
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            src={imageUrl}
            alt={data.image?.alternativeText || 'Image'}
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
