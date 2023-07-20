import React, { useCallback } from 'react';

import { setType, Type } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { usePlausible } from 'next-plausible';

import type { TabsType } from 'components/tabs';
import Tabs from 'components/tabs';

const MAP_TABS: TabsType[] = [
  {
    id: 'funders',
    name: 'Funders',
  },
  {
    id: 'projects',
    name: 'Projects',
  },
];

const FilterTabs = () => {
  const { type } = useAppSelector((state) => state['/action-map']);
  const dispatch = useAppDispatch();

  const plausible = usePlausible();

  const handleTabChange = useCallback(
    (id: string) => {
      dispatch(setType(id as Type));

      plausible('Map - Save filter', {
        props: {
          filterName: 'Filter Tabs',
          values: id,
        },
      });
    },
    [dispatch, plausible]
  );
  return (
    <div className="pr-7">
      <Tabs selected={type} items={MAP_TABS} theme="green" onChange={handleTabChange} />
    </div>
  );
};

export default FilterTabs;
