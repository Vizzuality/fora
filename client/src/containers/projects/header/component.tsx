import React from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setSearch } from 'store/projects';

import { useDebounceCallback } from '@react-hook/debounce';

import Filters from 'containers/filters';
import Wrapper from 'containers/wrapper';

import Search from 'components/search';

const ProjectsHeader = () => {
  const dispatch = useAppDispatch();

  const { search } = useAppSelector((state) => state['/projects']);

  const onChangeSearch = useDebounceCallback((value: string) => {
    dispatch(setSearch(value));
  }, 250);

  return (
    <header className="py-20 bg-green-0 text-grey-0">
      <Wrapper>
        <div className="space-y-5">
          <h2 className="max-w-4xl text-4xl font-display">
            Find FORA supported regenerative agriculture projects
          </h2>
          <h3 className="max-w-2xl text-2xl font-display">
            Look into our database for projects in regenerative agriculture.
          </h3>
        </div>
        <div className="grid grid-cols-12 mt-11 gap-x-4">
          <div className="col-span-8">
            <Search
              value={search}
              placeholder="Search by project name"
              theme="green"
              onChange={onChangeSearch}
            />
          </div>
        </div>

        <div className="mt-14">
          <Filters type="projects" />
        </div>
      </Wrapper>
    </header>
  );
};

export default ProjectsHeader;
