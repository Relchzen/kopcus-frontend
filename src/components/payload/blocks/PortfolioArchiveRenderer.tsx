'use client';

import React, { JSX } from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

// Reusing getImageUrl from ContentBlock logic
const getImageUrl = (image: any) => {
    let imgObj = image;
    if (image && image.image && !image.url) {
        imgObj = image.image;
    } else if (image && image.value) {
        imgObj = image.value;
    }

    if (!imgObj) return '';
    if (typeof imgObj === 'string') return imgObj;

    const sizes = imgObj.sizes;
    const url = sizes?.medium?.url || sizes?.small?.url || sizes?.og?.url || sizes?.thumbnail?.url || imgObj.url;

    if (!url) return '';
    return `${process.env.NEXT_PUBLIC_CMS_URL || ''}${url}`;
};

// Simplified RichText for internal use
const RichText = ({ content, className }: { content: any[], className?: string }) => {
    if (!content) return null;

    const renderNode = (node: any, index: number) => {
        if (!node) return null;

        switch (node.type) {
            case 'root':
                return <div key={index}>{node.children.map((child: any, i: number) => renderNode(child, i))}</div>;
            case 'text':
                let text = node.text;
                if (!text) return null;
                return <span key={index} className="whitespace-pre-wrap">{text}</span>;
            case 'heading':
                const Tag = node.tag as keyof JSX.IntrinsicElements || 'h3';
                return (
                    <Tag key={index} className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
                        {node.children?.map((child: any, i: number) => renderNode(child, i))}
                    </Tag>
                );
            case 'paragraph':
                return (
                    <p key={index} className="text-sm font-light md:text-lg md:font-normal lg:text-2xl">
                        {node.children?.map((child: any, i: number) => renderNode(child, i))}
                    </p>
                );
            // Add other cases as needed (upload, etc from ContentBlock if required)
             default:
                 if (node.children) {
                    return <div key={index}>{node.children.map((child: any, i: number) => renderNode(child, i))}</div>;
                }
                return null;
        }
    };

    return (
        <div className={className}>
            {content.map((child: any, i: number) => renderNode(child, i))}
        </div>
    );
};


interface PortfolioArchiveRendererProps {
    portfolios: any[];
    introContent?: any;
    blockName?: string;
}

// Text styling
const cardTitleStyles = 'text-md md:text-lg lg:text-2xl font-semibold';
const cardClientStyles = 'text-sm md:text-md lg:text-lg font-medium';
// Underline animation
const underlineAnimation =
  'relative after:absolute after:bottom-[-8px] after:left-0 after:h-[2px] after:w-full after:bg-black after:origin-right after:scale-x-0 after:transition-transform after:duration-600 group-hover:after:origin-left group-hover:after:scale-x-100';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;

export const PortfolioArchiveRenderer = ({ portfolios, introContent, blockName }: PortfolioArchiveRendererProps) => {

    // Logic to split introContent into Heading (Left) and Text (Right)
    let headingNodes: any[] = [];
    let textNodes: any[] = [];

    if (introContent && introContent.root && introContent.root.children) {
        const children = introContent.root.children;
        // Find the first heading node
        const firstHeadingIndex = children.findIndex((child: any) => child.type === 'heading');
        
        if (firstHeadingIndex !== -1) {
            headingNodes = [children[firstHeadingIndex]];
            // Everything else goes to textNodes, excluding the first heading
             textNodes = children.filter((_: any, idx: number) => idx !== firstHeadingIndex);
        } else {
             // If no heading, put everything in textNodes (or headingNodes? let's stick to text)
             textNodes = children;
        }
    }

    return (
        <SectionContainer name={blockName || "portfolio"} className="section-margin mt-16 pt-8">
            <div
                id="portfolio-section-header"
                className="flex flex-col justify-between px-2 md:mb-4 md:flex-row md:items-end md:px-0 lg:mb-8"
            >
                <div className="md:max-w-1/3">
                    {blockName && <SectionHeading sectionName={blockName} id="portfolio-heading" />}
                    {headingNodes.length > 0 && <RichText content={headingNodes} />}
                </div>
                <div className="md:max-w-1/3">
                    {textNodes.length > 0 && <RichText content={textNodes} />}
                </div>
            </div>

            <div id="portfolio-section-content" className="gap-8 py-8 md:columns-2">
                {portfolios.map((item, index) => {
                     const image = item.heroImage || item.meta?.image; 
                     const imageUrl = image ? `${CMS_URL}${image.sizes?.medium?.url || image.url}` : '';
                     
                    return (
                        <Link
                            href={`/works/${item.portfolioSlug}`}
                            key={index}
                            className="event-card group flex cursor-pointer break-inside-avoid flex-col gap-2 pb-4 md:pb-6 lg:pb-8"
                        >
                            <div className="relative mb-2 w-full overflow-hidden rounded-3xl">
                                <div className="relative flex max-h-[640px] w-full items-center justify-center">
                                    {imageUrl && (
                                        <Image
                                            src={imageUrl}
                                            alt={image.alt || item.title}
                                            width={800}
                                            height={640}
                                            className="h-auto w-full object-cover object-center transition-transform duration-600 group-hover:scale-102"
                                            style={{
                                                maxHeight: '640px',
                                            }}
                                            priority={index < 2} // Prioritize first few images
                                        />
                                    )}
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 flex w-full items-center justify-between gap-8 text-end align-baseline text-neutral-800">
                                    <h4 className={cardClientStyles}>{item.artistOrBrand}</h4>
                                    <p className={cardClientStyles}>
                                        {item.projectDate ? new Date(item.projectDate).getFullYear() : ''}
                                    </p>
                                </div>
                                <div className="relative w-fit max-w-full overflow-hidden pb-8">
                                    <h5 className={`${cardTitleStyles} ${underlineAnimation}`}>
                                        {item.title}
                                    </h5>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
             <div id="section-footer" className="flex justify-center">
                <Button size={'none'} variant={'ghost'} href="">
                  <Link href="/works" className="text-xl font-medium">View all projects</Link>
                </Button>
            </div>
        </SectionContainer>
    );
};
