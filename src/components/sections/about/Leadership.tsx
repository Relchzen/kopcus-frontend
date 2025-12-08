'use client';

import { motion } from 'motion/react';
import { SectionContainer } from '@/components/SectionContainer';
import Image from 'next/image';

export default function Leadership() {
  return (
    <SectionContainer name="leadership" className="section-padding bg-white py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col gap-16 md:flex-row lg:items-center lg:gap-24">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-1"
          >
            <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden hidden md:flex rounded-sm bg-neutral-100 transition-all duration-700">
               <Image src="/daniel_profile.jpg" alt="Daniel Hermansyah" fill className="object-cover" />
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex-1"
          >
            <div className="mb-6 hidden md:flex items-center gap-4">
              <span className="h-px w-12 bg-primary-600"></span>
              <span className="font-display text-sm font-bold uppercase tracking-widest text-primary-600">
                Meet Our Leader
              </span>
            </div>
            <div className="flex flex-row items-start gap-6 md:hidden mb-6">
                <div className="relative aspect-[3/4] w-[55%] overflow-hidden rounded-sm bg-neutral-100 transition-all duration-700">
                   <Image src="/daniel_profile.jpg" alt="Daniel Hermansyah" fill className="object-cover" />
                </div>
                
                <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="h-px w-8 bg-primary-600"></span>
                      <span className="font-display text-[10px] font-bold uppercase tracking-widest text-primary-600">
                        Meet Our Leader
                      </span>
                    </div>
                    <h2 className="mb-1 font-display text-3xl font-bold uppercase leading-tight text-neutral-950">
                      Daniel Hermansyah
                    </h2>
                    <p className="text-sm font-medium text-neutral-500">
                      Founder
                    </p>
                </div>
            </div>
            
            <h2 className="hidden md:block mb-2 font-display text-6xl font-bold uppercase leading-tight text-neutral-950 md:text-5xl">
              Daniel Hermansyah
            </h2>
            <p className="hidden md:block mb-8 text-lg font-medium text-neutral-500">
              Founder
            </p>
            <div className="space-y-6 font-body text-lg text-neutral-600 md:text-xl">
              <p>
                Daniel Hermansyah is a K-Pop influencer with over 460,000 combined followers across Instagram and TikTok. He leads Kopi Chuseyo as the face, strategist, and connector between brands, creators, and fandoms.
              </p>
              <p>
                His presence in the community gives the agency a direct line into K-Pop audiences and creator networks, shaping campaigns with real cultural accuracy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
}
