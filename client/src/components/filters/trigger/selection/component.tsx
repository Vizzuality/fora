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
          <Loading visible={true} className="relative w-2 h-2" iconClassName="w-3 h-3" />
        )}

        {!dataIsFetching && dataIsFetched && (
          <>
            <span className="underline truncate grow">{text}</span>

            {data.length > 1 && <span className="ml-1 underline shrink-0">+{data.length - 1}</span>}

            {!!data.length && (
              <button onClick={onReset} className="ml-3 shrink-0 group">
                <Icon icon={CLOSE_SVG} className="w-3 h-3 group-hover:text-red-0" />
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default FilterSelection;
