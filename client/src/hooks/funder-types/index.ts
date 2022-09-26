import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import FUNDER_TYPES from 'services/funder-types';

import MOCK from './mock.json';
import { ResponseData } from './types';

export function useFunderTypes<T = ResponseData>(
  queryOptions: UseQueryOptions<ResponseData, unknown, T> = {}
) {
  const fetchFunderTypes = () =>
    FUNDER_TYPES.request({
      method: 'GET',
      url: '/',
    }).then((response) => response.data);

  const query = useQuery(['funder-types'], fetchFunderTypes, {
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
