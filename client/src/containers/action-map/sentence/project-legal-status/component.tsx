import React, { useMemo } from 'react';

import { useAppSelector } from 'store/hooks';

import { useProjectLegalStatuses } from 'hooks/project-legal-statuses';

import SentenceTooltip from 'containers/action-map/sentence/common/tooltip';

const ProjectLegalStatusSentence = () => {
  const { type, filters } = useAppSelector((state) => state['/action-map']);
  const { projectLegalStatus } = filters;

  const { data: projectLegalStatusesData, isFetched: projectLegalStatusIsFetched } =
    useProjectLegalStatuses();

  const SELECTED_LIST = useMemo(() => {
    return projectLegalStatusesData.filter((sg) => projectLegalStatus.includes(sg.id));
  }, [projectLegalStatusesData, projectLegalStatus]);

  const SELECTED_TEXT = useMemo(() => {
    if (!SELECTED_LIST.length) return null;
    const [first, ...rest] = SELECTED_LIST;

    if (!rest.length) return `${first.name}`;
    return `${first.name} +${rest.length}`;
  }, [SELECTED_LIST]);

  if (!projectLegalStatus.length || !projectLegalStatusIsFetched || type !== 'projects')
    return null;

  return <SentenceTooltip text={SELECTED_TEXT} list={SELECTED_LIST} prefix=" of legal status " />;
};

export default ProjectLegalStatusSentence;
