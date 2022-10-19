import React, { useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { uniq } from 'lodash';

import { useProjects } from 'hooks/projects';

import NoData from 'containers/action-map/list/no-data';

import Loading from 'components/loading';

import Item from '../item';

const List = () => {
  const { filters } = useAppSelector((state) => state['/action-map']);

  // FUNDERS
  // get projects filtered by the current filters
  const {
    data: projectsData,
    isFetching: projectsIsFetching,
    isFetched: projectsIsFetched,
  } = useProjects({
    filters,
    includes: 'subgeographic_ancestors,investments',
  });

  const DATA = useMemo(() => {
    if (!projectsData) return [];

    return projectsData
      .map((d) => {
        const { investments } = d;

        const funders = uniq(investments.map((i) => i.funder.id));

        return {
          ...d,
          count: funders.length,
        };
      })
      .sort((a, b) => b.count - a.count);
  }, [projectsData]);

  const LOADING = projectsIsFetching && !projectsIsFetched;
  const NO_DATA = !DATA.length && !LOADING;

  return (
    <>
      <Loading
        visible={LOADING}
        className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-white/75"
      />

      <div className="space-y-5">
        <div className="flex justify-between">
          <h4 className="font-semibold uppercase text-grey-20">Projects</h4>
          <h4 className="font-semibold uppercase text-grey-20">Funded</h4>
        </div>
        <ul className="relative space-y-2">
          {!LOADING &&
            DATA
              //
              .map((d) => <Item {...d} key={d.id} data={DATA} />)}

          {NO_DATA && <NoData />}
        </ul>
      </div>
    </>
  );
};

export default List;
