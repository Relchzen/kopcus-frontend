'use client';
import React from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { motion } from 'motion/react';
import { servicesData } from './constants';
import { PiArrowDownRight } from 'react-icons/pi';

export default function ServicesOverviewSection() {
  const scrollToService = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SectionContainer name="services-overview" className="section-padding py-24 bg-white">
      <div className="mb-16 text-center">
        <SectionHeading sectionName="What We Do" id="services-overview-heading" className="justify-center" />
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
          Comprehensive Solutions for Your Brand
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {servicesData.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-neutral-300 hover:shadow-lg"
          >
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-900 transition-colors group-hover:bg-primary-50 group-hover:text-primary-600">
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-neutral-900">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600">
                {service.shortDescription}
              </p>
            </div>
            
            <button
              onClick={() => scrollToService(service.id)}
              className="mt-8 flex items-center text-sm font-medium text-neutral-900 transition-colors hover:text-primary-600 focus:outline-none"
            >
              Learn More
              <PiArrowDownRight className="ml-2 h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}
