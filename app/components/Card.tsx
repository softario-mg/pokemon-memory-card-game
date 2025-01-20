'use client';

import Image from 'next/image';
import { Card as CardType } from '../types/types';

// Simple pokeball SVG as a data URL
const POKEBALL_SVG = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0NSIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBkPSJNNSw1MGg5ME0zNSw1MGExNSwxNSAwIDEsMCAxNSwxNUExNSwxNSAwIDEsMCAzNSw1MFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIzIi8+PHBhdGggZD0iTTUwLDQ3YTMsMyAwIDEsMSAtMywzQTMsMyAwIDAsMSA1MCw0N1oiIGZpbGw9IiMwMDAiLz48L3N2Zz4=`;

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
  typeColors: { [key: string]: string };
}

export default function Card({ card, onClick, typeColors }: CardProps) {
  const mainType = card.types[0] || 'normal';
  const cardBgColor = typeColors[mainType] || 'bg-gray-400';

  return (
    <div
      onClick={() => onClick(card)}
      className={`relative aspect-square cursor-pointer perspective-1000 ${
        card.isMatched ? 'opacity-60' : ''
      }`}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          card.isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card (Pokéball) */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg flex items-center justify-center p-4">
          <Image
            src={POKEBALL_SVG}
            alt="Pokéball"
            width={80}
            height={80}
            className="w-3/4 h-3/4 object-contain"
          />
        </div>

        {/* Back of card (Pokémon) */}
        <div className={`absolute w-full h-full backface-hidden ${cardBgColor} rounded-xl shadow-lg flex flex-col items-center justify-center p-4 rotate-y-180`}>
          <Image
            src={card.image}
            alt={card.name}
            width={80}
            height={80}
            className="w-3/4 h-3/4 object-contain"
          />
          <p className="mt-2 text-sm font-semibold capitalize text-white">{card.name}</p>
          <div className="flex gap-2 mt-1">
            {card.types.map((type) => (
              <span
                key={type}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 