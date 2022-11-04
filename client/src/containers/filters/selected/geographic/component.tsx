import React, { useCallback, useMemo } from 'react';

import cx from 'classnames';

import { setFilters as setFundersFilters } from 'store/funders';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setFilters as setProjectsFilters } from 'store/projects';

import { useGeographics, useSubGeographics } from 'hooks/geographics';

import { MultiSelect, Select } from 'components/forms';

interface GeographicSelectedProps {
  type: string;
}

const GeographicSelected: React.FC<GeographicSelectedProps> = ({
  type,
}: GeographicSelectedProps) => {
  const { filters } = useAppSelector((state) => state[`/${type}`]);
  const { geographic, subgeographics } = filters;
  const dispatch = useAppDispatch();

  const {
    data: geographicData,
    isFetching: geographicIsFetching,
    isFetched: geographicIsFetched,
  } = useGeographics();
  const {
    data: subgeographicsData,
    isFetching: subgeographicsIsFetching,
    isFetched: subgeographicsIsFetched,
  } = useSubGeographics(
    {
      filters: { geographic },
    },
    {
      enabled: !!geographic,
    }
  );

  const geographicOptions = useMemo(
    () => geographicData.map((geo) => ({ label: geo.name, value: geo.id })),
    [geographicData]
  );

  const subgeographicOptions = useMemo(
    () => subgeographicsData.map((subGeo) => ({ label: subGeo.name, value: subGeo.id })),
    [subgeographicsData]
  );

  const handleSelectGeo = useCallback(
    (value) => {
      const action = {
        funders: setFundersFilters,
        projects: setProjectsFilters,
      };

      dispatch(
        action[type]({
          ...filters,
          geographic: value,
          subgeographics: [],
        })
      );
    },
    [dispatch, type, filters]
  );

  const handleSelectSubGeo = useCallback(
    (value) => {
      const action = {
        funders: setFundersFilters,
        projects: setProjectsFilters,
      };

      dispatch(
        action[type]({
          ...filters,
          subgeographics: value,
        })
      );
    },
    [dispatch, type, filters]
  );

  return (
    <div className="flex space-x-4">
      <div
        className={cx({
          'font-semibold w-1/2': true,
        })}
      >
        <Select
          id="geographic-scope-select"
          placeholder="All main divisions"
          theme="light"
          size="base"
          clearable
          options={geographicOptions}
          value={geographic}
          loading={geographicIsFetching && !geographicIsFetched}
          onSelect={handleSelectGeo}
        />
      </div>
      <div
        className={cx({
          'font-semibold w-1/2': true,
        })}
      >
        <MultiSelect
          id="subgeographic-scope-select"
          placeholder="All sub-divisions"
          theme="light"
          size="base"
          options={subgeographicOptions}
          values={subgeographics}
          disabled={!geographic}
          batchSelectionActive
          clearSelectionActive
          loading={subgeographicsIsFetching && !subgeographicsIsFetched}
          onSelect={handleSelectSubGeo}
        />
      </div>
    </div>
  );
};

export default GeographicSelected;
