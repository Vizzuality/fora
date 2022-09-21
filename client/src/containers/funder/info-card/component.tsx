import React from 'react';

import cx from 'classnames';

import Icon from 'components/icon';
import Tooltip from 'components/tooltip';

import INFO_SVG from 'svgs/ui/info.svg?sprite';

const PROJECT_INFO = [
  {
    id: 'organization-type',
    title: 'Organization Type',
    info: 'EarthShare delivers the tools that businesses, individuals, and nonprofits need.',
    subtitle: 'Public Foundation',
  },
  {
    id: 'application-status',
    title: 'Application Status',
    info: 'EarthShare delivers the tools that businesses, individuals, and nonprofits need.',
    subtitle: 'Invite only',
  },
  {
    id: 'capital-acceptance',
    title: 'Capital Acceptance',
    info: 'EarthShare delivers the tools that businesses, individuals, and nonprofits need.',
    subtitle: 'Donations Accepted',
  },
  {
    id: 'capital-type',
    title: 'Capital Type',
    info: 'EarthShare delivers the tools that businesses, individuals, and nonprofits need.',
    subtitle: 'Grant',
  },
  {
    id: 'legal-status',
    title: 'Legal Status',
    info: 'EarthShare delivers the tools that businesses, individuals, and nonprofits need.',
    subtitle: 'Grant',
  },
  {
    id: 'demographic-leadership',
    title: 'Demographic Leadership',
    info: 'EarthShare delivers the tools that businesses, individuals, and nonprofits need.',
    subtitle: 'Black or African American',
  },
];

const infoCard = () => {
  return (
    <div className="p-12 space-y-8 bg-green-80">
      <div>
        <p className="font-semibold uppercase">funding</p>
        <p className="text-4xl font-display">12</p>
        <p className="font-semibold capitalize">projects</p>
      </div>

      <dl className="">
        {PROJECT_INFO.map(({ id, title, info, subtitle }) => (
          <div key={id} className="py-4 border-t border-grey-40/40">
            <span className="inline-flex items-center text-base font-semibold uppercase">
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
                <div>
                  <Icon
                    icon={INFO_SVG}
                    className={cx({
                      'w-3 h-3': true,
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
  );
};

export default infoCard;
