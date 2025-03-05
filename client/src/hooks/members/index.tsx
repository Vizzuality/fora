import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { Funder } from 'types/funder';

import API from 'services/api';

export const useMe = (queryOptions: UseQueryOptions<{ data: Funder }, unknown, Funder> = {}) => {
  const { data: session } = useSession();

  const fetchMe = () =>
    API.request<{ data: Funder }>({
      method: 'GET',
      url: '/members/funder',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }).then((response) => response.data);

  return useQuery(['me'], fetchMe, {
    enabled: !!session?.accessToken,
    ...queryOptions,
  });
};
