import React, { useCallback, useMemo } from 'react';

import cx from 'classnames';

import { setFilters as setFundersFilters } from 'store/funders';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setFilters as setProjectsFilters } from 'store/projects';

import { useFunderLegalStatuses } from 'hooks/funder-legal-statuses';

import { MultiSelect } from 'components/forms';

interface LegalSelectedProps {
  type: string;
}

const LegalSelected: React.FC<LegalSelectedProps> = ({ type }: LegalSelectedProps) => {
  const { filters } = useAppSelector((state) => state[`/${type}`]);
  const { funderLegalStatuses } = filters;
  const dispatch = useAppDispatch();

  const { data: funderLegalStatusesData, isFetched: funderLegalStatusIsFetched } =
    useFunderLegalStatuses();

  const legalStatusOptions = useMemo(
    () =>
      funderLegalStatusIsFetched
        ? funderLegalStatusesData.map((status) => ({ label: status.name, value: status.id }))
        : [],
    [funderLegalStatusesData, funderLegalStatusIsFetched]
  );

  const handleSelect = useCallback(
    (value) => {
      const filterType = type === 'funders' ? setFundersFilters : setProjectsFilters;
      dispatch(
        filterType({
          ...filters,
          funderLegalStatuses: value,
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
        options={legalStatusOptions}
        values={funderLegalStatuses}
        onSelect={handleSelect}
        batchSelectionActive
        clearSelectionActive
      />
    </div>
  );
};

export default LegalSelected;
