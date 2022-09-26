import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import FUNDERS_LEGAL_STATUS from 'services/funder-legal-status';

import MOCK from './mock.json';
import { ResponseData } from './types';

export function useFunderLegalStatus<T = ResponseData>(
  queryOptions: UseQueryOptions<ResponseData, unknown, T> = {}
) {
  const fetchFundersLegalStatus = () =>
    FUNDERS_LEGAL_STATUS.request({
      method: 'GET',
      url: '/',
    }).then((response) => response.data);

  const query = useQuery(['funders-legal-status'], fetchFundersLegalStatus, {
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
