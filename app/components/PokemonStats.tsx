'use client';

import { Card as CardType } from '../types/types';
import Image from 'next/image';

interface PokemonStatsProps {
  pokemon: CardType | null;
  onClose: () => void;
}

export default function PokemonStats({ pokemon, onClose }: PokemonStatsProps) {
  if (!pokemon) return null;

  const statNames = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
  };

  const getStatColor = (value: number) => {
    if (value >= 100) return 'bg-green-500';
    if (value >= 70) return 'bg-blue-500';
    if (value >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold capitalize">{pokemon.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative w-24 h-24">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex-1">
            <div className="flex gap-2 mb-2">
              {pokemon.types.map(type => (
                <span
                  key={type}
                  className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700"
                >
                  {type}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 rounded-lg"
                onClick={() => window.open(`https://pokemon.com/us/pokedex/${pokemon.name}`, '_blank')}
              >
                View Pokédex
              </button>
              <button
                className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 rounded-lg"
                onClick={() => window.open(`https://bulbapedia.bulbagarden.net/wiki/${pokemon.name}_(Pokémon)`, '_blank')}
              >
                Bulbapedia
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {Object.entries(pokemon.stats).map(([stat, value]) => (
            <div key={stat} className="flex items-center gap-2">
              <div className="w-20 text-sm">{statNames[stat as keyof typeof statNames]}</div>
              <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getStatColor(value)} transition-all`}
                  style={{ width: `${Math.min(100, (value / 150) * 100)}%` }}
                />
              </div>
              <div className="w-8 text-sm text-right">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 