import { DrugList } from '@/components/common/DrugList';
import { fetchDrugs } from '@/lib/api';

export default async function HomePage() {
  const drugs = await fetchDrugs();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Каталог лекарственных средств</h1>
      <DrugList drugs={drugs} />
    </div>
  );
}