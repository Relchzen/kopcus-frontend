'use client';

import React from 'react';
import { toast } from 'sonner';
import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '@/components/ui/Button';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { contactFormSchema, ContactFormData } from '@/lib/validations/contact';

// Create client schema ONCE (not per render)
const clientFormSchema = contactFormSchema.omit({ captchaToken: true });
type ClientFormData = z.infer<typeof clientFormSchema>;

export default function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      fullname: '',
      company: '',
      email: '',
      phone: '',
      projectType: undefined,
      message: '',
      website: '',
    },
  });

  const messageValue = watch('message') || '';

  const onSubmit = async (data: ClientFormData) => {
    if (!executeRecaptcha) {
      toast.error('ReCAPTCHA not ready. Please check your connection.');
      return;
    }

    try {
      const token = await executeRecaptcha('contact_submit');

      const payload: ContactFormData = {
        ...data,
        captchaToken: token,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || 'Failed to submit inquiry');
      }

      toast.success(result.message || 'Inquiry submitted successfully');

      reset();
      document.getElementById('name')?.focus(); // accessibility improvement

    } catch (error) {
      console.error('Contact submission error:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to submit inquiry.'
      );
    }
  };

  const ErrorMsg = ({ error }: { error?: { message?: string } }) => {
    if (!error?.message) return null;
    return <p className="mt-1 text-xs text-red-500">{error.message}</p>;
  };

  return (
    <SectionContainer name="contact-form" className="bg-white pb-24">
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-lg border border-neutral-200 bg-white p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>

            {/* Honeypot (off-screen, more reliable than display:none) */}
            <input
              type="text"
              {...register('website')}
              className="absolute left-[-9999px]"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Row 1 */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="fullname" className="text-sm font-medium text-neutral-900">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('fullname')}
                  type="text"
                  id="fullname"
                  maxLength={100}
                  className={`w-full rounded-md border px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 ${errors.fullname ? 'border-red-500' : 'border-neutral-200'
                    }`}
                  placeholder="John Doe"
                />
                <ErrorMsg error={errors.fullname} />
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
                  className={`w-full rounded-md border px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 ${errors.company ? 'border-red-500' : 'border-neutral-200'
                    }`}
                  placeholder="Company Name"
                />
                <ErrorMsg error={errors.company} />
              </div>
            </div>

            {/* Row 2 */}
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
                  className={`w-full rounded-md border px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 ${errors.email ? 'border-red-500' : 'border-neutral-200'
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
                  className={`w-full rounded-md border px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 ${errors.phone ? 'border-red-500' : 'border-neutral-200'
                    }`}
                  placeholder="+62..."
                />
                <ErrorMsg error={errors.phone} />
              </div>
            </div>

            {/* Project Type */}
            <div className="space-y-2">
              <label htmlFor="projectType" className="text-sm font-medium text-neutral-900">
                Project Type <span className="text-red-500">*</span>
              </label>
              <select
                {...register('projectType')}
                id="projectType"
                className={`w-full rounded-md border px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-white ${errors.projectType ? 'border-red-500' : 'border-neutral-200'
                  }`}
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="event">Event Activation</option>
                <option value="influencer">Influencer Marketing</option>
                <option value="media">Media Promotion</option>
                <option value="content">Content Creation</option>
                <option value="other">Other</option>
              </select>
              <ErrorMsg error={errors.projectType} />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="message" className="text-sm font-medium text-neutral-900">
                  Project Description <span className="text-red-500">*</span>
                </label>
                <span
                  className={`text-xs ${messageValue.length > 1000
                    ? 'text-red-500'
                    : 'text-neutral-400'
                    }`}
                >
                  {messageValue.length}/1000
                </span>
              </div>
              <textarea
                {...register('message')}
                id="message"
                rows={5}
                maxLength={1000}
                className={`w-full rounded-md border px-4 py-3 text-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 resize-none ${errors.message ? 'border-red-500' : 'border-neutral-200'
                  }`}
                placeholder="Tell us about your goals, target audience, and any specific requirements..."
              />
              <ErrorMsg error={errors.message} />
            </div>

            <p className="text-xs text-gray-500 text-center">
              This site is protected by reCAPTCHA and the Google{' '}
              <a href="https://policies.google.com/privacy" className="underline text-neutral-700">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="https://policies.google.com/terms" className="underline text-neutral-700">
                Terms of Service
              </a>{' '}
              apply.
            </p>

            <div className="pt-2">
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