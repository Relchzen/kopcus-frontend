'use client'

import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import Gallery from './Gallery'

export default function GalleryHydrator() {
  // Track which elements have been hydrated to prevent duplicates
  const hydratedElements = useRef<WeakSet<Element>>(new WeakSet())

  useEffect(() => {
    // Find all gallery placeholders
    const galleries = document.querySelectorAll('.gallery-placeholder')
    
    galleries.forEach((element) => {
      // Skip if already hydrated
      if (hydratedElements.current.has(element)) return
      
      const data = element.getAttribute('data-gallery')
      if (!data) return
      
      try {
        const galleryData = JSON.parse(data)
        
        // Create a root and render the Gallery component
        const root = createRoot(element)
        root.render(
          <Gallery
            images={galleryData.images}
            layout={galleryData.layout}
            columns={galleryData.columns}
            gap={galleryData.gap}
          />
        )
        
        // Mark this element as hydrated
        hydratedElements.current.add(element)
      } catch (error) {
        console.error('Failed to hydrate gallery:', error)
      }
    })
  }, [])

  return null
}
