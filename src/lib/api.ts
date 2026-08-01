// Временные моковые данные
const mockDrugs = [
  {
    id: '1',
    name: 'Аспирин Express',
    mnn: 'Ацетилсалициловая кислота',
    category: 'Анальгетики',
    form: 'tablet',
    dosage: '500 мг',
    manufacturer: 'Pharma',
    price: 158,
    imageUrl: '/aspirin_bayer.png',
    slug: 'aspirin',
    indications: ['Головная боль', 'Лихорадка'],
    contraindications: ['Язва желудка'],
    sideEffects: ['Тошнота'],
    interactions: ['Антикоагулянты'],
  },
  {
    id: '2',
    name: 'Парацетамол',
    mnn: 'Парацетамол',
    category: 'Анальгетики',
    form: 'tablet',
    dosage: '500 мг',
    manufacturer: 'Pharma',
    price: 120,
    imageUrl: '/paracetamol_pharma.jpg',
    slug: 'paracetamol',
    indications: ['Головная боль', 'Лихорадка'],
    contraindications: ['Печеночная недостаточность'],
    sideEffects: ['Аллергия'],
    interactions: ['Алкоголь'],
  },
];

export async function fetchDrugs() {
  // Имитация задержки
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockDrugs;
}

export async function fetchDrugById(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockDrugs.find((drug) => drug.id === id) || null;
}
