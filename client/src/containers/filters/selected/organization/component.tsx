import React, { useCallback, useMemo } from 'react';

import cx from 'classnames';

import { setFilters } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useFunderTypes } from 'hooks/funder-types';

import { MultiSelect } from 'components/forms';

interface GeographicSelectedProps {}

const OrganizationSelected: React.FC<GeographicSelectedProps> = ({}: GeographicSelectedProps) => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const { funderTypes } = filters;
  const dispatch = useAppDispatch();

  const { data: funderTypesData, isFetched: funderTypesIsFetched } = useFunderTypes();

  const organizationTypeOptions = useMemo(
    () =>
      funderTypesIsFetched
        ? funderTypesData.map((status) => ({ label: status.name, value: status.id }))
        : [],
    [funderTypesData, funderTypesIsFetched]
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
        options={organizationTypeOptions}
        values={funderTypes}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default OrganizationSelected;
