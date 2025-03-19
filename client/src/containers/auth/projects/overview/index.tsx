import React, { useCallback, useEffect } from 'react';

import cx from 'classnames';

import Link from 'next/link';

import { Menu } from '@headlessui/react';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useIntersectionObserver } from '@uidotdev/usehooks';
import { useSession } from 'next-auth/react';
import { RxPlus } from 'react-icons/rx';

import CHEVRON_DOWN_SVG from 'svgs/ui/chevron-down.svg?sprite';

import LinkButton from '@/components/button';
import Icon from '@/components/icon';
import { MyProjectCard } from '@/containers/auth/projects/overview/my-project-card';
import { CardWrapper } from '@/containers/cards/card/wrapper';
import Wrapper from '@/containers/wrapper';
import { myProjectsQueryOptions } from '@/pages/auth/projects';

export default function MyProjectsOverview() {
  const [sort, setSort] = React.useState<'asc' | 'desc'>('asc');
  const { data: session } = useSession();
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px',
  });

  const { data, fetchNextPage, hasNextPage, isFetching, isFetched } = useInfiniteQuery({
    ...myProjectsQueryOptions(session, {
      'sort[attribute]': 'name',
      'sort[direction]': sort,
    }),
    enabled: !!session,
    select: (d) => ({
      projects: d.pages.flatMap((page) => page.data),
      total: d.pages[0].meta.total,
    }),
    placeholderData: keepPreviousData,
  });

  const fetchMore = useCallback(async () => {
    if (entry?.isIntersecting && session && hasNextPage) {
      await fetchNextPage();
    }
  }, [entry, session, hasNextPage, fetchNextPage]);

  useEffect(() => {
    fetchMore();
  }, [fetchMore]);

  return (
    <Wrapper className="w-full flex grow flex-col gap-6">
      <header>
        <h2 className="text-3xl font-display">My projects</h2>
      </header>

      {isFetched && data?.projects.length === 0 && (
        <div className="items-center justify-center  grid-cols-12 grid h-full flex-1 mb-10">
          <div className="col-span-8 md:col-span-6 col-start-3 md:col-start-4 flex flex-col gap-4 text-center items-center justify-center grow">
            <h3 className="text-2xl md:text-3xl font-display">You have no projects</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur. Convallis fusce neque odio nunc elementum
              habitant sit sagittis.
            </p>
            <LinkButton href="/auth/projects/new" theme="green">
              Add project
            </LinkButton>
          </div>
        </div>
      )}
      {isFetched && data?.projects.length > 0 && (
        <>
          <div className="flex justify-between">
            <span className="text-grey-20">{data?.total} projects</span>
            {isFetching && <span>Loading... </span>}
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
                      onClick={() => setSort('asc')}
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
                      onClick={() => setSort('desc')}
                    >
                      Z - A
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            <CardWrapper className="p-0 ">
              <Link
                href="/auth/projects/new"
                className="grid grid-cols-12 flex-col grow p-8 items-center"
              >
                <div className="col-span-6 col-start-4 flex flex-col gap-4 items-center text-center">
                  <h3 className="text-2xl font-display line-clamp-3">Add new project</h3>
                  <span className="inline-flex p-4 border border-grey-0 rounded-full">
                    <RxPlus className="h-6 w-6" />
                  </span>
                </div>
              </Link>
            </CardWrapper>
            {data?.projects.map((project) => {
              return <MyProjectCard {...project} key={project.id} />;
            })}
          </div>
          <span ref={ref} />
        </>
      )}
    </Wrapper>
  );
}
