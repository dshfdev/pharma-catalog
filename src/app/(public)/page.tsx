import { DrugList } from '@/components/common/DrugList';
import { fetchDrugs } from '@/lib/api';
import commonStyles from '@/styles/common.module.css';

export default async function HomePage() {
  const drugs = await fetchDrugs();
  return (
    <div className={`${commonStyles.container} py-8`}>
      <h1 className={commonStyles.pageTitle}>Каталог лекарственных средств</h1>
      <DrugList drugs={drugs} />
    </div>
  );
}
