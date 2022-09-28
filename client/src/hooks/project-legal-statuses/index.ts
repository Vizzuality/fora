import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import API from 'services/api';

import MOCK from './mock.json';

export function useProjectLegalStatuses() {
  const fetchProjectLegalStatuses = () =>
    API.request({
      method: 'GET',
      url: '/recipient_legal_statuses',
    });

  const query = useQuery(['projects-legal-status'], fetchProjectLegalStatuses, {
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
