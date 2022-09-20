import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import DEMOGRAPHICS from 'services/demographics';

import MOCK from './mock.json';

export function useDemographics() {
  const fetchDemographics = () =>
    DEMOGRAPHICS.request({
      method: 'GET',
      url: '/',
    });

  const query = useQuery(['demographics'], fetchDemographics, {
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
