import React, { useMemo } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useDemographics } from 'hooks/demographics';
import { useFunder } from 'hooks/funders';

import InfoCard from 'containers/details/info-card';

import Button from 'components/button';

import Address from './address';
import Attributes from './attributes';
import { PROJECT_CARD_INFO } from './constants';

const FunderOverview = () => {
  const { query } = useRouter();
  const { id: funderId } = query;

  const { data: demographicsData } = useDemographics();
  const { data: funderData } = useFunder(`${funderId}`);

  const { contact_email: email, description, logo, name, projects } = funderData;

  const GEOGRPAHIC_SCOPE = useMemo(() => {
    const projSubgeographics = projects.map((proj) => proj.subgeographics);
    const arraySubGeo = projSubgeographics?.flat().map((subg) => subg.name);
    return arraySubGeo;
  }, [projects]);

  const DEMOGRAPHIC_SCOPE = useMemo(() => {
    const projDemographics = projects.map((proj) => proj.demographics);
    const arrayDemogr = projDemographics?.flat().map((demogr) => demogr);

    return demographicsData.filter((c) => arrayDemogr.includes(c.id));
  }, [demographicsData, projects]);

  // TO_DO: demograpgic leadership
  const CARD_DATA = useMemo(() => {
    return PROJECT_CARD_INFO.map((attr) => {
      switch (attr.id) {
        case 'geogpraphic-scope':
          return {
            ...attr,
            value: GEOGRPAHIC_SCOPE.join(', '),
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
  }, [GEOGRPAHIC_SCOPE, DEMOGRAPHIC_SCOPE]);

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
