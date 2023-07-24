import React, { useMemo } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useAreas } from 'hooks/areas';
import { useCapitalTypes } from 'hooks/capital-types';
import { useDemographics } from 'hooks/demographics';
import { useProjectLegalStatuses } from 'hooks/project-legal-statuses';
import { useProject } from 'hooks/projects';

import { SCOPES } from 'constants/scopes';

import InfoCard from 'containers/details/info-card';

const ProjectOverview = () => {
  const { query } = useRouter();
  const { id: projectId } = query;

  const { data: areasData } = useAreas();
  const { data: capitalTypesData } = useCapitalTypes();
  const { data: demographicsData } = useDemographics();
  const { data: projectData } = useProject(`${projectId}`);
  const { data: projectLegalStatusesData } = useProjectLegalStatuses();

  const {
    description,
    logo,
    name,
    website,
    subgeographics,
    demographics,
    capital_types: capitalTypes,
    leadership_demographics: leadershipDemographics,
    recipient_legal_status: projectLegalStatus,
    funders,
    areas,
  } = projectData;

  const GEOGRAPHIC_SCOPE = useMemo(() => {
    const arraySubGeo = subgeographics?.flat().map((subg) => subg.name);
    return arraySubGeo;
  }, [subgeographics]);

  const DEMOGRAPHIC_SCOPE = useMemo(() => {
    const arrayDemogr = demographics?.flat().map((demogr) => demogr);

    return demographicsData.filter((c) => arrayDemogr.includes(c.id));
  }, [demographics, demographicsData]);

  const DEMOGRAPHIC_LEADERSHIP_SCOPE = useMemo(() => {
    const arrayDemogr = leadershipDemographics?.flat().map((demogr) => demogr);

    return demographicsData.filter((c) => arrayDemogr.includes(c.id));
  }, [demographicsData, leadershipDemographics]);

  const AREAS_OF_FOCUS = useMemo(() => {
    const arrayAreas = areas?.flat().map((area) => area);

    return areasData.filter((c) => arrayAreas.includes(c.id));
  }, [areas, areasData]);

  const CAPITAL_TYPE = useMemo(() => {
    const arrayCapital = capitalTypes?.flat().map((capital) => capital);

    return capitalTypesData.filter((c) => arrayCapital.includes(c.id));
  }, [capitalTypes, capitalTypesData]);

  const PROJECT_LEGAL_STATUSES = useMemo(() => {
    return projectLegalStatusesData.filter((c) => projectLegalStatus.includes(c.id));
  }, [projectLegalStatus, projectLegalStatusesData]);

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
            value: DEMOGRAPHIC_LEADERSHIP_SCOPE.map((d) => d.name).join(', '),
          };
        case 'capital-type':
          return {
            ...attr,
            value: CAPITAL_TYPE.map((d) => d.name).join(', '),
          };
        case 'legal-status':
          return {
            ...attr,
            value: PROJECT_LEGAL_STATUSES.map((d) => d.name).join(', '),
          };
        default:
          return attr;
      }
    });
  }, [
    GEOGRAPHIC_SCOPE,
    AREAS_OF_FOCUS,
    DEMOGRAPHIC_SCOPE,
    DEMOGRAPHIC_LEADERSHIP_SCOPE,
    CAPITAL_TYPE,
    PROJECT_LEGAL_STATUSES,
  ]);

  return (
    <div className="flex space-x-32">
      <div className="flex-1 space-y-14">
        <div className="space-y-1">
          <div className="text-base font-normal text-grey-20">Last updated: 30 March 2022</div>
          <h2 className="text-3xl font-normal capitalize line-clamp-2 text-ellipsis">{name}</h2>
        </div>

        {(logo.small || website) && (
          <div className="flex items-center justify-between">
            {logo.small && (
              <div className="relative max-w-[100px] w-full shrink-0">
                <Image
                  src={logo.small || '/images/avatar.jpg'}
                  alt={name}
                  layout="fill"
                  className="object-contain"
                />
              </div>
            )}

            {website && (
              <p className="font-semibold underline">
                <a target="_blank" rel="noopener noreferrer" href={website}>
                  {website}
                </a>
              </p>
            )}
          </div>
        )}

        <div className="space-y-3">
          <p className="font-semibold uppercase text-grey-20">About</p>
          <p className="text-xl">{description}</p>
        </div>

        <div className="space-y-3">
          <p className="font-semibold uppercase text-grey-20">Data Source</p>
          <p className="text-xl">
            FORA members have provided the project information displayed on this page. Please{' '}
            <a
              className="font-semibold text-black underline"
              href="https://forainitiative.org/contact/"
              target="_blank"
              rel="noopener noreferrer"
            >
              get in touch with FORA
            </a>{' '}
            to suggest any data editions.
          </p>
        </div>
      </div>
      <div className="flex-1">
        <InfoCard type="project" data={CARD_DATA} count={funders.length} />
      </div>
    </div>
  );
};

export default ProjectOverview;
