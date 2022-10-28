import React, { useCallback, useMemo } from 'react';

import cx from 'classnames';

import { setFilters as setFundersFilters } from 'store/funders';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setFilters as setProjectsFilters } from 'store/projects';

import { useAreas } from 'hooks/areas';

import { MultiSelect } from 'components/forms';
import Loading from 'components/loading';

interface AreaSelectedProps {
  type: string;
}

const AreaSelected: React.FC<AreaSelectedProps> = ({ type }) => {
  const { filters } = useAppSelector((state) => state[`/${type}`]);
  const dispatch = useAppDispatch();
  const { data: areasData, isFetching: areasIsFetching, isFetched: areasIsFetched } = useAreas();
  const { areas } = filters;

  const areasOptions = useMemo(
    () => areasIsFetched && areasData.map((area) => ({ label: area.name, value: area.id })),
    [areasData, areasIsFetched]
  );

  const handleSelectArea = useCallback(
    (values) => {
      const filterType = type === 'funders' ? setFundersFilters : setProjectsFilters;
      dispatch(
        filterType({
          ...filters,
          areas: values,
        })
      );
    },
    [dispatch, filters, type]
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
