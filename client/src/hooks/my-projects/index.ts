import { useMemo } from 'react';

import { jsonAPIAdapter } from 'lib/adapters/json-api-adapter';
import { MyProjectProps } from 'lib/adapters/types';

import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { InifiniteProject, Project } from 'types/project';

import API from 'services/api';

export const fetchMemberProjects = (params: MyProjectProps) => {
  return API.request({
    method: 'GET',
    url: '/members/projects',
    params: jsonAPIAdapter(params),
  }).then((res) => res.data);
};

export const fetchMyProject = (id: string) => {
  return API.request({
    method: 'GET',
    url: `/my-projects/${id}`,
  }).then((res) => res.data);
};

export function useFetchMemberProjects(
  params: MyProjectProps = {},
  queryOption: UseQueryOptions<Project[], unknown> = {}
) {
  const fetch = () =>
    fetchMemberProjects({
      ...params,
      disablePagination: true,
    });

  const query = useQuery(['myProjects', JSON.stringify(params)], fetch, {
    placeholderData: {
      data: [],
    },
    ...queryOption,
    ...queryOption,
  });

  return query;
}

export function useMyInfinityProjects(
  params: MyProjectProps = {},
  queryOptions: UseInfiniteQueryOptions<InifiniteProject, unknown> = {}
) {
  const fetch = ({ pageParam = 1 }) => fetchMemberProjects({ ...params, page: pageParam });

  const query = useInfiniteQuery<InifiniteProject, unknown>(
    ['myProjects', JSON.stringify(params)],
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

export function useMyProject(id: string, queryOptions: UseQueryOptions<Project, unknown> = {}) {
  const fetch = () => fetchMyProject(id);

  const query = useQuery(['myProject', id], fetch, {
    enabled: !!id,
    placeholderData: { data: {} },
    ...queryOptions,
  });

  return query;
}
