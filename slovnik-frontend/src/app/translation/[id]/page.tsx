import { getTranslation } from '@/lib/api';
import { PageProps } from '@/lib/types';
import Link from 'next/link';

export default async function TranslationPage(props: PageProps) {
  const id = await Promise.resolve(props.params.id);
  const response = await getTranslation(id);
  const translation = response.data;

  return (
    <div className="container mx-auto px-4 py-4 mt-2 bg-white">
      <Link href="/" className="inline-block mb-6 text-blue-600 hover:text-blue-800 font-medium">
        ← Zpět na hlavní stránku
      </Link>

      <div className="bg-white shadow rounded-lg mb-6 border border-red-500">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-black">{translation.english}</h1>
          
          <div className="space-y-6">
            {/* Czech Translations */}
            <section>
              <h2 className="text-xl font-semibold mb-3 text-black">České překlady</h2>
              <div className="space-y-4">
                {translation.czech.map((czech) => (
                  <div key={czech.id} className="border rounded-lg p-4 bg-white">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium text-blue-600">Podstatné jméno:</span>{' '}
                        <span className="text-lg text-black">{czech.noun}</span>
                      </div>
                      <div>
                        <span className="font-medium text-red-600">Sloveso:</span>{' '}
                        <span className="text-lg text-black">{czech.verb}</span>
                      </div>
                    </div>
                  </div>
                ))}
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
                <p className="text-black italic">{translation.example}</p>
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