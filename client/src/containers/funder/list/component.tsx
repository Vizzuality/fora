import React from 'react';

import cx from 'classnames';

import Link from 'next/link';

import { useProjectsInfinity } from 'hooks/projects';

import Cards from 'containers/cards';

import Icon from 'components/icon';

import CHEVRON_RIGHT_SVG from 'svgs/ui/chevron-right.svg?sprite';

const FundersList = () => {
  const { data: projectsData } = useProjectsInfinity();

  return (
    <div className="space-y-20">
      <div className="space-y-9">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-display"> What is happening?</h3>
          <div>
            <Link href="/projects">
              <a className="flex items-center space-x-3 font-semibold underline decoration-1">
                <span>View all projects</span>
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
        <Cards data={projectsData} />
      </div>

      <div className="space-y-9">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-display"> What are the similar funders?</h3>
          <div>
            <Link href="/funders">
              <a className="flex items-center space-x-3 font-semibold underline decoration-1">
                <span>View all funders</span>
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

        <div className="space-y-3">
          <div className="font-semibold capitalize text-grey-20">By Geographic Scope</div>
          <Cards data={projectsData} />
        </div>

        <div className="space-y-3">
          <div className="font-semibold capitalize text-grey-20">By Area of Focus</div>
          <Cards data={projectsData} />
        </div>
      </div>
    </div>
  );
};

export default FundersList;
