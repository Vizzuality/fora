import React, { useMemo } from 'react';

import cx from 'classnames';

import { useRouter } from 'next/router';

import { useApplicationStatuses } from 'hooks/application-statuses';
import { useCapitalAcceptances } from 'hooks/capital-acceptances';
import { useCapitalTypes } from 'hooks/capital-types';
import { useFunderTypes } from 'hooks/funder-types';
import { useFunder } from 'hooks/funders';

import Icon from 'components/icon';
import Tooltip from 'components/tooltip';

import INFO_SVG from 'svgs/ui/info.svg?sprite';

const ATTRIBUTES = [
  {
    id: 'funder_type',
    label: 'Organization type',
    value: '',
    tooltip: 'The type of organization a funder or project represents.',
  },
  {
    id: 'application_status',
    label: 'Application status',
    value: '',
    tooltip: 'The way in which a funder considers investing in a project.',
  },
  {
    id: 'capital_acceptances',
    label: 'Capital acceptances',
    value: '',
    tooltip:
      'The status of a funder which indicates wheather a funder is open to donations/investments.',
  },
  {
    id: 'capital_types',
    label: 'Capital types',
    value: '',
    tooltip: 'The type of capital a funder invests with or a project is looking for.',
  },
];

const FunderAtributes = () => {
  const { query } = useRouter();
  const { id: funderId } = query;

  const { data: funderData } = useFunder(`${funderId}`);
  const { data: funderTypesData } = useFunderTypes();
  const { data: capitalTypesData } = useCapitalTypes();
  const { data: capitalAcceptancesData } = useCapitalAcceptances();
  const { data: applicationStatusData } = useApplicationStatuses();

  const {
    capital_types: capitalTypeIds,
    capital_acceptances: capitalAcceptancesIds,
    funder_type: funderTypeId,
    application_status: applicationStatusId,
  } = funderData;

  const FUNDER_TYPE = useMemo(() => {
    return funderTypesData?.find((type) => type.id === funderTypeId);
  }, [funderTypeId, funderTypesData]);

  const CAPITAL_TYPES = useMemo(() => {
    return capitalTypesData.filter((c) => capitalTypeIds.includes(c.id));
  }, [capitalTypeIds, capitalTypesData]);

  const CAPITAL_ACCEPTANCES = useMemo(() => {
    return capitalAcceptancesData.filter((c) => capitalAcceptancesIds.includes(c.id));
  }, [capitalAcceptancesIds, capitalAcceptancesData]);

  const APPLICATION_STATUS = useMemo(() => {
    return applicationStatusData?.find((type) => type.id === applicationStatusId);
  }, [applicationStatusId, applicationStatusData]);

  const ATTRS = useMemo(() => {
    return ATTRIBUTES.map((attr) => {
      switch (attr.id) {
        case 'funder_type':
          return {
            ...attr,
            value: FUNDER_TYPE?.name,
          };
        case 'application_status':
          return {
            ...attr,
            value: APPLICATION_STATUS?.name,
          };
        case 'capital_acceptances':
          return {
            ...attr,
            value: CAPITAL_ACCEPTANCES.map((c) => c.name).join(', '),
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
  }, [FUNDER_TYPE, APPLICATION_STATUS, CAPITAL_ACCEPTANCES, CAPITAL_TYPES]);

  return (
    <div className="py-4 border-y border-grey-40/40">
      <dl className="grid content-end grid-cols-2 grid-rows-2 gap-y-6 gap-x-11">
        {ATTRS.map((attr) => {
          const { id, label, tooltip, value } = attr;

          return (
            <div className="space-y-2" key={id}>
              <span className="inline-flex items-center text-base font-semibold uppercase text-grey-20">
                <dt className="pr-2 uppercase whitespace-nowrap">{label}</dt>
                <Tooltip
                  arrowProps={{
                    enabled: true,
                    size: 6,
                    className: 'bg-grey-60',
                  }}
                  content={
                    <div className="max-w-xs p-2.5 text-grey-20 rounded shadow-xl bg-grey-60 border border-grey-0/5">
                      <span>{tooltip}</span>
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
              <dd>{value}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
};

export default FunderAtributes;
