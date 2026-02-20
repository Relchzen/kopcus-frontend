import React, {JSX} from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';

// Reuse the getImageUrl helper or better yet, make it a utility.
// For now, I'll inline a robust version here or import if I create a util later.
const getImageUrl = (image: any) => {
    let imgObj = image;
    if (image && image.image && !image.url) {
        imgObj = image.image;
    } else if (image && image.value) { // Handle rich text upload node value
        imgObj = image.value;
    }

    if (!imgObj) return '';
    if (typeof imgObj === 'string') return imgObj;

    const sizes = imgObj.sizes;
    const url = sizes?.medium?.url || sizes?.small?.url || sizes?.og?.url || sizes?.thumbnail?.url || imgObj.url;

    if (!url) return '';
    return `${process.env.NEXT_PUBLIC_CMS_URL || ''}${url}`;
};

const RichText = ({ content }: { content: any }) => {
    if (!content || !content.root || !content.root.children) return null;

    const renderNode = (node: any, index: number) => {
        if (!node) return null;

        switch (node.type) {
            case 'root':
                return <div key={index}>{node.children.map((child: any, i: number) => renderNode(child, i))}</div>;
            case 'text':
                // rudimentary text handling
                let text = node.text;
                if (!text) return null;
                // Basic formatting (bold, italic etc could be added here checking node.format)
                return <span key={index} className="whitespace-pre-wrap">{text}</span>;
            case 'heading':
                const Tag = node.tag as keyof JSX.IntrinsicElements || 'h3';
                return (
                    <Tag key={index} className="text-lg font-semibold tracking-tighter md:text-2xl lg:text-4xl">
                        {node.children?.map((child: any, i: number) => renderNode(child, i))}
                    </Tag>
                );
            case 'paragraph':
                return (
                    <p key={index} className="lg:text-md text-sm font-light md:text-sm md:font-normal">
                        {node.children?.map((child: any, i: number) => renderNode(child, i))}
                    </p>
                );
            case 'upload':
                const imageUrl = getImageUrl(node);
                if (!imageUrl) return null;
                
                const width = node.value?.width || 800;
                const height = node.value?.height || 600;
                
                return (
                    <div key={index} className="my-2 overflow-hidden rounded-2xl bg-neutral-100">
                         <NextImage
                            src={imageUrl}
                            alt={node.value?.alt || node.value?.filename || 'Image'}
                            width={width}
                            height={height}
                            className="h-auto w-full object-cover"
                         />
                    </div>
                );
            default:
                 if (node.children) {
                    return <div key={index}>{node.children.map((child: any, i: number) => renderNode(child, i))}</div>;
                }
                return null;
        }
    };

    return (
        <div className="rich-text">
            {content.root.children.map((child: any, i: number) => renderNode(child, i))}
        </div>
    );
};


const getColumnWidth = (size: string) => {
    switch (size) {
        case 'full': return 'col-span-12';
        case 'half': return 'col-span-12 md:col-span-6';
        case 'oneThird': return 'col-span-12 md:col-span-4';
        case 'twoThirds': return 'col-span-12 md:col-span-8';
        default: return 'col-span-12';
    }
};


export const ContentBlock = ({ block }: { block: any }) => {
    if (!block || !block.columns) return null;
    const firstRichTextIndex = block.columns.findIndex((col: any) => col.richText && col.richText.root && col.richText.root.children && col.richText.root.children.length > 0);

    return (
        <SectionContainer name={block.blockName} className="py-20 section-padding"> {/* Standard padding */}
            <div className="grid grid-cols-12 gap-x-8 gap-y-6">
                {block.columns.map((col: any, index: number) => {
                    return (
                    <div key={col.id || index} className={`${getColumnWidth(col.size)} flex flex-col justify-center`}>
                        {index === firstRichTextIndex && block.blockName && (
                            <SectionHeading
                                sectionName={block.blockName}
                                id={block.blockName?.toLowerCase().replace(/\s+/g, '-') || 'section-heading'}
                                className="mb-6"
                            />
                        )}
                        {col.richText && <RichText content={col.richText} />}
                        
                        {col.enableLink && col.link && (
                            <div className="mt-4">
                                    <Button 
                                        size={'sm'}
                                    href={col.link.url} 
                                    variant={
                                        col.link.appearance === 'outline' ? 'outline' : 
                                        col.link.appearance === 'ghost' ? 'ghost' : 
                                        'primary'
                                    }
                                >
                                    {col.link.label}
                                </Button>
                            </div>
                        )}
                    </div>
                )})}
            </div>
        </SectionContainer>
    );
};
