import { useMemo } from 'react';

import { jsonAPIAdapter } from 'lib/adapters/json-api-adapter';
import { ParamsProps } from 'lib/adapters/types';

import { View } from 'store/action-map';

import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { orderBy, uniqBy } from 'lodash';

import { Funder, InifiniteFunder } from 'types/funder';

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
export function useFunders(
  params: ParamsProps = {},
  queryOptions: UseQueryOptions<Funder[], unknown> = {}
) {
  const fetch = () =>
    fetchFunders({
      disablePagination: true,
      ...params,
    });

  const query = useQuery(['funders', JSON.stringify(params)], fetch, {
    placeholderData: {
      data: [],
    },
    ...queryOptions,
  });

  return query;
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
export function useFundersInfinity(
  params: ParamsProps = {},
  queryOptions: UseInfiniteQueryOptions<InifiniteFunder> = {}
) {
  const fetch = ({ pageParam = 1 }) => fetchFunders({ ...params, page: pageParam });

  const query = useInfiniteQuery<InifiniteFunder>(
    ['infinite-funders', JSON.stringify(params)],
    fetch,
    {
      ...queryOptions,
      select: (data) => data, // override default select function
      placeholderData: {
        pages: [],
        pageParams: [],
      },
      getNextPageParam: (lastPage) => {
        const { meta } = lastPage;
        const { page = 1, pages = 10 } = meta;

        const nextPage = page + 1 > pages ? null : page + 1;
        return nextPage;
      },
    }
  );

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

export function useFunder(id: string, queryOptions: UseQueryOptions<Funder, unknown> = {}) {
  const fetch = () => fetchFunder(id);
  const query = useQuery(['funder', id], fetch, {
    enabled: !!id,
    placeholderData: { data: {} },
    ...queryOptions,
  });

  return query;
}
