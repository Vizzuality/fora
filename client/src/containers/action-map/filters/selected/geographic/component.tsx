import React, { useCallback, useMemo } from 'react';

import cx from 'classnames';

import { setFilters } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useGeographics, useSubGeographics } from 'hooks/geographics';

import Selection from 'components/filters/trigger/selection';

interface GeographicSelectedProps {}

const GeographicSelected: React.FC<GeographicSelectedProps> = ({}: GeographicSelectedProps) => {
  const { filters } = useAppSelector((state) => state['/action-map']);
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
  } = useSubGeographics(geographic);

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

  return (
    <div
      className={cx({
        'inline-block font-semibold max-w-full': true,
      })}
    >
      <Selection
        text={SELECTED}
        data={subgeographics}
        dataIsFetching={subgeographicsIsFetching}
        dataIsFetched={subgeographicsIsFetched}
        onReset={onReset}
      />
    </div>
  );
};

export default GeographicSelected;
