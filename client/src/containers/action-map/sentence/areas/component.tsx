import React, { useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { useAreas } from 'hooks/areas';

import SentenceTooltip from 'containers/action-map/sentence/common/tooltip';

const AreasSentence = () => {
  const { filters } = useAppSelector((state) => state['/action-map']);
  const { areas } = filters;

  const { data: areasData, isFetched: areasIsFetched } = useAreas();

  const SELECTED_LIST = useMemo(() => {
    return areasData.filter((area) => areas.includes(area.id));
  }, [areasData, areas]);

  const SELECTED_TEXT = useMemo(() => {
    if (!SELECTED_LIST.length) return null;
    const [first, ...rest] = SELECTED_LIST;

    if (!rest.length) return `${first.name}`;
    return `${first.name} +${rest.length}`;
  }, [SELECTED_LIST]);

  if (!areas.length || !areasIsFetched) return null;

  return <SentenceTooltip text={SELECTED_TEXT} list={SELECTED_LIST} prefix=" who invest in " />;
};

export default AreasSentence;
