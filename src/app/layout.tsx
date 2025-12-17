import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ToasterProvider } from '@/components/providers/ToasterProvider';
import { Navbar } from '@/components/Navbar';
import { poppins, bebasNeue, montserrat } from '@/lib/fonts';
import { SmoothScrolling } from '@/utils/SmoothScrolling';
import TransitionProvider from '@/components/ui/TransitionProvider';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Kopi Chuseyo | K-Pop Digital Agency',
    template: '%s | Kopi Chuseyo',
  },
  description: 'Kopi Chuseyo helps brands and artists connect with Indonesian K-Pop fans through event organizing, influencer partnerships, and digital media strategy.',
  keywords: ['kpop event organizer indonesia', 'kpop agency indonesia', 'kpop marketing', 'korean influencer indonesia', 'kpop events jakarta'],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    siteName: 'Kopi Chuseyo',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${montserrat.variable} ${bebasNeue.variable} bg-white`}
    >
      <SmoothScrolling />
      <body className="flex min-h-screen justify-center">
        <div className="container">
          <header>
            <Navbar />
          </header>
          <TransitionProvider>{children}</TransitionProvider>
          <ToasterProvider />
          <Footer />
        </div>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''} />
    </html>
  );
}
