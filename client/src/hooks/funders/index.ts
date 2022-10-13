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

import API from 'services/api';

import MOCK from './mock.json';
import { FundersResponseData } from './types';

export const fetchFunder = (id: string) =>
  API.request({
    method: 'GET',
    url: `/funders/${id}`,
  }).then((response) => response.data);

export const fetchFunders = (params: ParamsProps) => {
  return API.request({
    method: 'GET',
    url: '/funders',
    params: jsonAPIAdapter(params),
  }).then((response) => response.data);
};
/**
****************************************
  FUNDERS
****************************************
*/
export function useFunders(
  params: ParamsProps = {},
  queryOptions: UseQueryOptions<FundersResponseData, unknown> = {}
) {
  const fetch = () =>
    fetchFunders({
      ...params,
      disablePagination: true,
      includes: 'subgeographic_ancestors',
    });

  const query = useQuery(['funders', JSON.stringify(params)], fetch, {
    placeholderData: {
      data: [],
    },
    ...queryOptions,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    return data?.data;
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}

/**
****************************************
  FUNDERS FILTERED BY GEOGRAPHIC SCOPE
****************************************
*/

export function useFundersByGeographicScope(
  view: View,
  params: ParamsProps = {},
  queryOptions: UseQueryOptions<FundersResponseData, unknown> = {}
) {
  const { data, ...query } = useFunders(params, queryOptions);

  const DATA = useMemo(() => {
    if (!data) {
      return [];
    }

    const SUBGEOGRAPHICS = orderBy(
      // Extract subgeographics from funders
      uniqBy(
        data
          .map((funder) => funder.subgeographic_ancestors.find((s) => s.geographic === view))
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

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}

/**
****************************************
  FUNDERS INFINITY
****************************************
*/

export function useFundersInfinity(
  params: ParamsProps = {},
  queryOptions: UseInfiniteQueryOptions<FundersResponseData, unknown> = {}
) {
  const fetch = ({ pageParam = 1 }) => fetchFunders({ ...params, page: pageParam });

  const query = useInfiniteQuery(['infinite-funders', JSON.stringify(params)], fetch, {
    ...queryOptions,
    getNextPageParam: (lastPage) => {
      const {
        data: { meta = {} },
      } = lastPage;
      const { page = 1, totalPages = 10 } = meta; // ! TODO: page and totalPages is not being returned from the API

      const nextPage = page + 1 > totalPages ? null : page + 1;
      return nextPage;
    },
  });

  const { data } = query;
  const { pages } = data || {};

  const DATA = useMemo(() => {
    if (!pages) {
      return [];
    }

    return pages
      .map((p) => {
        const { data: pageData } = p;

        return pageData.map((f) => {
          const randomIndex = Math.floor(Math.random() * MOCK.length);

          return {
            ...f,
            ...MOCK[randomIndex],
            name: f.name,
            description: f.description,
          };
        });
      })
      .flat();
  }, [pages]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [DATA, query]);
}

/**
****************************************
  FUNDER [ID]
****************************************
*/

export function useFunder(id: string) {
  const fetch = () => fetchFunder(id);
  const query = useQuery(['funder', id], fetch, {
    enabled: !!id,
    retry: false,
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    placeholderData: {},
  });

  const { data } = query;

  return useMemo(() => {
    return {
      ...query,
      data: data,
    };
  }, [query, data]);
}
