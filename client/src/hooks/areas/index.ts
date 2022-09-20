import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import AREAS from 'services/areas';

import MOCK from './mock.json';

export function useAreas() {
  const fetchAreas = () =>
    AREAS.request({
      method: 'GET',
      url: '/',
    });

  const query = useQuery(['areas'], fetchAreas, {
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    return MOCK.sort((a, b) => {
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
