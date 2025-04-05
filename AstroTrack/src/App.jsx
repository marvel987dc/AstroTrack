import { Suspense } from 'react';
import AstronomyExplorer from './Components/astronomy-explorer';
import LoadingSpinner from './Components/loading-spinner';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="stars-container fixed inset-0 z-0"></div>
      <div className="relative z-10">
        <header className="py-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Cosmic Explorer
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Discover the wonders of our universe
          </p>
        </header>
        
        <Suspense fallback={<LoadingSpinner />}>
          <AstronomyExplorer />
        </Suspense>
      </div>
    </main>
  );
}
