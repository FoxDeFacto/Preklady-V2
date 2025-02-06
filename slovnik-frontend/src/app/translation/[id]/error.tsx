'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Chyba při načítání překladu</h1>
      <p className="text-black">{error.message}</p>
      <div className="space-x-4 mt-4">
        <button
          onClick={reset}
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Zkusit znovu
        </button>
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 inline-block"
        >
          Návrat na hlavní stránku
        </Link>
      </div>
    </div>
  );
}