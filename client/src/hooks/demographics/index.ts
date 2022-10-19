import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { useJsona } from 'hooks/query';

import { Demographic } from 'types/demographic';

import API from 'services/api';

export function useDemographics(queryOptions: UseQueryOptions<Demographic[], unknown> = {}) {
  const fetchDemographics = () =>
    API.request({
      method: 'GET',
      url: '/demographics',
    }).then((response) => response.data);

  const query = useQuery(['demographics'], fetchDemographics, {
    placeholderData: {
      data: [],
    },
    ...queryOptions,
  });

  const { data } = query;

  const JSON_API_DATA = useJsona<Demographic[]>(data);

  const DATA = useMemo(() => {
    if (!JSON_API_DATA) {
      return [];
    }

    return JSON_API_DATA.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
  }, [JSON_API_DATA]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}
