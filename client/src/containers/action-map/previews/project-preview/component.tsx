import React, { useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { useAreas } from 'hooks/areas';
import { useDemographics } from 'hooks/demographics';
import { useProject } from 'hooks/projects';

import { SCOPES } from 'constants/scopes';

import InfoCard from 'containers/details/info-card';

import Button from 'components/button';
import Loading from 'components/loading';

const ProjectPreview = () => {
  const { projectSelected } = useAppSelector((state) => state['/action-map']);

  const { data: areasData } = useAreas();
  const { data: demographicsData } = useDemographics();
  const {
    data: projectData,
    isFetched: projectIsFetched,
    isFetching: projectIsFetching,
  } = useProject(projectSelected);

  const { id, description, name, funders = [] } = projectData;

  const GEOGRAPHIC_SCOPE = useMemo(() => {
    const projSubgeographics = funders.map((proj) => proj.subgeographics);
    const arraySubGeo = projSubgeographics?.flat().map((subg) => subg.name);
    return arraySubGeo;
  }, [funders]);

  const AREAS_OF_FOCUS = useMemo(() => {
    const funderAreas = funders.map((f) => f.areas);
    const arrayAreas = funderAreas?.flat().map((area) => area);

    return areasData.filter((c) => arrayAreas.includes(c.id));
  }, [areasData, funders]);

  const DEMOGRAPHIC_SCOPE = useMemo(() => {
    const projDemographics = funders.map((proj) => proj.demographics);
    const arrayDemogr = projDemographics?.flat().map((demogr) => demogr);

    return demographicsData.filter((c) => arrayDemogr.includes(c.id));
  }, [demographicsData, funders]);

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
            value: AREAS_OF_FOCUS.map((a) => a.name).join(' • '),
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
  }, [GEOGRAPHIC_SCOPE, AREAS_OF_FOCUS, DEMOGRAPHIC_SCOPE]);

  return (
    <>
      <Loading
        visible={projectIsFetching && !projectIsFetched}
        className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-white/75"
        iconClassName="w-10 h-10"
      />

      <div className="space-y-10 md:flex md:space-x-16 xl:space-x-32 md:space-y-0">
        <div className="w-full space-y-16">
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

          <Button href={`/projects/${id}`} type="button" size="base" theme="black">
            Go to Project Page
          </Button>
        </div>

        <div className="w-full">
          <InfoCard type="project" data={CARD_DATA} count={funders.length} />
        </div>
      </div>
    </>
  );
};

export default ProjectPreview;
