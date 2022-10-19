export interface ParamsProps {
  search?: string;
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
  filters?: Record<string, any>;
  includes?: string;
  page?: number;
  perPage?: number;
  disablePagination?: boolean;
}
