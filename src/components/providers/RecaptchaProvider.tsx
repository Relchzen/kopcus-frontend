'use client';

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ReactNode } from "react";

export const RecaptchaProvider = ({ children }: { children: ReactNode }) => {
    const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey= { recaptchaKey ?? ''}
            scriptProps = {{
                async: false,
                defer: false,
                appendTo: 'head',
                nonce: undefined,
            }}
        >
    { children }
    </GoogleReCaptchaProvider>
    )
}