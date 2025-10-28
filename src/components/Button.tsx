'use client';

import React from 'react';
import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
};

export const PopUpButton = ({ href, children, disabled }: Props) => {
  return (
    <Link
      href={href}
      className="bg-secondary-200 relative w-fit overflow-visible"
    >
      <div
        className={`flex items-center gap-2 ${disabled ? 'bg-primary-300' : 'bg-primary-500'} px-4 py-2 transition-all duration-100 hover:-translate-x-[-6px] hover:-translate-y-[6px]`}
      >
        {children}
      </div>
    </Link>
  );
};

export const TransparentPopUpButton = ({ href, children }: Props) => {
  return (
    <Link
      href={href}
      className="hover:bg-secondary-200 relative w-fit overflow-visible"
    >
      <div className="flex items-center gap-2 px-4 py-2 transition-all duration-100 hover:-translate-x-[-6px] hover:-translate-y-[6px] hover:bg-[#F27BA9]">
        {children}
      </div>
    </Link>
  );
};

export const InversePopUpButton = ({ href, children }: Props) => {
  return (
    <Link href={href} className="relative w-fit overflow-visible bg-[#F27BA9]">
      <div className="text-primary-800 bg-secondary-200 flex items-center gap-2 px-4 py-2 transition-all duration-100 hover:-translate-x-[-6px] hover:-translate-y-[6px] hover:text-black">
        {children}
      </div>
    </Link>
  );
};

export const TransparentInversePopUpButton = ({ href, children }: Props) => {
  return (
    <Link
      href={href}
      className="relative w-fit overflow-visible hover:bg-[#F27BA9]"
    >
      <div className="text-primary-800 hover:bg-secondary-200 flex items-center gap-2 px-4 py-2 transition-all duration-100 hover:-translate-x-[-6px] hover:-translate-y-[6px] hover:text-black">
        {children}
      </div>
    </Link>
  );
};
