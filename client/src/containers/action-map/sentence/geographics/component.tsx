import React, { useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { useGeographics, useSubGeographics } from 'hooks/geographics';

import SentenceTooltip from 'containers/action-map/sentence/common/tooltip';

const GeographicsSentence = () => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const { geographic, subgeographics } = filters;

  const { data: geographicsData, isFetched: geographicsIsFetched } = useGeographics();
  const { data: subgeographicsData, isFetched: subgeographicsIsFetched } =
    useSubGeographics(geographic);

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

  return <SentenceTooltip text={SELECTED_TEXT} list={SELECTED_LIST} prefix=" from " />;
};

export default GeographicsSentence;
