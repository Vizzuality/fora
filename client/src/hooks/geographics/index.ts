import { useMemo } from 'react';

import { Geographic } from 'store/action-map';

import { useQuery } from '@tanstack/react-query';

import GEOGRAPHICS from 'services/geographics';

import { GREOGRAPHIC_SCOPES, SUBGEOGRAPHICS } from './mock';
import { UseGeographicsOptionsProps } from './types';

export function useGeographics() {
  const fetchGeographics = () =>
    GEOGRAPHICS.request({
      method: 'GET',
      url: '/',
    });

  const query = useQuery(['geographics'], fetchGeographics, {
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    return GREOGRAPHIC_SCOPES;
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}

export function useSubGeographics(
  geographic: Geographic,
  options: UseGeographicsOptionsProps = {}
) {
  const { filters = {}, search, sort } = options;

  const parsedFilters = Object.keys(filters).reduce((acc, k) => {
    if (filters[k] && Array.isArray(filters[k]) && !filters[k].length) {
      return acc;
    }

    return {
      ...acc,
      [`filter[${k}]`]: filters[k] && filters[k].toString ? filters[k].toString() : filters[k],
    };
  }, {});

  const fetchGeographics = () =>
    GEOGRAPHICS.request({
      method: 'GET',
      url: '/',
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

  const query = useQuery(['geographics', JSON.stringify(options)], fetchGeographics, {
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
