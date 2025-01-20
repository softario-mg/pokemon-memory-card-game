'use client';

import { useEffect, useState, useCallback } from 'react';
import { Card as CardType, Pokemon } from '../types/types';
import Card from './Card';
import Timer from './Timer';
import GameSettings from './GameSettings';
import PokemonStats from './PokemonStats';

const TYPE_COLORS = {
  normal: 'bg-gray-400',
  fire: 'bg-red-400',
  water: 'bg-blue-400',
  electric: 'bg-yellow-400',
  grass: 'bg-green-400',
  ice: 'bg-cyan-400',
  fighting: 'bg-red-600',
  poison: 'bg-purple-400',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-400',
  bug: 'bg-lime-400',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-600',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

const DIFFICULTY_SETTINGS = {
  easy: { pairs: 6, time: 120 },
  medium: { pairs: 8, time: 180 },
  hard: { pairs: 12, time: 300 },
};

export default function MemoryGame() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [selectedPokemon, setSelectedPokemon] = useState<CardType | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  // Sound effects
  const playFlipSound = useCallback(() => {
    const audio = new Audio('/sounds/flip.mp3');
    audio.play().catch(() => {});
  }, []);

  const playMatchSound = useCallback(() => {
    const audio = new Audio('/sounds/match.mp3');
    audio.play().catch(() => {});
  }, []);

  const playWinSound = useCallback(() => {
    const audio = new Audio('/sounds/win.mp3');
    audio.play().catch(() => {});
  }, []);

  const fetchPokemon = async () => {
    try {
      setIsLoading(true);
      const pokemonArray: CardType[] = [];
      const numPairs = DIFFICULTY_SETTINGS[difficulty].pairs;
      
      // Fetch random Pokémon
      for (let i = 0; i < numPairs; i++) {
        const id = Math.floor(Math.random() * 151) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data: Pokemon = await response.json();
        
        // Create two cards for each Pokémon (pairs)
        const card1: CardType = {
          id: i * 2,
          pokemonId: data.id,
          name: data.name,
          image: data.sprites.front_default,
          shinyImage: data.sprites.front_shiny,
          types: data.types.map(t => t.type.name),
          stats: Object.fromEntries(
            data.stats.map(s => [s.stat.name, s.base_stat])
          ),
          isFlipped: false,
          isMatched: false
        };
        
        const card2: CardType = {
          id: i * 2 + 1,
          pokemonId: data.id,
          name: data.name,
          image: data.sprites.front_default,
          shinyImage: data.sprites.front_shiny,
          types: data.types.map(t => t.type.name),
          stats: Object.fromEntries(
            data.stats.map(s => [s.stat.name, s.base_stat])
          ),
          isFlipped: false,
          isMatched: false
        };
        
        pokemonArray.push(card1, card2);
      }
      
      // Shuffle the array
      const shuffledCards = pokemonArray.sort(() => Math.random() - 0.5);
      setCards(shuffledCards);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (clickedCard: CardType) => {
    if (
      flippedCards.length === 2 ||
      clickedCard.isFlipped ||
      clickedCard.isMatched ||
      isGameOver
    ) {
      return;
    }

    playFlipSound();

    // Flip the card
    const updatedCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);
    setMoves(prev => prev + 1);

    // Check for match if two cards are flipped
    if (newFlippedCards.length === 2) {
      if (newFlippedCards[0].pokemonId === newFlippedCards[1].pokemonId) {
        // Match found
        playMatchSound();
        setScore(prevScore => {
          const newScore = prevScore + 1;
          setBestScore(Math.max(newScore, bestScore));
          return newScore;
        });
        
        // Update cards to matched state
        setTimeout(() => {
          setCards(cards.map(card =>
            card.pokemonId === newFlippedCards[0].pokemonId
              ? { ...card, isMatched: true }
              : card
          ));
          setFlippedCards([]);
          setSelectedPokemon(newFlippedCards[0]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(cards.map(card =>
            card.isFlipped && !card.isMatched
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleStart = () => {
    setGameStarted(true);
    setIsGameOver(false);
    setScore(0);
    setMoves(0);
    fetchPokemon();
  };

  const handleTimeUp = () => {
    setIsGameOver(true);
  };

  const handleRestart = () => {
    setGameStarted(false);
    setIsGameOver(false);
    setScore(0);
    setMoves(0);
    setFlippedCards([]);
    setSelectedPokemon(null);
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      playWinSound();
      setIsGameOver(true);
    }
  }, [cards, playWinSound]);

  if (!gameStarted) {
    return (
      <GameSettings
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        onStart={handleStart}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Pokémon Memory Game</h1>
        <div className="flex justify-center items-center gap-8 mb-4">
          <div className="text-lg">Moves: {moves}</div>
          <Timer
            initialTime={DIFFICULTY_SETTINGS[difficulty].time}
            isRunning={!isGameOver}
            onTimeUp={handleTimeUp}
          />
          <div className="text-lg">Score: {score}</div>
        </div>
        <button
          onClick={handleRestart}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          New Game
        </button>
      </div>
      
      {isGameOver && (
        <div className="text-center mb-8 p-4 bg-green-100 dark:bg-green-900 rounded-lg">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-300">
            {cards.every(card => card.isMatched) ? 'Congratulations! You won!' : 'Time\'s up!'}
          </h2>
          <p className="text-green-600 dark:text-green-400">
            You made {moves} moves and matched {score} pairs!
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(card => (
          <Card 
            key={card.id} 
            card={card} 
            onClick={handleCardClick}
            typeColors={TYPE_COLORS}
          />
        ))}
      </div>

      {selectedPokemon && (
        <PokemonStats
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
} 