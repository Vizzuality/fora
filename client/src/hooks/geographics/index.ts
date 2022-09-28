import { useMemo } from 'react';

import { Geographic } from 'store/action-map';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { ParamsProps } from 'hooks/types';

import API from 'services/api';
import API_FAKE from 'services/api-fake';

import { SUBGEOGRAPHICS } from './mock';
import { ResponseData } from './types';

export function useGeographics<T = ResponseData>(
  queryOptions: UseQueryOptions<ResponseData, unknown, T> = {}
) {
  const fetchGeographics = () =>
    API.request({
      method: 'GET',
      url: '/geographics',
    }).then((response) => response.data);

  const query = useQuery(['geographics'], fetchGeographics, {
    placeholderData: [],
    ...queryOptions,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data) {
      return [];
    }

    return data;
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}

export function useSubGeographics(geographic: Geographic, params: ParamsProps = {}) {
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
    API_FAKE.request({
      method: 'GET',
      url: '/users',
      params: {
        ...parsedFilters,
        ...(search && {
          q: search,
        }),
        ...(sort && {
          sort,
        }),
      },
    });

  const query = useQuery(['geographics', JSON.stringify(params)], fetchSubgeographics, {
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    return SUBGEOGRAPHICS[geographic] ?? [];

    // return data?.data.map((d) => {
    //   return {
    //     id: d.id,
    //     name: d.title,
    //     info: d.body,
    //   };
    // });
  }, [data, geographic]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}
