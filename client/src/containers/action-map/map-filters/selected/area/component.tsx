import React, { useCallback, useMemo } from 'react';

import cx from 'classnames';

import { setFilters } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useAreas } from 'hooks/areas';

import Selection from 'components/filters/trigger/selection';

interface AreaSelectedProps {}

const AreaSelected: React.FC<AreaSelectedProps> = () => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const dispatch = useAppDispatch();
  const { data: areasData, isFetching: areasIsFetching, isFetched: areasIsFetched } = useAreas();
  const { areas } = filters;

  const SELECTED = useMemo(() => {
    switch (areas.length) {
      case 0:
        return 'All areas';
      case 1:
        return areasData.find((d) => areas.includes(d.id))?.name;
      default: {
        const [first] = areas;
        const firstName = areasData.find((d) => {
          return first === d.id;
        })?.name;

        return firstName;
      }
    }
  }, [areas, areasData]);

  const onReset = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      dispatch(
        setFilters({
          ...filters,
          areas: [],
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
        data={areas}
        dataIsFetching={areasIsFetching}
        dataIsFetched={areasIsFetched}
        onReset={onReset}
      />
    </div>
  );
};

export default AreaSelected;
