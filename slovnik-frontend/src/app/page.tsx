'use client';

import { useEffect, useState } from 'react';
import { Translation, ApiResponse } from '@/lib/types';
import { getRandomTranslations, getLatestTranslations } from '@/lib/api';
import TranslationCard from '@/components/ui/TranslationCard';
import SearchInput from '@/components/ui/SearchInput';

export default function Home() {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [latestTranslations, setLatestTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const [latestLoading, setLatestLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both random and latest translations concurrently
        const [randomResponse, latestResponse] = await Promise.all([
          getRandomTranslations(6) as Promise<ApiResponse<Translation[]>>,
          getLatestTranslations(3) as Promise<ApiResponse<Translation[]>>
        ]);

        setTranslations(randomResponse.data);
        setLatestTranslations(latestResponse.data);
      } catch (error) {
        console.error('Error fetching translations:', error);
      } finally {
        setLoading(false);
        setLatestLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-red-600">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid-8" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Slovník <span className="text-red-500">Novo</span><span className="text-blue-500">češtiny</span>
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Objevte české ekvivalenty pro moderní anglické výrazy, které zatím nemají ustálený překlad.
          </p>
          
          <div className="flex justify-center">
            <SearchInput variant="hero" />
          </div>
        </div>
      </section>

      {/* Latest Translations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nejnovější překlady
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Prohlédněte si nejnovější přírůstky do našeho slovníku.
          </p>
        </div>

        {latestLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-6 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestTranslations.map((translation) => (
              <TranslationCard
                key={translation.id}
                translation={translation}
              />
            ))}
          </div>
        )}
      </section>

      {/* Random Translations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Náhodné překlady
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Objevujte zajímavé překlady a jejich významy. Každé obnovení stránky přináší novou dávku kreativity.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-6 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {translations.map((translation) => (
              <TranslationCard
                key={translation.id}
                translation={translation}
              />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Snadné vyhledávání</h3>
              <p className="text-gray-600">Hledejte překlady v češtině i angličtině</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailní vysvětlení</h3>
              <p className="text-gray-600">Každý překlad má svůj důvod</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Kreativní překlady</h3>
              <p className="text-gray-600">Objevujte nové možnosti vyjadřovaní</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}