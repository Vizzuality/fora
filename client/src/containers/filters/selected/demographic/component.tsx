import React, { useCallback, useMemo } from 'react';

import cx from 'classnames';

import { setFilters } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useDemographics } from 'hooks/demographics';

import { MultiSelect } from 'components/forms';

interface DemographicSelectedProps {}

const DemographicSelected: React.FC<DemographicSelectedProps> = () => {
  const { filters } = useAppSelector((state) => state['/funders']);
  const { demographics } = filters;
  const dispatch = useAppDispatch();

  const { data: demographicsData, isFetched: demographicsIsFetched } = useDemographics();

  const demographicOptions = useMemo(
    () =>
      demographicsIsFetched
        ? demographicsData.map((demogr) => ({ label: demogr.name, value: demogr.id }))
        : [],
    [demographicsData, demographicsIsFetched]
  );

  const handleSelect = useCallback(
    (value) => {
      console.log({ value });
      dispatch(
        setFilters({
          ...filters,
          demographics: value,
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
      <MultiSelect
        id="gepgraphic-scope-select"
        placeholder="Select"
        theme="light"
        size="base"
        options={demographicOptions}
        values={demographics}
        onSelect={handleSelect}
        batchSelectionActive
        clearSelectionActive
      />
    </div>
  );
};

export default DemographicSelected;
