import { AdapterOptionsProps } from './types';

export function jsonAPIAdapter(options: AdapterOptionsProps) {
  const { filters = {}, search, sort, page, perPage } = options;

  const parsedFilters = Object.keys(filters).reduce((acc, k) => {
    if (filters[k] && Array.isArray(filters[k]) && !filters[k].length) {
      return acc;
    }

    return {
      ...acc,
      [`filter[${k}]`]: filters[k] && filters[k].toString ? filters[k].toString() : filters[k],
    };
  }, {});

  return {
    // Filters
    ...parsedFilters,
    // Sort
    ...(sort?.field && {
      sort: `${sort.order === 'desc' ? '-' : ''}${sort.field}`,
    }),
    // Search
    ...(search && { q: search }),
    // Pagination
    ...(!!page && {
      'page[number]': page,
    }),
    ...(!!perPage && {
      'page[size]': perPage,
    }),
  };
}
