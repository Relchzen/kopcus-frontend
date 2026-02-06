'use client';

import React, { JSX } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { useRef, useState, useEffect } from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import { SectionHeading } from '@/components/ui/SectionHeading';;
import Link from 'next/link';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL

interface PostsArchiveRendererProps {
    posts: any[];
    introContent?: any;
    blockName?: string;
    link?: {
        type?: 'reference' | 'custom';
        label: string;
        url: string;
        appearance?: 'default' | 'outline' | 'ghost'; // Correct payload appearance types
    };
}

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

export const PostsArchiveRenderer = ({ posts, introContent, blockName, link }: PostsArchiveRendererProps) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    const handleScroll = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            const maxScroll = scrollWidth - clientWidth;
            if (maxScroll > 0) {
                const currentProgress = (scrollLeft / maxScroll) * 100;
                setProgress(currentProgress);
            }
        }
    };

    // Simplified logic: Render all introContent together in the right column
    const contentNodes = introContent?.root?.children || [];

    if (posts.length === 0) return null;

    return (
        <SectionContainer name={blockName || "posts"} className="section-padding py-12 overflow-visible">
            {/* Header Content */}
             <div
                className="flex flex-col justify-between px-2 mb-12 lg:mb-16 md:flex-row md:items-start md:px-0"
            >
                <div className="md:max-w-[40%]">
                    {blockName && <SectionHeading sectionName={blockName} id="posts-heading" />}
                </div>
                
                <div className="flex gap-6 justify-between w-full md:max-w-[70%]">
                    {contentNodes.length > 0 && <RichText content={contentNodes} className="flex-1 min-w-0" />}

                    {/* Navigation Button */}
                    {link && link.url && (
                        <Button 
                            href={link.url}
                            variant={link.appearance === 'outline' ? 'outline' : link.appearance === 'ghost' ? 'ghost' : 'primary'}
                            className="w-fit flex-shrink-0"
                        >
                            {link.label}
                        </Button>
                    )}
                </div>
            </div>

            {/* Slider */}
            <div className="relative w-full">
                <div 
                    ref={sliderRef}
                    onScroll={handleScroll}
                    className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {posts.map((post, idx) => {
                             const image = post.heroImage || post.meta?.image; 
                             const imageUrl = image ? `${CMS_URL}${image.sizes?.medium?.url || image.url}` : '';
                        
                        return (
                            <Link
                                key={`${post.id}-${idx}`}
                                href={`/posts/${post.slug}`}
                                className="snap-start group relative flex w-[85vw] flex-none flex-col gap-4 overflow-hidden rounded-3xl md:w-[45vw] lg:w-[30vw]"
                            >
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-neutral-100">
                                    {imageUrl && (
                                        <Image
                                            src={imageUrl}
                                            alt={image.alt || post.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    {post.categories && post.categories.length > 0 && (
                                        <div className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                                            {post.categories.map((c: any) => c.title).join(', ')}
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold leading-tight group-hover:underline decoration-2 underline-offset-4 decoration-primary-950/20 md:text-2xl">
                                        {post.title}
                                    </h3>
                                    {post.publishedAt && (
                                        <p className="text-xs font-medium text-neutral-500">
                                            {new Date(post.publishedAt).toLocaleDateString()}
                                        </p>
                                    )}
                                    {post.description && (
                                        <p className="line-clamp-2 text-sm text-neutral-600">
                                            {post.description}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
                
                 {/* Scroll Indicator */}
                 <div className="mt-8 flex justify-center">
                    <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-neutral-200">
                        <div 
                            className="h-full bg-primary-600 transition-all duration-150 ease-out"
                            style={{ width: `${Math.max(5, progress)}%` }} // Min width 5% for visibility
                        />
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
};
