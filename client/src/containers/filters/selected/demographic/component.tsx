import React, { useCallback, useMemo } from 'react';

import cx from 'classnames';

import { setFilters as setFundersFilters } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setFilters as setProjectsFilters } from 'store/projects';

import { useDemographics } from 'hooks/demographics';

import { MultiSelect } from 'components/forms';

interface DemographicSelectedProps {
  type: string;
}

const DemographicSelected: React.FC<DemographicSelectedProps> = ({ type }) => {
  const { filters } = useAppSelector((state) => state[`/${type}`]);
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
      const filterType = type === 'funders' ? setFundersFilters : setProjectsFilters;
      dispatch(
        filterType({
          ...filters,
          demographics: value,
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
