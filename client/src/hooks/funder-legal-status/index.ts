import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import FUNDERS_LEGAL_STATUS from 'services/funder-legal-status';

import MOCK from './mock.json';

export function useFunderLegalStatus() {
  const fetchFundersLegalStatus = () =>
    FUNDERS_LEGAL_STATUS.request({
      method: 'GET',
      url: '/',
    });

  const query = useQuery(['funders-legal-status'], fetchFundersLegalStatus, {
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
