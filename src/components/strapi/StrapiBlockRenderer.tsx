import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Types based on Strapi Blocks structure
type TextModifier = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

type TextNode = {
  type: 'text';
  text: string;
} & TextModifier;

type LinkNode = {
  type: 'link';
  url: string;
  children: TextNode[];
};

type ImageNode = {
  type: 'image';
  image: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
    caption?: string;
  };
};

type ListItemNode = {
  type: 'list-item';
  children: (TextNode | LinkNode)[];
};

type ListNode = {
  type: 'list';
  format: 'ordered' | 'unordered';
  children: ListItemNode[];
};

type HeadingNode = {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: (TextNode | LinkNode)[];
};

type ParagraphNode = {
  type: 'paragraph';
  children: (TextNode | LinkNode)[];
};

type QuoteNode = {
  type: 'quote';
  children: (TextNode | LinkNode)[];
};

type CodeNode = {
  type: 'code';
  children: TextNode[];
};

export type Block =
  | ParagraphNode
  | HeadingNode
  | ListNode
  | QuoteNode
  | CodeNode
  | ImageNode
  | LinkNode; // Link can be a top level block in some contexts or child

interface StrapiBlockRendererProps {
  content: Block[];
}

const renderText = (node: TextNode, index: number) => {
  let text: React.ReactNode = node.text;

  if (node.bold) text = <strong key={`bold-${index}`}>{text}</strong>;
  if (node.italic) text = <em key={`italic-${index}`}>{text}</em>;
  if (node.underline) text = <u key={`underline-${index}`}>{text}</u>;
  if (node.strikethrough) text = <s key={`strike-${index}`}>{text}</s>;
  if (node.code) text = <code key={`code-${index}`} className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono text-red-500">{text}</code>;

  return <React.Fragment key={index}>{text}</React.Fragment>;
};

const renderChildren = (children: (TextNode | LinkNode)[]) => {
  return children.map((child, index) => {
    if (child.type === 'link') {
      return (
        <Link key={index} href={child.url} className="text-primary-600 hover:underline">
          {renderChildren(child.children)}
        </Link>
      );
    }
    return renderText(child as TextNode, index);
  });
};

export default function StrapiBlockRenderer({ content }: StrapiBlockRendererProps) {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return (
    <div className="space-y-4">
      {content.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {renderChildren(block.children)}
              </p>
            );
          case 'heading':
            const Tag = `h${block.level}` as React.ElementType;
            const headingClasses = {
              1: 'text-4xl font-bold mb-6',
              2: 'text-3xl font-bold mb-5',
              3: 'text-2xl font-bold mb-4',
              4: 'text-xl font-bold mb-3',
              5: 'text-lg font-bold mb-2',
              6: 'text-base font-bold mb-2',
            };
            return (
              <Tag key={index} className={headingClasses[block.level]}>
                {renderChildren(block.children)}
              </Tag>
            );
          case 'list':
            const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
            return (
              <ListTag key={index} className={`mb-4 pl-6 ${block.format === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
                {block.children.map((item, itemIndex) => (
                  <li key={itemIndex} className="mb-1">
                    {renderChildren(item.children)}
                  </li>
                ))}
              </ListTag>
            );
          case 'quote':
            return (
              <blockquote key={index} className="border-l-4 border-primary-500 pl-4 italic my-6 text-gray-600">
                {renderChildren(block.children)}
              </blockquote>
            );
          case 'code':
            return (
              <pre key={index} className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4">
                <code>{block.children[0].text}</code>
              </pre>
            );
          case 'image':
             if (!block.image) return null;
             const imgUrl = block.image.url.startsWith('http') 
                ? block.image.url 
                : `${process.env.NEXT_PUBLIC_STRAPI_URL}${block.image.url}`;
            return (
              <div key={index} className="my-8">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                  <Image
                    src={imgUrl}
                    alt={block.image.alternativeText || 'Image'}
                    fill
                    className="object-cover"
                  />
                </div>
                {block.image.caption && (
                  <p className="text-center text-sm text-gray-500 mt-2">{block.image.caption}</p>
                )}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
