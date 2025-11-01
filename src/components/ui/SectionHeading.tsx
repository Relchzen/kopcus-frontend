import React from 'react';

type Props = {
  sectionName: string;
  id: string;
};

export const SectionHeading = (props: Props) => {
  const { sectionName, id } = props;

  return (
    <div
      id={id}
      className="text-md inline-flex w-fit items-center gap-2 rounded-full border-2 border-neutral-200/60 bg-neutral-200/20 px-4 py-1.5 font-semibold text-black backdrop-blur-sm md:mb-6"
    >
      <span className="bg-primary-400 h-1.5 w-1.5 rounded-full"></span>
      <h2>{sectionName}</h2>
    </div>
  );
};

{
  /* <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-sm font-medium text-black backdrop-blur-sm">
  <span className="bg-primary-400 h-1.5 w-1.5 rounded-full"></span>
  Events
</div>; */
}
