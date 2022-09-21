import React, { useCallback } from 'react';

import cx from 'classnames';

import { setSort } from 'store/funders';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useFundersInfinity } from 'hooks/funders';

import Cards from 'containers/cards';
import Wrapper from 'containers/wrapper';

import Button from 'components/button';
import { Select } from 'components/forms';
import { Option } from 'components/forms/select';
import Icon from 'components/icon';
import Loading from 'components/loading';

import DOWNLOAD_SVG from 'svgs/ui/download.svg?sprite';
import SHARE_SVG from 'svgs/ui/share.svg?sprite';

const SORT_OPTIONS = [
  { label: 'a-z', value: 'asc' },
  { label: 'z-a', value: 'desc' },
];

const FundersList = () => {
  const { filters, search, sort } = useAppSelector((state) => state['/funders']);
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
  });

  const handleSortFunders = useCallback(
    (value) => {
      dispatch(setSort({ field: 'title', order: value }));
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
          <p className="max-w-md line-clamp-2">
            Your are viewing <strong>{fundersData.length} funders</strong> from{' '}
            <strong>All U.S regions</strong> who invest in{' '}
            <strong>Toxins Reduction, Food Sovereignity, Climate Change</strong>
          </p>

          <div className="flex justify-between">
            <div className="flex items-center w-1/12">
              <Select
                placeholder="Sort by"
                theme="light"
                size="sm"
                render={(selected) => <div>{selected.label}</div>}
                value={sort.order}
                onChange={handleSortFunders}
              >
                {SORT_OPTIONS.map(({ label, value }) => (
                  <Option key={value} value={value} theme="light" label={label}>
                    {label}
                  </Option>
                ))}
              </Select>
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

        <Cards data={fundersData} />

        {hasNextFundersPage && (
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
