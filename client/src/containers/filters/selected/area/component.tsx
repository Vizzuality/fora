import React, { useCallback, useMemo } from 'react';

import cx from 'classnames';

import { setFilters as setFundersFilters } from 'store/funders';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setFilters as setProjectsFilters } from 'store/projects';

import { useAreas } from 'hooks/areas';

import { MultiSelect } from 'components/forms';

interface AreaSelectedProps {
  type: string;
}

const AreaSelected: React.FC<AreaSelectedProps> = ({ type }) => {
  const { filters } = useAppSelector((state) => state[`/${type}`]);
  const dispatch = useAppDispatch();
  const { data: areasData, isFetching: areasIsFetching, isFetched: areasIsFetched } = useAreas();
  const { areas } = filters;

  const areasOptions = useMemo(
    () => areasData.map((area) => ({ label: area.name, value: area.id })),
    [areasData]
  );

  const handleSelectArea = useCallback(
    (values) => {
      const action = {
        funders: setFundersFilters,
        projects: setProjectsFilters,
      };

      dispatch(
        action[type]({
          ...filters,
          areas: values,
        })
      );
    },
    [dispatch, type, filters]
  );

  return (
    <div
      className={cx({
        'font-semibold w-full': true,
      })}
    >
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
        loading={areasIsFetching && !areasIsFetched}
      />
    </div>
  );
};

export default AreaSelected;
