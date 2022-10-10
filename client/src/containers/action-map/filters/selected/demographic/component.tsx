import React, { useCallback, useMemo } from 'react';

import cx from 'classnames';

import { setFilters } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useDemographics } from 'hooks/demographics';

import Selection from 'components/filters/trigger/selection';

interface DemographicSelectedProps {}

const DemographicSelected: React.FC<DemographicSelectedProps> = () => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const { demographics } = filters;
  const dispatch = useAppDispatch();

  const {
    data: demographicsData,
    isFetching: demographicsIsFetching,
    isFetched: demographicsIsFetched,
  } = useDemographics();

  const SELECTED = useMemo(() => {
    switch (demographics.length) {
      case 0:
        return 'All demographics';
      case 1:
        return demographicsData.find((d) => demographics.includes(d.id))?.name;
      default: {
        const [first] = demographics;
        const firstName = demographicsData.find((d) => {
          return first === d.id;
        })?.name;

        return firstName;
      }
    }
  }, [demographics, demographicsData]);

  const onReset = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      dispatch(
        setFilters({
          ...filters,
          demographics: [],
        })
      );
    },
    [dispatch, filters]
  );

  return (
    <div
      className={cx({
        'inline-block font-semibold max-w-full text-grey-0': true,
      })}
    >
      <Selection
        text={SELECTED}
        data={demographics}
        dataIsFetching={demographicsIsFetching}
        dataIsFetched={demographicsIsFetched}
        onReset={onReset}
      />
    </div>
  );
};

export default DemographicSelected;
