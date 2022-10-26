import React, { useCallback, useMemo } from 'react';

import cx from 'classnames';

import { setFilters } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useFunderLegalStatuses } from 'hooks/funder-legal-statuses';

import { MultiSelect } from 'components/forms';

interface GeographicSelectedProps {}

const LegalSelected: React.FC<GeographicSelectedProps> = ({}: GeographicSelectedProps) => {
  const { filters } = useAppSelector((state) => state['/funders']);
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
      console.log({ value });
      dispatch(
        setFilters({
          ...filters,
          funderLegalStatuses: value,
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
