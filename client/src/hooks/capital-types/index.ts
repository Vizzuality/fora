import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import API from 'services/api';

import { ResponseData } from './types';

export function useCapitalTypes<T = ResponseData>(
  queryOptions: UseQueryOptions<ResponseData, unknown, T> = {}
) {
  const fetchCapitalTypes = () =>
    API.request({
      method: 'GET',
      url: '/capital_types',
    }).then((response) => response.data);

  const query = useQuery(['capital-types'], fetchCapitalTypes, {
    placeholderData: [],
    ...queryOptions,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data) {
      return [];
    }

    return data;

    // return MOCK.sort((a, b) => {
    //   return a.name > b.name ? 1 : -1;
    // });
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}
