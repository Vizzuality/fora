import React from 'react';

import cx from 'classnames';

import MoreFiltersSelected from 'containers/filters/selected/more-filters';

import Icon from 'components/icon';
import Tooltip from 'components/tooltip';

import INFO_SVG from 'svgs/ui/info.svg?sprite';

import { FILTERS } from './constants';

interface FilterListProps {
  type: string;
}

const FilterList = ({ type }: FilterListProps) => {
  const FILTERS_DATA = FILTERS(type);

  return (
    <div className="grid grid-cols-12 items-end gap-x-4">
      {FILTERS_DATA?.map((filter) => {
        const { id, name, info, className, Selected } = filter;
        return (
          <div
            key={id}
            className={cx({ 'flex flex-col space-y-2.5': true, [className]: className })}
          >
            <span className="inline-flex items-center text-base font-semibold uppercase text-grey-0">
              <label className="cursor-pointer whitespace-nowrap pr-2">{name}</label>

              {info && (
                <Tooltip
                  arrowProps={{
                    enabled: true,
                    size: 6,
                    className: 'bg-white',
                  }}
                  content={
                    <div className="pointer-events-none max-w-xs rounded border border-grey-0/5 bg-white p-2.5 text-grey-0 shadow-xl">
                      <span>{info}</span>
                    </div>
                  }
                >
                  <div className="h-4 w-4 rounded-full bg-grey-0">
                    <Icon
                      icon={INFO_SVG}
                      className={cx({
                        'h-4 w-4 text-green-0': true,
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
      <div className="pb-3">
        <MoreFiltersSelected type={type} />
      </div>
    </div>
  );
};

export default FilterList;
