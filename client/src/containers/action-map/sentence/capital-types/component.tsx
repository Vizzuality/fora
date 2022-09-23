import React, { useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { useCapitalTypes } from 'hooks/capital-types';

import SentenceTooltip from 'containers/action-map/sentence/common/tooltip';

const CapitalTypesSentence = () => {
  const { type, filters } = useAppSelector((state) => state['/action-map']);
  const { capitalTypes } = filters;

  const { data: capitalTypesData, isFetched: capitalTypesIsFetched } = useCapitalTypes();

  const SELECTED_LIST = useMemo(() => {
    return capitalTypesData.filter((sg) => capitalTypes.includes(sg.id));
  }, [capitalTypesData, capitalTypes]);

  const SELECTED_TEXT = useMemo(() => {
    if (!SELECTED_LIST.length) return null;
    const [first, ...rest] = SELECTED_LIST;

    if (!rest.length) return `${first.name}`;
    return `${first.name} +${rest.length}`;
  }, [SELECTED_LIST]);

  if (!capitalTypes.length || !capitalTypesIsFetched || type !== 'funders') return null;

  return <SentenceTooltip text={SELECTED_TEXT} list={SELECTED_LIST} prefix=" of capital " />;
};

export default CapitalTypesSentence;
