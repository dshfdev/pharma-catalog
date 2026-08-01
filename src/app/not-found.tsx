'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Страница не найдена</h2>
      <p className="text-gray-500 mt-2">Извините, запрошенная страница не существует.</p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
