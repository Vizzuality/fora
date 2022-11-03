import React, { useMemo } from 'react';

import cx from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAreas } from 'hooks/areas';

import Icon from 'components/icon';
import { Funder } from 'types/funder';
import { Project } from 'types/project';

import LOCATION_SVG from 'svgs/ui/location.svg?sprite';

import { THEME } from './constants';
type T = Project & Funder;
export interface CardProps extends Partial<T> {
  key?: string;
  href?: string;
  theme?: 'green' | 'grey';
}

const Cards = ({
  key,
  name,
  href = '',
  areas = ['area', 'area2', 'area3'],
  theme = 'grey',
  subgeographics,
}: CardProps) => {
  const { pathname } = useRouter();
  const { data: areasData } = useAreas();

  const FORMAT_LINK_TEXT = useMemo(() => {
    if (pathname.includes('project')) {
      return 'project';
    } else {
      return 'funder';
    }
  }, [pathname]);

  const AREAS_OF_FOCUS = useMemo(() => {
    const filteredAreas = areasData.filter((c) => areas.includes(c.id));

    return filteredAreas.map((a) => a.name);
  }, [areas, areasData]);

  const ADDRESS = useMemo(() => {
    const subgeoTypes = ['states', 'national', 'countries', 'regions'];
    const filteredSubgeo = subgeographics.filter((s) => subgeoTypes.includes(s.geographic));
    return filteredSubgeo[0].name;
  }, [subgeographics]);

  return (
    <div
      className={cx({
        'flex flex-col justify-between p-8': true,
        [THEME[theme]]: true,
      })}
      id={key}
    >
      <div className="space-y-5">
        <h3 className="text-2xl font-display line-clamp-3">{name}</h3>

        <div className="flex pb-4 space-x-2">
          <Icon
            icon={LOCATION_SVG}
            className={cx({
              'w-5 h-5 text-black': true,
            })}
          />
          <p className="line-clamp-3">{ADDRESS || 'North Carolina'}</p>
        </div>
      </div>

      <div className="border-t divide-y divide-grey-40/50 border-grey-40/50">
        <div className="py-4">{AREAS_OF_FOCUS.join(' • ')}</div>

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
