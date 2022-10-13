import { useMemo } from 'react';

import { jsonAPIAdapter } from 'lib/adapters/json-api-adapter';
import { ParamsProps } from 'lib/adapters/types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { FeatureCollection } from 'geojson';

import API from 'services/api';

import { GeographicsResponseData, SubGeographicsResponseData } from './types';

export function useGeographics(
  queryOptions: UseQueryOptions<GeographicsResponseData, unknown> = {}
) {
  const fetchGeographics = () =>
    API.request({
      method: 'GET',
      url: '/geographics',
    }).then((response) => response.data);

  const query = useQuery(['geographics'], fetchGeographics, {
    placeholderData: {
      data: [],
    },
    ...queryOptions,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data?.data) {
      return [];
    }
    const ORDER = ['regions', 'states', 'national', 'countries'];

    return data?.data.sort((a, b) => {
      return ORDER.indexOf(a.id) - ORDER.indexOf(b.id);
    });
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}

export function useSubGeographics(
  params: ParamsProps = {},
  queryOptions: UseQueryOptions<SubGeographicsResponseData, unknown> = {}
) {
  const fetchSubgeographics = () =>
    API.request({
      method: 'GET',
      url: '/subgeographics',
      params: jsonAPIAdapter(params),
    }).then((response) => response.data);

  const query = useQuery(['subgeographics', JSON.stringify(params)], fetchSubgeographics, {
    placeholderData: {
      data: [],
    },
    ...queryOptions,
  });

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    return data?.data;
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}

export function useSubGeographicsGeojson(
  params: ParamsProps = {},
  queryOptions: UseQueryOptions<FeatureCollection, unknown> = {}
) {
  const fetchSubgeographicsGeojson = () =>
    API.request({
      method: 'GET',
      url: '/subgeographics/geojson',
      transformResponse: (data) => JSON.parse(data),
      params: jsonAPIAdapter(params),
    }).then((response) => response.data);

  const query = useQuery(
    ['subgeographics-geojson', JSON.stringify(params)],
    fetchSubgeographicsGeojson,
    {
      placeholderData: {
        type: 'FeatureCollection',
        features: [],
      },
      ...queryOptions,
    }
  );

  const { data } = query;

  const DATA = useMemo(() => {
    if (!data) {
      return {};
    }

    return data;
  }, [data]);

  return useMemo(() => {
    return {
      ...query,
      data: DATA,
    };
  }, [query, DATA]);
}
