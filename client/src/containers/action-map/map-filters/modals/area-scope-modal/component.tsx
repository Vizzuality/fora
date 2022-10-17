import React, { useCallback, useMemo } from 'react';

import { Form as FormRFF } from 'react-final-form';

import { setFilters } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useAreas } from 'hooks/areas';

import AreaScopeFooter from './footer';
import AreaScopeHeader from './header';
import AreaScopeList from './list';

interface AreaScopeModaProps {
  onClose?: () => void;
}

const AreaScopeModal: React.FC<AreaScopeModaProps> = ({ onClose }: AreaScopeModaProps) => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const { areas } = filters;
  const dispatch = useAppDispatch();

  const { data: areasData } = useAreas();

  const INITIAL_VALUES = useMemo(() => {
    return {
      areas: !areas.length
        ? areasData.map((s) => {
            return s.id;
          })
        : areas,
    };
  }, [areas, areasData]);

  const handleSubmit = useCallback(
    (values) => {
      const { areas: areasValue } = values;

      dispatch(
        setFilters({
          ...filters,
          areas: areasValue.length === areasData.length ? [] : areasValue,
        })
      );

      if (onClose) onClose();
    },
    [areasData, filters, dispatch, onClose]
  );

  return (
    <FormRFF onSubmit={handleSubmit} initialValues={INITIAL_VALUES}>
      {(fprops) => (
        <form
          className="flex flex-col py-10 overflow-hidden grow"
          onSubmit={fprops.handleSubmit}
          autoComplete="off"
        >
          <AreaScopeHeader />
          <AreaScopeList />
          <AreaScopeFooter onClose={onClose} />
        </form>
      )}
    </FormRFF>
  );
};

export default AreaScopeModal;
