import React, { useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { useDemographics } from 'hooks/demographics';

import SentenceTooltip from 'containers/action-map/sentence/common/tooltip';

const DemographicsSentence = () => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const { demographics } = filters;

  const { data: demographicsData, isFetched: demographicsIsFetched } = useDemographics();

  const SELECTED_LIST = useMemo(() => {
    return demographicsData.filter((demographic) => demographics.includes(demographic.id));
  }, [demographicsData, demographics]);

  const SELECTED_TEXT = useMemo(() => {
    if (!SELECTED_LIST.length) return null;
    const [first, ...rest] = SELECTED_LIST;

    if (!rest.length) return `${first.name}`;
    return `${first.name} +${rest.length}`;
  }, [SELECTED_LIST]);

  if (!demographics.length || !demographicsIsFetched) return null;

  return <SentenceTooltip text={SELECTED_TEXT} list={SELECTED_LIST} prefix=" focused in " />;
};

export default DemographicsSentence;
