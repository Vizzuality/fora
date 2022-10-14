import { ParamsProps } from './types';

export function jsonAPIAdapter(params: ParamsProps) {
  const { filters = {}, search, sort, includes, page, perPage, disablePagination } = params;

  const parsedFilters = Object.keys(filters).reduce((acc, key) => {
    const value = filters[key];

    return {
      ...acc,
      [`filter[${key}]`]: value,
    };
  }, {});

  return {
    // Filters
    ...parsedFilters,
    // Sort
    ...(sort?.field && {
      'sort[attribute]': sort.field,
    }),
    ...(sort?.order && {
      'sort[direction]': sort.order,
    }),
    // Search
    ...(search && { 'filter[full_text]': search }),
    // Includes
    ...(includes && { includes }),

    // Pagination
    ...(!!page && {
      'page[number]': page,
    }),
    ...(!!perPage && {
      'page[size]': perPage,
    }),
    ...(disablePagination && {
      disable_pagination: disablePagination,
    }),
  };
}
