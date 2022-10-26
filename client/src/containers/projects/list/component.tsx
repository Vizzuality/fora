import React, { useCallback } from 'react';

import cx from 'classnames';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setSort } from 'store/projects';

import { useProjectsInfinity } from 'hooks/projects';

import Cards from 'containers/cards';
import Wrapper from 'containers/wrapper';

import Button from 'components/button';
import Select from 'components/forms/select';
import Icon from 'components/icon';
import Loading from 'components/loading';

import DOWNLOAD_SVG from 'svgs/ui/download.svg?sprite';
import SHARE_SVG from 'svgs/ui/share.svg?sprite';

const SORT_OPTIONS = [
  { label: 'a-z', value: 'asc' },
  { label: 'z-a', value: 'desc' },
];

const ProjectsList = () => {
  const { filters, search, sort } = useAppSelector((state) => state['/projects']);
  const dispatch = useAppDispatch();

  const {
    data: projectsData,
    fetchNextPage: fetchNextPageProjects,
    hasNextPage: hasNextProjectsPage,
    isFetchingNextPage: isFetchingNextProjectsPage,
  } = useProjectsInfinity({
    filters,
    search,
    sort,
    perPage: 12,
  });

  const handleSortProjects = useCallback(
    (value) => {
      dispatch(setSort({ field: 'title', order: value }));
    },
    [dispatch]
  );

  const handleOnShowMore = useCallback(() => {
    fetchNextPageProjects();
  }, [fetchNextPageProjects]);

  return (
    <>
      <Wrapper>
        <div className="py-8">
          <p className="max-w-md line-clamp-2">
            Your are viewing <strong>{projectsData.length} funders</strong> from{' '}
            <strong>All U.S regions</strong> who invest in{' '}
            <strong>Toxins Reduction, Food Sovereignity, Climate Change</strong>
          </p>

          <div className="flex justify-between">
            <div className="flex items-center w-1/12">
              <Select
                id="sort-by-projects"
                placeholder="Sort by"
                theme="light"
                size="base"
                options={SORT_OPTIONS}
                value={sort.order}
                onSelect={handleSortProjects}
              />
            </div>

            <div className="flex m-3 border divide-x rounded-md divide-solid border-grey-20">
              <button type="button" className="px-3 py-3">
                <Icon
                  icon={SHARE_SVG}
                  className={cx({
                    'w-4 h-4 text-grey-0': true,
                  })}
                />
              </button>
              <button type="button" className="px-3 py-3">
                <Icon
                  icon={DOWNLOAD_SVG}
                  className={cx({
                    'w-4 h-4 text-grey-0': true,
                  })}
                />
              </button>
            </div>
          </div>
        </div>

        <Cards pathname="/projects" data={projectsData} />

        {hasNextProjectsPage && (
          <div className="flex justify-center py-10">
            <Button
              type="button"
              theme="black-alt"
              size="xl"
              className="overflow-hidden"
              onClick={handleOnShowMore}
            >
              Show more
              <Loading
                visible={isFetchingNextProjectsPage}
                className="absolute flex items-center justify-center w-full h-full bg-white"
              />
            </Button>
          </div>
        )}
      </Wrapper>
    </>
  );
};

export default ProjectsList;
