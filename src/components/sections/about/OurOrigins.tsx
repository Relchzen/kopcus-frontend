'use client';

import { motion } from 'motion/react';
import { SectionContainer } from '@/components/SectionContainer';
import Image from 'next/image';

export default function OurOrigins() {
  return (
    <SectionContainer name="origins" className="section-padding bg-white py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-24">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-1"
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-primary-600"></span>
              <span className="font-display text-sm font-bold uppercase tracking-widest text-primary-600">
                Where We Started
              </span>
            </div>
            <h2 className="mb-8 font-display text-4xl font-bold uppercase leading-tight text-neutral-950 md:text-5xl">
              Cultural Roots
            </h2>
            <div className="space-y-6 font-body text-lg text-neutral-600 md:text-xl">
              <p>
                Kopi Chuseyo began as Indonesia’s first major K-Pop–themed café chain. Across more than 100 stores nationwide, we became a physical hub for fandoms to gather, connect, and celebrate the culture they love.
              </p>
              <p>
                This experience gave us something rare: firsthand insight into how K-Pop communities think, behave, and mobilize. The pandemic changed the business landscape, but it didn’t erase our foundation. It pushed us to evolve.
              </p>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex-1"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-neutral-100 transition-all duration-700">
               {/* Placeholder for Cafe Image */}
               {/* <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 text-neutral-400">
                  <span className="font-display text-lg uppercase">Kopi Chuseyo Store</span>
               </div> */}
               <Image src="/kopichuseyo_store.webp" alt="Kopi Chuseyo Store" fill className="object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
}
