import React, { useCallback } from 'react';

import cx from 'classnames';

import { setSort } from 'store/funders';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { Menu } from '@headlessui/react';

import { useFundersInfinity } from 'hooks/funders';

import Cards from 'containers/cards';
import Sentence from 'containers/sentence';
import Wrapper from 'containers/wrapper';

import Button from 'components/button';
import Icon from 'components/icon';
import Loading from 'components/loading';

import CHEVRON_DOWN_SVG from 'svgs/ui/chevron-down.svg?sprite';

const FundersList = () => {
  const { filters, search, sort } = useAppSelector((state) => state['/funders']);
  const { geographic } = filters;
  const dispatch = useAppDispatch();

  const {
    data: fundersData,
    fetchNextPage: fetchNextPageFunders,
    hasNextPage: hasNextFundersPage,
    isFetchingNextPage: isFetchingNextFundersPage,
  } = useFundersInfinity({
    filters,
    search,
    sort,
    perPage: 12,
  });

  const handleSortFunders = useCallback(
    (value) => {
      dispatch(setSort({ field: 'name', order: value }));
    },
    [dispatch]
  );

  const handleOnShowMore = useCallback(() => {
    fetchNextPageFunders();
  }, [fetchNextPageFunders]);

  return (
    <>
      <Wrapper>
        <div className="py-8">
          {geographic && <Sentence type="funders" />}

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
                      onClick={() => handleSortFunders('asc')}
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
                      onClick={() => handleSortFunders('desc')}
                    >
                      Z - A
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>

        {!fundersData.length ? (
          <div className="pb-10">
            <p className="text-grey-20">No results fitting this search were found.</p>
          </div>
        ) : (
          <div className="pb-10">
            <Cards pathname="/funders" data={fundersData} />
          </div>
        )}

        {hasNextFundersPage && (
          <div className="flex justify-center pb-10">
            <Button
              type="button"
              theme="black-alt"
              size="xl"
              className="overflow-hidden"
              onClick={handleOnShowMore}
            >
              Show more
              <Loading
                visible={isFetchingNextFundersPage}
                className="absolute flex items-center justify-center w-full h-full bg-white"
              />
            </Button>
          </div>
        )}
      </Wrapper>
    </>
  );
};

export default FundersList;
