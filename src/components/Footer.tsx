import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaTiktok, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111] pt-20 pb-8 text-white">
      <div className="container section-padding">
        {/* Upper Footer: 2 Columns (Brand | Links) */}
        <div className="grid grid-cols-1 gap-12 border-b border-neutral-800 pb-16 lg:grid-cols-[1fr_1.5fr] lg:gap-8">
          {/* Left Column: Brand */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
             <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-neutral-800 bg-neutral-900">
                <Image
                  src="/logo.png"
                  alt="Kopi Chuseyo Logo"
                  fill
                  className="object-cover"
                />
             </div>
            <div className="flex flex-col gap-2">
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                KOPI CHUSEYO
              </span>
              <p className="font-display text-sm font-medium uppercase tracking-widest text-neutral-400 max-w-sm">
                Connecting K-Pop culture with Indonesian fans through digital experiences and creative strategies.
              </p>
            </div>
          </div>

          {/* Right Column: Navigation & Services (2 Columns) */}
          <div className="grid grid-cols-2 gap-8">
            {/* Navigation */}
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">
                Company
              </h3>
              <nav className="flex flex-col gap-4 text-sm font-medium text-neutral-400">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About', href: '/about' },
                  { name: 'Events', href: '/events' },
                  { name: 'Services', href: '/services' },
                  { name: 'Portfolio', href: '/works' },
                  { name: 'Contact', href: '/contact' },
                ].map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href} 
                    className="group flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <span className="relative overflow-hidden">
                      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                        {link.name}
                      </span>
                      <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-primary-500">
                        {link.name}
                      </span>
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Service Overview */}
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">
                Services
              </h3>
              <nav className="flex flex-col gap-4 text-sm font-medium text-neutral-400">
                 {[
                  { name: 'Event Activation', href: '/services' },
                  { name: 'Influencer Marketing', href: '/services' },
                  { name: 'Media Promotion', href: '/services' },
                  { name: 'Content Creation', href: '/services' },
                ].map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href} 
                    className="group flex items-center gap-2 transition-colors hover:text-white"
                  >
                     <span className="relative overflow-hidden">
                      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                        {link.name}
                      </span>
                      <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-primary-500">
                        {link.name}
                      </span>
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Contact Info Bar & Socials */}
        <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          {/* Contact Details */}
          <div className="flex flex-col gap-4 text-sm text-neutral-400 md:flex-row md:gap-8">
            <a href="mailto:dh.hermansyah@gmail.com" className="flex items-center gap-2 transition-colors hover:text-white">
              <FaEnvelope className="h-4 w-4" />
              <span>dh.hermansyah@gmail.com</span>
            </a>
            <a href="https://wa.me/6281806360001" className="flex items-center gap-2 transition-colors hover:text-white">
              <FaWhatsapp className="h-4 w-4" />
              <span>+62 818 0636 0001</span>
            </a>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="h-4 w-4" />
              <span>Gading Serpong, Tangerang</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="https://instagram.com/kopichuseyo.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-colors hover:text-white"
              aria-label="Instagram"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://tiktok.com/@kopichuseyo.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-colors hover:text-white"
              aria-label="TikTok"
            >
              <FaTiktok className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-16 border-t border-neutral-800 pt-8 text-center">
          <p className="text-xs text-neutral-500">
            &copy; {currentYear} Kopi Chuseyo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
