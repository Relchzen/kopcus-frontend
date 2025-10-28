import React from 'react';

type Props = {
  name: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const SectionContainer = ({ name, children, ...rest }: Props) => {
  return (
    <section id={name} className="gap-4 pt-18" {...rest}>
      {children}
    </section>
  );
};
