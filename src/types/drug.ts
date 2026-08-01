export type DrugForm = 'tablet' | 'capsule' | 'syrup' | 'injection' | 'ointment' | 'drops';

export interface Drug {
  id: string;
  name: string;
  mnn: string;
  category: string;
  form: DrugForm;
  dosage: string;
  manufacturer: string;
  price: number;
  imageUrl?: string | null;
  slug: string;
  indications: string[];
  contraindications: string[];
  sideEffects: string[];
  interactions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type DrugCreateInput = Omit<Drug, 'id' | 'createdAt' | 'updatedAt'>;

export type DrugCardProps = {
  drug: Pick<
    Drug,
    'id' | 'name' | 'mnn' | 'form' | 'dosage' | 'manufacturer' | 'price' | 'imageUrl' | 'slug'
  >;
};

export interface DrugFilters {
  search?: string;
  category?: string;
  form?: DrugForm;
  minPrice?: number;
  maxPrice?: number;
}

export interface DrugListResponse {
  drugs: Drug[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface DrugListProps {
  drugs: Drug[];
}

export interface DrugDetailsPageProps {
  params: {
    id: string;
  };
}
