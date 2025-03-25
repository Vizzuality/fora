import { queryOptions, useQuery } from '@tanstack/react-query';

import API from '@/services/api';

const useFundingTypesBaseQueryOptions = queryOptions({
  queryKey: ['funding-types'],
  queryFn: () =>
    API.request({
      method: 'GET',
      url: '/funding_types',
    }).then((response) => response.data),
  select: (d) => d.data.sort((a, b) => a.name.localeCompare(b.name)),
});

export function useFundingTypes(
  upcomingQueryOptions?: Omit<typeof useFundingTypesBaseQueryOptions, 'queryKey'>,
) {
  return useQuery({
    ...useFundingTypesBaseQueryOptions,
    ...upcomingQueryOptions,
  });
}
