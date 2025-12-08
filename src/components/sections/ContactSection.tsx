'use client';

import React from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '../ui/Button';
import { motion } from 'motion/react';
import { FaArrowRight, FaEnvelope, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FluidBlobs } from '../ui/FluidBlobs';

const socialLinks = [
  {
    name: 'Instagram',
    icon: <FaInstagram className="h-5 w-5" />,
    href: 'https://www.instagram.com/kopichuseyo.id/',
    color: 'hover:text-pink-600',
  },
  {
    name: 'WhatsApp',
    icon: <FaWhatsapp className="h-5 w-5" />,
    href: '#', // Add actual link if available
    color: 'hover:text-green-600',
  },
  {
    name: 'Email',
    icon: <FaEnvelope className="h-5 w-5" />,
    href: 'mailto:hello@kopcus.com', // Add actual email
    color: 'hover:text-blue-600',
  },
];

export default function ContactSection() {
  return (
    <SectionContainer
      name="contact"
      className="mx-1 relative my-16 md:my-24"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-neutral-900 py-24 shadow-2xl md:py-32 lg:py-40 px-1 md:px-7 lg:px-11">
        
        {/* Interactive Fluid Blobs Background */}
        <FluidBlobs />
        
        {/* Glassmorphism Overlay - Increased blur for better text contrast against the gooey blobs */}
        <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="text-5xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl">
              Let&apos;s create <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">
                something amazing.
              </span>
            </h2>
            
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-neutral-300">
              Ready to amplify your brand&apos;s impact? We&apos;re here to help you navigate the K-pop landscape with creative campaigns and unforgettable experiences.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Button
                size="responsive-lg"
                variant="primary"
                href="/contact"
                className="w-full min-w-[200px] justify-center sm:w-auto"
              >
                <span>Get in Touch</span>
                <FaArrowRight className="ml-2" />
              </Button>
              <Button
                size="responsive-lg"
                variant="outline"
                href="/works"
                className="w-full min-w-[200px] justify-center border-white/20 text-white hover:bg-white/10 sm:w-auto"
              >
                View Portfolio
              </Button>
            </div>

            <div className="mt-16 flex justify-center gap-8">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className={`text-neutral-400 transition-colors duration-300 ${link.color}`}
                  aria-label={link.name}
                >
                  <div className="h-8 w-8 [&>svg]:h-full [&>svg]:w-full">
                    {link.icon}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
}
