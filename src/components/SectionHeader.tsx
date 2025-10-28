import React from 'react';

type Props = {
  sectionName: string;
  firstHeadline: string;
  secondHeadline: string;
  secondHeadlineColor?: string;
};

export const SectionHeader = (props: Props) => {
  const { sectionName, firstHeadline, secondHeadline, secondHeadlineColor } =
    props;
  const styles = {
    container: {
      lg: 'sticky top-0 z-0 flex md:flex-row w-full py-4 md:px-4',
      mobile: 'flex-col px-2',
    },
    sectionName: {
      container: 'w-3/12 lg:w-3/12 xl:w-4/12',
      text: 'lg:text-2xl md:text-lg',
    },
    sectionHeadline: {
      text: {
        base: `text-[32px]/[32px] md:text-[48px]/[48px] lg:text-[64px]/[64px] font-semibold`,
        first: 'text-[#212529]',
        second: secondHeadlineColor ?? 'text-[#CE648D]',
      },
    },
  };

  return (
    <div
      id="section-header"
      className={`${styles.container.lg} ${styles.container.mobile}`}
    >
      <div id="section-name" className={`${styles.sectionName.container}`}>
        <h2 className={`${styles.sectionName.text}`}>{sectionName}</h2>
      </div>
      <div id="section-headline">
        <h3
          className={`${styles.sectionHeadline.text.base} ${styles.sectionHeadline.text.first}`}
        >
          {firstHeadline}
        </h3>
        <h3
          className={`${styles.sectionHeadline.text.base} ${styles.sectionHeadline.text.second}`}
        >
          {secondHeadline}
        </h3>
      </div>
    </div>
  );
};
