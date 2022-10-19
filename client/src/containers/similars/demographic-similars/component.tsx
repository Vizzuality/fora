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

const DemographicSimilars = ({ type }: SimilarsSectionProps) => {
  const { pathname } = useRouter();

  // Projects
  const { data: projectsByDemogprahics } = useProjects({
    filters: { demographics: 'women' },
  });

  const RANDOM_PROJ_DEMOGR = useMemo(() => {
    if (projectsByDemogprahics.length) {
      const shuffled = projectsByDemogprahics.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    }
  }, [projectsByDemogprahics]);

  // Funders
  const { data: fundersByDemogprahics } = useFunders({
    filters: { demographics: 'women' },
  });

  const RANDOM_FUND_DEMOGR = useMemo(() => {
    if (fundersByDemogprahics.length) {
      const shuffled = fundersByDemogprahics.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    }
  }, [fundersByDemogprahics]);

  const data = useMemo(() => {
    if (type === 'funders') {
      return RANDOM_FUND_DEMOGR;
    } else {
      return RANDOM_PROJ_DEMOGR;
    }
  }, [RANDOM_FUND_DEMOGR, RANDOM_PROJ_DEMOGR, type]);

  return (
    <>
      {(projectsByDemogprahics.length || fundersByDemogprahics.length) && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold capitalize text-grey-20">By Demographic Scope</div>
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

          <Cards data={data} />
        </div>
      )}
    </>
  );
};

export default DemographicSimilars;
