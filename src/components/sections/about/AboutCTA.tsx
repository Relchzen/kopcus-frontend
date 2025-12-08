'use client';

import { motion } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { SectionContainer } from '@/components/SectionContainer';
import { LiaLongArrowAltRightSolid } from 'react-icons/lia';

export default function AboutCTA() {
  return (
    <SectionContainer name="contact" className="bg-white py-32 text-center">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mx-auto max-w-4xl"
        >
          <h2 className="mb-10 font-display text-5xl font-bold uppercase leading-tight text-neutral-950 md:text-7xl">
            Let’s Build Something <br />
            <span className="text-primary-600">That Moves Fans</span>
          </h2>
          
          <Button href="/contact" size="lg" className="group text-lg px-8 py-6">
            <span className="font-medium">Start Your Project</span>
            <LiaLongArrowAltRightSolid className="ml-2 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
