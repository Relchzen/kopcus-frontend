import React from 'react';
import Image from 'next/image';

interface Props {
  data: {
    file?: {
      url: string;
      alternativeText?: string;
      width?: number;
      height?: number;
      caption?: string;
    };
  };
}

export default function Media({ data }: Props) {
  if (!data.file) return null;

  const imgUrl = data.file.url.startsWith('http')
    ? data.file.url
    : `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.file.url}`;

  return (
    <div className="my-4 md:my-6 lg:my-8 w-full">
      <div className="relative w-full overflow-hidden rounded-lg">
        <Image
          src={imgUrl}
          alt={data.file.alternativeText || 'Media'}
          width={data.file.width || 1200}
          height={data.file.height || 800}
          className="w-full h-auto object-contain"
        />
      </div>
      {data.file.caption && (
        <p className="text-center text-sm text-gray-500 mt-2">{data.file.caption}</p>
      )}
    </div>
  );
}
