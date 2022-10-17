import React from 'react';

import cx from 'classnames';
// import dynamic from 'next/dynamic';

import MoreFiltersSelected from 'containers/action-map/map-filters/selected/more-filters';

import Icon from 'components/icon';
import Tooltip from 'components/tooltip';

import INFO_SVG from 'svgs/ui/info.svg?sprite';

import { FILTERS } from './constants';

// const Filter = dynamic(() => import('components/filters/trigger'), { ssr: false });

interface FilterListProps {
  moreFilters: boolean;
}

const FilterList = ({ moreFilters }: FilterListProps) => {
  return (
    <div className="flex items-stretch justify-between space-x-4">
      {FILTERS.map((filter) => {
        const { id, name, info, Selected } = filter;
        return (
          <div key={id} className="flex flex-col space-y-4">
            <span className="inline-flex items-center text-base font-semibold uppercase text-grey-0">
              <label className="pr-2 cursor-pointer whitespace-nowrap">{name}</label>

              {info && (
                <Tooltip
                  arrowProps={{
                    enabled: true,
                    size: 6,
                    className: 'bg-white',
                  }}
                  content={
                    <div className="max-w-xs p-2.5 bg-white border rounded shadow-xl pointer-events-none text-grey-0 border-grey-0/5">
                      <span>{info}</span>
                    </div>
                  }
                >
                  <div>
                    <Icon
                      icon={INFO_SVG}
                      className={cx({
                        'w-3 h-3 text-grey-0': true,
                      })}
                    />
                  </div>
                </Tooltip>
              )}
            </span>
            <>{Selected}</>
          </div>
        );
      })}

      {moreFilters && <MoreFiltersSelected />}
    </div>
  );
};

export default FilterList;
