import { useMemo } from 'react';

import { jsonAPIAdapter } from 'lib/adapters/json-api-adapter';
import { ParamsProps } from 'lib/adapters/types';

import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import CHROMA from 'chroma-js';
import { scaleOrdinal } from 'd3-scale';

import { ReportYear } from 'types/dashboards';
import { Widget, WidgetDownload } from 'types/widget';

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
export function useWidgets(
  params: ParamsProps = {},
  queryOptions: UseQueryOptions<Widget[], unknown> = {}
) {
  const fetch = () => fetchWidgets(params);

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

export function useWidget(
  slug: string,
  params: ParamsProps = {},
  queryOptions: UseQueryOptions<Widget, unknown> = {}
) {
  const fetch = () => fetchWidget(slug, params);

  const query = useQuery(['widget', slug, JSON.stringify(params)], fetch, {
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

export function useReportYears(queryOptions: UseQueryOptions<ReportYear[], unknown> = {}) {
  const fetch = () => fetchYears();

  const query = useQuery(['report-years'], fetch, {
    placeholderData: {
      data: [],
    },
    ...queryOptions,
  });

  return query;
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
