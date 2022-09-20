import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import FUNDER_TYPES from 'services/funder-types';

import MOCK from './mock.json';

export function useFunderTypes() {
  const fetchFunderTypes = () =>
    FUNDER_TYPES.request({
      method: 'GET',
      url: '/',
    });

  const query = useQuery(['funder-types'], fetchFunderTypes, {
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
