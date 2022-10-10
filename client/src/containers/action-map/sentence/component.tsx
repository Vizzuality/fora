import React, { useCallback } from 'react';

import { initialState, reset } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { useFunders } from 'hooks/funders';

import Areas from './areas';
import CapitalTypes from './capital-types';
import Demographics from './demographics';
import FunderLegalStatus from './funder-legal-status';
import FunderTypes from './funder-types';
import Geographics from './geographics';
import ProjectLegalStatus from './project-legal-status';
import { SentenceProps } from './types';

const Sentence: React.FC<SentenceProps> = () => {
  const { type, filters } = useAppSelector((state) => state['/action-map']);
  const dispatch = useAppDispatch();

  const { data: fundersData } = useFunders({ filters });

  const handleReset = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className="text-sm font-semibold text-grey-20">
      <div className="inline mr-2">
        You are viewing {fundersData.length} {type}
        <Geographics />
        <Areas />
        <Demographics />
        <FunderTypes />
        <FunderLegalStatus />
        <CapitalTypes />
        <ProjectLegalStatus />
      </div>

      {JSON.stringify(filters) !== JSON.stringify(initialState.filters) && (
        <button className="underline hover:text-black" onClick={handleReset}>
          Reset all filters
        </button>
      )}
    </div>
  );
};

export default Sentence;
