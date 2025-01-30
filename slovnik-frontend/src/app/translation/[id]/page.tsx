import { getTranslation } from '@/lib/api';
import { PageProps } from '@/lib/types';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';

export default async function TranslationPage(props: PageProps) {
  const { id } = await Promise.resolve(props.params);
  const response = await getTranslation(id);
  const translation = response.data;

  // Separate nouns and verbs
  const nouns = translation.czech.map(t => t.noun).filter(Boolean);
  const verbs = translation.czech.map(t => t.verb).filter(Boolean);

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

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Chyba při načítání překladu</h1>
      <p className="text-black">{error.message}</p>
      <Link href="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
        Návrat na hlavní stránku
      </Link>
    </div>
  );
}