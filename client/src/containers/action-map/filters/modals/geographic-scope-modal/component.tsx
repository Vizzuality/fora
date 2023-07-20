import React, { useCallback, useMemo } from 'react';

import { Form as FormRFF } from 'react-final-form';

import { setView, setFilters } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { usePlausible } from 'next-plausible';

import { useSubGeographics } from 'hooks/geographics';

import GeographicScopeFooter from './footer';
import GeographicScopeHeader from './header';
import GeographicScopeList from './list';

interface GraphicScopeModaProps {
  onClose?: () => void;
}

const GeographicScopeModal: React.FC<GraphicScopeModaProps> = ({
  onClose,
}: GraphicScopeModaProps) => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const { geographic, subgeographics } = filters;

  const { data: subgeographicsData } = useSubGeographics({
    filters: { geographic },
  });

  const dispatch = useAppDispatch();

  const plausible = usePlausible();

  const INITIAL_VALUES = useMemo(() => {
    return {
      geographic,
      subgeographics: !subgeographics.length
        ? subgeographicsData.map((s) => {
            return s.id;
          })
        : subgeographics,
      allSubgeographics: subgeographicsData.length === subgeographics.length,
    };
  }, [geographic, subgeographics, subgeographicsData]);

  const handleSubmit = useCallback(
    (values) => {
      const {
        geographic: geographicValue,
        subgeographics: subgeographicsValue,
        allSubgeographics: allSubgeographicsValue,
      } = values;

      dispatch(setView(values.geographic));
      dispatch(
        setFilters({
          ...filters,
          geographic: geographicValue,
          subgeographics: allSubgeographicsValue ? [] : subgeographicsValue,
        })
      );

      if (onClose) onClose();

      plausible('Map - Save filter', {
        props: {
          filterName: 'Geographic scope',
          geographic: geographicValue,
          subgeographics: allSubgeographicsValue ? [] : subgeographicsValue,
        },
      });
    },
    [dispatch, filters, onClose, plausible]
  );

  return (
    <FormRFF onSubmit={handleSubmit} initialValues={INITIAL_VALUES}>
      {(fprops) => (
        <form
          className="relative flex flex-col py-10 overflow-hidden grow"
          onSubmit={fprops.handleSubmit}
          autoComplete="off"
        >
          <GeographicScopeHeader />
          <GeographicScopeList />
          <GeographicScopeFooter onClose={onClose} />
        </form>
      )}
    </FormRFF>
  );
};

export default GeographicScopeModal;
