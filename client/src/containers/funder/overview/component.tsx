import React from 'react';

import cx from 'classnames';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useFunder } from 'hooks/funders';

import InfoCard from 'containers/details/info-card';

import Button from 'components/button';
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';

import INFO_SVG from 'svgs/ui/info.svg?sprite';

import { PROJECT_CARD_INFO, PROJECT_INFO } from './constants';

const FunderOverview = () => {
  const { query } = useRouter();
  const { id: funderId } = query;
  const { data: funderData } = useFunder(`${funderId}`);

  const { name, description, website, logo } = funderData;

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
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          </p>
        </div>

        <div className="py-4 border-y border-grey-40/40">
          <dl className="grid grid-cols-2 grid-rows-2 gap-y-7">
            {PROJECT_INFO.map(({ id, title, info, subtitle }) => (
              <div key={id}>
                <span className="inline-flex items-center text-base font-semibold uppercase text-grey-20">
                  <dt className="pr-2 uppercase whitespace-nowrap">{title}</dt>
                  <Tooltip
                    arrowProps={{
                      enabled: true,
                      size: 6,
                      className: 'bg-grey-60',
                    }}
                    content={
                      <div className="max-w-xs p-2.5 text-grey-20 rounded shadow-xl bg-grey-60 border border-grey-0/5">
                        <span>{info}</span>
                      </div>
                    }
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-grey-20/30">
                      <Icon
                        icon={INFO_SVG}
                        className={cx({
                          'w-3.5 h-3.5 text-grey-20': true,
                        })}
                      />
                    </div>
                  </Tooltip>
                </span>
                <dd>{subtitle}</dd>
              </div>
            ))}
          </dl>
        </div>

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
