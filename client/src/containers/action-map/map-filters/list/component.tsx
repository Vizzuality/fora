import React from 'react';

// import dynamic from 'next/dynamic';

import MoreFiltersSelected from 'containers/action-map/map-filters/selected/more-filters';

import Filter from 'components/filters/trigger';

import { FILTERS } from './constants';

// const Filter = dynamic(() => import('components/filters/trigger'), { ssr: false });

const MapFilterList = () => {
  return (
    <div className="flex items-stretch justify-between divide-x divide-solid divide-grey-40/30">
      {FILTERS.map((filter) => {
        const { id, name, info, Selected, Modal } = filter;
        return <Filter key={id} title={name} info={info} Selected={Selected} Modal={Modal} />;
      })}

      <MoreFiltersSelected />
    </div>
  );
};

export default MapFilterList;
