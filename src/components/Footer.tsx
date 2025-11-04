import React from 'react';

type Props = {};

export const Footer = (props: Props) => {
  return (
    <footer className="section-padding bg-primary-700 flex min-h-64 flex-col gap-4 pt-16 text-white md:flex-row">
      <div className="w-full bg-amber-400">Left</div>
      <div className="w-full bg-amber-400">Right</div>
    </footer>
  );
};
