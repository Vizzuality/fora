import { jsonAPIAdapter } from 'lib/adapters/json-api-adapter';
import { ParamsProps } from 'lib/adapters/types';

import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Widget } from 'types/widget';

import API from 'services/api';

/**
****************************************
  FETCH FUNCTIONS
****************************************
*/

export const fetchWidgets = (params: ParamsProps) => {
  return API.request({
    method: 'GET',
    url: '/widgets',
    params: jsonAPIAdapter(params),
  }).then((response) => response.data);
};

export const fetchWidget = (slug: string) =>
  API.request({
    method: 'GET',
    url: `/widgets/${slug}`,
    params: jsonAPIAdapter({}),
  }).then((response) => response.data);

export const downloadWidget = (slug: string) =>
  API.request({
    method: 'GET',
    url: `/widgets/${slug}/download`,
    params: jsonAPIAdapter({}),
  }).then((response) => response.data);

/**
****************************************
  WIDGETS
****************************************
*/
export function useWidgets(
  params: ParamsProps = {},
  queryOptions: UseQueryOptions<Widget[], unknown> = {}
) {
  const fetch = () =>
    fetchWidgets({
      ...params,
    });

  const query = useQuery(['widgets', JSON.stringify(params)], fetch, {
    placeholderData: {
      data: [],
    },
    ...queryOptions,
  });

  return query;
}

/**
****************************************
  WIDGET [ID]
****************************************
*/

export function useWidget(slug: string, queryOptions: UseQueryOptions<Widget, unknown> = {}) {
  const fetch = () => fetchWidget(slug);

  const query = useQuery(['widget', slug], fetch, {
    enabled: !!slug,
    placeholderData: {},
    ...queryOptions,
  });

  return query;
}

/**
****************************************
  WIDGET [ID] DOWNLOAD
****************************************
*/

export function useWidgetDownload(
  slug: string,
  queryOptions: UseMutationOptions<unknown, unknown> = {}
) {
  const fetch = () => downloadWidget(slug);

  return useMutation(fetch, {
    onSuccess: () => {
      // const { data: blob } = data;
      // const { pid } = variables;
      // const url = window.URL.createObjectURL(new Blob([blob]));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', `project-${pid}.zip`);
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
      // console.info('Success', data, variables, context);
    },
    onError: (error, variables, context) => {
      console.info('Error', error, variables, context);
    },
    ...queryOptions,
  });
}
