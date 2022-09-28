import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import API from 'services/api';

import { ResponseData } from './types';

export function useFunderLegalStatuses<T = ResponseData>(
  queryOptions: UseQueryOptions<ResponseData, unknown, T> = {}
) {
  const fetchFundersLegalStatuses = () =>
    API.request({
      method: 'GET',
      url: '/funder_legal_statuses',
    }).then((response) => response.data);

  const query = useQuery(['funders-legal-status'], fetchFundersLegalStatuses, {
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
