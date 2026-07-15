import { useQuery } from '@tanstack/react-query';
import { fetchDrugs } from '@/lib/api/fetchDrugs';

export function useDrugs(filters?: DrugFilters) {
  return useQuery({
    queryKey: ['drugs', filters],
    queryFn: () => fetchDrugs(filters),
    staleTime: 5 * 60 * 1000,
  });
}