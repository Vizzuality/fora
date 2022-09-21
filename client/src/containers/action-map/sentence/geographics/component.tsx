import React, { useMemo } from 'react';

import cx from 'classnames';

import { useAppSelector } from 'store/hooks';

import { useGeographics, useSubGeographics } from 'hooks/geographics';

import Tooltip from 'components/tooltip';

const GeographicsSentence = () => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const { geographic, subgeographics } = filters;

  const { data: geographicsData, isFetched: geographicsIsFetched } = useGeographics();
  const { data: subgeographicsData, isFetched: subgeographicsIsFetched } =
    useSubGeographics(geographic);

  const SELECTED_LIST = useMemo(() => {
    return subgeographicsData.filter((sg) => subgeographics.includes(sg.id));
  }, [subgeographicsData, subgeographics]);

  const SELECTED_TEXT = useMemo(() => {
    if (!SELECTED_LIST.length) {
      const geo = geographicsData.find((g) => g.id === geographic);
      return `${geo?.name}`;
    }

    const [first, ...rest] = SELECTED_LIST;

    if (!rest.length) return `${first.name}`;
    return `${first.name} +${rest.length}`;
  }, [SELECTED_LIST, geographicsData, geographic]);

  if (!geographicsIsFetched || !subgeographicsIsFetched) return null;

  return (
    <>
      {' '}
      from{' '}
      <Tooltip
        enabled={!!SELECTED_LIST.length}
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
                {SELECTED_LIST.map((subgeographic) => (
                  <li key={subgeographic.id}>{subgeographic.name}</li>
                ))}
              </ul>
            </div>
          </div>
        }
      >
        <span
          className={cx({
            'text-grey-0': true,
            'hover:underline cursor-pointer': SELECTED_LIST.length > 1,
          })}
        >
          {SELECTED_TEXT}
        </span>
      </Tooltip>
    </>
  );
};

export default GeographicsSentence;
