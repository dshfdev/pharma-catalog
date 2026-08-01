import { DrugCard } from './DrugCard/DrugCard';
import commonStyles from '@/styles/common.module.css';

interface DrugListProps {
  drugs: any[];
}

export function DrugList({ drugs }: DrugListProps) {
  if (drugs.length === 0) {
    return <p className="text-center text-gray-500">Нет доступных препаратов</p>;
  }

  return (
    <div className={commonStyles.drugsGrid}>
      {drugs.map((drug) => (
        <DrugCard key={drug.id} drug={drug} />
      ))}
    </div>
  );
}
