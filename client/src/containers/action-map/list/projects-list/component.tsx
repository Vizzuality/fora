import React from 'react';

import { useAppSelector } from 'store/hooks';

import { useProjects } from 'hooks/projects';

import Loading from 'components/loading';

import Item from './item';

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
  });

  const LOADING = projectsIsFetching && !projectsIsFetched;

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
            projectsData
              //
              .map((d) => <Item {...d} key={d.id} />)}
        </ul>
      </div>
    </>
  );
};

export default List;
