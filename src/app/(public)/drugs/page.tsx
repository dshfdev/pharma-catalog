import { fetchDrugById } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface DrugDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function DrugDetailsPage({ params }: DrugDetailsPageProps) {
  const drug = await fetchDrugById(params.id);

  if (!drug) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 h-64 bg-gray-100 rounded-lg relative">
            {drug.imageUrl ? (
              <Image
                src={drug.imageUrl}
                alt={drug.name}
                fill
                className="object-cover rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Нет изображения
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{drug.name}</h1>
            <p className="text-gray-500">МНН: {drug.mnn}</p>
            <p className="text-gray-500">Форма: {drug.form}</p>
            <p className="text-gray-500">Дозировка: {drug.dosage}</p>
            <p className="text-gray-500">Производитель: {drug.manufacturer}</p>
            <p className="text-2xl font-bold text-blue-600 mt-2">{drug.price} ₽</p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Показания</h2>
          <ul className="list-disc pl-5">
            {drug.indications.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Противопоказания</h2>
          <ul className="list-disc pl-5">
            {drug.contraindications.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Побочные эффекты</h2>
          <ul className="list-disc pl-5">
            {drug.sideEffects.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}