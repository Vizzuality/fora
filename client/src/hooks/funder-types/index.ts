import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import API from 'services/api';

import { ResponseData } from './types';

export function useFunderTypes<T = ResponseData>(
  queryOptions: UseQueryOptions<ResponseData, unknown, T> = {}
) {
  const fetchFunderTypes = () =>
    API.request({
      method: 'GET',
      url: '/funder_types',
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

    return data;
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}
