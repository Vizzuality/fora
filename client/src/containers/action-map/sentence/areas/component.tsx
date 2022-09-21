import React, { useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { useAreas } from 'hooks/areas';

import Tooltip from 'components/tooltip';

const AreasSentence = () => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const { areas } = filters;

  const { data: areasData, isFetched: areasIsFetched } = useAreas();

  const SELECTED_LIST = useMemo(() => {
    return areasData.filter((area) => areas.includes(area.id));
  }, [areasData, areas]);

  const SELECTED_TEXT = useMemo(() => {
    if (!SELECTED_LIST.length) return null;
    const [first, ...rest] = SELECTED_LIST;

    if (!rest.length) return ` ${first.name}`;
    return ` ${first.name} +${rest.length}`;
  }, [SELECTED_LIST]);

  if (!areas.length || !areasIsFetched) return null;

  return (
    <>
      {' '}
      who invest in
      <Tooltip
        trigger="click"
        placement="bottom"
        arrowProps={{
          enabled: true,
          size: 8,
          className: 'bg-grey-60',
        }}
        content={
          <div className="max-w-xs py-2.5 text-grey-20 rounded shadow-xl bg-grey-60 border border-grey-0/5 pointer-events-auto flex flex-col max-h-full">
            <div className="overflow-x-hidden overflow-y-auto pl-2.5 pr-5">
              <ul className="space-y-1">
                {SELECTED_LIST.map((area) => (
                  <li key={area.id}>{area.name}</li>
                ))}
              </ul>
            </div>
          </div>
        }
      >
        <span className="text-grey-0">{SELECTED_TEXT}</span>
      </Tooltip>
    </>
  );
};

export default AreasSentence;
