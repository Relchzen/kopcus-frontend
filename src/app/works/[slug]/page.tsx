import { getWorkBySlug } from "@/lib/works-payload"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { FaArrowLeft } from "react-icons/fa"
import { parseLexicalContent } from "@/components/PayloadBlockRenderer"
import GalleryHydrator from "@/components/GalleryHydrator"

export default async function WorksPage({ params }: { params: Promise<{ slug: string }> }) {
    const {slug} = await params
    const work = await getWorkBySlug(slug)
    const contentHtml = work!.content ? parseLexicalContent(work!.content) : ""

    if (!work) {
        return notFound()
    }

    // Use large size if available and has URL, otherwise fallback to medium
    const imageSize = (work.heroImage.sizes.large?.url) 
        ? work.heroImage.sizes.large 
        : work.heroImage.sizes.medium
    
    const heroImageUrl = imageSize.url.startsWith('http')
      ? imageSize.url
      : `${process.env.NEXT_PUBLIC_CMS_URL}${imageSize.url}`;

    // Detect if image is vertical (portrait) or horizontal (landscape)
    const imageWidth = imageSize.width
    const imageHeight = imageSize.height
    const isVertical = imageHeight > imageWidth

    return (
        
            <main className="min-h-screen bg-white pb-20 text-neutral-900">
                {/* Hero Section */}
                <section className="w-full bg-neutral-900 text-white md:relative mt-24">
                    {/* Hero Image */}
                    <div className="relative w-full">
                        <Image
                            src={heroImageUrl}
                            alt={work.heroImage.alt || work.heroImage.filename || work.title}
                            width={imageWidth}
                            height={imageHeight}
                            className="w-full h-auto"
                            priority
                        />
                        {/* Top gradient for seamless transition from white background */}
                        {/* <div className="absolute inset-x-0 top-0 h-24 z-20 bg-gradient-to-b from-neutral-200 via-neutral-200/50 to-transparent pointer-events-none" /> */}
                        {/* Bottom gradient overlay */}
                        <div className="absolute inset-x-0 bottom-0 h-32 z-20 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent pointer-events-none" />
                </div>
                {/* Hero Content */}
                    <div className="container section-padding relative z-20 flex flex-col items-start pb-12 pt-8 md:absolute md:inset-0 md:justify-end md:pb-12 md:pt-0">
                        <div className="mb-8">
                            <Link href="/works">
                                <Button variant="outline" size="sm" className="gap-2 border-white/20 bg-black/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm">
                                    <FaArrowLeft className="h-4 w-4" />
                                    Back to Works
                                </Button>
                            </Link>
                        </div>
                        
                        <h1 className="font-display text-5xl font-bold uppercase tracking-wider md:text-7xl lg:text-8xl">
                        {work.title}
                        </h1>
                        <p className="mt-4 max-w-2xl text-lg font-light text-neutral-200 md:text-xl">
                        {work.description}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-8 text-sm font-medium uppercase tracking-widest text-primary-400">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-neutral-400">Client</span>
                            <span>{work.artistOrBrand}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-neutral-400">Date</span>
                            <span>{new Date(work.projectDate).toLocaleDateString()}</span>
                        </div>
                        </div>
                    </div>
            </section>
            
            {/* Content Section */}
            <section className="container section-padding py-16 md:py-24">
                <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
                    {/* Main Content */}
                    <div 
                        className="prose prose-lg prose-neutral max-w-none"
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />
                    
                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="rounded-2xl bg-neutral-50 p-8 sticky top-24">
                            <h3 className="font-display text-2xl font-bold uppercase text-neutral-900">
                            Project Info
                            </h3>
                            <ul className="mt-6 space-y-6 text-neutral-600">
                            <li className="flex flex-col gap-1">
                                <span className="font-bold text-neutral-900 uppercase text-xs tracking-wider">Client</span>
                                <span className="text-lg">{work.artistOrBrand}</span>
                            </li>
                            <li className="flex flex-col gap-1">
                                <span className="font-bold text-neutral-900 uppercase text-xs tracking-wider">Year</span>
                                <span className="text-lg">{new Date(work.projectDate).getFullYear()}</span>
                            </li>
                            </ul>
                        </div>
                        </div>

                    <GalleryHydrator />

                </div>
            </section>
            
            </main>
    )
}