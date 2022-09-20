import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import PROJECTS_LEGAL_STATUS from 'services/project-legal-status';

import MOCK from './mock.json';

export function useProjectLegalStatus() {
  const fetchProjectsLegalStatus = () =>
    PROJECTS_LEGAL_STATUS.request({
      method: 'GET',
      url: '/',
    });

  const query = useQuery(['projects-legal-status'], fetchProjectsLegalStatus, {
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
