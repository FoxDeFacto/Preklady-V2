// app/translation/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getTranslation } from '@/lib/api';
import { Translation, PageProps } from '@/lib/types';
import BackButton from '@/components/ui/BackButton';

export default function TranslationPage({ params }: PageProps) {
  const [translation, setTranslation] = useState<Translation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        setLoading(true);
        // Await the params promise to get the actual id
        const resolvedParams = await params;
        const response = await getTranslation(resolvedParams.id);
        setTranslation(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching translation:', err);
        setError('Failed to load translation. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTranslation();
  }, [params]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-4 mt-2">
        <BackButton />
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-4 mt-2">
        <BackButton />
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  if (!translation) {
    return (
      <div className="container mx-auto px-4 py-4 mt-2">
        <BackButton />
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">Translation not found</p>
        </div>
      </div>
    );
  }

  // Separate nouns and verbs with type predicates
  const nouns = translation.czech
    .map(t => t.noun)
    .filter((noun): noun is string => Boolean(noun));
  
  const verbs = translation.czech
    .map(t => t.verb)
    .filter((verb): verb is string => Boolean(verb));

  return (
    <div className="container mx-auto px-4 py-4 mt-2 bg-white">
      <BackButton />

      <div className="bg-white shadow rounded-lg mb-6 border border-red-500">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-black">{translation.english}</h1>
          
          <div className="space-y-6">
            {/* Czech Translations */}
            <section>
              <h2 className="text-xl font-semibold mb-3 text-black">České překlady</h2>
              <div className="bg-white rounded-lg border p-4 space-y-3">
                {/* Nouns Row */}
                <div className="flex items-center gap-2">
                  <span className="font-medium text-blue-600 min-w-[120px]">Podstatná jména:</span>
                  <div className="flex flex-wrap gap-2">
                    {nouns.map((noun, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {noun}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verbs Row - Only show if verbs exist */}
                {verbs.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-red-600 min-w-[120px]">Slovesa:</span>
                    <div className="flex flex-wrap gap-2">
                      {verbs.map((verb, index) => (
                        <span
                          key={index}
                          className="bg-red-50 text-red-800 px-3 py-1 rounded-full text-sm"
                        >
                          {verb}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Etymology */}
            {translation.etymology && (
              <section>
                <h2 className="text-xl font-semibold mb-2 text-black">Etymologie</h2>
                <p className="text-black">{translation.etymology}</p>
              </section>
            )}

            {/* Translation Reason */}
            {translation.reason && (
              <section>
                <h2 className="text-xl font-semibold mb-2 text-black">Důvod překladu</h2>
                <p className="text-black">{translation.reason}</p>
              </section>
            )}

            {/* Example */}
            {translation.example && (
              <section>
                <h2 className="text-xl font-semibold mb-2 text-black">Příklad použití</h2>
                <p className="text-black italic">"{translation.example}"</p>
              </section>
            )}

            {/* Metadata */}
            <div className="text-sm text-black pt-4 border-t">
              <p>Naposledy aktualizováno: {new Date(translation.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}