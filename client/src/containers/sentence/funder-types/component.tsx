import React, { useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { useFunderTypes } from 'hooks/funder-types';

import SentenceTooltip from 'containers/action-map/sentence/common/tooltip';
import { SentenceProps } from 'containers/sentence/types';

const FunderTypesSentence: React.FC<SentenceProps> = ({ type }) => {
  const { filters } = useAppSelector((state) => state[`/${type}`]);
  const { funderTypes } = filters;

  const { data: funderTypesData, isFetched: funderTypesIsFetched } = useFunderTypes();

  const SELECTED_LIST = useMemo(() => {
    return funderTypesData.filter((sg) => funderTypes.includes(sg.id));
  }, [funderTypesData, funderTypes]);

  const SELECTED_TEXT = useMemo(() => {
    if (!SELECTED_LIST.length) return null;
    const [first, ...rest] = SELECTED_LIST;

    if (!rest.length) return `${first.name}`;
    return `${first.name} +${rest.length}`;
  }, [SELECTED_LIST]);

  if (!funderTypes.length || !funderTypesIsFetched || type !== 'funders') return null;

  return <SentenceTooltip text={SELECTED_TEXT} list={SELECTED_LIST} prefix=" of type " />;
};

export default FunderTypesSentence;
