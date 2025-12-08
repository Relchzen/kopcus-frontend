"use client"

import React from 'react';
import { motion } from 'motion/react';

type Props = {
  sectionName: string;
  id: string;
  className?: string;
};

export const SectionHeading = (props: Props) => {
  const { sectionName, id, className } = props;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      id={id}
      className={`mb-3 inline-flex w-fit items-center gap-2 rounded-full border-2 border-neutral-200/60 bg-neutral-200/20 px-4 py-1.5 font-semibold text-primary-950 backdrop-blur-sm md:mb-6 ${className || ''}`}
    >
      <span className="bg-primary-500 h-1.5 w-1.5 rounded-full"></span>
      <h2 className="md:text-md text-xs">{sectionName}</h2>
    </motion.div>
  );
};
