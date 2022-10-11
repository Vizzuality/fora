import React, { useMemo } from 'react';

import cx from 'classnames';

import Link from 'next/link';

import { useProjects } from 'hooks/projects';

import Cards from 'containers/cards';

import Icon from 'components/icon';

import CHEVRON_RIGHT_SVG from 'svgs/ui/chevron-right.svg?sprite';

import type { SimilarsSectionProps } from '../component';

const SimilarsItem = ({ type }: SimilarsSectionProps) => {
  // Geographic Scope
  const { data: projectsBySubgeogprahics } = useProjects({
    filters: { subgeographics: 'USA' },
  });

  const RANDOM_PROJ_GEOGR = useMemo(() => {
    if (projectsBySubgeogprahics.length) {
      const shuffled = projectsBySubgeogprahics.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    }
  }, [projectsBySubgeogprahics]);

  // Area of Focus
  const { data: projectsByArea } = useProjects({
    filters: { area: 'biodiversity' },
  });

  const RANDOM_PROJ_AREA = useMemo(() => {
    if (projectsBySubgeogprahics.length) {
      const shuffled = projectsBySubgeogprahics.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    }
  }, [projectsBySubgeogprahics]);

  // Demographic Scope
  const { data: projectsByDemogprahics } = useProjects({
    filters: { demographics: 'women' },
  });

  const RANDOM_PROJ_DEMOGR = useMemo(() => {
    if (projectsBySubgeogprahics.length) {
      const shuffled = projectsBySubgeogprahics.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    }
  }, [projectsBySubgeogprahics]);

  return (
    <>
      {projectsBySubgeogprahics.length && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold capitalize text-grey-20">By Geographic Scope</div>
            <div>
              <Link href="/action-map">
                <a className="flex items-center space-x-3 font-semibold underline decoration-1">
                  <span>{`View all similar ${type}`}</span>
                  <Icon
                    icon={CHEVRON_RIGHT_SVG}
                    className={cx({
                      'w-2 h-2 text-grey-0': true,
                    })}
                  />
                </a>
              </Link>
            </div>
          </div>

          <Cards data={RANDOM_PROJ_GEOGR} />
        </div>
      )}

      {projectsByArea.length && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold capitalize text-grey-20">By Area of Focus</div>
            <div>
              <Link href="/action-map">
                <a className="flex items-center space-x-3 font-semibold underline decoration-1">
                  <span>{`View all similar ${type}`}</span>
                  <Icon
                    icon={CHEVRON_RIGHT_SVG}
                    className={cx({
                      'w-2 h-2 text-grey-0': true,
                    })}
                  />
                </a>
              </Link>
            </div>
          </div>

          <Cards data={RANDOM_PROJ_AREA} />
        </div>
      )}

      {projectsByDemogprahics.length && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold capitalize text-grey-20">By Demographic Scope</div>
            <div>
              <Link href="/action-map">
                <a className="flex items-center space-x-3 font-semibold underline decoration-1">
                  <span>{`View all similar ${type}`}</span>
                  <Icon
                    icon={CHEVRON_RIGHT_SVG}
                    className={cx({
                      'w-2 h-2 text-grey-0': true,
                    })}
                  />
                </a>
              </Link>
            </div>
          </div>

          <Cards data={RANDOM_PROJ_DEMOGR} />
        </div>
      )}
    </>
  );
};

export default SimilarsItem;
