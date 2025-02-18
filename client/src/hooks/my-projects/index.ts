import { useMemo } from 'react';

import { jsonAPIAdapter } from 'lib/adapters/json-api-adapter';
import { MyProjectProps } from 'lib/adapters/types';

import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
  useQueryClient,
  useMutation,
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

export const createMemberProject = async (projectData: FormData) => {
  return API.request({
    method: 'POST',
    url: '/members/projects',
    data: projectData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((res) => res.data);
};

export function useCreateMemberProject() {
  const queryClient = useQueryClient();

  return useMutation(createMemberProject, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['myProjects']); // Refresh project list
      console.info('Project created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating project:', error);
    },
  });
}

export const updateMemberProject = async ({
  projectId,
  projectData,
}: {
  projectId: string;
  projectData: FormData;
}) => {
  return API.request({
    method: 'PUT',
    url: `/members/projects/${projectId}`,
    data: projectData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((res) => res.data);
};

export function useUpdateMemberProject() {
  const queryClient = useQueryClient();

  return useMutation(updateMemberProject, {
    onSuccess: (data, { projectId }) => {
      queryClient.invalidateQueries(['myProjects']); // Refresh project list
      queryClient.invalidateQueries(['project', projectId]); // Refresh specific project details
      console.info('Project updated successfully:', data);
    },
    onError: (error) => {
      console.error('Error updating project:', error);
    },
  });
}
