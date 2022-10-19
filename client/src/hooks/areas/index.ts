import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Area } from 'types/area';

import API from 'services/api';

export function useAreas(queryOptions: UseQueryOptions<Area[], unknown> = {}) {
  const fetchAreas = () =>
    API.request({
      method: 'GET',
      url: '/areas',
    }).then((response) => response.data);

  const query = useQuery(['areas'], fetchAreas, {
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
