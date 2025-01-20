'use client';

interface GameSettingsProps {
  difficulty: 'easy' | 'medium' | 'hard';
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  onStart: () => void;
}

export default function GameSettings({ difficulty, setDifficulty, onStart }: GameSettingsProps) {
  const difficultyOptions = {
    easy: { pairs: 6, time: '2:00', preview: '10s' },
    medium: { pairs: 8, time: '3:00', preview: '8s' },
    hard: { pairs: 12, time: '5:00', preview: '5s' },
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Game Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Difficulty</label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(difficultyOptions).map(([level, { pairs, time, preview }]) => (
              <button
                key={level}
                onClick={() => setDifficulty(level as 'easy' | 'medium' | 'hard')}
                className={`p-2 rounded-lg text-sm font-semibold transition-colors
                  ${difficulty === level
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                <div>{level.charAt(0).toUpperCase() + level.slice(1)}</div>
                <div className="text-xs opacity-75">{pairs} pairs</div>
                <div className="text-xs opacity-75">Game: {time}</div>
                <div className="text-xs opacity-75">Preview: {preview}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
          <p>You will have a preview time to memorize the cards before they are hidden.</p>
          <p>Match all pairs before time runs out!</p>
        </div>

        <button
          onClick={onStart}
          className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  );
} 