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

  const filterType = useMemo(() => {
    const data = {
      funders: setFundersFilters,
      projects: setProjectsFilters,
    };

    return data[type];
  }, [type]);

  const handleSelectGeo = useCallback(
    (value) => {
      dispatch(
        filterType({
          ...filters,
          geographic: value,
        })
      );
    },
    [dispatch, filterType, filters]
  );

  const handleSelectSubGeo = useCallback(
    (value) => {
      dispatch(
        filterType({
          ...filters,
          subgeographics: value,
        })
      );
    },
    [dispatch, filterType, filters]
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
          options={geographicOptions}
          value={geographic}
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
          onSelect={handleSelectSubGeo}
          batchSelectionActive
          clearSelectionActive
        />
      </div>
    </div>
  );
};

export default GeographicSelected;
