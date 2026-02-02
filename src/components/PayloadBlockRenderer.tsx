interface LexicalNode {
  type: string
  children: LexicalNode[]
  text?: string
  format?: number | string
  tag?: string
  url?: string
  fields?: any
  [key: string]: any
}

interface LexicalContent {
  root: LexicalNode
}

const TextFormat = {
  BOLD: 1,
  ITALIC: 2,
  STRIKETHROUGH: 4,
  UNDERLINE: 8,
  CODE: 16,
  SUBSCRIPT: 32,
  SUPERSCRIPT: 64,
}

function hasFormat(format: number, flag: number): boolean {
  return (format & flag) !== 0
}

export function parseLexicalContent(content: LexicalContent): string {
  if (!content || !content.root) return ''

  return parseNode(content.root)
}

function parseNode(node: LexicalNode): string {
    if (!node) return ''

    switch (node.type) {
        case 'root':
            return parseChildren(node.children)
        case 'paragraph':
            return `<p class="mb-4 text-gray-700 leading-relaxed">${parseChildren(node.children)}</p>`
        case 'heading':
            const headingClasses: Record<string, string> = {
              'h1': 'text-4xl font-bold mb-6',
              'h2': 'text-3xl font-bold mb-5',
              'h3': 'text-2xl font-bold mb-4',
              'h4': 'text-xl font-bold mb-3',
              'h5': 'text-lg font-bold mb-2',
              'h6': 'text-base font-bold mb-2',
            }
            const headingClass = headingClasses[node.tag || 'h2'] || headingClasses['h2']
            return `<${node.tag} class="${headingClass}">${parseChildren(node.children)}</${node.tag}>`
        case 'text':
            return parseTextNode(node)
        case 'linebreak':
            return '<br />'
        case 'link':
            const url = node.fields?.url || node.url || '#'
            return `<a href="${url}" class="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">${parseChildren(node.children)}</a>`
        case 'list':
      const listTag = node.listType === 'number' ? 'ol' : 'ul'
      const listClass = node.listType === 'number' ? 'list-decimal' : 'list-disc'
      return `<${listTag} class="mb-4 pl-6 ${listClass}">${parseChildren(node.children)}</${listTag}>`
    
    case 'listitem':
      return `<li class="mb-1">${parseChildren(node.children)}</li>`
    
    case 'quote':
      return `<blockquote class="border-l-4 border-primary-500 pl-4 italic my-6 text-gray-600">${parseChildren(node.children)}</blockquote>`
    
    case 'block':
      return parseBlock(node.fields)
    
    default:
      return parseChildren(node.children)
    }
}

function parseChildren(children: LexicalNode[]): string {
     if (!children || children.length === 0) return ''
  
  return children.map(child => parseNode(child)).join('')
}

function parseTextNode(node: LexicalNode): string {
    if (!node) return ''

    let text = node.text ?? ''

    const format = typeof node.format === 'number' ? node.format : 0

    if (hasFormat(format, TextFormat.BOLD)) {
        text = `<strong>${text}</strong>`
    }

    if (hasFormat(format, TextFormat.ITALIC)) {
        text = `<em>${text}</em>`
    }
    if (hasFormat(format, TextFormat.STRIKETHROUGH)) {
        text = `<s>${text}</s>`
    }
    if (hasFormat(format, TextFormat.UNDERLINE)) {
        text = `<u>${text}</u>`
    }
    if (hasFormat(format, TextFormat.CODE)) {
        text = `<code>${text}</code>`
    }

    return text
}

function parseBlock(node: any): string {
    const { blockType } = node
    switch (blockType) {
    case 'mediaBlock':
      return parseMediaBlock(node)
    
    case 'gallery':
      return parseGallery(node)
    
    case 'code':
      return parseCodeBlock(node)
    
    case 'quote':
      return parseQuoteBlock(node)
    
    default:
      return ''
  }
}

function parseColumns(fields: any): string {
    if (!fields?.columns || fields.columns.length === 0) return ''

    const layout:string = fields.layout || '2-equals'
    const gap:string = fields.gap || 'medium'

  const gapClass = {
        small: 'gap-4',
        medium: 'gap-6',
        large: 'gap-8',
    }[gap] || 'gap-6' 
    
    const layoutClass = {
        '2-equal': 'md:grid-cols-2',
    '3-equal': 'md:grid-cols-3',
    '4-equal': 'md:grid-cols-4',
    '1-2': 'md:grid-cols-3', // 1/3 and 2/3
    '2-1': 'md:grid-cols-3', // 2/3 and 1/3
    }[layout] || 'md:grid-cols-2'
    
    const columnHtml = fields.columns.map((column: any, index: number) => {
        if (!column.content || column.content.length === 0) return ''

        const columnContent = column.content.map((block: any) => {
            return parseColumnBlock(block)
        }).join('')

let colSpan = ''
    if (layout === '1-2') {
      colSpan = index === 0 ? 'md:col-span-1' : 'md:col-span-2'
    } else if (layout === '2-1') {
      colSpan = index === 0 ? 'md:col-span-2' : 'md:col-span-1'
    }

    // Vertical alignment
    const alignClass = {
      top: 'items-start',
      center: 'items-center',
      bottom: 'items-end',
    }[column.verticalAlign as string || 'top'] || 'items-start'

    return `
      <div class="column-item ${colSpan} flex flex-col ${alignClass}">
        ${columnContent}
      </div>
    `
    }).join('')

    return `
    <div class="columns-block grid grid-cols-1 ${layoutClass} ${gapClass} my-8">
      ${columnHtml}
    </div>
  `
}

