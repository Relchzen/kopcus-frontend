'use client';

import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    timeline: '',
    budget: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <SectionContainer name="contact-form" className="bg-white pb-24">
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-lg border border-neutral-200 bg-white p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Row 1: Name & Company */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium text-neutral-900">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-neutral-900">
                  Company or Brand <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full rounded-md border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  placeholder="Company Name"
                />
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-neutral-900">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  placeholder="john@company.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-neutral-900">
                  Phone or WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  placeholder="+62..."
                />
              </div>
            </div>

            {/* Row 3: Project Type & Timeline */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="projectType" className="text-sm font-medium text-neutral-900">
                  Project Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full rounded-md border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-white"
                >
                  <option value="" disabled>Select Type</option>
                  <option value="event">Event Activation</option>
                  <option value="influencer">Influencer Marketing</option>
                  <option value="media">Media Promotion</option>
                  <option value="content">Content Creation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="timeline" className="text-sm font-medium text-neutral-900">
                  Estimated Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full rounded-md border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-white"
                >
                   <option value="" disabled>Select Timeline</option>
                   <option value="asap">ASAP</option>
                   <option value="1-month">Within 1 Month</option>
                   <option value="1-3-months">1-3 Months</option>
                   <option value="3-months-plus">3+ Months</option>
                </select>
              </div>
            </div>

            {/* Row 4: Budget */}
            <div className="space-y-2">
                <label htmlFor="budget" className="text-sm font-medium text-neutral-900">
                  Budget Range <span className="text-red-500">*</span>
                </label>
                <select
                  id="budget"
                  name="budget"
                  required
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full rounded-md border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-white"
                >
                  <option value="" disabled>Select Budget Range</option>
                  <option value="under-10m">&lt; 10 Million IDR</option>
                  <option value="10m-50m">10 - 50 Million IDR</option>
                  <option value="50m-150m">50 - 150 Million IDR</option>
                  <option value="150m-plus">150 Million+ IDR</option>
                </select>
            </div>

            {/* Row 5: Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-neutral-900">
                Project Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-md border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 resize-none"
                placeholder="Tell us about your goals, target audience, and any specific requirements..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" variant="primary" size="lg" className="w-full text-base font-semibold">
                Submit Inquiry
              </Button>
            </div>
          </form>
        </div>
      </div>
    </SectionContainer>
  );
}
