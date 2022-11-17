import React, { useCallback, useMemo } from 'react';

import { initialState as fundersInitialState, reset as fundersReset } from 'store/funders';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { initialState as projectsInitialState, reset as projectsReset } from 'store/projects';

import { useFunders } from 'hooks/funders';
import { useProjects } from 'hooks/projects';

import Loading from 'components/loading';

import Areas from './areas';
import CapitalTypes from './capital-types';
import Demographics from './demographics';
import FunderLegalStatus from './funder-legal-status';
import FunderTypes from './funder-types';
import Geographics from './geographics';
import ProjectLegalStatus from './project-legal-status';
import { SentenceProps } from './types';

const Sentence: React.FC<SentenceProps> = ({ type }) => {
  const { filters } = useAppSelector((state) => state[`/${type}`]);
  const dispatch = useAppDispatch();

  const {
    data: fundersData,
    isFetching: fundersIsFetching,
    isFetched: fundersIsFetched,
  } = useFunders({
    filters,
  });

  const {
    data: projectsData,
    isFetching: projectsIsFetching,
    isFetched: projectsIsFetched,
  } = useProjects({
    filters,
  });

  const DATA = useMemo(() => {
    const data = {
      funders: fundersData,
      projects: projectsData,
    };

    return data[type];
  }, [fundersData, projectsData, type]);

  const INITIAL_STATE = useMemo(() => {
    const initialState = {
      funders: fundersInitialState,
      projects: projectsInitialState,
    };

    return initialState[type];
  }, [type]);

  const LOADING = useMemo(() => {
    const loading = {
      funders: fundersIsFetching && !fundersIsFetched,
      projects: projectsIsFetching && !projectsIsFetched,
    };

    return loading[type];
  }, [type, fundersIsFetching, fundersIsFetched, projectsIsFetching, projectsIsFetched]);

  const handleReset = useCallback(() => {
    const action = {
      funders: fundersReset,
      projects: projectsReset,
    };

    dispatch(action[type]());
  }, [dispatch, type]);

  return (
    <div className="relative text-sm font-semibold text-grey-20 min-h-[16px]">
      <Loading
        visible={LOADING}
        className="absolute top-0 bottom-0 left-0 right-0 z-10"
        iconClassName="w-4 h-4"
      />

      <>
        <div className="inline mr-2">
          You are viewing {DATA.length} {type}
          <Geographics type={type} />
          <Areas type={type} />
          <Demographics type={type} />
          {type === 'funders' && (
            <>
              <FunderTypes type={type} />
              <FunderLegalStatus type={type} />
              <CapitalTypes type={type} />
            </>
          )}
          {type === 'projects' && <ProjectLegalStatus type={type} />}
        </div>

        {JSON.stringify(filters) !== JSON.stringify(INITIAL_STATE.filters) && (
          <button className="underline hover:text-black" onClick={handleReset}>
            Reset all filters
          </button>
        )}
      </>
    </div>
  );
};

export default Sentence;
