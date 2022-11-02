import React, { useCallback } from 'react';

import cx from 'classnames';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setSort } from 'store/projects';

import { Menu } from '@headlessui/react';

import { useProjectsInfinity } from 'hooks/projects';

import Cards from 'containers/cards';
import Sentence from 'containers/sentence';
import Wrapper from 'containers/wrapper';

import Button from 'components/button';
import Icon from 'components/icon';
import Loading from 'components/loading';

import CHEVRON_DOWN_SVG from 'svgs/ui/chevron-down.svg?sprite';

const ProjectsList = () => {
  const { filters, search, sort } = useAppSelector((state) => state['/projects']);
  const { geographic } = filters;
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
          {geographic && <Sentence type="projects" />}

          {!!projectsData.length && (
            <div className="flex justify-between mt-10">
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2">
                  <p className="font-semibold">Sort by</p>
                  <Icon
                    icon={CHEVRON_DOWN_SVG}
                    className={cx({
                      'w-3 h-3': true,
                    })}
                  />
                </Menu.Button>
                <Menu.Items className="absolute flex flex-col py-2 bg-white rounded-md shadow-lg focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={cx({
                          'px-4 py-3': true,
                          'bg-grey-20/20': active,
                        })}
                        type="button"
                        onClick={() => handleSortProjects('asc')}
                      >
                        A - Z
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={cx({
                          'px-4 py-3': true,
                          'bg-grey-20/20': active,
                        })}
                        type="button"
                        onClick={() => handleSortProjects('desc')}
                      >
                        Z - A
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          )}
        </div>

        {!projectsData.length ? (
          <div className="flex flex-col items-center pb-10 space-y-4">
            <p className="text-2xl font-semibold">No results found</p>
            <p className="max-w-sm text-center text-grey-20">
              Sorry, we have searched in our entire database but we couldn&apos;t find any results
              fitting your search criteria.
            </p>
          </div>
        ) : (
          <div className="pb-10">
            <Cards pathname="/projects" data={projectsData} />
          </div>
        )}

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
