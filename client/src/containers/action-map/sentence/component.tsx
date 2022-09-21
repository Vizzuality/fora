import React from 'react';

import { useAppSelector } from 'store/hooks';

import { useFunders } from 'hooks/funders';

import Areas from './areas';
import Demographics from './demographics';
import Geographics from './geographics';
import { SentenceProps } from './types';

const Sentence: React.FC<SentenceProps> = () => {
  const { type, filters } = useAppSelector((state) => state['/action-map']);
  const { data: fundersData } = useFunders({ filters });

  return (
    <div className="text-sm font-semibold text-grey-20">
      You are viewing {fundersData.length} {type} <Geographics /> <Areas /> <Demographics />
    </div>
  );
};

export default Sentence;
