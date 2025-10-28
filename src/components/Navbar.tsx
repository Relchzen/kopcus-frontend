'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram } from 'react-icons/fa';
import {
  InversePopUpButton,
  PopUpButton,
  TransparentPopUpButton,
} from './Button';
import { motion } from 'motion/react';

type Props = {};

// const bebasNeue = Bebas_Neue({
//   weight: "400",
//   subsets: ["latin"],
//   variable: "--font-bebas-neue",
// });

const NavItems = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} className="px-2 py-1 text-[16px] font-medium">
      {children}
    </Link>
  );
};

export const Navbar = (props: Props) => {
  const [show, setShow] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 64) {
        // scrolling down
        setShow(false);
      } else {
        // scrolling up
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      animate={{ y: show ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-2 left-1/2 z-50 flex w-[calc(100%-32px)] max-w-[1440px] -translate-x-1/2 items-center justify-between rounded-full border border-[#F8F9FA]/20 bg-[#FFF]/10 px-4 py-2 drop-shadow-lg backdrop-blur-[4px]"
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
          <p className={`text-xl font-extrabold text-black`}>KOPCUS DIGITAL</p>
        </div>
      </Link>
      <div id="navbar-links">
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
      <div id="navbar-social" className="flex items-center gap-4 px-2">
        <TransparentPopUpButton href="/posts">
          <span className="text-[14px] font-bold">Contact Us</span>
        </TransparentPopUpButton>
        <Link href={'https://www.instagram.com/kopichuseyo.id/'}>
          <FaInstagram color="#212529" className="h-8 w-8" />
        </Link>
      </div>
    </motion.nav>
  );
};
