import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import DEMOGRAPHICS from 'services/demographics';

import MOCK from './mock.json';
import { ResponseData } from './types';

export function useDemographics<T = ResponseData>(
  queryOptions: UseQueryOptions<ResponseData, unknown, T> = {}
) {
  const fetchDemographics = () =>
    DEMOGRAPHICS.request({
      method: 'GET',
      url: '/',
    }).then((response) => response.data);

  const query = useQuery(['demographics'], fetchDemographics, {
    placeholderData: [],
    ...queryOptions,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data) {
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
