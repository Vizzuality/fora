import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ProjectLegalStatus } from 'types/project-legal-status';

import API from 'services/api';

export function useProjectLegalStatuses(
  queryOptions: UseQueryOptions<ProjectLegalStatus[], unknown> = {}
) {
  const fetchProjectLegalStatuses = () =>
    API.request({
      method: 'GET',
      url: '/recipient_legal_statuses',
    }).then((response) => response.data);

  const query = useQuery(['projects-legal-status'], fetchProjectLegalStatuses, {
    placeholderData: {
      data: [],
    },
    ...queryOptions,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.sort((a, b) => {
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
