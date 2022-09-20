import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import CAPITAL_TYPES from 'services/capital-types';

import MOCK from './mock.json';

export function useCapitalTypes() {
  const fetchCapitalTypes = () =>
    CAPITAL_TYPES.request({
      method: 'GET',
      url: '/',
    });

  const query = useQuery(['capital-types'], fetchCapitalTypes, {
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
