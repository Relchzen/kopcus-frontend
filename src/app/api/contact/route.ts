import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import { contactRateLimit } from "@/lib/rate-limit"

const RECAPTCHA_THRESHOLD = Number(
    process.env.RECAPTCHA_SCORE_THRESHOLD ?? 0.6
);

async function verifyRecaptcha(token: string, ip?: string) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
        const res = await fetch(
            "https://www.google.com/recaptcha/api/siteverify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    secret: process.env.RECAPTCHA_SECRET_KEY!,
                    response: token,
                    remoteip: ip ?? "",
                }),
                signal: controller.signal,
            }
        );

        const data = await res.json();

        return (
            data.success === true &&
            data.score >= RECAPTCHA_THRESHOLD &&
            data.action === "contact_submit"
        );
    } finally {
        clearTimeout(timeout);
    }
}

export async function POST(req: NextRequest) {
    try {
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0] ??
            "0.0.0.0";

        // ---- Rate limit ----
        const { success } = await contactRateLimit.limit(ip);

        if (!success) {
            console.warn("Rate limit exceeded:", ip);
            return NextResponse.json(
                { error: "Too many requests" },
                { status: 429 }
            );
        }

        const body = await req.json();

        // ---- Honeypot ----
        if (body.website) {
            console.warn("Honeypot triggered:", ip);
            return NextResponse.json(
                { error: "Spam detected" },
                { status: 400 }
            );
        }

        // ---- Validate ----
        const parsed = contactFormSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid form data" },
                { status: 400 }
            );
        }

        const data = parsed.data;

        // ---- Verify reCAPTCHA ----
        const isHuman = await verifyRecaptcha(
            data.captchaToken,
            ip
        );

        if (!isHuman) {
            console.warn("reCAPTCHA failed:", { ip, email: data.email });
            return NextResponse.json(
                { error: "Verification failed" },
                { status: 400 }
            );
        }

        // ---- Normalize ----
        const normalized = {
            email: data.email.toLowerCase().trim(),
            fullname: data.fullname.trim(),
            company: data.company.trim(),
            message: data.message.trim(),
            projectType: data.projectType,
            phonenumber: data.phone.trim(),
            ipAddress: ip,
        };

        // ---- Send to Payload ----
        const payloadRes = await fetch(
            `${process.env.NEXT_PUBLIC_CMS_URL}/api/contact-submissions`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-internal-key": process.env.INTERNAL_API_KEY!,
                },
                body: JSON.stringify(normalized),
                cache: "no-store",
            }
        );

        if (!payloadRes.ok) {
            const errorText = await payloadRes.text();
            console.error("Payload error:", errorText);
            throw new Error("Failed to store submission");
        }

        return NextResponse.json({
            success: true,
            message: "Inquiry submitted successfully",
        });

    } catch (error) {
        console.error("Contact API fatal error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
