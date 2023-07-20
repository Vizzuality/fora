import React, { useCallback, useMemo } from 'react';

import { Form as FormRFF } from 'react-final-form';

import { setFilters } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { usePlausible } from 'next-plausible';

import { useDemographics } from 'hooks/demographics';

import DemographicScopeFooter from './footer';
import DemographicScopeHeader from './header';
import DemographicScopeList from './list';

interface DemographicScopeModaProps {
  onClose?: () => void;
}

const DemographicScopeModal: React.FC<DemographicScopeModaProps> = ({
  onClose,
}: DemographicScopeModaProps) => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const { demographics } = filters;
  const dispatch = useAppDispatch();

  const plausible = usePlausible();

  const { data: demographicsData } = useDemographics();

  const INITIAL_VALUES = useMemo(() => {
    return {
      demographics: !demographics.length
        ? demographicsData.map((s) => {
            return s.id;
          })
        : demographics,
    };
  }, [demographics, demographicsData]);

  const handleSubmit = useCallback(
    (values) => {
      const { demographics: demographicsValue } = values;

      dispatch(
        setFilters({
          ...filters,
          demographics:
            demographicsValue.length === demographicsData.length ? [] : demographicsValue,
        })
      );

      if (onClose) onClose();

      plausible('Map - Save filter', {
        props: {
          filterName: 'Demographic scope',
          values: demographicsValue.length === demographicsData.length ? [] : demographicsValue,
        },
      });
    },
    [dispatch, filters, demographicsData.length, onClose, plausible]
  );

  return (
    <FormRFF onSubmit={handleSubmit} initialValues={INITIAL_VALUES}>
      {(fprops) => (
        <form
          className="flex flex-col py-10 overflow-hidden grow"
          onSubmit={fprops.handleSubmit}
          autoComplete="off"
        >
          <DemographicScopeHeader />
          <DemographicScopeList />
          <DemographicScopeFooter onClose={onClose} />
        </form>
      )}
    </FormRFF>
  );
};

export default DemographicScopeModal;
