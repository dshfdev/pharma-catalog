//сетка карточек с пагинацией/фильтрацией
import { DrugCard } from './DrugCard';

interface DrugListProps {
  drugs: any[];
}

export function DrugList({ drugs }: DrugListProps) {
  if (drugs.length === 0) {
    return <p className="text-center text-gray-500">Нет доступных препаратов</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {drugs.map((drug) => (
        <DrugCard key={drug.id} drug={drug} />
      ))}
    </div>
  );
}