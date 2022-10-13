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

const AreasSimilars = ({ type }: SimilarsSectionProps) => {
  const { pathname } = useRouter();
  // Projects
  const { data: projectsByArea } = useProjects({
    filters: { area: 'biodiversity' },
  });

  const RANDOM_PROJ_AREA = useMemo(() => {
    if (projectsByArea.length) {
      const shuffled = projectsByArea.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    }
  }, [projectsByArea]);

  // Funders
  const { data: fundersByArea } = useFunders({
    filters: { area: 'biodiversity' },
  });

  const RANDOM_FUND_AREA = useMemo(() => {
    if (fundersByArea.length) {
      const shuffled = fundersByArea.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    }
  }, [fundersByArea]);

  console.log('condition', projectsByArea.length || fundersByArea.length);
  console.log('projectsByArea', projectsByArea);
  console.log('fundersByArea', fundersByArea);
  return (
    <>
      {(projectsByArea.length || fundersByArea.length) && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold capitalize text-grey-20">By Area of Focus</div>
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
            <Cards data={RANDOM_PROJ_AREA} />
          ) : (
            <Cards data={RANDOM_FUND_AREA} />
          )}
        </div>
      )}
    </>
  );
};

export default AreasSimilars;
