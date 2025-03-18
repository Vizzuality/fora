import { useMemo } from 'react';

import { jsonAPIAdapter } from 'lib/adapters/json-api-adapter';
import { ParamsProps } from 'lib/adapters/types';

import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import CHROMA from 'chroma-js';
import { scaleOrdinal } from 'd3-scale';

import { WidgetDownload } from 'types/widget';

import { VISUALIZATION_RAMP } from 'constants/colors';

import API from 'services/api';

/**
****************************************
  FETCH FUNCTIONS
****************************************
*/

export const fetchWidgets = (params?: ParamsProps) => {
  return API.request({
    method: 'GET',
    url: '/widgets',
    params: jsonAPIAdapter(params),
  }).then((response) => response.data);
};

export const fetchWidget = (slug: string, params?: ParamsProps) =>
  API.request({
    method: 'GET',
    url: `/widgets/${slug}`,
    params: jsonAPIAdapter(params),
  }).then((response) => response.data);

export const downloadWidget = (slug: string, params?: ParamsProps) =>
  API.request({
    method: 'GET',
    url: `/widgets/${slug}/download`,
    params: jsonAPIAdapter(params),
  }).then((response) => new Blob([response.data], { type: 'text/csv' }));

export const fetchYears = (params?: ParamsProps) => {
  return API.request({
    method: 'GET',
    url: '/report_years',
    params: jsonAPIAdapter(params),
  }).then((response) => response.data);
};

/**
****************************************
  WIDGETS
****************************************
*/

const useWidgetsBaseQueryOptions = ({ params }: { params: ParamsProps }) =>
  queryOptions({
    queryKey: ['widgets', params],
    queryFn: () => fetchWidgets(params),
    placeholderData: {
      data: [],
    },
  });
export function useWidgets(
  params: ParamsProps = {},
  upcomingQueryOptions?: Omit<typeof useWidgetsBaseQueryOptions, 'queryKey'>
) {
  return useQuery({
    ...useWidgetsBaseQueryOptions({ params }),
    ...upcomingQueryOptions,
  });
}

/**
****************************************
  WIDGET [ID]
****************************************
*/

const useWidgetBaseQueryOptions = ({ slug, params }: { slug: string; params?: ParamsProps }) =>
  queryOptions({
    queryKey: ['widget', slug, JSON.stringify(params)],
    queryFn: () => fetchWidget(slug, params),
    enabled: !!slug,
    placeholderData: {},
  });

export function useWidget(
  slug: string,
  params: ParamsProps = {},
  upcomingQueryOptions?: Omit<typeof useWidgetBaseQueryOptions, 'queryKey'>
) {
  return useQuery({
    ...useWidgetBaseQueryOptions({
      slug,
      params,
    }),
    ...upcomingQueryOptions,
  });
}

/**
****************************************
  WIDGET [ID] DOWNLOAD
****************************************
*/

export function useWidgetDownload() {
  const fetch = ({ slug, params }) => downloadWidget(slug, params);

  return useMutation({
    mutationFn: ({ slug, params }: WidgetDownload) => {
      return fetch({ slug, params });
    },
    onSuccess: (data, variables) => {
      const { slug } = variables;
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `widget-${slug}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    onError: (error, variables, context) => {
      console.info('Error', error, variables, context);
    },
  });
}

const useReportYearsBaseQueryOptions = queryOptions({
  queryKey: ['report-years'],
  queryFn: () => fetchYears(),
  placeholderData: {
    data: [],
  },
});

export function useReportYears(
  upcomingQueryOptions?: Omit<typeof useReportYearsBaseQueryOptions, 'queryKey'>
) {
  return useQuery({
    ...useReportYearsBaseQueryOptions,
    ...upcomingQueryOptions,
  });
}

export function useColorRamp(data) {
  const CHROMA_COLOR_SCALE = CHROMA.scale(VISUALIZATION_RAMP);

  const COLOR_DOMAIN = useMemo(() => {
    return data.map((d) => d.id);
  }, [data]);

  const COLOR_RANGE = useMemo(() => {
    const ramp = [...VISUALIZATION_RAMP];
    if (data.length < ramp.length) {
      return ramp.slice(0, data.length);
    }
    return CHROMA_COLOR_SCALE.colors(data.length) as string[];
  }, [CHROMA_COLOR_SCALE, data]);

  return scaleOrdinal(COLOR_DOMAIN, COLOR_RANGE);
}
