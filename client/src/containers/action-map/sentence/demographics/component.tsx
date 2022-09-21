import React, { useMemo } from 'react';

import cx from 'classnames';

import { useAppSelector } from 'store/hooks';

import { useDemographics } from 'hooks/demographics';

import Tooltip from 'components/tooltip';

const DemographicsSentence = () => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const { demographics } = filters;

  const { data: demographicsData, isFetched: demographicsIsFetched } = useDemographics();

  const SELECTED_LIST = useMemo(() => {
    return demographicsData.filter((demographic) => demographics.includes(demographic.id));
  }, [demographicsData, demographics]);

  const SELECTED_TEXT = useMemo(() => {
    if (!SELECTED_LIST.length) return null;
    const [first, ...rest] = SELECTED_LIST;

    if (!rest.length) return `${first.name}`;
    return `${first.name} +${rest.length}`;
  }, [SELECTED_LIST]);

  if (!demographics.length || !demographicsIsFetched) return null;

  return (
    <>
      {' '}
      focused in{' '}
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
                {SELECTED_LIST.map((demographic) => (
                  <li key={demographic.id}>{demographic.name}</li>
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

export default DemographicsSentence;
