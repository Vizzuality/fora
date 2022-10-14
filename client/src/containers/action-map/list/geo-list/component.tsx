import React, { useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { omit } from 'lodash';

import { useFunders, useFundersByGeographicScope } from 'hooks/funders';
import { useProjectsByGeographicScope } from 'hooks/projects';

import Loading from 'components/loading';

import Item from './item';

const GeoList = () => {
  const { view, type, filters } = useAppSelector((state) => state['/action-map']);

  // get funders grouped by geographic scope
  const {
    data: fundersData,
    isFetching: fundersIsFetching,
    isFetched: fundersIsFetched,
  } = useFunders({
    filters: omit(filters, ['subgeographics']),
  });
  const fundersGroupedData = useFundersByGeographicScope(view, fundersData);

  // PROJECTS
  // get projects grouped by geographic scope
  // const { data: projectsData } = useProjects({
  //   filters: omit(filters, ['subgeographics']),
  // });

  const { data: projectsGroupedData } = useProjectsByGeographicScope(view, {
    filters: omit(filters, ['subgeographics']),
  });

  const DATA = useMemo(() => {
    const grouped = {
      funders: fundersGroupedData,
      projects: projectsGroupedData,
    };

    return grouped[type];
  }, [type, fundersGroupedData, projectsGroupedData]);

  const LOADING = fundersIsFetching && !fundersIsFetched;

  return (
    <>
      <Loading
        visible={LOADING}
        className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-white/75"
      />

      <div className="space-y-5">
        <div className="flex justify-between">
          <h4 className="font-semibold uppercase text-grey-20">Location</h4>
          <h4 className="font-semibold uppercase text-grey-20">{type}</h4>
        </div>
        <ul className="relative space-y-2">
          {!LOADING &&
            DATA
              //
              .map((d) => <Item {...d} key={d.id} data={DATA} />)}
        </ul>
      </div>
    </>
  );
};

export default GeoList;
