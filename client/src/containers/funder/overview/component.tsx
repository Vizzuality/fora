import React, { useMemo } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useAreas } from 'hooks/areas';
import { useCapitalTypes } from 'hooks/capital-types';
import { useDemographics } from 'hooks/demographics';
import { useFunderLegalStatuses } from 'hooks/funder-legal-statuses';
import { useFunder } from 'hooks/funders';

import InfoCard from 'containers/details/info-card';

import Button from 'components/button';

import Address from './address';
import Attributes from './attributes';
import { PROJECT_CARD_INFO } from './constants';

const FunderOverview = () => {
  const { query } = useRouter();
  const { id: funderId } = query;

  const { data: areasData } = useAreas();
  const { data: capitalTypesData } = useCapitalTypes();
  const { data: demographicsData } = useDemographics();
  const { data: funderData } = useFunder(`${funderId}`);
  const { data: funderLegalStatusesData } = useFunderLegalStatuses();

  const {
    areas,
    contact_email: email,
    capital_types: capitalTypeIds,
    demographics,
    description,
    funder_legal_status: legalStatus,
    logo,
    name,
    projects,
    subgeographics,
  } = funderData;

  const AREAS = useMemo(() => {
    return areasData.filter((a) => areas.includes(a.id));
  }, [areas, areasData]);

  const CAPITAL_TYPES = useMemo(() => {
    return capitalTypesData.filter((c) => capitalTypeIds.includes(c.id));
  }, [capitalTypeIds, capitalTypesData]);

  const DEMOGRAPHIC_SCOPE = useMemo(() => {
    return demographicsData.filter((d) => demographics.includes(d.id));
  }, [demographics, demographicsData]);

  const LEGAL_STATUS = useMemo(() => {
    return funderLegalStatusesData.find((ls) => ls.id === legalStatus);
  }, [funderLegalStatusesData, legalStatus]);

  // TO_DO: demograpgic leadership
  const CARD_DATA = useMemo(() => {
    return PROJECT_CARD_INFO.map((attr) => {
      switch (attr.id) {
        case 'geogpraphic-scope':
          return {
            ...attr,
            value: subgeographics.map((c) => c.name).join(', '),
          };
        case 'area-of-focus':
          return {
            ...attr,
            value: AREAS.map((a) => a.name).join(', '),
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
        case 'legal-status':
          return {
            ...attr,
            value: LEGAL_STATUS?.name,
          };
        case 'capital_types':
          return {
            ...attr,
            value: CAPITAL_TYPES.map((c) => c.name).join(', '),
          };
        default:
          return attr;
      }
    });
  }, [subgeographics, AREAS, DEMOGRAPHIC_SCOPE, LEGAL_STATUS?.name, CAPITAL_TYPES]);

  return (
    <div className="flex space-x-32">
      <div className="flex-1 space-y-9">
        <div className="space-y-1">
          <div className="text-base font-normal text-grey-20">Last updated: 30 March 2022</div>
          <h2 className="text-3xl font-normal capitalize line-clamp-2 text-ellipsis">{name}</h2>
        </div>

        <div className="flex justify-between">
          <div className="relative max-w-[50px] w-full shrink-0">
            <Image
              src={logo.small || '/images/avatar.jpg'}
              alt={name}
              layout="responsive"
              width={50}
              height={36}
            />
          </div>
          <Button
            type="button"
            size="base"
            theme="black-alt"
            href={`mailto:${email}?subject=Hi ${name}`}
          >
            Contact Funder
          </Button>
        </div>

        <Address />

        <Attributes />

        <div className="space-y-3">
          <p className="font-semibold uppercase text-grey-20">About</p>
          <p className="text-xl">{description}</p>
        </div>
      </div>
      <div className="flex-1">
        <InfoCard data={CARD_DATA} count={projects.length} />
      </div>
    </div>
  );
};

export default FunderOverview;
