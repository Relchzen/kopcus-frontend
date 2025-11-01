import React from 'react';

type Props = {
  name: string;
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const SectionContainer = ({
  name,
  children,
  className,
  ...rest
}: Props) => {
  return (
    <section
      id={name}
      className={`${className || ''} max-w-[1920px] gap-4`}
      {...rest}
    >
      {children}
    </section>
  );
};
