import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useFunder } from 'hooks/funders';

import InfoCard from 'containers/details/info-card';

import Button from 'components/button';

import Address from './address';
import Attributes from './attributes';
import { PROJECT_CARD_INFO } from './constants';

const FunderOverview = () => {
  const { query } = useRouter();
  const { id: funderId } = query;

  const { data: funderData } = useFunder(`${funderId}`);

  const { contact_email: email, description, logo, name } = funderData;

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
        <InfoCard data={PROJECT_CARD_INFO} />
      </div>
    </div>
  );
};

export default FunderOverview;
