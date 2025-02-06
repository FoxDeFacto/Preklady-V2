'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface SearchInputProps {
  variant?: 'hero' | 'page';
  initialQuery?: string;
  onSearch?: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  variant = 'hero',
  initialQuery = '',
  onSearch
}) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(query);
    } else {
      router.push(`/search?q=${encodeURIComponent(query)}&page=1`);
    }
  };

  const isHero = variant === 'hero';

  return (
    <form 
      onSubmit={handleSubmit}
      className={`w-full max-w-2xl ${isHero ? 'scale-110' : ''}`}
    >
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Hledejte slova v český nebo anglický podobě..."
          className={`
            w-full px-4 py-3 pl-12
            bg-white rounded-lg
            border border-gray-300
            text-gray-900 
            placeholder-gray-500
            focus:outline-none focus:ring-2 
            focus:ring-blue-500 focus:border-transparent
            ${isHero ? 'shadow-lg text-lg' : 'shadow-sm text-base'}
          `}
        />
        <Search 
          className="absolute left-4 text-gray-400" 
          size={isHero ? 24 : 20}
        />
        <button
          type="submit"
          className={`
            absolute right-3
            px-4 py-1.5
            bg-blue-600 
            text-white 
            rounded-md
            hover:bg-blue-700 
            transition-colors
            ${isHero ? 'text-base' : 'text-sm'}
          `}
        >
          Hledat
        </button>
      </div>
    </form>
  );
};

export default SearchInput;