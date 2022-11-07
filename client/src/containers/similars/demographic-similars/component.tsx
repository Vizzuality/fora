import React, { useMemo } from 'react';

import cx from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Funder } from 'types/funder';
import { Project } from 'types/project';

import { useFunder, useFunders } from 'hooks/funders';
import { useProject, useProjects } from 'hooks/projects';

import Cards from 'containers/cards';

import Icon from 'components/icon';

import CHEVRON_RIGHT_SVG from 'svgs/ui/chevron-right.svg?sprite';

import type { SimilarsSectionProps } from '../component';

const DemographicSimilars = ({ type }: SimilarsSectionProps) => {
  const { query } = useRouter();
  const { id } = query;

  // Funders
  const { data: funderData } = useFunder(`${id}`, {
    enabled: !!id && type === 'funders',
  });
  const { data: projectData } = useProject(`${id}`, {
    enabled: !!id && type === 'projects',
  });

  const DATA = useMemo(() => {
    const data = {
      funders: funderData,
      projects: projectData,
    };

    return data[type];
  }, [type, funderData, projectData]);

  const { demographics } = DATA;

  // Funders
  const { data: fundersData } = useFunders(
    {
      filters: { demographics },
      includes: 'subgeographic_ancestors',
    },
    { enabled: !!id && type === 'funders' }
  );

  // Projects
  const { data: projectsData } = useProjects(
    {
      filters: { demographics },
      includes: 'subgeographic_ancestors',
    },
    { enabled: !!id && type === 'projects' }
  );

  const RANDOM_SORT = useMemo(() => {
    return Math.random();
  }, []);

  const DATA_BY_DEMOGRAPHIC = useMemo(() => {
    const data = {
      funders: fundersData,
      projects: projectsData,
    };

    const d: Array<Funder | Project> = data[type];

    const relevant = d.filter((f) => f.id !== id);
    const shuffled = relevant.sort(() => 0.5 - RANDOM_SORT);
    return shuffled.slice(0, 3);
  }, [id, type, fundersData, projectsData, RANDOM_SORT]);

  return (
    <>
      {!!DATA_BY_DEMOGRAPHIC.length && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold capitalize text-grey-20">By Demographic Scope</div>
            <div>
              <Link href={`/${type}?demographics[]=${demographics.join(',')}`}>
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

          <Cards pathname={`/${type}`} data={DATA_BY_DEMOGRAPHIC} />
        </div>
      )}
    </>
  );
};

export default DemographicSimilars;
