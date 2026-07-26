//карточка препарата
'use client';

import Image from 'next/image';
import Link from 'next/link';

interface DrugCardProps {
  drug: {
    id: string;
    name: string;
    mnn: string;
    form: string;
    dosage: string;
    manufacturer: string;
    price: number;
    imageUrl?: string;
    slug: string;
  };
}

export function DrugCard({ drug }: DrugCardProps) {
  return (
    <Link href={`/drugs/${drug.slug}`} className="block">
      <div className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow bg-white">
        <div className="relative h-48 bg-gray-100">
          {drug.imageUrl ? (
            <Image
              src={drug.imageUrl}
              alt={drug.name}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Нет изображения
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg">{drug.name}</h3>
          <p className="text-sm text-gray-500">{drug.mnn}</p>
          <p className="text-sm text-gray-500">{drug.form} • {drug.dosage}</p>
          <p className="text-sm text-gray-500">{drug.manufacturer}</p>
          <p className="font-bold text-blue-600 mt-2">{drug.price} ₽</p>
        </div>
      </div>
    </Link>
  );
}