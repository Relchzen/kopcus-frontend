import {
    PiMicrophoneStage,
    PiMegaphone,
    PiNewspaper,
    PiStrategy
} from 'react-icons/pi';

export const servicesData = [
    {
        id: 'campaign-activation',
        title: 'Campaign & Event Activations',
        shortDescription:
            'End-to-end execution for campaigns, fan activations, product launches, and K-Pop experiences.',
        description:
            'We create high-impact activations grounded in cultural insight. From conceptualization to on-ground execution, we ensure every event resonates with fans and strengthens brand relevance.',
        icon: PiMicrophoneStage,
        bullets: [
            { title: 'Activation Strategy', text: 'Campaign concepts built around fan behavior and cultural timing.' },
            { title: 'End-to-End Execution', text: 'Venue, logistics, operations, and on-site management.' },
            { title: 'Talent & Guest Coordination', text: 'Direct communication with artists, influencers, and agencies.' },
        ],
        ctaText: 'Plan a Campaign',
        ctaLink: '/contact',
        image:
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop',
    },

    {
        id: 'influencer-community',
        title: 'Influencer & Community Marketing',
        shortDescription:
            'Strategic creator collaborations and community-driven amplification rooted in real fan culture.',
        description:
            'We connect brands with creators and communities who actually move the culture. Our network-driven approach ensures authenticity, resonance, and measurable traction.',
        icon: PiMegaphone,
        bullets: [
            { title: 'Creator Matching', text: 'Pairing brands with relevant and credible voices.' },
            { title: 'Campaign Execution', text: 'Structured workflows, briefs, and deliverable management.' },
            { title: 'Community Integration', text: 'Leveraging fandom networks that drive organic engagement.' },
        ],
        ctaText: 'Start a Collaboration',
        ctaLink: '/contact',
        image:
            'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop',
    },

    {
        id: 'media-pr',
        title: 'Media & Public Relations',
        shortDescription:
            'PR, media placements, and press strategies designed for entertainment-driven audiences.',
        description:
            'We craft narratives that get attention. Our relationships with entertainment and lifestyle media ensure visibility where it matters most to fans and consumers.',
        icon: PiNewspaper,
        bullets: [
            { title: 'Press Story Development', text: 'Narratives built for entertainment, lifestyle, and fandom media.' },
            { title: 'Media Outreach', text: 'Relationships with journalists, editors, and cultural publications.' },
            { title: 'Digital Spotlights', text: 'Features, interviews, and high-impact online coverage.' },
        ],
        ctaText: 'Get Media Coverage',
        ctaLink: '/contact',
        image:
            'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?q=80&w=2070&auto=format&fit=crop',
    },

    {
        id: 'digital-strategy-content',
        title: 'Digital Strategy & Content Production',
        shortDescription:
            'Fan-centric content systems and creative production designed to grow your digital presence.',
        description:
            'We build digital strategies grounded in fan psychology and platform trends. From content pillars to production, we ensure consistency, relevance, and growth.',
        icon: PiStrategy,
        bullets: [
            { title: 'Strategic Framework', text: 'Content pillars, calendars, and platform-specific guidance.' },
            { title: 'Social Media Management', text: 'Engagement, optimization, and community monitoring.' },
            { title: 'Creative Production', text: 'Visuals, videos, and copy that capture attention and convert.' },
        ],
        ctaText: 'Build Your Strategy',
        ctaLink: '/contact',
        image:
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    },
];
