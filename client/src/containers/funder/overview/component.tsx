import React, { useMemo } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { usePlausible } from 'next-plausible';

import { useAreas } from 'hooks/areas';
import { useCapitalTypes } from 'hooks/capital-types';
import { useDemographics } from 'hooks/demographics';
import { useFunderLegalStatuses } from 'hooks/funder-legal-statuses';
import { useFunder } from 'hooks/funders';

import { SCOPES } from 'constants/scopes';

import InfoCard from 'containers/details/info-card';

import Button from 'components/button';

import Address from './address';
import Attributes from './attributes';

const FunderOverview = () => {
  const { query } = useRouter();
  const plausible = usePlausible();
  const { id: funderId } = query;

  const { data: areasData } = useAreas();
  const { data: capitalTypesData } = useCapitalTypes();
  const { data: demographicsData } = useDemographics();
  const { data: funderData } = useFunder(`${funderId}`);
  const { data: funderLegalStatusesData } = useFunderLegalStatuses();

  const {
    contact_email: email,
    description,
    logo,
    name,
    subgeographics,
    demographics,
    leadership_demographics: leadershipDemographics,
    funder_legal_status: funderLegalStatus,
    areas,
    projects,
    capital_types: capitalTypes,
  } = funderData;

  const GEOGRAPHIC_SCOPE = useMemo(() => {
    const arraySubGeo = subgeographics?.flat().map((subg) => subg.name);
    return arraySubGeo;
  }, [subgeographics]);

  const AREAS_OF_FOCUS = useMemo(() => {
    const arrayAreas = areas?.flat().map((area) => area);
    return areasData.filter((c) => arrayAreas.includes(c.id));
  }, [areas, areasData]);

  const DEMOGRAPHIC_SCOPE = useMemo(() => {
    const arrayDemogr = demographics?.flat().map((demogr) => demogr);

    return demographicsData.filter((c) => arrayDemogr.includes(c.id));
  }, [demographics, demographicsData]);

  const DEMOGRAPHIC_LEADERSHIP_SCOPE = useMemo(() => {
    const arrayDemogr = leadershipDemographics?.flat().map((demogr) => demogr);

    return demographicsData.filter((c) => arrayDemogr.includes(c.id));
  }, [demographicsData, leadershipDemographics]);

  const CAPITAL_TYPE = useMemo(() => {
    const arrayCapital = capitalTypes?.flat().map((capital) => capital);

    return capitalTypesData.filter((c) => arrayCapital.includes(c.id));
  }, [capitalTypes, capitalTypesData]);

  const FUNDER_LEGAL_STATUSES = useMemo(() => {
    return funderLegalStatusesData.filter((c) => funderLegalStatus.includes(c.id));
  }, [funderLegalStatus, funderLegalStatusesData]);

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
            value: FUNDER_LEGAL_STATUSES.map((d) => d.name).join(', '),
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
    FUNDER_LEGAL_STATUSES,
  ]);

  return (
    <div className="flex space-x-32">
      <div className="flex-1 space-y-9">
        <div className="space-y-1">
          <div className="text-base font-normal text-grey-20">Last updated: 30 March 2022</div>
          <h2 className="text-3xl font-normal capitalize line-clamp-2 text-ellipsis">{name}</h2>
        </div>

        {(logo.small || email) && (
          <div className="flex justify-between">
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

            {email && (
              <Button
                type="button"
                size="base"
                theme="black-alt"
                href={`mailto:${email}?subject=Hi ${name}`}
                onClick={() => {
                  plausible('Profile - Contact funder', {
                    props: {
                      funderName: name,
                    },
                  });
                }}
              >
                Contact Funder
              </Button>
            )}
          </div>
        )}

        <Address />

        <Attributes />

        <div className="space-y-3">
          <p className="font-semibold uppercase text-grey-20">About</p>
          <p className="text-xl">{description}</p>
        </div>
      </div>
      <div className="flex-1">
        <InfoCard type="funder" data={CARD_DATA} count={projects.length} />
      </div>
    </div>
  );
};

export default FunderOverview;
