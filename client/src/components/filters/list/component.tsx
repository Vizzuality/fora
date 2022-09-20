import React, { useMemo } from 'react';

import cx from 'classnames';

import FilterItem from './item';
import type { FilterListProps } from './types';

const FilterList: React.FC<FilterListProps> = ({
  title,
  name,
  data,
  columns = 4,
  selected,
  onChange,
  onSelectAll,
  onClearAll,
}) => {
  const SELECTED = useMemo(() => {
    if (Array.isArray(selected)) {
      if (!selected.length) {
        return null;
      }

      if (selected.length === data.length) {
        return 'All selected';
      }

      return `${selected.length} Selected`;
    }

    return null;
  }, [data, selected]);

  const DISABLED_ALL = useMemo(() => {
    if (Array.isArray(selected)) {
      return selected.length === data.length;
    }

    return false;
  }, [data, selected]);

  const DISABLED_NONE = useMemo(() => {
    if (Array.isArray(selected)) {
      return !selected.length;
    }

    return false;
  }, [selected]);

  return (
    <div className="relative flex flex-col py-px overflow-hidden grow">
      <div className="absolute left-0 z-10 w-full h-5 pointer-events-none -top-1 bg-gradient-to-b from-white via-white" />
      <div className="relative flex flex-col overflow-hidden grow">
        <div className="flex flex-col px-10 py-5 space-y-5 overflow-x-hidden overflow-y-auto grow">
          <div>
            <div className="space-y-5">
              <div className="flex justify-between">
                {title && <h3 className="font-semibold uppercase text-grey-20">{title}</h3>}
                <div className="flex items-center space-x-7">
                  <button
                    aria-label="select all"
                    type="button"
                    className={cx({
                      'font-semibold shrink-0 underline': true,
                      'text-grey-0': !DISABLED_ALL,
                      'text-grey-20': DISABLED_ALL,
                    })}
                    disabled={DISABLED_ALL}
                    onClick={onSelectAll}
                  >
                    Select all
                  </button>

                  <div className="flex space-x-2">
                    <button
                      aria-label="clear all"
                      type="button"
                      className={cx({
                        'font-semibold shrink-0 underline': true,
                        'text-grey-0': !DISABLED_NONE,
                        'text-grey-20': DISABLED_NONE,
                      })}
                      disabled={DISABLED_NONE}
                      onClick={onClearAll}
                    >
                      Clear all
                    </button>

                    {SELECTED && <div className="font-semibold shrink-0">({SELECTED})</div>}
                  </div>
                </div>
              </div>

              <div
                className={cx({
                  'space-y-2': true,
                  'sm:columns-2 md:columns-3 lg:columns-4': columns === 4,
                  'sm:columns-2 md:columns-2 lg:columns-3': columns === 3,
                  'sm:columns-2 md:columns-2 lg:columns-2': columns === 2,
                })}
              >
                {data.map((d) => (
                  <FilterItem
                    {...d}
                    label={d.name}
                    name={name}
                    key={d.id}
                    selected={Array.isArray(selected) && selected.includes(d.id)}
                    onChange={onChange}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 z-10 w-full h-5 pointer-events-none bg-gradient-to-t from-white via-white" />
    </div>
  );
};

export default FilterList;
