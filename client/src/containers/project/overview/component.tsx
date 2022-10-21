import React, { useMemo } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useAreas } from 'hooks/areas';
import { useDemographics } from 'hooks/demographics';
import { useProject } from 'hooks/projects';

import InfoCard from 'containers/details/info-card';

import { FUNDED_CARD_INFO } from './constants';

const ProjectOverview = () => {
  const { query } = useRouter();
  const { id: projectId } = query;

  const { data: areasData } = useAreas();
  const { data: demographicsData } = useDemographics();
  const { data: projectData } = useProject(`${projectId}`);

  const { funders } = projectData;

  const GEOGRPAHIC_SCOPE = useMemo(() => {
    const projSubgeographics = funders.map((proj) => proj.subgeographics);
    const arraySubGeo = projSubgeographics?.flat().map((subg) => subg.name);
    return arraySubGeo;
  }, [funders]);

  const DEMOGRAPHIC_SCOPE = useMemo(() => {
    const projDemographics = funders.map((proj) => proj.demographics);
    const arrayDemogr = projDemographics?.flat().map((demogr) => demogr);

    return demographicsData.filter((c) => arrayDemogr.includes(c.id));
  }, [demographicsData, funders]);

  const AREAS_OF_FOCUS = useMemo(() => {
    const projAreas = funders.map((proj) => proj.areas);
    const arrayAreas = projAreas?.flat().map((area) => area);

    return areasData.filter((c) => arrayAreas.includes(c.id));
  }, [areasData, funders]);

  // TO_DO: demograpgic leadership
  const CARD_DATA = useMemo(() => {
    return FUNDED_CARD_INFO.map((attr) => {
      switch (attr.id) {
        case 'geogpraphic-scope':
          return {
            ...attr,
            value: GEOGRPAHIC_SCOPE.join(', '),
          };
        case 'area-of-focus':
          return {
            ...attr,
            value: AREAS_OF_FOCUS.map((a) => a.name).join(' • '),
          };
        case 'demopgraphic-scope':
          return {
            ...attr,
            value: DEMOGRAPHIC_SCOPE.map((d) => d.name).join(', '),
          };
        case 'demographic-leadership':
          return {
            ...attr,
            value: DEMOGRAPHIC_SCOPE.map((d) => d.name).join(', '),
          };
        default:
          return attr;
      }
    });
  }, [GEOGRPAHIC_SCOPE, AREAS_OF_FOCUS, DEMOGRAPHIC_SCOPE]);

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
        <InfoCard data={CARD_DATA} count={funders.length} />
      </div>
    </div>
  );
};

export default ProjectOverview;
