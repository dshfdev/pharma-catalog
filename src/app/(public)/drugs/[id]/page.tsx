import { fetchDrugById } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { DrugDetailsPageProps } from '@/types/drug';
import styles from './DrugDetailsPage.module.css';

export default async function DrugDetailsPage({ params }: DrugDetailsPageProps) {
  const drug = await fetchDrugById(params.id);

  if (!drug) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.layout}>
          <div className={styles.imageWrapper}>
            {drug.imageUrl ? (
              <Image src={drug.imageUrl} alt={drug.name} fill className="object-cover rounded-lg" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Нет изображения
              </div>
            )}
          </div>
          <div className={styles.info}>
            <h1 className={styles.title}>{drug.name}</h1>
            <p className={styles.label}>МНН: {drug.mnn}</p>
            <p className={styles.label}>Форма: {drug.form}</p>
            <p className={styles.label}>Дозировка: {drug.dosage}</p>
            <p className={styles.label}>Производитель: {drug.manufacturer}</p>
            <p className={styles.price}>{drug.price} ₽</p>
          </div>
        </div>

        <div>
          <h2 className={styles.sectionTitle}>Показания</h2>
          <ul className={styles.list}>
            {drug.indications.map((item, index) => (
              <li key={`indication-${index}`}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={styles.sectionTitle}>Противопоказания</h2>
          <ul className={styles.list}>
            {drug.contraindications.map((item, index) => (
              <li key={`contraindication-${index}`}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={styles.sectionTitle}>Побочные эффекты</h2>
          <ul className={styles.list}>
            {drug.sideEffects.map((item, index) => (
              <li key={`side-effect-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
