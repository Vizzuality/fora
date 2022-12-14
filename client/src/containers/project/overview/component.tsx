import React, { useMemo } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useAreas } from 'hooks/areas';
import { useDemographics } from 'hooks/demographics';
import { useProject } from 'hooks/projects';

import { SCOPES } from 'constants/scopes';

import InfoCard from 'containers/details/info-card';

const ProjectOverview = () => {
  const { query } = useRouter();
  const { id: projectId } = query;

  const { data: areasData } = useAreas();
  const { data: demographicsData } = useDemographics();
  const { data: projectData } = useProject(`${projectId}`);

  const { funders } = projectData;

  const GEOGRAPHIC_SCOPE = useMemo(() => {
    const funderSubgeographics = funders.map((f) => f.subgeographics);
    const arraySubGeo = funderSubgeographics?.flat().map((subg) => subg.name);
    return arraySubGeo;
  }, [funders]);

  const DEMOGRAPHIC_SCOPE = useMemo(() => {
    const funderDemographics = funders.map((f) => f.demographics);
    const arrayDemogr = funderDemographics?.flat().map((demogr) => demogr);

    return demographicsData.filter((c) => arrayDemogr.includes(c.id));
  }, [demographicsData, funders]);

  const DEMOGRAPHIC_LEADERSHIP_SCOPE = useMemo(() => {
    const funderDemographics = funders.map((f) => f.leadership_demographics);
    const arrayDemogr = funderDemographics?.flat().map((demogr) => demogr);

    return demographicsData.filter((c) => arrayDemogr.includes(c.id));
  }, [demographicsData, funders]);

  const AREAS_OF_FOCUS = useMemo(() => {
    const funderAreas = funders.map((f) => f.areas);
    const arrayAreas = funderAreas?.flat().map((area) => area);

    return areasData.filter((c) => arrayAreas.includes(c.id));
  }, [areasData, funders]);

  // TO_DO: demograpgic leadership
  const CARD_DATA = useMemo(() => {
    return SCOPES.map((attr) => {
      switch (attr.id) {
        case 'geographic-scope':
          return {
            ...attr,
            value: GEOGRAPHIC_SCOPE.join(', '),
          };
        case 'area-of-focus':
          return {
            ...attr,
            value: AREAS_OF_FOCUS.map((a) => a.name).join(' ??? '),
          };
        case 'demographic-scope':
          return {
            ...attr,
            value: DEMOGRAPHIC_SCOPE.map((d) => d.name).join(', '),
          };
        case 'demographic-leadership':
          return {
            ...attr,
            value: DEMOGRAPHIC_LEADERSHIP_SCOPE.map((d) => d.name).join(', '),
          };
        default:
          return attr;
      }
    });
  }, [GEOGRAPHIC_SCOPE, AREAS_OF_FOCUS, DEMOGRAPHIC_SCOPE, DEMOGRAPHIC_LEADERSHIP_SCOPE]);

  return (
    <div className="flex space-x-32">
      <div className="flex-1 space-y-14">
        <div className="space-y-1">
          <div className="text-base font-normal text-grey-20">Last updated: 30 March 2022</div>
          <h2 className="text-3xl font-normal capitalize line-clamp-2 text-ellipsis">
            {projectData.name}
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative max-w-[50px] w-full shrink-0">
            <Image
              src={projectData.logo.small || '/images/avatar.jpg'}
              alt={projectData.name}
              layout="responsive"
              width={50}
              height={36}
            />
          </div>
          <p className="font-semibold underline">
            <a href="www.projectwebsite.org">{projectData.website}</a>
          </p>
        </div>

        <div className="space-y-3">
          <p className="font-semibold uppercase text-grey-20">About</p>
          <p className="text-xl">{projectData.description}</p>
        </div>
      </div>
      <div className="flex-1">
        <InfoCard type="project" data={CARD_DATA} count={funders.length} />
      </div>
    </div>
  );
};

export default ProjectOverview;
