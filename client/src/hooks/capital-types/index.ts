import { useMemo } from 'react';

import { queryOptions, useQuery } from '@tanstack/react-query';

import API from 'services/api';

const baseQueryOptions = queryOptions({
  queryKey: ['capital-types'],
  queryFn: () =>
    API.request({
      method: 'GET',
      url: '/capital_types',
    }).then((response) => response.data),
  placeholderData: {
    data: [],
  },
});

export function useCapitalTypes(
  upcomingQueryOptions?: Omit<Omit<typeof baseQueryOptions, 'queryKey'>, 'queryKey'>,
) {
  const query = useQuery({
    ...baseQueryOptions,
    ...upcomingQueryOptions,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}
