import { useMemo } from 'react';

import { queryOptions, useQuery } from '@tanstack/react-query';

import API from 'services/api';

const baseQueryOptions = queryOptions({
  queryKey: ['capital-acceptances'],
  queryFn: () =>
    API.request({
      method: 'GET',
      url: '/capital_acceptances',
    }).then((response) => response.data),
  placeholderData: {
    data: [],
  },
});

export function useCapitalAcceptances(
  upcomingQueryOptions?: Omit<typeof baseQueryOptions, 'queryKey'>,
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
