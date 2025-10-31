'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram } from 'react-icons/fa';
import { TransparentPopUpButton } from './Button';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/Button';

const NavItems = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={href}
      className="px-2 py-1 text-[16px] font-medium"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 128) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <motion.nav
        animate={{ y: show ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-2 left-1/2 z-50 flex w-[calc(100%-16px)] max-w-[1920px] -translate-x-1/2 items-center justify-between rounded-full border border-[#F8F9FA]/20 bg-[#FFF]/10 px-2 py-2 drop-shadow-lg backdrop-blur-[6px]"
      >
        <Link href="/">
          <div className="flex items-center">
            <Image
              src={'/logo bulat chuseyo-01.png'}
              alt="Logo Kopi Chuseyo Digital"
              width={56}
              height={56}
              className="mr-2"
            />
            <p className="text-xl font-extrabold text-black">KOPCUS DIGITAL</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div id="navbar-links" className="hidden md:inline">
          <ul className="flex gap-5">
            <li>
              <NavItems href="/services">Services</NavItems>
            </li>
            <li>
              <NavItems href="/posts">Posts</NavItems>
            </li>
            <li>
              <NavItems href="/about">About</NavItems>
            </li>
          </ul>
        </div>

        <div
          id="navbar-social"
          className="hidden items-center gap-4 px-2 md:flex"
        >
          <Button variant={'ghost'} href="/posts">
            <span className="text-[14px] font-bold">Contact Us</span>
          </Button>
          <Link href={'https://www.instagram.com/kopichuseyo.id/'}>
            <FaInstagram color="#212529" className="h-8 w-8" />
          </Link>
        </div>

        {/* Burger Menu Button */}
        <button
          className="z-50 flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={
              mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
            }
            className="block h-0.5 w-6 bg-black transition-all"
          />
          <motion.span
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-0.5 w-6 bg-black transition-all"
          />
          <motion.span
            animate={
              mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
            }
            className="block h-0.5 w-6 bg-black transition-all"
          />
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={closeMobileMenu}
            />

            {/* Slide-down Menu from Top */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="fixed top-0 right-0 left-0 z-40 w-full bg-white shadow-2xl md:hidden"
            >
              <div className="flex min-h-screen flex-col px-8 pt-24 pb-8">
                <nav className="flex flex-1 items-center justify-center">
                  <ul className="flex flex-col gap-8 text-center">
                    <li>
                      <NavItems href="/" onClick={closeMobileMenu}>
                        <span className="text-3xl font-bold text-black">
                          Home
                        </span>
                      </NavItems>
                    </li>
                    <li>
                      <NavItems href="/events" onClick={closeMobileMenu}>
                        <span className="text-3xl font-bold text-black">
                          Events
                        </span>
                      </NavItems>
                    </li>
                    <li>
                      <NavItems href="/services" onClick={closeMobileMenu}>
                        <span className="text-3xl font-bold text-black">
                          Services
                        </span>
                      </NavItems>
                    </li>
                    <li>
                      <NavItems href="/about" onClick={closeMobileMenu}>
                        <span className="text-3xl font-bold text-black">
                          About
                        </span>
                      </NavItems>
                    </li>
                    <li>
                      <NavItems href="/works" onClick={closeMobileMenu}>
                        <span className="text-3xl font-bold text-black">
                          Works
                        </span>
                      </NavItems>
                    </li>
                  </ul>
                </nav>

                {/* Mobile Social Links */}
                <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
                  <Link
                    href="/posts"
                    className="rounded-full bg-black px-6 py-3 text-center font-bold text-white"
                    onClick={closeMobileMenu}
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="https://www.instagram.com/kopichuseyo.id/"
                    className="flex items-center justify-center gap-2 rounded-full border-2 border-black px-6 py-3 font-bold"
                    onClick={closeMobileMenu}
                  >
                    <FaInstagram className="h-6 w-6" />
                    <span>Follow Us</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
