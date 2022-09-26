import React, { useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { useFunderLegalStatus } from 'hooks/funder-legal-status';

import SentenceTooltip from 'containers/action-map/sentence/common/tooltip';

const FunderLegalStatusSentence = () => {
  const { type, filters } = useAppSelector((state) => state['/action-map']);
  const { funderLegalStatus } = filters;

  const { data: funderLegalStatusData, isFetched: funderLegalStatusIsFetched } =
    useFunderLegalStatus();

  const SELECTED_LIST = useMemo(() => {
    return funderLegalStatusData.filter((sg) => funderLegalStatus.includes(sg.id));
  }, [funderLegalStatusData, funderLegalStatus]);

  const SELECTED_TEXT = useMemo(() => {
    if (!SELECTED_LIST.length) return null;
    const [first, ...rest] = SELECTED_LIST;

    if (!rest.length) return `${first.name}`;
    return `${first.name} +${rest.length}`;
  }, [SELECTED_LIST]);

  if (!funderLegalStatus.length || !funderLegalStatusIsFetched || type !== 'funders') return null;

  return <SentenceTooltip text={SELECTED_TEXT} list={SELECTED_LIST} prefix=" of legal status " />;
};

export default FunderLegalStatusSentence;
