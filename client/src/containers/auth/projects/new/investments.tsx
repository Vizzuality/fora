import { useQueryClient } from '@tanstack/react-query';

import { Project } from 'types/project';

import LinkButton from 'components/button';

import { NEW_PROJECT_QUERY_KEY } from './index';

export default function InvestmentsStep() {
  const queryClient = useQueryClient();
  const mutationCache = queryClient.getMutationCache();
  const newProjectMutationState = mutationCache.find<{ data: { data: Project } }>({
    mutationKey: NEW_PROJECT_QUERY_KEY,
  })?.state;

  return (
    <div className="grid-cols-12 grid justify-center items-center">
      <div className="col-span-6 flex flex-col text-center gap-4 col-start-4 items-center">
        <h3 className="font-display text-2.5xl">
          You have no investments reported for this project.
        </h3>
        {/*@todo: update text*/}
        <p>
          Lorem ipsum dolor sit amet consectetur. Convallis fusce neque odio nunc elementum habitant
          sit sagittis.
        </p>
        <LinkButton
          href={`/investments?project=${newProjectMutationState?.data.data.data.id}`}
          theme="green"
        >
          Report Investment
        </LinkButton>
      </div>
    </div>
  );
}
