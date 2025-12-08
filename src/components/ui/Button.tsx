import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 ease-out hover:cursor-pointer disabled:opacity-50 disabled:pointer-events-none ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-950 text-white shadow-lg shadow-primary-900/10 hover:bg-primary-900 hover:shadow-primary-900/20 hover:-translate-y-0.5 active:translate-y-0',
        secondary:
          'bg-white text-primary-950 border border-neutral-200 shadow-sm hover:bg-neutral-50 hover:border-neutral-300 hover:text-primary-950',
        outline:
          'border border-neutral-200 bg-transparent text-neutral-600 hover:bg-neutral-50 hover:text-primary-950 hover:border-neutral-300',
        ghost:
          'text-neutral-600 hover:bg-neutral-100/50 hover:text-primary-950',
        link: 'text-primary-950 underline-offset-4 hover:underline',
      },
      size: {
        // Fixed sizes
        none: 'p-0',
        xs: 'px-3 py-1.5 text-xs rounded-md',
        sm: 'px-4 py-2 text-sm rounded-lg',
        md: 'px-6 py-2.5 text-sm rounded-lg', // Refined default
        lg: 'px-8 py-3 text-base rounded-lg',
        xl: 'px-10 py-4 text-lg rounded-xl',
        icon: 'h-10 w-10',

        // Responsive sizes (kept for compatibility, but refined)
        responsive:
          'px-4 py-2 text-sm rounded-lg md:px-6 md:py-2.5 md:text-sm lg:px-8 lg:py-3 lg:text-base',
        'responsive-sm':
          'px-3 py-1.5 text-xs rounded-md md:px-4 md:py-2 md:text-sm lg:px-6 lg:py-2.5 lg:text-base',
        'responsive-md':
          'px-6 py-2.5 text-sm rounded-lg lg:px-8 lg:py-3 lg:text-base',
        'responsive-lg':
          'px-8 py-3 text-base rounded-lg lg:px-10 lg:py-4 lg:text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export const Button = ({
  size,
  variant,
  href,
  children,
  className,
  ...props
}: ButtonProps) => {
  if (href) {
    return (
      <Link
        href={href}
        className={buttonVariants({ variant, size, className })}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
};
