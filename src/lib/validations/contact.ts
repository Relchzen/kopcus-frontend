import * as z from 'zod';

export const contactFormSchema = z.object({
    name: z.string().min(2).max(100),
    company: z.string().min(2).max(100),
    email: z.string().email().max(255),
    phone: z.string().min(8).max(20),
    projectType: z.enum(['event', 'influencer', 'media', 'content', 'other']),
    estimatedTimeline: z.string().optional(),
    budgetRange: z.string().min(1),
    description: z.string().min(10).max(1000),
    // captchaToken wajib ada saat dikirim ke server action
    captchaToken: z.string().min(1, "Captcha verification failed"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;