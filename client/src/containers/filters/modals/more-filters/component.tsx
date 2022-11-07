import React, { useCallback, useMemo } from 'react';

import { Form as FormRFF } from 'react-final-form';

import { setFilters as setFundersFilters } from 'store/funders';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setFilters as setProjectsFilters } from 'store/projects';

import { useCapitalTypes } from 'hooks/capital-types';
import { useFunderLegalStatuses } from 'hooks/funder-legal-statuses';
import { useFunderTypes } from 'hooks/funder-types';
import { useProjectLegalStatuses } from 'hooks/project-legal-statuses';

import MoreFiltersFooter from './footer';
import MoreFiltersHeader from './header';
import MoreFiltersList from './list';

interface MoreFiltersProps {
  onClose?: () => void;
  type: string;
}

const MoreFilters: React.FC<MoreFiltersProps> = ({ onClose, type }: MoreFiltersProps) => {
  const { filters } = useAppSelector((state) => state[`/${type}`]);
  const { funderTypes, funderLegalStatuses, capitalTypes, recipientLegalStatuses } = filters;
  const dispatch = useAppDispatch();

  const { data: funderTypesData } = useFunderTypes();
  const { data: funderLegalStatusesData } = useFunderLegalStatuses();
  const { data: capitalTypesData } = useCapitalTypes();
  const { data: recipientLegalStatusesData } = useProjectLegalStatuses();

  const INITIAL_VALUES = useMemo(() => {
    return {
      ...(funderTypes && {
        funderTypes: !funderTypes.length
          ? funderTypesData.map((s) => {
              return s.id;
            })
          : funderTypes,
      }),
      ...(funderLegalStatuses && {
        funderLegalStatuses: !funderLegalStatuses.length
          ? funderLegalStatusesData.map((s) => {
              return s.id;
            })
          : funderLegalStatuses,
      }),
      ...(capitalTypes && {
        capitalTypes: !capitalTypes.length
          ? capitalTypesData.map((s) => {
              return s.id;
            })
          : capitalTypes,
      }),
      ...(recipientLegalStatuses && {
        recipientLegalStatuses: !recipientLegalStatuses.length
          ? recipientLegalStatusesData.map((s) => {
              return s.id;
            })
          : recipientLegalStatuses,
      }),
    };
  }, [
    funderTypes,
    funderTypesData,
    funderLegalStatuses,
    funderLegalStatusesData,
    capitalTypes,
    capitalTypesData,
    recipientLegalStatuses,
    recipientLegalStatusesData,
  ]);

  const handleSubmit = useCallback(
    (values) => {
      const {
        funderTypes: funderTypesValue,
        funderLegalStatuses: funderLegalStatusesValue,
        capitalTypes: capitalTypesValue,
        recipientLegalStatuses: recipientLegalStatusesValue,
      } = values;

      const action = {
        funders: setFundersFilters,
        projects: setProjectsFilters,
      };

      dispatch(
        action[type]({
          ...filters,
          ...(!!funderTypesValue && {
            funderTypes: funderTypesValue.length === funderTypesData.length ? [] : funderTypesValue,
          }),
          ...(!!funderLegalStatusesValue && {
            funderLegalStatuses:
              funderLegalStatusesValue.length === funderLegalStatusesData.length
                ? []
                : funderLegalStatusesValue,
          }),
          ...(!!capitalTypesValue && {
            capitalTypes:
              capitalTypesValue.length === capitalTypesData.length ? [] : capitalTypesValue,
          }),
          ...(!!recipientLegalStatusesValue && {
            recipientLegalStatuses:
              recipientLegalStatusesValue.length === recipientLegalStatusesData.length
                ? []
                : recipientLegalStatusesValue,
          }),
        })
      );

      if (onClose) onClose();
    },
    [
      type,
      funderTypesData,
      funderLegalStatusesData,
      capitalTypesData,
      recipientLegalStatusesData,
      filters,
      dispatch,
      onClose,
    ]
  );

  return (
    <FormRFF onSubmit={handleSubmit} initialValues={INITIAL_VALUES}>
      {(fprops) => (
        <form
          className="flex flex-col py-10 overflow-hidden grow"
          onSubmit={fprops.handleSubmit}
          autoComplete="off"
        >
          <MoreFiltersHeader />
          <MoreFiltersList type={type} />
          <MoreFiltersFooter type={type} onClose={onClose} />
        </form>
      )}
    </FormRFF>
  );
};

export default MoreFilters;
