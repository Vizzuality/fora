import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { FunderType } from 'types/funder-type';

import API from 'services/api';

export function useFunderTypes(queryOptions: UseQueryOptions<FunderType[], unknown> = {}) {
  const fetchFunderTypes = () =>
    API.request({
      method: 'GET',
      url: '/funder_types',
    }).then((response) => response.data);

  const query = useQuery(['funder-types'], fetchFunderTypes, {
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
