import { useMemo } from 'react';

import { View } from 'store/action-map';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { groupBy, orderBy } from 'lodash';

import { jsonPlaceholderAdapter } from 'lib/adapters/json-placeholder-adapter';
import { AdapterOptionsProps } from 'lib/adapters/types';

import PROJECTS from 'services/projects';

import MOCK from './mock.json';
import { UseProjectsOptionsProps } from './types';

export function useProjects(options: UseProjectsOptionsProps = {}) {
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

  const fetchProjects = () =>
    PROJECTS.request({
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

  const query = useQuery(['projects', JSON.stringify(options)], fetchProjects, {
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

export function useProjectsByGeographicScope(view: View, options: UseProjectsOptionsProps = {}) {
  const { data, ...query } = useProjects(options);

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

export function useProjectsInfinity(options: AdapterOptionsProps = {}) {
  const {
    filters = {},
    search,
    sort = {
      field: 'title',
      order: 'desc',
    },
  } = options;

  const fetchProjects = ({ pageParam = 1 }) =>
    PROJECTS.request({
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

  const query = useInfiniteQuery(['infinite-projects', JSON.stringify(options)], fetchProjects, {
    retry: false,
    keepPreviousData: true,
    getNextPageParam: (lastPage) => {
      const {
        data: { meta = {} },
      } = lastPage;
      const { page = 1, totalPages = 10 } = meta;

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
  }, [query, DATA]);
}
