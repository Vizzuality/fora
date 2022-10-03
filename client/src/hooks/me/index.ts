import { useMemo } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import API from 'services/api';

import { UseSaveMeProps, SaveMeProps } from './types';

export default function useMe() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const query = useQuery(
    ['me'],
    () =>
      API.request({
        method: 'GET',
        url: '/me',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }).then((response) => response.data),
    {
      enabled: !!session && !loading,
    }
  );

  const { data } = query;

  return useMemo(
    () => ({
      ...query,
      user: data?.data,
    }),
    [query, data?.data]
  );
}

export function useSaveMe({
  requestConfig = {
    method: 'PATCH',
  },
}: UseSaveMeProps) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const saveMe = ({ data }: SaveMeProps) =>
    API.request({
      url: '/me',
      data,
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      ...requestConfig,
    });

  return useMutation(saveMe, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['me']);
      console.info('Succces', data, variables, context);
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.info('Error', error, variables, context);
    },
  });
}
