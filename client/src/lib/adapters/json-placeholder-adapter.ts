import { AdapterOptionsProps } from './types';

export function jsonPlaceholderAdapter(options: AdapterOptionsProps) {
  const { filters = {}, search, sort, page, perPage } = options;

  return {
    // Filters
    ...filters,
    // Sort
    ...(sort.field && { _sort: sort.field }),
    ...(sort.order && { _order: sort.order }),
    // Search
    ...(search && { q: search }),
    // Pagination
    ...(page && { _page: page }),
    ...(perPage && { _limit: perPage }),
  };
}
