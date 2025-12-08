import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import Image from 'next/image';

type Props = {
  images: string[];
};

export const SwipeableImageStack = ({ images }: Props) => {
  const [cards, setCards] = useState(() =>
    images.map((img, idx) => ({ img, id: idx }))
  );
  const [exitingCard, setExitingCard] = useState<number | null>(null);

  const handleDragEnd = (id: number, info: PanInfo) => {
    const swipeThreshold = 150;
    const swipeVelocityThreshold = 500;

    const xDistance = Math.abs(info.offset.x);
    const xVelocity = Math.abs(info.velocity.x);

    // If swiped far enough or fast enough, move card to back
    if (xDistance > swipeThreshold || xVelocity > swipeVelocityThreshold) {
      setExitingCard(id);

      // Move the card to the back after animation completes
      setTimeout(() => {
        setCards((prev) => {
          const cardIndex = prev.findIndex((c) => c.id === id);
          if (cardIndex === -1) return prev;

          const newCards = [...prev];
          const [removedCard] = newCards.splice(cardIndex, 1);
          newCards.push(removedCard);
          return newCards;
        });
        setExitingCard(null);
      }, 300);
    }
  };

  return (
    <div className="relative mb-6 aspect-[4/3] w-full md:aspect-[16/9]">
      {cards.map((item, stackIndex) => {
        const isTopCard = stackIndex === 0;
        const isExiting = exitingCard === item.id;

        return (
          <SwipeableCard
            key={item.id}
            imgSrc={item.img}
            stackIndex={stackIndex}
            totalCards={cards.length}
            isTopCard={isTopCard}
            isExiting={isExiting}
            onDragEnd={(info) => handleDragEnd(item.id, info)}
          />
        );
      })}
    </div>
  );
};

type CardProps = {
  imgSrc: string;
  stackIndex: number;
  totalCards: number;
  isTopCard: boolean;
  isExiting: boolean;
  onDragEnd: (info: PanInfo) => void;
};

const SwipeableCard = ({
  imgSrc,
  stackIndex,
  totalCards,
  isTopCard,
  isExiting,
  onDragEnd,
}: CardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const dragOpacity = useTransform(
    x,
    [-200, -100, 0, 100, 200],
    [0.5, 1, 1, 1, 0.5]
  );


  return (
    <motion.div
      drag={isTopCard && !isExiting}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={(_, info) => onDragEnd(info)}
      style={{
        x: isTopCard && !isExiting ? x : stackIndex * 8,
        y: isTopCard && !isExiting ? y : stackIndex * 8,
        rotate: isTopCard && !isExiting ? rotate : 0,
        opacity: isExiting ? 0 : isTopCard ? dragOpacity : 1,
        zIndex: isExiting ? totalCards + 1 : totalCards - stackIndex,
        transform: `translateY(${stackIndex * 12}px) scale(${1 - stackIndex * 0.05})`,
      }}
      initial={false}
      animate={{
        opacity: isExiting ? 0 : 1,
        x: isExiting ? (x.get() > 0 ? 300 : -300) : stackIndex * 8,
        y: isExiting ? y.get() : stackIndex * 8,
      }}
      transition={{
        type: 'tween',
        duration: 0.3,
        ease: 'easeOut',
      }}
      className="absolute inset-0 right-6 cursor-grab overflow-hidden rounded-[8px] shadow-lg active:cursor-grabbing"
      whileHover={isTopCard && !isExiting ? { scale: 1.02 } : {}}
    >
      <div className="relative h-full w-full">
        <Image
          fill
          src={imgSrc}
          alt={`${imgSrc} Image`}
          className="pointer-events-none object-cover"
        />
      </div>
    </motion.div>
  );
};
