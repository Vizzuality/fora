import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import API from 'services/api';

import { ResponseData } from './types';

export function useCapitalTypes(queryOptions: UseQueryOptions<ResponseData, unknown> = {}) {
  const fetchCapitalTypes = () =>
    API.request({
      method: 'GET',
      url: '/capital_types',
    }).then((response) => response.data);

  const query = useQuery(['capital-types'], fetchCapitalTypes, {
    placeholderData: {
      data: [],
    },
    ...queryOptions,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    return data?.data.sort((a, b) => {
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
