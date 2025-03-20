import React from 'react';

import { useAppSelector } from 'store/hooks';

import FundersList from './funders-list';
import GeoList from './geo-list';
import ProjectsList from './projects-list';

const List = () => {
  const { type, filters } = useAppSelector((state) => state['/action-map']);
  const { geographic, subgeographics } = filters;

  const IS_GROUPING =
    geographic !== 'national' && (!subgeographics.length || subgeographics.length > 1);
  const IS_NOT_GROUPING = geographic === 'national' || subgeographics.length === 1;

  return (
    <div className="relative flex h-full grow flex-col overflow-hidden py-px">
      <div className="pointer-events-none absolute left-0 -top-1 z-10 h-5 w-full bg-gradient-to-b from-white via-white" />
      <div className="flex grow flex-col overflow-hidden">
        <div className="flex min-h-full grow flex-col overflow-y-auto overflow-x-hidden py-5 pr-5">
          {IS_GROUPING && <GeoList />}
          {IS_NOT_GROUPING && type === 'funders' && <FundersList />}
          {IS_NOT_GROUPING && type === 'projects' && <ProjectsList />}
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-5 w-full bg-gradient-to-t from-white via-white" />
    </div>
  );
};

export default List;
