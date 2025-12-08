'use client';
import React from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '@/components/ui/Button';
import { motion } from 'motion/react';
import { servicesData } from './constants';
import { PiCheckCircle } from 'react-icons/pi';
import Image from 'next/image';

export default function ServiceDetailsSection() {
  return (
    <div className="bg-neutral-50">
      {servicesData.map((service, index) => (
        <SectionContainer
          key={service.id}
          name={`service-${service.id}`}
          className={`section-padding py-24 ${index % 2 === 1 ? 'bg-white' : 'bg-neutral-50'}`}
        >
          {/* Anchor for scroll navigation */}
          <div id={service.id} className="scroll-mt-32" />

          <div className={`flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-24 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            {/* Content Side */}
            <motion.div 
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="mb-4 flex items-center gap-2 text-primary-600">
                <service.icon className="h-6 w-6" />
                <span className="text-sm font-bold uppercase tracking-wider">Service 0{index + 1}</span>
              </div>
              
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
                {service.title}
              </h2>
              
              <p className="mb-8 text-lg leading-relaxed text-neutral-600">
                {service.description}
              </p>

              <div className="mb-10 space-y-4">
                {service.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <PiCheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary-600" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">{bullet.title}</h4>
                      <p className="text-sm text-neutral-600">{bullet.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button href={service.ctaLink} size="responsive-md">
                {service.ctaText}
              </Button>
            </motion.div>

            {/* Visual Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </SectionContainer>
      ))}
    </div>
  );
}
