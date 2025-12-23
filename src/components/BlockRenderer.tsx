'use client';


import StrapiBlockRenderer from './strapi/StrapiBlockRenderer';
import TwoColumnsParagraphImage from './strapi/TwoColumnsParagraphImage';
import TwoColumnsImageParagraph from './strapi/TwoColumnsImageParagraph';
import ImageGallery from './strapi/ImageGallery';
import Media from './strapi/Media';

interface Props {
  content: unknown; // Strapi dynamic zone or blocks
  className?: string;
}

export default function BlockRenderer({ content, className }: Props) {
  if (!content) return null;

  // Handle Dynamic Zone (array of components)
  if (Array.isArray(content)) {
    console.log(content);
    return (
      <div className={className}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {content.map((block: any, index: number) => {
          switch (block.__component) {
            case 'two-columns.paragraph-image':
              return <TwoColumnsParagraphImage key={index} data={block} />;
            case 'two-columns.image-paragraph':
              return <TwoColumnsImageParagraph key={index} data={block} />;
            case 'image-gallery.image-gallery':
              return <ImageGallery key={index} data={block} />;
            case 'blog-components.rich-text':
              return (
                <div key={index} className="prose prose-lg prose-neutral my-8">
                  <StrapiBlockRenderer content={block.content} />
                </div>
              );
            case 'blog-components.media':
              return <Media key={index} data={block} />;
            case 'blog-components.quote':
              return (
                <blockquote key={index} className="my-8 border-l-4 border-primary-500 pl-4 text-xl italic text-gray-700">
                  {block.quote}
                  {block.author && <footer className="mt-2 text-sm font-semibold not-italic text-gray-900">— {block.author}</footer>}
                </blockquote>
              );
            default:
              console.warn(`Unknown component: ${block.__component}`);
              return null;
          }
        })}
      </div>
    );
  }

  // Handle single Rich Text Block (legacy support or direct usage)
  return (
    <div className={className}>


      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <StrapiBlockRenderer content={content as any} />
    </div>
  );
}
