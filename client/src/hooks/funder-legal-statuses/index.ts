import { useMemo } from 'react';

import { queryOptions, useQuery } from '@tanstack/react-query';

import API from 'services/api';

const baseQueryOptions = queryOptions({
  queryKey: ['funders-legal-status'],
  queryFn: () =>
    API.request({
      method: 'GET',
      url: '/funder_legal_statuses',
    }).then((response) => response.data),
  placeholderData: {
    data: [],
  },
});

export function useFunderLegalStatuses(
  upcomingQueryOptions?: Omit<typeof baseQueryOptions, 'queryKey'>
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
