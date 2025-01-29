'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { searchTranslations } from '@/lib/api';
import { Translation } from '@/lib/types';
import Link from 'next/link';
import { Loader2, RotateCcw } from 'lucide-react';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const pageSize = 10;

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await searchTranslations(query, currentPage, pageSize);
        if (response && response.data) {
          setTranslations(response.data);
          if (response.meta?.pagination) {
            setTotalPages(Math.ceil(response.meta.pagination.total / pageSize));
          }
        }
      } catch (err) {
        setError('Failed to fetch results. Please try again.');
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchResults();
  }, [query, currentPage]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const searchQuery = formData.get('search') as string;
    
    setQuery(searchQuery.trim());
    setCurrentPage(1);
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}&page=1`);
  };

  const handleReset = () => {
    setQuery('');
    setCurrentPage(1);
    router.push('/search');
    
    // Reset the form input
    const form = document.querySelector('form') as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.push(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Vyhledávání překladů</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            name="search"
            defaultValue={query}
            placeholder="Hledat v angličtině nebo češtině..."
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Vyhledávám...' : 'Hledat'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : translations.length > 0 ? (
        <div>
          <div className="grid gap-8 py-8">
            {translations.map((translation) => (
              <Link
                href={`/translation/${translation.documentId}`}
                key={translation.id}
                className="block p-8 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-3">{translation.english}</h2>
                  <div className="text-gray-600 space-y-2">
                    {translation.czech.map((czech, index) => (
                      <span key={czech.id} className="inline-block">
                        {index > 0 && ', '}
                        {czech.noun && (
                          <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm mr-2">
                            {czech.noun}
                          </span>
                        )}
                        {czech.verb && (
                          <span className="bg-red-100 text-red-800 px-3 py-1.5 rounded-full text-sm">
                            {czech.verb}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
                {translation.example && (
                  <p className="text-gray-500 mt-4">
                    <b>Příklad:</b> {translation.example}
                  </p>
                )}
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                Předchozí
              </button>
              <span className="px-4 py-2">
                Stránka {currentPage} z {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                Další
              </button>
            </div>
          )}
        </div>
      ) : !isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Žádné výsledky{query ? ` pro "${query}"` : ''}</p>
        </div>
      ) : null}
    </div>
  );
}