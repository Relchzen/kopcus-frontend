'use client';
import React, { useState, JSX } from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { PiArrowDownLight } from 'react-icons/pi';

interface ServiceImage {
    id: number;
    mime: string;
    width?: number;
    height?: number;
    name: string;
    caption?: string;
    url: string;
    alternativeText?: string;
}

export interface ServiceDoc {
    id: string;
    name: string;
    slug: string;
    description?: string;
    serviceDescription?: string;
    images?: {
        image: ServiceImage;
    }[];
}

interface ServiceArchiveRendererProps {
    services: ServiceDoc[];
    heading?: string;
    introContent?: any;
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
                    <Tag key={index} className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                        {node.children?.map((child: any, i: number) => renderNode(child, i))}
                    </Tag>
                );
            case 'paragraph':
                return (
                    <p key={index} className="text-lg text-neutral-600">
                        {node.children?.map((child: any, i: number) => renderNode(child, i))}
                    </p>
                );
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

export const ServiceArchiveRenderer = ({ services, heading, introContent }: ServiceArchiveRendererProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!services || services.length === 0) return null;

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
            textNodes = children;
        }
    }

    return (
        <SectionContainer name={heading || "services"} className="section-padding py-24">
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-24 lg:items-start">
                {/* Left Column: Heading & Subheadline (Sticky) */}
                <div className="flex-1 lg:sticky lg:top-32 lg:self-start">
                    {heading && <SectionHeading sectionName={heading} id="services-heading" />}

                    {headingNodes.length > 0 && <RichText content={headingNodes} />}
                    {textNodes.length > 0 && <RichText content={textNodes} />}
                </div>

                {/* Right Column: Services List */}
                <div className="flex-1">
                    <div className="flex flex-col gap-4">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`cursor-pointer border-b border-neutral-200 pb-4 transition-all ${openIndex === index ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                                    }`}
                                onClick={() => toggleAccordion(index)}
                            >
                                <div className="flex items-center justify-between py-2">
                                    <h3 className="text-xl font-bold text-neutral-900 md:text-2xl">
                                        {service.name}
                                    </h3>
                                    <PiArrowDownLight
                                        className={`h-6 w-6 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                            }`}
                                    />
                                </div>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="pt-4 text-neutral-600">
                                        {service.description || service.serviceDescription}
                                    </p>
                                    <div className="mt-6">
                                        <Button href={`/services`} variant="outline" size="sm">
                                            Learn More
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
};
