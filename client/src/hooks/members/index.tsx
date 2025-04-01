import { queryOptions, useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

import { Funder } from '@/types/api/funder';

import API from 'services/api';

const baseQueryOptions = (session: Session) =>
  queryOptions({
    queryKey: ['me'],
    queryFn: () =>
      API.request<Funder>({
        method: 'GET',
        url: '/members/funder',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }).then((response) => response.data),
    enabled: !!session?.accessToken,
  });

export const useMe = (
  upcomingQueryOptions?: Omit<ReturnType<typeof baseQueryOptions>, 'queryKey'>,
) => {
  const { data: session } = useSession();

  return useQuery({
    ...baseQueryOptions(session),
    ...upcomingQueryOptions,
  });
};
