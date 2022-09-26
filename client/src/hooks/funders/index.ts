import { useMemo } from 'react';

import { jsonPlaceholderAdapter } from 'lib/adapters/json-placeholder-adapter';
import { AdapterOptionsProps } from 'lib/adapters/types';

import { View } from 'store/action-map';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { groupBy, orderBy } from 'lodash';

import FUNDERS from 'services/funders';

import MOCK from './mock.json';
import { UseFundersOptionsProps } from './types';

export function useFunders(options: UseFundersOptionsProps = {}) {
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

  const fetchFunders = () =>
    FUNDERS.request({
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

  const query = useQuery(['funders', JSON.stringify(options)], fetchFunders, {
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    return data.data.map((f) => {
      const randomIndex = Math.floor(Math.random() * MOCK.length);

      return {
        ...f,
        ...MOCK[randomIndex],
      };
    });
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}

export function useFundersByGeographicScope(view: View, options: UseFundersOptionsProps = {}) {
  const { data, ...query } = useFunders(options);

  const GROUP_BY_KEY = useMemo(() => {
    switch (view) {
      case 'regions':
        return 'region_id';
      case 'states':
        return 'state_id';
      case 'countries':
        return 'country_id';
    }
  }, [view]);

  const NAME_KEY = useMemo(() => {
    switch (view) {
      case 'regions':
        return 'region_name';
      case 'states':
        return 'state_name';
      case 'countries':
        return 'country_name';
    }
  }, [view]);

  const DATA = useMemo(() => {
    if (!data) {
      return [];
    }

    const groupedData = groupBy(data, GROUP_BY_KEY);

    return orderBy(
      Object.keys(groupedData).map((key) => {
        return {
          id: key,
          name: groupedData[key][0][NAME_KEY],
          count: groupedData[key].length,
          items: groupedData[key],
        };
      }),
      ['count', 'name'],
      ['desc', 'asc']
    );
  }, [data, GROUP_BY_KEY, NAME_KEY]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}

export function useFundersInfinity(options: AdapterOptionsProps = {}) {
  const {
    filters = {},
    search,
    sort = {
      field: 'title',
      order: 'desc',
    },
  } = options;

  const fetchFunders = ({ pageParam = 1 }) =>
    FUNDERS.request({
      method: 'GET',
      url: '/',
      params: jsonPlaceholderAdapter({
        filters,
        search,
        sort,
        page: pageParam,
        perPage: 20,
      }),
    });

  const query = useInfiniteQuery(['infinite-funders', JSON.stringify(options)], fetchFunders, {
    retry: false,
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
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
            name: f.name || f.title,
            description: f.description || f.body,
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
