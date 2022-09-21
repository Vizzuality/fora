import React from 'react';

import { useAppSelector } from 'store/hooks';

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
  const { data: fundersData } = useFunders({ filters });

  return (
    <div className="text-sm font-semibold text-grey-20">
      You are viewing {fundersData.length} {type}
      <Geographics />
      <Areas />
      <Demographics />
      <FunderTypes />
      <FunderLegalStatus />
      <CapitalTypes />
      <ProjectLegalStatus />
    </div>
  );
};

export default Sentence;
