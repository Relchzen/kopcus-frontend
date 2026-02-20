import React from 'react'
import { ContentBlock } from './blocks/ContentBlock'
import { ArchiveBlock } from './blocks/ArchiveBlock'

export const PayloadPageLayout = ({ blocks }: { blocks: any[] }) => {
    if (!blocks) return null

    return (
        <div className="flex flex-col">
            {blocks.map((block, index) => {
                const { blockType } = block

                if (blockType === 'content') {
                    return <ContentBlock key={index} block={block} />
                }

                if (blockType === 'archive') {
                    return <ArchiveBlock key={index} block={block} />
                }

                return null
            })}
        </div>
    )
}
