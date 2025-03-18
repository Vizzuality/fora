import { useMemo } from 'react';

import { jsonAPIAdapter } from 'lib/adapters/json-api-adapter';
import { ParamsProps } from 'lib/adapters/types';

import { queryOptions, useQuery } from '@tanstack/react-query';

import { SubGeographic } from 'types/geographics';

import API from 'services/api';

const useGeographicsBaseQueryOptions = queryOptions({
  queryKey: ['geographics'],
  queryFn: () =>
    API.request({
      method: 'GET',
      url: '/geographics',
    }).then((response) => response.data),
  placeholderData: {
    data: [],
  },
});

export function useGeographics(
  upcomingQueryOptions?: Omit<typeof useGeographicsBaseQueryOptions, 'queryKey'>
) {
  const query = useQuery({
    ...useGeographicsBaseQueryOptions,
    ...upcomingQueryOptions,
  });
  const { data } = query;

  const DATA = useMemo(() => {
    if (!data) {
      return [];
    }
    const ORDER = ['regions', 'states', 'national', 'countries'];

    return data.sort((a, b) => {
      return ORDER.indexOf(a.id) - ORDER.indexOf(b.id);
    });
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}

const useSubGeographicsBaseQueryOptions = ({ params }: { params: ParamsProps }) =>
  queryOptions({
    queryKey: ['subgeographics', params],
    queryFn: () =>
      API.request<{ data: SubGeographic[] }>({
        method: 'GET',
        url: '/subgeographics',
        params: jsonAPIAdapter(params),
      }).then((response) => response.data),
    placeholderData: {
      data: [] as SubGeographic[],
    },
    select: ({ data }) =>
      data.map((subgeographic) => {
        return {
          ...subgeographic,
          id: subgeographic.abbreviation,
        };
      }),
  });

export function useSubGeographics(
  params: ParamsProps = {},
  upcomingQueryOptions?: Omit<ReturnType<typeof useSubGeographicsBaseQueryOptions>, 'queryKey'>
) {
  return useQuery({
    ...useSubGeographicsBaseQueryOptions({ params }),
    ...upcomingQueryOptions,
  });
}
