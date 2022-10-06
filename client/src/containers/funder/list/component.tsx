import React, { useMemo } from 'react';

import cx from 'classnames';

import Link from 'next/link';

import { useProjectsInfinity } from 'hooks/projects';

import Cards from 'containers/cards';

import Button from 'components/button';
import Icon from 'components/icon';

import CHEVRON_RIGHT_SVG from 'svgs/ui/chevron-right.svg?sprite';

const FundersList = () => {
  const { data: projectsData } = useProjectsInfinity();

  const randomFunders = useMemo(() => {
    const shuffled = projectsData.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [projectsData]);

  return (
    <div className="space-y-20">
      <div className="space-y-9">
        <h3 className="text-2xl font-display"> What projects is funding?</h3>

        <Cards theme="green" data={randomFunders} />

        <div className="flex justify-between">
          <Button type="button" theme="black-alt" size="xl">
            Load more
          </Button>
        </div>
      </div>

      <div className="space-y-9">
        <h3 className="text-2xl font-display"> What are the similar funders?</h3>

        <div className="space-y-3">
          <div className="font-semibold capitalize text-grey-20">By Geographic Scope</div>

          <div>
            <Link href="/funders">
              <a className="flex items-center space-x-3 font-semibold underline decoration-1">
                <span>View all similar funders</span>
                <Icon
                  icon={CHEVRON_RIGHT_SVG}
                  className={cx({
                    'w-2 h-2 text-grey-0': true,
                  })}
                />
              </a>
            </Link>
          </div>

          <Cards data={randomFunders} />
        </div>

        <div className="space-y-3">
          <div className="font-semibold capitalize text-grey-20">By Area of Focus</div>

          <div>
            <Link href="/funders">
              <a className="flex items-center space-x-3 font-semibold underline decoration-1">
                <span>View all similar funders</span>
                <Icon
                  icon={CHEVRON_RIGHT_SVG}
                  className={cx({
                    'w-2 h-2 text-grey-0': true,
                  })}
                />
              </a>
            </Link>
          </div>

          <Cards data={randomFunders} />
        </div>

        <div className="space-y-3">
          <div className="font-semibold capitalize text-grey-20">By Demographic Scope</div>

          <div>
            <Link href="/funders">
              <a className="flex items-center space-x-3 font-semibold underline decoration-1">
                <span>View all similar funders</span>
                <Icon
                  icon={CHEVRON_RIGHT_SVG}
                  className={cx({
                    'w-2 h-2 text-grey-0': true,
                  })}
                />
              </a>
            </Link>
          </div>

          <Cards data={randomFunders} />
        </div>
      </div>
    </div>
  );
};

export default FundersList;
