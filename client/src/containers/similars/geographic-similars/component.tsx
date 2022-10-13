import React, { useMemo } from 'react';

import cx from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useFunders } from 'hooks/funders';
import { useProjects } from 'hooks/projects';

import Cards from 'containers/cards';

import Icon from 'components/icon';

import CHEVRON_RIGHT_SVG from 'svgs/ui/chevron-right.svg?sprite';

import type { SimilarsSectionProps } from '../component';

const SimilarsItem = ({ type }: SimilarsSectionProps) => {
  const { pathname } = useRouter();

  // Projects
  const { data: projectsBySubgeogprahics } = useProjects({
    filters: { subgeographics: 'USA' },
  });

  const RANDOM_PROJ_GEOGR = useMemo(() => {
    if (projectsBySubgeogprahics.length) {
      const shuffled = projectsBySubgeogprahics.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    }
  }, [projectsBySubgeogprahics]);

  // Funders
  const { data: fundersBySubgeogprahics } = useFunders({
    filters: { subgeographics: 'USA' },
  });

  const RANDOM_FUND_GEOGR = useMemo(() => {
    if (fundersBySubgeogprahics.length) {
      const shuffled = fundersBySubgeogprahics.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    }
  }, [fundersBySubgeogprahics]);

  return (
    <>
      {(projectsBySubgeogprahics.length || fundersBySubgeogprahics.length) && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold capitalize text-grey-20">By Geographic Scope</div>
            <div>
              <Link href={`${pathname}`}>
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

          {type === 'projects' ? (
            <Cards data={RANDOM_PROJ_GEOGR} />
          ) : (
            <Cards data={RANDOM_FUND_GEOGR} />
          )}
        </div>
      )}
    </>
  );
};

export default SimilarsItem;
