import React, { createElement, useMemo, useState } from 'react';

import { ComposableMap as RSMMap } from 'react-simple-maps';

import { setFilters } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { omit } from 'lodash';

import { useFundersByGeographicScope } from 'hooks/funders';
import { useMapProjection } from 'hooks/map';
import { useProjectsByGeographicScope } from 'hooks/projects';

import MapTooltip from './tooltip';
import type { MapTooltipProps } from './tooltip';
import { Regions, States, National, Countries } from './views';

const VIEWS = {
  regions: Regions,
  states: States,
  national: National,
  countries: Countries,
};

const Map = () => {
  const [tooltip, setTooltip] = useState<MapTooltipProps>();

  const { view, type, filters } = useAppSelector((state) => state['/action-map']);
  const dispatch = useAppDispatch();

  const { data: fundersData } = useFundersByGeographicScope(view, {
    filters: omit(filters, ['subgeographics']),
  });
  const { data: projectsData } = useProjectsByGeographicScope(view, {
    filters: omit(filters, ['subgeographics']),
  });

  const PROJECTION = useMapProjection({ view });

  const DATA = useMemo(() => {
    return {
      funders: fundersData,
      projects: projectsData,
    };
  }, [fundersData, projectsData]);

  const VIEW = useMemo(() => {
    return createElement(VIEWS[view], {
      data: DATA[type],

      onClick: (e, properties) => {
        dispatch(
          setFilters({
            ...filters,
            subgeographics: [properties.abbreviation],
          })
        );
      },
      onMouseEnter: (e, properties) => {
        setTooltip({
          rect: {
            top: e.clientY,
            left: e.clientX,
            right: e.clientX,
            bottom: e.clientY,
            x: e.clientX,
            y: e.clientY,
            width: 0,
            height: 0,
            toJSON: () => ({}),
          },
          properties,
        });
      },
      onMouseLeave: () => {
        setTooltip({
          rect: null,
          properties: null,
        });
      },
      onMouseMove: (e, properties) => {
        setTooltip({
          rect: {
            top: e.clientY,
            left: e.clientX,
            right: e.clientX,
            bottom: e.clientY,
            x: e.clientX,
            y: e.clientY,
            width: 0,
            height: 0,
            toJSON: () => ({}),
          },
          properties,
        });
      },
    });
  }, [view, type, DATA, filters, dispatch]);

  return (
    <div className="w-full">
      <RSMMap {...PROJECTION} width={800} height={500}>
        {/* Render selected view */}
        {VIEW}
      </RSMMap>

      <MapTooltip {...tooltip} />
    </div>
  );
};

export default Map;
