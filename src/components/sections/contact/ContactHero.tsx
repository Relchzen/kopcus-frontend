'use client';

import { SectionContainer } from '@/components/SectionContainer';

import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function ContactHero() {
  return (
    <SectionContainer
      name="contact-hero"
      className="section-padding bg-white pt-32 pb-16"
    >
      <div className="container">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Left Column (Primary Content) */}
          <div className="flex flex-col lg:w-[60%]">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Breadcrumb items={[{ label: 'Contact' }]} />
            </div>

            {/* Headline */}
            <h1 className="mb-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-neutral-900 md:text-5xl lg:text-[56px]">
              Work With Kopi Chuseyo
            </h1>

            {/* Subtext */}
            <p className="max-w-[420px] font-body text-base leading-relaxed text-neutral-600 md:text-lg">
              Tell us about your campaign or event. Our team reviews all inquiries and responds within 24–48 hours.
            </p>
          </div>

          {/* Right Column (Info Block) */}
          <div className="flex flex-col justify-end lg:w-[35%] lg:pb-2">
             <div className="space-y-6 border-l border-neutral-200 pl-8">
                <div>
                    <h3 className="mb-1 font-display text-sm font-bold uppercase tracking-widest text-neutral-900">Email</h3>
                    <a href="mailto:dh.hermansyah@gmail.com" className="font-body text-lg text-neutral-600 hover:text-primary-600 transition-colors">dh.hermansyah@gmail.com</a>
                </div>
                <div>
                    <h3 className="mb-1 font-display text-sm font-bold uppercase tracking-widest text-neutral-900">WhatsApp</h3>
                    <a href="https://wa.me/6281806360001" className="font-body text-lg text-neutral-600 hover:text-primary-600 transition-colors">+62 818 0636 0001</a>
                </div>
                <div>
                    <p className="font-body text-sm text-neutral-400 italic">
                        For media or partnership inquiries, please email directly.
                    </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
