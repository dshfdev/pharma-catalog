import { DrugCard } from '@/components/DrugCard';
import { fetchDrugs } from '@/lib/api';

export default async function DrugsPage() {
  const drugs = await fetchDrugs();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {drugs.map((drug) => (
        <DrugCard key={drug.id} drug={drug} />
      ))}
    </div>
  );
}