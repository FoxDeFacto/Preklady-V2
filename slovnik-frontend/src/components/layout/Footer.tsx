'use client';

import { useEffect, useState } from 'react';
import { Joke, ApiResponse } from '@/lib/types';
import { getRandomJoke } from '@/lib/api';

const Footer = () => {
  const [joke, setJoke] = useState<Joke | null>(null);

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await getRandomJoke() as ApiResponse<Joke[]>;
        if (response.data && response.data.length > 0) {
          setJoke(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching joke:', error);
      }
    };

    fetchJoke();
  }, []);

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">O projektu</h3>
            <p className="text-gray-600">
            Slovník <span className="text-red-500">Novo</span><span className="text-blue-500">češtiny</span> je můj osobní projekt zaměřený na kreativní překlad moderních anglických výrazů do češtiny.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Vtip dne</h3>
            {joke ? (
              <p className="text-gray-600 italic">"{joke.content}"</p>
            ) : (
              <p className="text-gray-400">Načítání vtipu...</p>
            )}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Slovník Novočeštiny.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;