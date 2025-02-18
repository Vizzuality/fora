import React, { useMemo } from 'react';

import cx from 'classnames';

import Link from 'next/link';

import { Funder } from 'types/funder';
import { Project } from 'types/project';

import { useAreas } from 'hooks/areas';

import Icon from 'components/icon';

import LOCATION_SVG from 'svgs/ui/location.svg?sprite';

import { THEME } from '../card/constants';

type T = Project & Funder;
export interface CardProps extends Partial<T> {
  href?: string;
  theme?: 'green' | 'grey';
}

const ProjectCard = ({
  name,
  href = '',
  areas = ['area', 'area2', 'area3'],
  theme = 'grey',
  subgeographics,
}: CardProps) => {
  const { data: areasData } = useAreas();

  const AREAS_OF_FOCUS = useMemo(() => {
    const filteredAreas = areasData.filter((c) => areas.includes(c.id));

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
        <h3 className="text-2xl font-display line-clamp-3">{name}</h3>

        <div className="flex pb-4 space-x-2">
          <Icon
            icon={LOCATION_SVG}
            className={cx({
              'w-5 h-5 text-black': true,
            })}
          />
          <p className="line-clamp-3">{ADDRESS || '-'}</p>
        </div>
      </div>
      <div className="border-t divide-y divide-grey-40/50 border-grey-40/50">
        <div className="py-4 leading-snug">{AREAS_OF_FOCUS.join(' • ')}</div>

        <div className="pt-4">
          <Link href={href} className="font-semibold ">
            <button className="mt-4 py-2 px-4 text-sm bg-green-80 border border-gray-300 rounded-md text-green-700 hover:bg-gray-100 w-1/2 lg:w-1/3 ">
              Edit details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
