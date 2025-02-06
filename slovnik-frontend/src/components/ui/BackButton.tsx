'use client';

export default function BackButton() {
  return (
    <button 
      onClick={() => window.history.back()} 
      className="inline-block mb-6 text-blue-600 hover:text-blue-800 font-medium"
    >
      ← Zpět
    </button>
  );
}