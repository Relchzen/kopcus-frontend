import React from 'react';

type Props = {
  sectionName: string;
  id: string;
};

export const SectionHeading = (props: Props) => {
  const { sectionName, id } = props;

  return (
    <h2
      id="portfolio-heading"
      className="text-primary-500 mb-2 flex items-center gap-2 text-lg font-medium md:text-xl lg:text-2xl"
    >
      <span className="bg-primary-500 h-2 w-2 rounded-full"></span>
      {sectionName}
    </h2>
  );
};
