'use server';

import { contactFormSchema, ContactFormData } from '@/lib/validations/contact';

export async function submitContactInquiry(data: ContactFormData) {
    // 1. Validasi Server-Side (Double Check)
    const parsed = contactFormSchema.safeParse(data);

    if (!parsed.success) {
        return {
            success: false,
            message: 'Invalid data format',
            errors: parsed.error.flatten().fieldErrors,
        };
    }

    // 2. Ambil URL Backend Private dari Environment Variable Server
    // Perhatikan: Tidak pakai NEXT_PUBLIC_ karena ini rahasia server
    const BACKEND_URL = process.env.CHUSEYO_API_URL;

    if (!BACKEND_URL) {
        console.error('BACKEND_API_URL is not defined');
        return { success: false, message: 'Server configuration error' };
    }

    try {
        // 3. Call Backend NestJS (Server to Server)
        const response = await fetch(`${BACKEND_URL}/contact/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Jika perlu API Key internal agar NestJS tau ini dari Next.js:
                // 'X-Internal-Secret': process.env.INTERNAL_SECRET_KEY 
            },
            body: JSON.stringify(parsed.data),
            cache: 'no-store', // Jangan cache hasil submit
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to submit to backend');
        }

        return { success: true, message: 'Inquiry submitted successfully!' };

    } catch (error) {
        console.error('Submission Error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to submit inquiry'
        };
    }
}