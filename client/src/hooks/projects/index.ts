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

import { Project } from 'types/project';

import API from 'services/api';

/**
****************************************
  FETCH FUNCTIONS
****************************************
*/
export const fetchProject = (id: string) =>
  API.request({
    method: 'GET',
    url: `/projects/${id}`,
    params: jsonAPIAdapter({
      includes: 'subgeographics,funders,funders.subgeographics',
    }),
  }).then((response) => response.data);

export const fetchProjects = (params: ParamsProps) => {
  return API.request({
    method: 'GET',
    url: '/projects',
    params: jsonAPIAdapter(params),
  }).then((response) => response.data);
};

/**
****************************************
  PROJECTS
****************************************
*/
export function useProjects(
  params: ParamsProps = {},
  queryOptions: UseQueryOptions<Project[], unknown> = {}
) {
  const fetch = () =>
    fetchProjects({
      ...params,
      disablePagination: true,
    });

  const query = useQuery(['projects', JSON.stringify(params)], fetch, {
    placeholderData: {
      data: [],
    },
    ...queryOptions,
  });

  return query;
}

/**
****************************************
  PROJECTS FILTERED BY GEOGRAPHIC SCOPE
****************************************
*/
export function useProjectsByGeographicScope(view: View, data: Project[] = []) {
  const DATA = useMemo(() => {
    if (!data) {
      return [];
    }

    const SUBGEOGRAPHICS = orderBy(
      // Extract subgeographics from projects
      uniqBy(
        data
          .map((project) => project.subgeographic_ancestors.find((s) => s.geographic === view))
          .filter((g) => g),
        'id'
      )
        // Add projects to subgeographics
        .map((sgeo) => {
          const items = data.filter((project) =>
            project.subgeographic_ancestors.find((s) => s.id === sgeo.id)
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
  PROJECTS INFINITY
****************************************
*/
export function useProjectsInfinity(
  params: ParamsProps = {},
  queryOptions: UseInfiniteQueryOptions<Project[], unknown> = {}
) {
  const fetch = ({ pageParam = 1 }) => fetchProjects({ ...params, page: pageParam });

  const query = useInfiniteQuery(['infinite-projects', JSON.stringify(params)], fetch, {
    ...queryOptions,
    getNextPageParam: (lastPage) => {
      const { meta = {} } = lastPage;
      const { page = 1, pages = 10 } = meta;

      const nextPage = page + 1 > pages ? null : page + 1;
      return nextPage;
    },
  });

  const { data } = query;
  const { pages } = data || {};

  const DATA = useMemo(() => {
    if (!pages) {
      return [];
    }

    return pages.flat();
  }, [pages]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}

/**
****************************************
  PROJECT [ID]
****************************************
*/

export function useProject(id: string, queryOptions: UseQueryOptions<Project, unknown> = {}) {
  const fetch = () => fetchProject(id);

  const query = useQuery(['project', id], fetch, {
    enabled: !!id,
    placeholderData: {},
    ...queryOptions,
  });

  return query;
}
