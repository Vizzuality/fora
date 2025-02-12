import cx from 'classnames';
import { Menu } from '@headlessui/react';
import Wrapper from 'containers/wrapper';
import { setSort } from 'store/myProjects';
import { useFetchMemberProjects, useMyInfinityProjects } from 'hooks/my-projects';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Button from 'components/button';
import Icon from 'components/icon';
import Loading from 'components/loading';
import CHEVRON_DOWN_SVG from 'svgs/ui/chevron-down.svg?sprite';
import Cards from 'containers/cards';
import Link from 'next/link';

const MyProjectList = () => {
  const { sort } = useAppSelector((state) => state['/myProjects']);

  const dispatch = useAppDispatch();
  const {
    data: myProjects,
    fetchNextPage: fetchNextPageProjects,
    hasNextPage: hasNextProjectsPage,
    isFetchingNextPage: isFetchingNextProjectsPage,
    isFetching: isFetchingMyProjects,
    isFetched: isFetchedMyProjects,
  } = useMyInfinityProjects({
    sort,
    perPage: 12,
  });

  const LOADING = isFetchingMyProjects && !isFetchingMyProjects;

  const handleSortMyProjects = useCallback(
    (value) => {
      dispatch(setSort({ field: 'name', order: value }));
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
          {!!myProjects.length && (
            <>
              <div className="relative text-sm font-semibold text-grey-20 min-h-[16px]">
                <div className="inline mr-2 text-[32px] font-display font-thin text-black">
                  An overview of all your Projects
                </div>
              </div>

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
                          onClick={() => handleSortMyProjects('asc')}
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
                          onClick={() => handleSortMyProjects('desc')}
                        >
                          Z - A
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            </>
          )}
        </div>

        {!myProjects.length && !LOADING && (
          <div className="flex flex-col items-center justify-center space-y-4 h-[40vh] bg-white md:w-[55rem] mx-auto">
            <p className="md:text-[40px] font-display font-medium">You have no projects added.</p>
            <p className="max-w-sm text-center py-3 text-grey-20">
              Sorry, we have searched in our entire database but we couldn&apos;t find any results
              fitting your search criteria.
            </p>

            <button className="px-4 py-2 my-3 text-black rounded-lg bg-green-0">
              <Link href="/my-projects/new">Add Project</Link>
            </button>
          </div>
        )}

        {!!myProjects.length && (
          <div className="pb-10">
            <Cards
              pathname="/members/projects"
              theme="bg-green-0"
              data={myProjects}
              project={true}
            />
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

export default MyProjectList;
