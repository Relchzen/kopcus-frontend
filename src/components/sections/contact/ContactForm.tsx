// components/contact/ContactForm.tsx
'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '@/components/ui/Button';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'; // Import Zod wajib

// Import Shared Logic
import { contactFormSchema, ContactFormData } from '@/lib/validations/contact';
import { submitContactInquiry } from '@/lib/actions/contact';

export default function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- PERBAIKAN UTAMA DI SINI ---
  // Kita buat schema khusus Client yang TIDAK mengecek captchaToken
  // karena token belum ada saat user mengetik di form.
  const clientFormSchema = contactFormSchema.omit({ captchaToken: true });
  
  // Type baru khusus untuk form UI
  type ClientFormData = z.infer<typeof clientFormSchema>;

  // Setup Form dengan Schema Client
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema), // Gunakan schema yang sudah di-omit
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      projectType: undefined,
      estimatedTimeline: '',
      budgetRange: undefined,
      description: '',
    },
  });

  const descriptionValue = watch('description') || '';

  // Handle Submit
  // Data di sini bertipe ClientFormData (tanpa token)
  const onSubmit = async (data: ClientFormData) => {
    setIsSubmitting(true);

    if (!executeRecaptcha) {
      toast.error('ReCAPTCHA not ready. Please check your connection.');
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Generate Token (Invisible)
      const token = await executeRecaptcha('contact_submit');

      // 2. Gabungkan data Form + Token menjadi Payload Lengkap
      // TypeScript akan senang karena ini cocok dengan ContactFormData (Schema Server)
      const payload: ContactFormData = {
        ...data,
        captchaToken: token,
      };

      // 3. Panggil Server Action
      const result = await submitContactInquiry(payload);

      if (result.success) {
        toast.success(result.message);
        reset();
      } else {
        throw new Error(result.message);
      }

    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit inquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper Error UI
  const ErrorMsg = ({ error }: { error?: { message?: string } }) => {
    if (!error?.message) return null;
    return <p className="mt-1 text-xs text-red-500">{error.message}</p>;
  };

  return (
    <SectionContainer name="contact-form" className="bg-white pb-24">
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-lg border border-neutral-200 bg-white p-8 md:p-12">
          {/* Hapus onError debug, kembalikan ke standar */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Row 1: Name & Company */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-neutral-900">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  maxLength={100}
                  className={`w-full rounded-md border px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 ${
                    errors.name ? 'border-red-500' : 'border-neutral-200'
                  }`}
                  placeholder="John Doe"
                />
                <ErrorMsg error={errors.name} />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-neutral-900">
                  Company / Brand <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('company')}
                  type="text"
                  id="company"
                  maxLength={100}
                  className={`w-full rounded-md border px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 ${
                    errors.company ? 'border-red-500' : 'border-neutral-200'
                  }`}
                  placeholder="Company Name"
                />
                <ErrorMsg error={errors.company} />
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-neutral-900">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  maxLength={255}
                  className={`w-full rounded-md border px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 ${
                    errors.email ? 'border-red-500' : 'border-neutral-200'
                  }`}
                  placeholder="john@company.com"
                />
                <ErrorMsg error={errors.email} />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-neutral-900">
                  Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  id="phone"
                  maxLength={20}
                  className={`w-full rounded-md border px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 ${
                    errors.phone ? 'border-red-500' : 'border-neutral-200'
                  }`}
                  placeholder="+62..."
                />
                <ErrorMsg error={errors.phone} />
              </div>
            </div>

            {/* Row 3: Project Type & Timeline */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="projectType" className="text-sm font-medium text-neutral-900">
                  Project Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('projectType')}
                  id="projectType"
                  className={`w-full rounded-md border px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-white ${
                    errors.projectType ? 'border-red-500' : 'border-neutral-200'
                  }`}
                >
                  <option value="" disabled>Select Type</option>
                  <option value="event">Event Activation</option>
                  <option value="influencer">Influencer Marketing</option>
                  <option value="media">Media Promotion</option>
                  <option value="content">Content Creation</option>
                  <option value="other">Other</option>
                </select>
                <ErrorMsg error={errors.projectType} />
              </div>
              <div className="space-y-2">
                <label htmlFor="estimatedTimeline" className="text-sm font-medium text-neutral-900">
                  Estimated Timeline
                </label>
                <select
                  {...register('estimatedTimeline')}
                  id="estimatedTimeline"
                  className="w-full rounded-md border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-white"
                >
                   <option value="">Select Timeline (Optional)</option>
                   <option value="asap">ASAP</option>
                   <option value="1-month">Within 1 Month</option>
                   <option value="1-3-months">1-3 Months</option>
                   <option value="3-months-plus">3+ Months</option>
                </select>
              </div>
            </div>

            {/* Row 4: Budget */}
            <div className="space-y-2">
                <label htmlFor="budgetRange" className="text-sm font-medium text-neutral-900">
                  Budget Range <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('budgetRange')}
                  id="budgetRange"
                  className={`w-full rounded-md border px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-white ${
                    errors.budgetRange ? 'border-red-500' : 'border-neutral-200'
                  }`}
                >
                  <option value="" disabled>Select Budget Range</option>
                  <option value="under-10m">&lt; 10 Million IDR</option>
                  <option value="10m-50m">10 - 50 Million IDR</option>
                  <option value="50m-150m">50 - 150 Million IDR</option>
                  <option value="150m-plus">150 Million+ IDR</option>
                </select>
                <ErrorMsg error={errors.budgetRange} />
            </div>

            {/* Row 5: Description */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="description" className="text-sm font-medium text-neutral-900">
                  Project Description <span className="text-red-500">*</span>
                </label>
                <span className={`text-xs ${descriptionValue.length > 1000 ? 'text-red-500' : 'text-neutral-400'}`}>
                  {descriptionValue.length}/1000
                </span>
              </div>
              <textarea
                {...register('description')}
                id="description"
                rows={5}
                maxLength={1000}
                className={`w-full rounded-md border px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 resize-none ${
                  errors.description ? 'border-red-500' : 'border-neutral-200'
                }`}
                placeholder="Tell us about your goals, target audience, and any specific requirements..."
              />
              <ErrorMsg error={errors.description} />
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              This site is protected by reCAPTCHA and the Google{' '}
              <a href="https://policies.google.com/privacy" className="underline text-neutral-700">Privacy Policy</a> and{' '}
              <a href="https://policies.google.com/terms" className="underline text-neutral-700">Terms of Service</a> apply.
            </p>

            <div className="pt-2">
              {/* Kembalikan komponen Button Asli */}
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-full text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </SectionContainer>
  );
}