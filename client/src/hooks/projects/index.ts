import { useMemo } from 'react';

import { jsonAPIAdapter } from 'lib/adapters/json-api-adapter';
import { ParamsProps } from 'lib/adapters/types';

import { View } from 'store/action-map';

import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { orderBy, uniqBy } from 'lodash';

import { Project } from '@/types/api/project';

import API from 'services/api';

/**
 ****************************************
 FETCH FUNCTIONS
 ****************************************
 */
export const fetchProjects = async (params: ParamsProps) => {
  return API.request({
    method: 'GET',
    url: '/projects',
    params: jsonAPIAdapter(params),
  }).then((response) => response.data);
};

export const fetchProject = (id: string) =>
  API.request({
    method: 'GET',
    url: `/projects/${id}`,
    params: jsonAPIAdapter({
      includes: 'subgeographic_ancestors,funders,funders.subgeographics',
    }),
  }).then((response) => response.data);

/**
 ****************************************
 PROJECTS
 ****************************************
 */

const useProjectsBaseQueryOptions = ({ params = {} }) =>
  queryOptions({
    queryKey: ['projects', params],
    queryFn: () =>
      fetchProjects({
        ...params,
        disablePagination: true,
      }),
    placeholderData: {
      data: [],
    },
  });

export function useProjects(
  // eslint-disable-next-line @typescript-eslint/default-param-last
  params: ParamsProps = {},
  upcomingQueryOptions?: Omit<ReturnType<typeof useProjectsBaseQueryOptions>, 'queryKey'>,
) {
  return useQuery({
    ...useProjectsBaseQueryOptions({ params }),
    ...upcomingQueryOptions,
  });
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
          .map((project) => project.subgeographic_ancestors.map((s) => s.geographic === view && s))
          .flat()
          .filter((g) => g),
        'id',
      )
        // Add projects to subgeographics
        .map((sgeo) => {
          const items = data.filter((project) =>
            project.subgeographic_ancestors.find((s) => s.id === sgeo.id),
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
      ['desc', 'asc'],
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

const useProjectsInfinityBaseQueryOptions = ({ params = {} }) =>
  infiniteQueryOptions({
    queryKey: ['infinite-projects', params],
    queryFn: ({ pageParam = 1 }) => fetchProjects({ ...params, page: pageParam }),
    select: (data) => data, // override default select function
    // placeholderData: {
    //   pages: [],
    //   pageParams: [],
    // },
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { meta } = lastPage;
      const { page = 1, pages = 10 } = meta;

      const nextPage = page + 1 > pages ? null : page + 1;
      return nextPage;
    },
  });

export function useProjectsInfinity(
  // eslint-disable-next-line @typescript-eslint/default-param-last
  params: ParamsProps = {},
  upcomingQueryOptions?: Omit<ReturnType<typeof useProjectsInfinityBaseQueryOptions>, 'queryKey'>,
) {
  const query = useInfiniteQuery({
    ...useProjectsInfinityBaseQueryOptions({ params }),
    ...upcomingQueryOptions,
  });

  const DATA = useMemo(() => {
    if (!query.data) return undefined;
    const { pages } = query.data || {};

    return pages?.flatMap((page) => page.data);
  }, [query]);

  return {
    ...query,
    data: DATA,
  };
}

/**
 ****************************************
 PROJECT [ID]
 ****************************************
 */

const useProjectBaseQueryOptions = ({ id }: { id: Project['id'] }) =>
  queryOptions({
    queryKey: ['project', id],
    queryFn: () => fetchProject(id),
    enabled: !!id,
  });

export function useProject(
  id: string,
  upcomingQueryOptions?: Omit<ReturnType<typeof useProjectBaseQueryOptions>, 'queryKey'>,
) {
  return useQuery({
    ...useProjectBaseQueryOptions({ id }),
    ...upcomingQueryOptions,
  });
}
