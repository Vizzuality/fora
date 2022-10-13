import React, { useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { omit } from 'lodash';

import { useFunders, useFundersByGeographicScope } from 'hooks/funders';
import { useProjects, useProjectsByGeographicScope } from 'hooks/projects';

import Loading from 'components/loading';

import GeoItem from './geo-item';
import Item from './item';
import type { ListProps } from './types';

const List: React.FC<ListProps> = () => {
  const { view, type, filters } = useAppSelector((state) => state['/action-map']);
  const { geographic, subgeographics } = filters;

  // FUNDERS
  // get funders filtered by the current filters
  const {
    data: fundersData,
    isFetching: fundersIsFetching,
    isFetched: fundersIsFetched,
  } = useFunders({
    filters,
  });

  // get funders grouped by geographic scope
  const { data: fundersGData } = useFunders({
    filters: omit(filters, ['subgeographics']),
  });
  const fundersGroupedData = useFundersByGeographicScope(view, fundersGData);

  // PROJECTS
  // get projects filtered by the current filters
  const { data: projectsData } = useProjects({
    filters,
  });

  const { data: projectsGroupedData } = useProjectsByGeographicScope(view, {
    filters: omit(filters, ['subgeographics']),
  });

  const DATA = useMemo(() => {
    const d = {
      funders: fundersData,
      projects: projectsData,
    };

    return d[type];
  }, [type, fundersData, projectsData]);

  const GROUPED_DATA = useMemo(() => {
    const grouped = {
      funders: fundersGroupedData,
      projects: projectsGroupedData,
    };

    return grouped[type];
  }, [type, fundersGroupedData, projectsGroupedData]);

  const LOADING = fundersIsFetching && !fundersIsFetched;

  const IS_NOT_GROUPING = geographic === 'national' || subgeographics.length === 1;
  const IS_GROUPING =
    geographic !== 'national' && (!subgeographics.length || subgeographics.length > 1);

  return (
    <div className="relative flex flex-col h-full py-px overflow-hidden grow">
      <Loading
        visible={LOADING}
        className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-white/75"
      />
      <div className="absolute left-0 z-10 w-full h-5 pointer-events-none -top-1 bg-gradient-to-b from-white via-white" />
      <div className="relative flex flex-col overflow-hidden grow">
        <div className="flex flex-col py-5 pr-5 space-y-5 overflow-x-hidden overflow-y-auto grow">
          <div className="space-y-5">
            <div className="flex justify-between">
              <h4 className="font-semibold uppercase text-grey-20">Location</h4>
              <h4 className="font-semibold uppercase text-grey-20">{type}</h4>
            </div>
            <ul className="relative space-y-2">
              {!LOADING &&
                IS_NOT_GROUPING &&
                DATA
                  //
                  .map((d) => <Item {...d} key={d.id} data={DATA} />)}

              {!LOADING &&
                IS_GROUPING &&
                GROUPED_DATA
                  // filter by subgeographics
                  .filter((d) => !subgeographics.length || subgeographics.includes(d.id))
                  // map
                  .map((d) => <GeoItem {...d} key={d.id} data={GROUPED_DATA} />)}
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 z-10 w-full h-5 pointer-events-none bg-gradient-to-t from-white via-white" />
    </div>
  );
};

export default List;
