/* eslint-disable @typescript-eslint/no-explicit-any */
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

export default function TwoColumnsImageParagraph({ data }: Props) {
  const imageUrl = data.image?.url;

  return (
    <div className="grid gap-8 md:grid-cols-2 items-center my-12">
      {imageUrl && (
        <div className="relative aspect-square w-full overflow-hidden rounded-xl order-2 md:order-1">
          <Image
            src={imageUrl}
            alt={data.image?.alternativeText || 'Image'}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="prose prose-lg prose-neutral order-1 md:order-2">
        <StrapiBlockRenderer content={data.paragraph} />
      </div>
    </div>
  );
}
