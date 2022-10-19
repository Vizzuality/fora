import React, { useMemo } from 'react';

import cx from 'classnames';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useCapitalTypes } from 'hooks/capital-types';
import { useFunderTypes } from 'hooks/funder-types';
import { useFunder } from 'hooks/funders';

import InfoCard from 'containers/details/info-card';

import Button from 'components/button';
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';

import INFO_SVG from 'svgs/ui/info.svg?sprite';

import { PROJECT_CARD_INFO } from './constants';

const FunderOverview = () => {
  const { query } = useRouter();
  const { id: funderId } = query;

  const { data: funderData } = useFunder(`${funderId}`);
  const { data: funderTypesData } = useFunderTypes();
  const { data: capitalTypesData } = useCapitalTypes();

  const {
    capital_types: capitalTypeId,
    contact_email: email,
    description,
    funder_type: funderTypeId,
    logo,
    name,
    primary_office_city: officeCity,
    primary_office_country: officeCountry,
    primary_office_state: officeState,
    website,
  } = funderData;

  const funderType = useMemo(() => {
    return funderTypesData?.find((type) => type.id === funderTypeId);
  }, [funderTypeId, funderTypesData]);

  // TO-DO this is an array of several obj and need to look for all of them in the array of obj.
  const capitalType = useMemo(() => {
    return capitalTypesData?.find((type) => type.id === capitalTypeId[0]);
  }, [capitalTypeId, capitalTypesData]);

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

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-base font-semibold uppercase text-grey-20">Headquarters Adress</p>
            <p className="capitalize">{`${officeCity}, ${officeState.name}, ${officeCountry.name}`}</p>
          </div>

          <p className="font-semibold underline">
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          </p>
        </div>

        <div className="py-4 border-y border-grey-40/40">
          <dl className="grid grid-cols-2 grid-rows-2 gap-y-7">
            <>
              <div key="organization-type">
                <span className="inline-flex items-center text-base font-semibold uppercase text-grey-20">
                  <dt className="pr-2 uppercase whitespace-nowrap">Organization Type</dt>
                  <Tooltip
                    arrowProps={{
                      enabled: true,
                      size: 6,
                      className: 'bg-grey-60',
                    }}
                    content={
                      <div className="max-w-xs p-2.5 text-grey-20 rounded shadow-xl bg-grey-60 border border-grey-0/5">
                        <span>
                          EarthShare delivers the tools that businesses, individuals, and nonprofits
                          need.
                        </span>
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
                <dd>{funderType.name}</dd>
              </div>

              <div key="application-status">
                <span className="inline-flex items-center text-base font-semibold uppercase text-grey-20">
                  <dt className="pr-2 uppercase whitespace-nowrap">Application Status</dt>
                  <Tooltip
                    arrowProps={{
                      enabled: true,
                      size: 6,
                      className: 'bg-grey-60',
                    }}
                    content={
                      <div className="max-w-xs p-2.5 text-grey-20 rounded shadow-xl bg-grey-60 border border-grey-0/5">
                        <span>Hola</span>
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
                <dd>{funderType.name}</dd>
              </div>

              <div key="capital-acceptance">
                <span className="inline-flex items-center text-base font-semibold uppercase text-grey-20">
                  <dt className="pr-2 uppercase whitespace-nowrap">Capital Acceptance</dt>
                  <Tooltip
                    arrowProps={{
                      enabled: true,
                      size: 6,
                      className: 'bg-grey-60',
                    }}
                    content={
                      <div className="max-w-xs p-2.5 text-grey-20 rounded shadow-xl bg-grey-60 border border-grey-0/5">
                        <span>Hola</span>
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
                <dd>{funderType.name}</dd>
              </div>

              <div key="capital-type">
                <span className="inline-flex items-center text-base font-semibold uppercase text-grey-20">
                  <dt className="pr-2 uppercase whitespace-nowrap">Capital Type</dt>
                  <Tooltip
                    arrowProps={{
                      enabled: true,
                      size: 6,
                      className: 'bg-grey-60',
                    }}
                    content={
                      <div className="max-w-xs p-2.5 text-grey-20 rounded shadow-xl bg-grey-60 border border-grey-0/5">
                        <span>Hola</span>
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
                <dd>{capitalType.name}</dd>
              </div>
            </>
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
