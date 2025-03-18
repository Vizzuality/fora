import { useMemo } from 'react';

import { jsonAPIAdapter } from 'lib/adapters/json-api-adapter';
import { ParamsProps } from 'lib/adapters/types';

import { View } from 'store/action-map';

import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { orderBy, uniqBy } from 'lodash';

import { Funder } from 'types/funder';

import API from 'services/api';

/**
****************************************
  FETCH FUNCTIONS
****************************************
*/

export const fetchFunders = (params: ParamsProps) => {
  return API.request({
    method: 'GET',
    url: '/funders',
    params: jsonAPIAdapter(params),
  }).then((response) => response.data);
};

export const fetchFunder = (id: string) =>
  API.request({
    method: 'GET',
    url: `/funders/${id}`,
    params: jsonAPIAdapter({
      includes:
        'subgeographic_ancestors,primary_office_state,primary_office_country,projects,projects.subgeographics',
    }),
  }).then((response) => response.data);
/**
****************************************
  FUNDERS
****************************************
*/

const useFundersBaseQueryOptions = ({ params = {} }) =>
  queryOptions({
    queryKey: ['funders', JSON.stringify(params)],
    queryFn: () =>
      fetchFunders({
        disablePagination: true,
        ...params,
      }),

    placeholderData: {
      data: [],
    },
  });

export function useFunders(
  params: ParamsProps = {},
  upcomingQueryOptions?: Omit<ReturnType<typeof useFundersBaseQueryOptions>, 'queryKey'>
) {
  return useQuery({
    ...useFundersBaseQueryOptions({ params }),
    ...upcomingQueryOptions,
  });
}

/**
****************************************
  FUNDERS FILTERED BY GEOGRAPHIC SCOPE
****************************************
*/
export function useFundersByGeographicScope(view: View, data: Funder[] = []) {
  const DATA = useMemo(() => {
    if (!data) {
      return [];
    }

    const SUBGEOGRAPHICS = orderBy(
      // Extract subgeographics from funders
      uniqBy(
        data
          .map((funder) => funder.subgeographic_ancestors.map((s) => s.geographic === view && s))
          .flat()
          .filter((g) => g),
        'id'
      )
        // Add funders to subgeographics
        .map((sgeo) => {
          const items = data.filter((funder) =>
            funder.subgeographic_ancestors.find((s) => s.id === sgeo.id)
          );
          return {
            ...sgeo,
            id: sgeo.abbreviation,
            items,
            count: items.length,
          };
        }),
      // Sort by count and name
      ['count', 'name'],
      ['desc', 'asc']
    );

    return SUBGEOGRAPHICS;
  }, [view, data]);

  return DATA;
}

/**
****************************************
  FUNDERS INFINITY
****************************************
*/

const useFundersInfinityBaseQueryOptions = ({ params = {} }) =>
  infiniteQueryOptions({
    queryKey: ['infinite-funders', params],
    queryFn: ({ pageParam = 1 }) => fetchFunders({ ...params, page: pageParam }),
    select: (data) => data, // override default select function
    placeholderData: {
      pages: [],
      pageParams: [],
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { meta } = lastPage;
      const { page = 1, pages = 10 } = meta;

      const nextPage = page + 1 > pages ? null : page + 1;
      return nextPage;
    },
  });

export function useFundersInfinity(
  // eslint-disable-next-line @typescript-eslint/default-param-last
  params: ParamsProps = {},
  upcomingQueryOptions?: Omit<ReturnType<typeof useFundersInfinityBaseQueryOptions>, 'queryKey'>
) {
  const query = useInfiniteQuery({
    ...useFundersInfinityBaseQueryOptions({ params }),
    ...upcomingQueryOptions,
  });

  const DATA = useMemo(() => {
    const { pages } = query.data;

    return pages.flatMap((page) => page.data);
  }, [query]);

  return {
    ...query,
    data: DATA,
  };
}

/**
****************************************
  FUNDER [ID]
****************************************
*/

const useFunderBaseQueryOptions = ({ id }: { id: Funder['id'] }) =>
  queryOptions({
    queryKey: ['funder', id],
    queryFn: () => fetchFunder(id),
    enabled: !!id,
    placeholderData: { data: {} },
  });

export function useFunder(
  id: Funder['id'],
  upcomingQueryOptions?: Omit<ReturnType<typeof useFunderBaseQueryOptions>, 'queryKey'>
) {
  return useQuery({
    ...useFunderBaseQueryOptions({ id }),
    ...upcomingQueryOptions,
  });
}
