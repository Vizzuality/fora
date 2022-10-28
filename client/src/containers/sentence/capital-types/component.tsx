import React, { useMemo } from 'react';

import { useRouter } from 'next/router';

import { useAppSelector } from 'store/hooks';

import { useCapitalTypes } from 'hooks/capital-types';

import SentenceTooltip from 'containers/sentence/common/tooltip';
import { SentenceProps } from 'containers/sentence/types';

const CapitalTypesSentence: React.FC<SentenceProps> = ({ type }) => {
  const { filters } = useAppSelector((state) => state[`/${type}`]);
  const { capitalTypes } = filters;
  const { pathname } = useRouter();

  const TYPE = useMemo(() => {
    if (pathname.includes('project')) {
      return 'projects';
    } else {
      return 'funders';
    }
  }, [pathname]);

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

  if (!capitalTypes.length || !capitalTypesIsFetched || TYPE !== 'funders') return null;

  return <SentenceTooltip text={SELECTED_TEXT} list={SELECTED_LIST} prefix=" of capital " />;
};

export default CapitalTypesSentence;
