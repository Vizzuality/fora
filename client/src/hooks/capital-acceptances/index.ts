import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { CapitalAcceptance } from 'types/capital-acceptance';

import API from 'services/api';

export function useCapitalAcceptances(
  queryOptions: UseQueryOptions<CapitalAcceptance[], unknown> = {}
) {
  const fetchCapitalAcceptances = () =>
    API.request({
      method: 'GET',
      url: '/capital_acceptances',
    }).then((response) => response.data);

  const query = useQuery(['capital-acceptances'], fetchCapitalAcceptances, {
    placeholderData: {
      data: [],
    },
    ...queryOptions,
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
