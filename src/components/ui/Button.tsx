import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

const buttonVariants = cva(
  'inline-flex items-center justify-center hover:cursor-pointer transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-black hover:bg-primary-400',
        secondary: 'bg-secondary-200 text-secondary-900 hover:bg-secondary-300',
        outline:
          'border-2 border-primary-500 text-primary-500 hover:bg-primary-100',
        ghost:
          'text-black relative hover:text-primary-500 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary-500 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100 [&:not(:hover)]:after:origin-right',
      },
      size: {
        // Fixed sizes
        none: 'py-2',
        xs: 'px-2.5 py-1.5 text-xs rounded-md',
        sm: 'px-3 py-2 text-sm rounded-md',
        md: 'px-4 py-2.5 text-base rounded-lg', // ⭐ Sweet spot
        lg: 'px-6 py-3 text-lg rounded-lg',
        xl: 'px-8 py-4 text-xl rounded-xl',

        // Responsive sizes
        responsive:
          'px-3 py-2 text-sm rounded-md md:px-4 md:py-2.5 md:text-base md:rounded-lg lg:px-6 lg:py-3 lg:text-lg lg:rounded-lg', // sm → md → lg
        'responsive-sm':
          'px-2.5 py-1.5 text-xs rounded-md md:px-3 md:py-2 md:text-sm md:rounded-md lg:px-4 lg:py-2.5 lg:text-base lg:rounded-lg', // xs → sm → md
        'responsive-md':
          'px-4 py-2.5 text-base rounded-lg lg:px-6 lg:py-3 lg:text-lg lg:rounded-lg', // md → lg
        'responsive-lg':
          'px-6 py-3 text-lg rounded-lg lg:px-8 lg:py-4 lg:text-xl lg:rounded-xl', // lg → xl
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
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
}: ButtonProps) => {
  if (href) {
    return (
      <Link
        href={href}
        className={buttonVariants({ variant, size, className })}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonVariants({ variant, size, className })}>
      {children}
    </button>
  );
};
