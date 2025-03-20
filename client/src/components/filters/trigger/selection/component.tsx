import React from 'react';

import Icon from 'components/icon';
import Loading from 'components/loading';

import CLOSE_SVG from 'svgs/ui/close.svg?sprite';

import type { FilterSelectionProps } from './types';

const FilterSelection: React.FC<FilterSelectionProps> = ({
  text,
  data,
  dataIsFetching,
  dataIsFetched,
  onReset,
}) => {
  return (
    <>
      <div className="relative flex">
        {dataIsFetching && !dataIsFetched && (
          <Loading visible={true} className="relative h-2 w-2" iconClassName="w-3 h-3" />
        )}

        {dataIsFetched && (
          <>
            <span className="grow truncate underline">{text}</span>

            {data.length > 1 && <span className="ml-1 shrink-0 underline">+{data.length - 1}</span>}

            {!!data.length && (
              <button onClick={onReset} className="group ml-3 shrink-0">
                <Icon icon={CLOSE_SVG} className="h-3 w-3 group-hover:text-red-0" />
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default FilterSelection;
