import Link from 'next/link';
import { Translation } from '@/lib/types';

interface TranslationCardProps {
  translation: Translation;
  showFull?: boolean;
}

const TranslationCard = ({ translation, showFull = false }: TranslationCardProps) => {
  const { id, documentId, english, czech, etymology, reason, example } = translation;

  const CardContent = () => (
    <>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-blue-800">{english}</h2>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">České překlady:</h3>
        <div className="flex flex-wrap gap-2">
          {czech.map((translation) => (
            <div key={translation.id} className="space-y-1">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {translation.noun}
              </span>
              {translation.verb && (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm ml-2">
                  {translation.verb}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {showFull ? (
        <>
          {etymology && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Etymologie:</h3>
              <p className="text-gray-700">{etymology}</p>
            </div>
          )}

          {reason && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Odůvodnění:</h3>
              <p className="text-gray-700">{reason}</p>
            </div>
          )}

          {example && (
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Příklad:</h3>
              <p className="text-gray-700 italic">"{example}"</p>
            </div>
          )}
        </>
      ) : (
        <div className="relative h-6">
          <div className="absolute bottom-0 right-0 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Zobrazit více →
          </div>
        </div>
      )}
    </>
  );

  if (showFull) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border-2 border-red-600">
        <CardContent />
      </div>
    );
  }

  return (
    <Link href={`/translation/${documentId}`} className="block group">
      <div className="bg-white rounded-lg shadow-md p-6 border-2 border-red-600 
                    transform transition-all duration-200 ease-in-out
                    hover:scale-[1.02] hover:shadow-xl">
        <CardContent />
      </div>
    </Link>
  );
};

export default TranslationCard;