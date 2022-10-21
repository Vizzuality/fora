import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ApplicationStatus } from 'types/application-status';

import API from 'services/api';

export function useApplicationStatuses(
  queryOptions: UseQueryOptions<ApplicationStatus[], unknown> = {}
) {
  const fetchApplicationStatuses = () =>
    API.request({
      method: 'GET',
      url: '/application_statuses',
    }).then((response) => response.data);

  const query = useQuery(['application-statuses'], fetchApplicationStatuses, {
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
