import { useMemo } from 'react';

import { jsonAPIAdapter } from 'lib/adapters/json-api-adapter';
import { ParamsProps } from 'lib/adapters/types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Geographic, SubGeographic } from 'types/geographics';

import API from 'services/api';

export function useGeographics(queryOptions: UseQueryOptions<Geographic[], unknown> = {}) {
  const fetchGeographics = () =>
    API.request({
      method: 'GET',
      url: '/geographics',
    }).then((response) => response.data);

  const query = useQuery(['geographics'], fetchGeographics, {
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

export function useSubGeographics(
  params: ParamsProps = {},
  queryOptions: UseQueryOptions<{ data: SubGeographic[] }, unknown, SubGeographic[]> = {}
) {
  const fetchSubgeographics = () =>
    API.request<{ data: SubGeographic[] }>({
      method: 'GET',
      url: '/subgeographics',
      params: jsonAPIAdapter(params),
    }).then((response) => response.data);

  return useQuery(['subgeographics', JSON.stringify(params)], fetchSubgeographics, {
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
    ...queryOptions,
  });
}
