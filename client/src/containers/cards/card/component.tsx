import React, { useMemo } from 'react';

import cx from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Icon from 'components/icon';

import LOCATION_SVG from 'svgs/ui/location.svg?sprite';

import { THEME } from './constants';
export interface CardProps {
  id?: string;
  name?: string;
  location?: string;
  href?: string;
  areas?: string[];
  theme?: 'green' | 'grey';
}

const Cards = ({
  name,
  location,
  href = '',
  areas = ['area', 'area2', 'area3'],
  theme = 'grey',
}: CardProps) => {
  const { pathname } = useRouter();

  const FORMAT_LINK_TEXT = useMemo(() => {
    if (pathname.includes('project')) {
      return 'project';
    } else {
      return 'funder';
    }
  }, [pathname]);

  return (
    <div
      className={cx({
        'flex flex-col justify-between p-8 space-y-10': true,
        [THEME[theme]]: true,
      })}
    >
      <div className="space-y-5">
        <h3 className="text-2xl font-display line-clamp-3">{name}</h3>

        <div className="flex space-x-2">
          <Icon
            icon={LOCATION_SVG}
            className={cx({
              'w-5 h-5 text-black': true,
            })}
          />
          <p className="line-clamp-3">{location || 'North Carolina'}</p>
        </div>
      </div>

      <div className="border-t divide-y divide-grey-40/50 border-grey-40/50">
        <div className="py-4">{areas.join(' • ')}</div>

        <div className="pt-4">
          <Link href={href}>
            <a className="font-semibold underline">{`Go to ${FORMAT_LINK_TEXT} page`}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
