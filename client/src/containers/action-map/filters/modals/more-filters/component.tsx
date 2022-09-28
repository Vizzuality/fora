import React, { useCallback, useMemo } from 'react';

import { Form as FormRFF } from 'react-final-form';

import { setFilters } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useCapitalTypes } from 'hooks/capital-types';
import { useFunderLegalStatuses } from 'hooks/funder-legal-statuses';
import { useFunderTypes } from 'hooks/funder-types';
import { useProjectLegalStatuses } from 'hooks/project-legal-statuses';

import MoreFiltersFooter from './footer';
import MoreFiltersHeader from './header';
import MoreFiltersList from './list';

interface MoreFiltersProps {
  onClose?: () => void;
}

const MoreFilters: React.FC<MoreFiltersProps> = ({ onClose }: MoreFiltersProps) => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const { funderTypes, funderLegalStatus, capitalTypes, projectLegalStatus } = filters;
  const dispatch = useAppDispatch();

  const { data: funderTypesData } = useFunderTypes();
  const { data: funderLegalStatusData } = useFunderLegalStatuses();
  const { data: capitalTypesData } = useCapitalTypes();
  const { data: projectLegalStatusesData } = useProjectLegalStatuses();

  const INITIAL_VALUES = useMemo(() => {
    return {
      funderTypes: !funderTypes.length
        ? funderTypesData.map((s) => {
            return s.id;
          })
        : funderTypes,
      funderLegalStatus: !funderLegalStatus.length
        ? funderLegalStatusData.map((s) => {
            return s.id;
          })
        : funderLegalStatus,
      capitalTypes: !capitalTypes.length
        ? capitalTypesData.map((s) => {
            return s.id;
          })
        : capitalTypes,
      projectLegalStatus: !projectLegalStatus.length
        ? projectLegalStatusesData.map((s) => {
            return s.id;
          })
        : projectLegalStatus,
    };
  }, [
    funderTypes,
    funderTypesData,
    funderLegalStatus,
    funderLegalStatusData,
    capitalTypes,
    capitalTypesData,
    projectLegalStatus,
    projectLegalStatusesData,
  ]);

  const handleSubmit = useCallback(
    (values) => {
      const {
        funderTypes: funderTypesValue,
        funderLegalStatus: funderLegalStatusValue,
        capitalTypes: capitalTypesValue,
        projectLegalStatus: projectLegalStatusesValue,
      } = values;

      dispatch(
        setFilters({
          ...filters,
          funderTypes: funderTypesValue.length === funderTypesData.length ? [] : funderTypesValue,
          funderLegalStatus:
            funderLegalStatusValue.length === funderLegalStatusData.length
              ? []
              : funderLegalStatusValue,
          capitalTypes:
            capitalTypesValue.length === capitalTypesData.length ? [] : capitalTypesValue,
          projectLegalStatus:
            projectLegalStatusesValue.length === projectLegalStatusesData.length
              ? []
              : projectLegalStatusesValue,
        })
      );

      if (onClose) onClose();
    },
    [
      funderTypesData,
      funderLegalStatusData,
      capitalTypesData,
      projectLegalStatusesData,
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
          <MoreFiltersList />
          <MoreFiltersFooter onClose={onClose} />
        </form>
      )}
    </FormRFF>
  );
};

export default MoreFilters;
