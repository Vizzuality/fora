import React, { useCallback, useMemo } from 'react';

import { initialState, reset } from 'store/action-map';
import { useAppDispatch, useAppSelector } from 'store/hooks';

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

const Sentence: React.FC<SentenceProps> = () => {
  const { type, filters } = useAppSelector((state) => state['/action-map']);
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

  const LOADING = useMemo(() => {
    const loading = {
      funders: fundersIsFetching && !fundersIsFetched,
      projects: projectsIsFetching && !projectsIsFetched,
    };

    return loading[type];
  }, [type, fundersIsFetching, fundersIsFetched, projectsIsFetching, projectsIsFetched]);

  const handleReset = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className="relative text-sm font-semibold text-grey-20 min-h-[16px]">
      <Loading
        visible={LOADING}
        className="absolute top-0 bottom-0 left-0 right-0 z-10"
        iconClassName="w-4 h-4"
      />

      {!!DATA.length && (
        <>
          <div className="inline mr-2">
            You are viewing {DATA.length} {type}
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
        </>
      )}
    </div>
  );
};

export default Sentence;
