import React, { useCallback, useMemo } from 'react';

import cx from 'classnames';

import { setFilters } from 'store/funders';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useAreas } from 'hooks/areas';

import { MultiSelect } from 'components/forms';
import Loading from 'components/loading';

interface AreaSelectedProps {}

const AreaSelected: React.FC<AreaSelectedProps> = () => {
  const { filters } = useAppSelector((state) => state['/funders']);
  const dispatch = useAppDispatch();
  const { data: areasData, isFetching: areasIsFetching, isFetched: areasIsFetched } = useAreas();
  const { areas } = filters;

  const areasOptions = useMemo(
    () => areasIsFetched && areasData.map((area) => ({ label: area.name, value: area.id })),
    [areasData, areasIsFetched]
  );

  const handleSelectArea = useCallback(
    (values) => {
      console.log({ values });
      dispatch(
        setFilters({
          ...filters,
          areas: values,
        })
      );
    },
    [dispatch, filters]
  );

  return (
    <div
      className={cx({
        'font-semibold w-full': true,
      })}
    >
      {areasIsFetching && !areasIsFetched && (
        <Loading visible={true} className="relative w-2 h-2" iconClassName="w-3 h-3" />
      )}
      {areasIsFetched && (
        <MultiSelect
          id="area-focus-select"
          placeholder="All areas of focus"
          theme="light"
          size="base"
          options={areasOptions}
          values={areas}
          onSelect={handleSelectArea}
          batchSelectionActive
          clearSelectionActive
        />
      )}
    </div>
  );
};

export default AreaSelected;
