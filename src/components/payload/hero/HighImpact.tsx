'use client';
import React from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '@/components/ui/Button';

// Helper function to extract text from Lexical nodes
const extractText = (node: any): string => {
    if (!node) return '';
    if (node.text) return node.text;
    if (node.children) {
        return node.children.map((child: any) => extractText(child)).join('');
    }
    return '';
};

// Helper to ensure URL is valid
const getImageUrl = (image: any) => {
    if (!image) return '';
    const url = typeof image === 'string' ? image : image.url;
    if (!url) return '';
    return `${process.env.NEXT_PUBLIC_CMS_URL || ''}${url}`;
};

export default function HighImpact({ hero }: { hero: any }) {
  if (!hero) return null;

  // Extract content from richText
  let hero_headline = '';
  let hero_subheadline = '';

  if (hero.richText?.root?.children) {
      const children = hero.richText.root.children;
      // Assume first heading is headline, first paragraph is subheadline
      const headingNode = children.find((c: any) => c.type === 'heading');
      const paragraphNode = children.find((c: any) => c.type === 'paragraph');

      if (headingNode) hero_headline = extractText(headingNode);
      if (paragraphNode) hero_subheadline = extractText(paragraphNode);

      // Fallback if no specific types found
      if (!hero_headline && children.length > 0) hero_headline = extractText(children[0]);
      if (!hero_subheadline && children.length > 1) hero_subheadline = extractText(children[1]);
  }

  // Extract links
  const primaryLink = hero.links && hero.links.length > 0 ? hero.links[0] : null;
  const hero_cta_text = primaryLink?.link?.label || primaryLink?.label || 'Learn More';
  const hero_cta_link = primaryLink?.link?.url || primaryLink?.url || '#';

  const backgroundImage = hero.images && hero.images.length > 0 ? hero.images[0] : null;
  const backgroundUrl = getImageUrl(backgroundImage);

  return (
    <SectionContainer name="hero" className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden text-center text-white">
      {backgroundUrl && (
        <div className="absolute inset-0 z-0">
          <NextImage
            src={backgroundUrl}
            alt={backgroundImage?.alternativeText || "Hero Background"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" /> {/* Overlay for text readability */}
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4">
        {hero_headline && (
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            {hero_headline}
          </h1>
        )}
        
        {hero_subheadline && (
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90 md:text-xl">
            {hero_subheadline}
          </p>
        )}

        {primaryLink && (
           <Button 
                size={'responsive-md'} 
                href={hero_cta_link}
                className="bg-white text-black hover:bg-white/90"
            >
                {hero_cta_text}
            </Button>
        )}
      </div>
    </SectionContainer>
  );
}