// Parse blocks inside columns
function parseColumnBlock(block: any): string {
  const { blockType } = block

  switch (blockType) {
    case 'richText':
      // Parse rich text content
      if (block.text && block.text.root) {
        return parseNode(block.text.root)
      }
      return ''
    
    case 'image':
      // Parse image block
      return parseColumnImage(block.image)
    
    case 'mediaBlock':
      // Parse media block
      return parseMediaBlock({ media: block.media })
    
    default:
      return ''
  }
}

// Parse image in column
function parseColumnImage(image: any): string {
  if (!image) return ''

  const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'
  const alt = image.alt || image.filename || 'Image'
  
  // Use appropriate size for columns
  const sizeUrl = image.sizes?.large?.url || image.sizes?.medium?.url || image.url
  const optimizedUrl = sizeUrl.startsWith('http') ? sizeUrl : `${CMS_URL}${sizeUrl}`
  const width = image.sizes?.large?.width || image.sizes?.medium?.width || image.width || 800
  const height = image.sizes?.large?.height || image.sizes?.medium?.height || image.height || 600

  return `
    <figure class="my-4">
      <img 
        src="${optimizedUrl}" 
        alt="${alt}"
        width="${width}"
        height="${height}"
        class="w-full h-auto rounded-lg"
        loading="lazy"
      />
      ${image.caption ? `<figcaption class="text-sm text-gray-600 mt-2 text-center">${image.caption}</figcaption>` : ''}
    </figure>
  `
}

function parseMediaBlock(fields: any): string {
  if (!fields?.media) return ''

  const media = fields.media
  const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'
  const imageUrl = media.url.startsWith('http') ? media.url : `${CMS_URL}${media.url}`
  const alt = media.alt || media.filename || 'Image'
  
  // Use 'medium' size if available (large might be null), fallback to original
  const sizeUrl = media.sizes?.large?.url || media.sizes?.medium?.url || media.url
  const optimizedUrl = sizeUrl.startsWith('http') ? sizeUrl : `${CMS_URL}${sizeUrl}`
  const width = media.sizes?.large?.width || media.sizes?.medium?.width || media.width || 800
  const height = media.sizes?.large?.height || media.sizes?.medium?.height || media.height || 600

  return `
    <figure class="my-4 md:my-6 lg:my-8">
      <div class="relative w-full overflow-hidden rounded-lg">
        <img 
          src="${optimizedUrl}" 
          alt="${alt}"
          width="${width}"
          height="${height}"
          class="w-full h-auto object-contain"
          loading="lazy"
        />
      </div>
      ${media.caption ? `<figcaption class="text-center text-sm text-gray-500 mt-2">${media.caption}</figcaption>` : ''}
    </figure>
  `
}

function parseGallery(fields: any): string {
  if (!fields?.images || fields.images.length === 0) return ''

  const layout = fields.layout || 'grid'
  const columns = fields.columns || 3
  const gap = fields.gap || 'medium'

  // Generate a unique ID for this gallery instance
  const galleryId = `gallery-${Math.random().toString(36).substr(2, 9)}`

  // Serialize the data for hydration
  const galleryData = {
    images: fields.images,
    layout,
    columns,
    gap,
  }

  // Return a placeholder div with data attributes for client-side hydration
  return `
    <div 
      id="${galleryId}"
      class="gallery-placeholder my-8"
      data-gallery='${JSON.stringify(galleryData).replace(/'/g, '&apos;')}'
    ></div>
  `
}

// Export this function to be used in your page component
export function hydrateGalleries() {
  if (typeof window === 'undefined') return

  const galleries = document.querySelectorAll('.gallery-placeholder')
  
  galleries.forEach((element) => {
    const data = element.getAttribute('data-gallery')
    if (!data) return

    try {
      const galleryData = JSON.parse(data)
      // The actual React component will be hydrated here
      // This is handled by the GalleryHydrator component
    } catch (error) {
      console.error('Failed to parse gallery data:', error)
    }
  })
}

function parseCodeBlock(fields: any): string {
  const code = fields?.code || ''
  const language = fields?.language || 'javascript'

  return `
    <pre class="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4">
      <code class="language-${language}">${escapeHtml(code)}</code>
    </pre>
  `
}

function parseQuoteBlock(fields: any): string {
  const quote = fields?.quote || ''
  const author = fields?.author || ''

  return `
    <blockquote class="border-l-4 border-primary-500 pl-4 italic my-6 text-gray-600">
      <p class="text-lg">${quote}</p>
      ${author ? `<cite class="block mt-2 text-sm not-italic text-gray-600">— ${author}</cite>` : ''}
    </blockquote>
  `
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}



export function PayloadBlockRenderer({ content }: { content: LexicalContent }) {
const html = parseLexicalContent(content)
  
  return (
    <div 
      className="space-y-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
    )
}
