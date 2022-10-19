import React, { useCallback, useMemo } from 'react';

import cx from 'classnames';

import { setFilters } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useAreas } from 'hooks/areas';

import Select2 from 'components/forms/select2';
import Loading from 'components/loading';

const SELECT_TEST = [
  'Alaska',
  'Mid-Atlantic',
  'Midwest- East North Central And Great Lakes',
  'Midwest- West North Central And Great Plains',
  'Mountain West',
];

interface AreaSelectedProps {}

const AreaSelected: React.FC<AreaSelectedProps> = () => {
  const { filters } = useAppSelector((state) => state['/funders']);
  const dispatch = useAppDispatch();
  const { data: areasData, isFetching: areasIsFetching, isFetched: areasIsFetched } = useAreas();
  const { areas } = filters;

  const areasOptions = useMemo(
    () => areasIsFetched && areasData.map((area) => ({ label: area.name, value: area.id })),
    [areasData, areasIsFetched]
  );

  console.log('areas', areas);

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

  const handleSelectArea = useCallback(
    (e) => {
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
        'inline-block font-semibold max-w-full': true,
      })}
    >
      {areasIsFetching && !areasIsFetched && (
        <Loading visible={true} className="relative w-2 h-2" iconClassName="w-3 h-3" />
      )}
      {areasIsFetched && (
        <Select2
          id="gepgraphic-scope-select"
          placeholder="Select"
          theme="light"
          size="base"
          options={areasOptions}
          value={SELECTED}
          onSelect={handleSelectArea}
          // onReset={onReset}
          multiple
          batchSelectionActive
          clearSelectionActive
        />
      )}
    </div>
  );
};

export default AreaSelected;
