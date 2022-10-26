import React, { useCallback, useMemo } from 'react';

import cx from 'classnames';

import { setFilters } from 'store/funders';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useGeographics, useSubGeographics } from 'hooks/geographics';

import { MultiSelect, Select } from 'components/forms';

interface GeographicSelectedProps {}

const GeographicSelected: React.FC<GeographicSelectedProps> = ({}: GeographicSelectedProps) => {
  const { filters } = useAppSelector((state) => state['/funders']);
  const { geographic, subgeographics } = filters;
  const dispatch = useAppDispatch();

  const { data: geographicData, isFetched: geographicIsFetched } = useGeographics();
  const { data: subgeographicsData, isFetched: subgeographicsIsFetched } = useSubGeographics({
    filters: { geographic },
  });

  const geographicOptions = useMemo(
    () =>
      geographicIsFetched ? geographicData.map((geo) => ({ label: geo.name, value: geo.id })) : [],
    [geographicData, geographicIsFetched]
  );

  const subgeographicOptions = useMemo(
    () =>
      subgeographicsIsFetched
        ? subgeographicsData.map((subGeo) => ({ label: subGeo.name, value: subGeo.id }))
        : [],
    [subgeographicsData, subgeographicsIsFetched]
  );

  const handleSelectGeo = useCallback(
    (value) => {
      console.log({ value });
      dispatch(
        setFilters({
          ...filters,
          geographic: value,
        })
      );
    },
    [dispatch, filters]
  );

  const handleSelectSubGeo = useCallback(
    (value) => {
      console.log({ value });
      dispatch(
        setFilters({
          ...filters,
          subgeographics: value,
        })
      );
    },
    [dispatch, filters]
  );
  // console.log('condit', !SELECTED_GEO);
  return (
    <div className="flex space-x-4">
      <div
        className={cx({
          'font-semibold w-full': true,
        })}
      >
        <Select
          id="geographic-scope-select"
          placeholder="All main divisions"
          theme="light"
          size="base"
          options={geographicOptions}
          value={geographic}
          onSelect={handleSelectGeo}
        />
      </div>
      <div
        className={cx({
          'font-semibold w-full': true,
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
          onSelect={handleSelectSubGeo}
          batchSelectionActive
          batchSelectionLabel=""
        />
      </div>
    </div>
  );
};

export default GeographicSelected;
