import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useProject } from 'hooks/projects';

import InfoCard from 'containers/funder/info-card';

import Button from 'components/button';

const PROJECT_CARD_INFO = [
  {
    id: 'geographic-scope',
    title: 'Geographic Scope',
    info: 'EarthShare delivers the tools that businesses, individuals, and nonprofits need.',
    description: 'Southeast',
  },
  {
    id: 'area-of-focus',
    title: 'Area of Focus',
    info: 'EarthShare delivers the tools that businesses, individuals, and nonprofits need.',
    description: 'Invite only',
  },
  {
    id: 'demographic-scope',
    title: 'Demographic Scope',
    info: 'EarthShare delivers the tools that businesses, individuals, and nonprofits need.',
    description: 'Donations Accepted',
  },
  {
    id: 'demographic-leadership',
    title: 'Demographic Leadership',
    info: 'EarthShare delivers the tools that businesses, individuals, and nonprofits need.',
    description: 'Grant',
  },
];

const OverviewProject = () => {
  const { query } = useRouter();
  const { id: projectId } = query;
  const { data: projectData } = useProject(projectId);

  return (
    <div className="flex space-x-32">
      <div className="flex-1 space-y-9">
        <div className="space-y-1">
          <div className="text-base font-normal text-grey-20">Last updated: 30 March 2022</div>
          <h2 className="text-3xl font-normal capitalize line-clamp-2 text-ellipsis">
            {projectData.title}
          </h2>
        </div>

        <div className="flex justify-between">
          <div className="max-w-[50px]">
            <Image
              src="/images/avatar.png"
              alt={projectData.title}
              layout="responsive"
              width={50}
              height={50}
            />
          </div>
          <Button type="button" size="base" theme="black-alt">
            Contact Funder
          </Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-base font-semibold uppercase text-grey-20">Headquarters Adress</p>
            <p>Washington, DC, United States</p>
          </div>

          <p className="font-semibold underline">
            <a href="www.funderwebsite.org">www.funderwebsite.org</a>
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-semibold uppercase text-grey-20">About</p>
          <p className="text-xl">
            EarthShare delivers the tools that businesses, individuals, and nonprofits need to
            maximize impact. Their all-in-one platform connects businesses, individuals, and
            nonprofits with donation, volunteer, and carbon offsetting opportunities that directly
            support today’s most important environmental efforts.
          </p>
        </div>
      </div>
      <div className="flex-1">
        <InfoCard data={PROJECT_CARD_INFO} />
      </div>
    </div>
  );
};

export default OverviewProject;
