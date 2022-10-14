import React from 'react';

import { useAppSelector } from 'store/hooks';

import FundersList from './funders-list';
import GeoList from './geo-list';
import ProjectsList from './projects-list';

const List = () => {
  const { type, filters } = useAppSelector((state) => state['/action-map']);
  const { geographic, subgeographics } = filters;

  const IS_NOT_GROUPING = geographic === 'national' || subgeographics.length === 1;
  const IS_GROUPING =
    geographic !== 'national' && (!subgeographics.length || subgeographics.length > 1);

  return (
    <div className="relative flex flex-col h-full py-px overflow-hidden grow">
      <div className="absolute left-0 z-10 w-full h-5 pointer-events-none -top-1 bg-gradient-to-b from-white via-white" />
      <div className="flex flex-col overflow-hidden grow">
        <div className="flex flex-col min-h-full py-5 pr-5 overflow-x-hidden overflow-y-auto grow">
          {IS_GROUPING && <GeoList />}
          {IS_NOT_GROUPING && type === 'funders' && <FundersList />}
          {IS_NOT_GROUPING && type === 'projects' && <ProjectsList />}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 z-10 w-full h-5 pointer-events-none bg-gradient-to-t from-white via-white" />
    </div>
  );
};

export default List;
