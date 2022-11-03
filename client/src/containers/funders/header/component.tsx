import React from 'react';

import { setSearch } from 'store/funders';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useDebounceCallback } from '@react-hook/debounce';

import { useFunders } from 'hooks/funders';

import Filters from 'containers/filters';
import Wrapper from 'containers/wrapper';

import Search from 'components/search';

const FundersHeader = () => {
  const { data: fundersData } = useFunders();

  const dispatch = useAppDispatch();

  const { search } = useAppSelector((state) => state['/funders']);

  const onChangeSearch = useDebounceCallback((value: string) => {
    dispatch(setSearch(value));
  }, 250);

  const fundersCount = Math.floor(fundersData.length / 10) * 10;
  return (
    <header className="py-16 bg-green-0 text-grey-0">
      <Wrapper>
        <div className="space-y-5">
          <h2 className="max-w-2xl text-4xl font-display">Explore the FORA community members</h2>
          <h3 className="max-w-2xl text-2xl font-display">
            Search our database of {fundersCount}+ funders supporting regenerative agriculture
          </h3>
        </div>
        <div className="w-2/3 mt-11">
          <Search value={search} placeholder="Search" theme="green" onChange={onChangeSearch} />
        </div>

        <div className="mt-14">
          <Filters type="funders" />
        </div>
      </Wrapper>
    </header>
  );
};

export default FundersHeader;
