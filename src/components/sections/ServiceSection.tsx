'use client';
import React from 'react';
import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionContainer } from '../SectionContainer';
import { useState } from 'react';
import { PiArrowDownLight } from 'react-icons/pi';
import { Button } from '../ui/Button';

export interface ServiceImage {
  id: number;
  mime: string;
  width?: number;
  height?: number;
  name: string;
  caption?: string;
  url: string;
  alternativeText?: string;
}

type ServiceProps = {
  id: number;
  service_name: string;
  service_description?: string;
  service_images?: ServiceImage[];
};

type ServiceSectionProps = {
  data: {
    service_headline: string;
    service_subheadline?: string;
    services: ServiceProps[];
    service_cta_text?: string;
    service_cta_link?: string;
  };
};

export default function ServiceSection({ data }: ServiceSectionProps) {
  // Always ensure services is an array
  const services = data?.services ?? [];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Prevent errors if array is empty
  if (services.length === 0) {
    return <div>No services available</div>;
  }

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionContainer name="services" className="section-padding py-24">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-24 lg:items-start">
        {/* Left Column: Heading & Subheadline (Sticky) */}
        <div className="flex-1 lg:sticky lg:top-32 lg:self-start">
          <SectionHeading sectionName="Services" id="services-heading" />
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
            {data.service_headline}
          </h2>
          {data.service_subheadline && (
            <p className="text-lg text-neutral-600">
              {data.service_subheadline}
            </p>
          )}
        </div>

        {/* Right Column: Services List */}
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`cursor-pointer border-b border-neutral-200 pb-4 transition-all ${
                  openIndex === index ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center justify-between py-2">
                  <h3 className="text-xl font-bold text-neutral-900 md:text-2xl">
                    {service.service_name}
                  </h3>
                  <PiArrowDownLight
                    className={`h-6 w-6 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="pt-4 text-neutral-600">
                    {service.service_description}
                  </p>
                  <div className="mt-6">
                    <Button href="/services" variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}


