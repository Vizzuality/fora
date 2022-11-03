import React, { useCallback, useMemo } from 'react';

import cx from 'classnames';

import { setFilters as setFundersFilters } from 'store/funders';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setFilters as setProjectsFilters } from 'store/projects';

import { useDemographics } from 'hooks/demographics';

import { MultiSelect } from 'components/forms';
import Loading from 'components/loading';

interface DemographicSelectedProps {
  type: string;
}

const DemographicSelected: React.FC<DemographicSelectedProps> = ({ type }) => {
  const { filters } = useAppSelector((state) => state[`/${type}`]);
  const { demographics } = filters;
  const dispatch = useAppDispatch();

  const {
    data: demographicsData,
    isFetched: demographicsIsFetched,
    isFetching: demographicsIsFetching,
  } = useDemographics();

  const demographicOptions = useMemo(
    () => demographicsData.map((demogr) => ({ label: demogr.name, value: demogr.id })),
    [demographicsData]
  );

  const handleSelect = useCallback(
    (value) => {
      const action = {
        funders: setFundersFilters,
        projects: setProjectsFilters,
      };

      dispatch(
        action[type]({
          ...filters,
          demographics: value,
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
      {demographicsIsFetching && !demographicsIsFetched && (
        <Loading visible={true} className="relative w-2 h-2" iconClassName="w-3 h-3" />
      )}

      <MultiSelect
        id="gepgraphic-scope-select"
        placeholder="All demographics"
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
