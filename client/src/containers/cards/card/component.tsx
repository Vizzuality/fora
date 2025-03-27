import React, { useMemo } from 'react';

import cx from 'classnames';

import Link from 'next/link';

import { Funder } from 'types/funder';
import { Project } from 'types/project';

import { useAreas } from 'hooks/areas';

import Icon from 'components/icon';

import LOCATION_SVG from 'svgs/ui/location.svg?sprite';

import { THEME } from './constants';

type T = Project & Funder;

export interface CardProps extends Partial<T> {
  href?: string;
  theme?: 'green' | 'grey';
}

const Cards = ({
  name,
  href = '',
  areas = ['area', 'area2', 'area3'],
  theme = 'grey',
  subgeographics,
}: CardProps) => {
  const { data: areasData } = useAreas();
  console.log({ areasData, areas });

  const FORMAT_LINK_TEXT = useMemo(() => {
    if (href.includes('project')) {
      return 'project';
    } else {
      return 'funder';
    }
  }, [href]);

  const AREAS_OF_FOCUS = useMemo(() => {
    const filteredAreas = areasData?.filter((c) => areas.includes(c.id));

    return filteredAreas.map((a) => a.name);
  }, [areas, areasData]);

  const ADDRESS = useMemo(() => {
    const subgeoTypes = ['states', 'national', 'countries', 'regions'];
    const filteredSubgeo = subgeographics.filter((s) => subgeoTypes.includes(s.geographic));

    return !!filteredSubgeo.length && filteredSubgeo[0].name;
  }, [subgeographics]);

  return (
    <div
      className={cx({
        'flex flex-col justify-between p-8': true,
        [THEME[theme]]: true,
      })}
    >
      <div className="space-y-5">
        <h3 className="font-display text-2xl line-clamp-3">{name}</h3>

        <div className="flex space-x-2 pb-4">
          <Icon
            icon={LOCATION_SVG}
            className={cx({
              'h-5 w-5 text-black': true,
            })}
          />
          <p className="line-clamp-3">{ADDRESS || '-'}</p>
        </div>
      </div>
      <div className="divide-y divide-grey-40/50 border-t border-grey-40/50">
        <div className="py-4 leading-snug">{AREAS_OF_FOCUS.join(' • ')}</div>

        <div className="pt-4">
          <Link href={href} className="font-semibold underline">
            {`Go to ${FORMAT_LINK_TEXT} page`}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
