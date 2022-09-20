export interface AdapterOptionsProps {
  search?: string;
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
  filters?: Record<string, any>;
  page?: number;
  perPage?: number;
}
