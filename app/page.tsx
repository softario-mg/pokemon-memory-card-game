import MemoryGame from './components/MemoryGame';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 py-8">
      <MemoryGame />
    </main>
  );
}
