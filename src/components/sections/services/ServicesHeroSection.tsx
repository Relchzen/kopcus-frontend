'use client';
import React from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '@/components/ui/Button';

import { motion } from 'motion/react';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function ServicesHeroSection() {
  return (
    <SectionContainer
      name="services-hero"
      className="section-padding relative flex min-h-[80vh] flex-col justify-center overflow-hidden bg-white pt-8 pb-8 md:flex-row md:items-center md:justify-between md:gap-12 md:pt-12 md:pb-12 lg:gap-16"
    >
      {/* Minimalist Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.4]" 
          style={{ 
            backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }} 
        />
        <div className="absolute top-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-gradient-to-b from-primary-100/50 to-transparent blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col justify-center md:w-[60%]">
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.15,
                        delayChildren: 0.2
                    }
                }
            }}
        >
            <div className="mb-6">
              <Breadcrumb items={[{ label: 'Services' }]} />
            </div>

            <div className="mb-8 overflow-hidden">
                <motion.h1 
                    variants={{
                        hidden: { y: '100%' },
                        visible: { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                    }}
                    className="text-5xl leading-[1.1] font-bold tracking-tight text-neutral-900 lg:text-7xl xl:text-8xl"
                >
                    We Build Digital Experiences That Matter.
                </motion.h1>
            </div>

            <motion.p 
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
                }}
                className="mb-10 max-w-2xl text-lg leading-relaxed text-neutral-700 md:text-xl"
            >
                From K-Pop campaigns to full-scale digital strategies, we help brands connect with their audience through creativity, technology, and culture.
            </motion.p>

            <motion.div 
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
                }}
                className="flex flex-wrap gap-4"
            >
                <Button 
                    size={'responsive-md'} 
                    href="contact"
                    className="group bg-neutral-900 text-white shadow-lg shadow-neutral-900/10 transition-all duration-300 hover:bg-neutral-800 hover:shadow-neutral-900/20 hover:-translate-y-0.5"
                >
                    <span className="font-medium">
                    Start a Project
                    </span>
                    <LiaLongArrowAltRightSolid className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
            </motion.div>
        </motion.div>
      </div>

      {/* Hero Image / Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className="relative z-10 mt-12 flex items-center justify-center md:mt-0 md:w-[40%]"
      >
        <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-neutral-100 shadow-2xl shadow-neutral-900/10">
            {/* Placeholder for a strong hero image */}
            <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
            </div>
             {/* Use a real image if available later */}
          <Image
            fill
                src="/service_hero_section_image.jpg" 
                alt="Digital Experience" 
                className="h-full w-full object-cover"
            />
        </div>
      </motion.div>
    </SectionContainer>
  );
}
