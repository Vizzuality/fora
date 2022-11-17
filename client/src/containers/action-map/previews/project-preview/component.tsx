import React, { useMemo } from 'react';

import { useDemographics } from 'hooks/demographics';
import { useProject } from 'hooks/projects';

import InfoCard from 'containers/details/info-card';

import Button from 'components/button';
import Loading from 'components/loading';

import { PROJECT_CARD_INFO } from './constants';
import type { ProjectPreviewProps } from './types';

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ id, onClick }) => {
  const { data: demographicsData } = useDemographics();
  const {
    data: projectData,
    isFetched: projectIsFetched,
    isFetching: projectIsFetching,
  } = useProject(id);

  const { description, name, funders = [] } = projectData;

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

  // TO_DO: demograpgic leadership & areas of focus
  const CARD_DATA = useMemo(() => {
    return PROJECT_CARD_INFO.map((attr) => {
      switch (attr.id) {
        case 'geogpraphic-scope':
          return {
            ...attr,
            value: GEOGRPAHIC_SCOPE.join(', '),
          };
        case 'demographic-scope':
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
  }, [GEOGRPAHIC_SCOPE, DEMOGRAPHIC_SCOPE]);

  return (
    <>
      <Loading
        visible={projectIsFetching && !projectIsFetched}
        className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-white/75"
        iconClassName="w-10 h-10"
      />

      <div className="flex pt-8 space-x-32">
        <div className="space-y-16">
          <div className="space-y-9">
            <div className="space-y-1">
              <div className="text-base font-normal text-grey-20">Last updated: 30 March 2022</div>
              <h2 className="text-3xl font-normal capitalize line-clamp-2 text-ellipsis">{name}</h2>
            </div>

            <div className="space-y-3">
              <p className="font-semibold uppercase text-grey-20">About</p>
              <p className="text-xl">{description}</p>
            </div>
          </div>

          <Button type="button" size="base" theme="black" onClick={onClick}>
            Go to Project Page
          </Button>
        </div>

        <InfoCard data={CARD_DATA} count={funders.length} />
      </div>
    </>
  );
};

export default ProjectPreview;
