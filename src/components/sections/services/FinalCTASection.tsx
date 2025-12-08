'use client';
import React from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '@/components/ui/Button';
import { motion } from 'motion/react';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';

export default function FinalCTASection() {
  return (
    <SectionContainer name="final-cta" className="section-padding py-32 bg-neutral-900 text-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl"
      >
        <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Ready to Elevate Your Brand?
        </h2>
        <p className="mb-10 text-xl text-neutral-400">
          Let&apos;s collaborate to create something extraordinary that resonates with your audience.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button 
            href="/contact" 
            size="responsive-lg"
            className="text-black hover:bg-neutral-100"
          >
            <span className="font-medium">Get in Touch</span>
            <LiaLongArrowAltRightSolid className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            href="mailto:dh.hermansyah@gmail.com" 
            variant="outline" 
            size="responsive-lg"
            className="border-neutral-700 text-white hover:bg-neutral-800"
          >
            dh.hermansyah@gmail.com
          </Button>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-8">
          <p className="text-sm text-neutral-500">
            Have questions? Check out our <a href="#" className="underline hover:text-white">FAQ</a> or <a href="#" className="underline hover:text-white">Book a Consultation</a>.
          </p>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
