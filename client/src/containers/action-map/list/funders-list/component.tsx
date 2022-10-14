import React from 'react';

import { useAppSelector } from 'store/hooks';

import { useFunders } from 'hooks/funders';

import Loading from 'components/loading';

import Item from './item';

const List = () => {
  const { filters } = useAppSelector((state) => state['/action-map']);

  // FUNDERS
  // get funders filtered by the current filters
  const {
    data: fundersData,
    isFetching: fundersIsFetching,
    isFetched: fundersIsFetched,
  } = useFunders({
    filters,
  });

  const LOADING = fundersIsFetching && !fundersIsFetched;

  return (
    <>
      <Loading
        visible={LOADING}
        className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-white/75"
      />

      <div className="space-y-5">
        <div className="flex justify-between">
          <h4 className="font-semibold uppercase text-grey-20">Funders</h4>
          <h4 className="font-semibold uppercase text-grey-20">Funding</h4>
        </div>
        <ul className="relative space-y-2">
          {!LOADING &&
            fundersData
              //
              .map((d) => <Item {...d} key={d.id} />)}
        </ul>
      </div>
    </>
  );
};

export default List;