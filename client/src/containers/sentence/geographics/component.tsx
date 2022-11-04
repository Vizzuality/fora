import React, { useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { useGeographics, useSubGeographics } from 'hooks/geographics';

import SentenceTooltip from 'containers/sentence/common/tooltip';
import { SentenceProps } from 'containers/sentence/types';

const GeographicsSentence: React.FC<SentenceProps> = ({ type }) => {
  const { filters } = useAppSelector((state) => state[`/${type}`]);
  const { geographic, subgeographics } = filters;

  const { data: geographicsData, isFetched: geographicsIsFetched } = useGeographics();
  const { data: subgeographicsData, isFetched: subgeographicsIsFetched } = useSubGeographics({
    filters: { geographic },
  });

  const SELECTED_LIST = useMemo(() => {
    return subgeographicsData.filter((sg) => subgeographics.includes(sg.id));
  }, [subgeographicsData, subgeographics]);

  const SELECTED_TEXT = useMemo(() => {
    if (!SELECTED_LIST.length) {
      const geo = geographicsData.find((g) => g.id === geographic);
      return `${geo?.name}`;
    }

    const [first, ...rest] = SELECTED_LIST;

    if (!rest.length) return `${first.name}`;
    return `${first.name} +${rest.length}`;
  }, [SELECTED_LIST, geographicsData, geographic]);

  if (!geographicsIsFetched || !subgeographicsIsFetched) return null;

  if (!geographic) return null;

  return <SentenceTooltip text={SELECTED_TEXT} list={SELECTED_LIST} prefix=" from " />;
};

export default GeographicsSentence;
