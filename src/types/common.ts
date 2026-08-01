export interface ApiResponse<T = unknown> {
  success: boolean;
  error?: string;
  data?: T;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export type Role = 'USER' | 'ADMIN';
