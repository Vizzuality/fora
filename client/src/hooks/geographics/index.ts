import { useMemo } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ParamsProps } from 'hooks/types';

import API from 'services/api';

import { GeographicsResponseData, SubGeographicsResponseData } from './types';

export function useGeographics(
  queryOptions: UseQueryOptions<GeographicsResponseData, unknown> = {}
) {
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

export function useSubGeographics(
  params: ParamsProps = {},
  queryOptions: UseQueryOptions<SubGeographicsResponseData, unknown> = {}
) {
  const { filters = {}, search, sort } = params;

  const parsedFilters = Object.keys(filters).reduce((acc, k) => {
    if (filters[k] && Array.isArray(filters[k]) && !filters[k].length) {
      return acc;
    }

    return {
      ...acc,
      [`filter[${k}]`]: filters[k] && filters[k].toString ? filters[k].toString() : filters[k],
    };
  }, {});

  const fetchSubgeographics = () =>
    API.request({
      method: 'GET',
      url: '/subgeographics',
      params: {
        ...parsedFilters,
        ...(search && {
          q: search,
        }),
        ...(sort && {
          sort,
        }),
      },
    }).then((response) => response.data);

  const query = useQuery(['geographics', JSON.stringify(params)], fetchSubgeographics, {
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
