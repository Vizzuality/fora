import React, { useCallback, useMemo } from 'react';

import cx from 'classnames';

import { setFilters } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useGeographics, useSubGeographics } from 'hooks/geographics';

import Select2 from 'components/forms/select2';

const SELECT_TEST = [
  'Alaska',
  'Mid-Atlantic',
  'Midwest- East North Central And Great Lakes',
  'Midwest- West North Central And Great Plains',
  'Mountain West',
];

interface GeographicSelectedProps {}

const GeographicSelected: React.FC<GeographicSelectedProps> = ({}: GeographicSelectedProps) => {
  const { filters } = useAppSelector((state) => state['/funders']);
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
  } = useSubGeographics({ filters: { geographic } });

  const SELECTED = useMemo(() => {
    if (
      (geographicIsFetching && !geographicIsFetched) ||
      (subgeographicsIsFetching && !subgeographicsIsFetched)
    ) {
      return '--';
    }

    if (!!subgeographics.length) {
      switch (subgeographics.length) {
        case 0:
          return '--';
        case 1: {
          return subgeographicsData.find((d) => {
            return subgeographics.includes(d.id);
          })?.name;
        }
        default: {
          const [first] = subgeographics;
          const firstName = subgeographicsData.find((d) => {
            return first === d.id;
          })?.name;

          return firstName;
        }
      }
    }

    return geographicData.find((d) => geographic === d.id)?.name;
  }, [
    geographic,
    subgeographics,
    geographicData,
    subgeographicsData,
    geographicIsFetching,
    subgeographicsIsFetching,
    geographicIsFetched,
    subgeographicsIsFetched,
  ]);

  const onReset = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      dispatch(
        setFilters({
          ...filters,
          subgeographics: [],
        })
      );
    },
    [dispatch, filters]
  );

  const handleSelectGeo = useCallback((value) => {
    console.log({ value });
  }, []);

  return (
    <div
      className={cx({
        'inline-block font-semibold max-w-full': true,
      })}
    >
      <Select2
        id="gepgraphic-scope-select"
        placeholder="Select"
        theme="light"
        size="base"
        options={SELECT_TEST}
        value={SELECTED}
        onSelect={handleSelectGeo}
        // onReset={onReset}
      />
    </div>
  );
};

export default GeographicSelected;
