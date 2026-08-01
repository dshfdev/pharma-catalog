'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { DrugCardProps } from '@/types/drug';
import styles from './DrugCard.module.css';

export function DrugCard({ drug }: DrugCardProps) {
  return (
    <Link href={`/drugs/${drug.slug}`} className="block">
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
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
        <div className={styles.content}>
          <h3 className={styles.title}>{drug.name}</h3>
          <p className={styles.mnn}>{drug.mnn}</p>
          <p className={styles.meta}>
            {drug.form} • {drug.dosage}
          </p>
          <p className={styles.meta}>{drug.manufacturer}</p>
          <p className={styles.price}>{drug.price} ₽</p>
        </div>
      </div>
    </Link>
  );
}
