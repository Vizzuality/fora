import React, { useMemo } from 'react';

import cx from 'classnames';

import Loading from 'components/loading';

import FilterItem from './item';
import type { FilterListProps } from './types';

const FilterList: React.FC<FilterListProps> = ({
  title,
  name,
  data,
  columns = 4,
  selected,
  loading,
  overflow = true,
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
    <div
      className={cx({
        relative: true,
        'flex grow flex-col overflow-hidden py-px': overflow,
      })}
    >
      <Loading
        visible={loading}
        className="absolute z-10 flex h-full w-full items-center justify-center bg-white/90"
      />
      {/* GRADIENT TOP */}
      {overflow && (
        <div className="pointer-events-none absolute left-0 -top-1 z-10 h-10 w-full bg-gradient-to-b from-white via-white" />
      )}

      {/* LIST */}
      <div
        className={cx({
          relative: true,
          'flex grow flex-col overflow-hidden': overflow,
        })}
      >
        <div
          className={cx({
            'flex grow flex-col space-y-5': true,
            'overflow-y-auto overflow-x-hidden px-10': overflow,
          })}
        >
          <div className="py-8">
            <div className="space-y-5">
              <div className="flex justify-between">
                {title && <h3 className="font-semibold uppercase text-grey-20">{title}</h3>}
                <div className="flex items-center space-x-7">
                  <button
                    aria-label="select all"
                    type="button"
                    className={cx({
                      'shrink-0 font-semibold underline': true,
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
                        'shrink-0 font-semibold underline': true,
                        'text-grey-0': !DISABLED_NONE,
                        'text-grey-20': DISABLED_NONE,
                      })}
                      disabled={DISABLED_NONE}
                      onClick={onClearAll}
                    >
                      Clear all
                    </button>

                    {SELECTED && <div className="shrink-0 font-semibold">({SELECTED})</div>}
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
      {/* GRADIENT BOTTOM */}
      {overflow && (
        <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-10 w-full bg-gradient-to-t from-white via-white" />
      )}
    </div>
  );
};

export default FilterList;
