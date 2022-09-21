import React, { useMemo } from 'react';

import cx from 'classnames';

import { useAppSelector } from 'store/hooks';

import { useProjectLegalStatus } from 'hooks/project-legal-status';

import Tooltip from 'components/tooltip';

const ProjectLegalStatusSentence = () => {
  const { type, filters } = useAppSelector((state) => state['/action-map']);
  const { projectLegalStatus } = filters;

  const { data: projectLegalStatusData, isFetched: projectLegalStatusIsFetched } =
    useProjectLegalStatus();

  const SELECTED_LIST = useMemo(() => {
    return projectLegalStatusData.filter((sg) => projectLegalStatus.includes(sg.id));
  }, [projectLegalStatusData, projectLegalStatus]);

  const SELECTED_TEXT = useMemo(() => {
    if (!SELECTED_LIST.length) return null;
    const [first, ...rest] = SELECTED_LIST;

    if (!rest.length) return `${first.name}`;
    return `${first.name} +${rest.length}`;
  }, [SELECTED_LIST]);

  if (!projectLegalStatus.length || !projectLegalStatusIsFetched || type !== 'projects')
    return null;

  return (
    <>
      {' '}
      of legal status{' '}
      <Tooltip
        enabled={!!SELECTED_LIST.length}
        trigger="click"
        placement="bottom"
        arrowProps={{
          enabled: true,
          size: 8,
          className: 'bg-grey-60',
        }}
        content={
          <div className="max-w-xs py-2.5 text-grey-20 rounded shadow-xl bg-grey-60 border border-grey-0/5 pointer-events-auto flex flex-col max-h-full">
            <div className="overflow-x-hidden overflow-y-auto pl-2.5 pr-5">
              <ul className="space-y-1">
                {SELECTED_LIST.map((i) => (
                  <li key={i.id}>{i.name}</li>
                ))}
              </ul>
            </div>
          </div>
        }
      >
        <span
          className={cx({
            'text-grey-0': true,
            'hover:underline cursor-pointer': SELECTED_LIST.length > 1,
          })}
        >
          {SELECTED_TEXT}
        </span>
      </Tooltip>
    </>
  );
};

export default ProjectLegalStatusSentence;
