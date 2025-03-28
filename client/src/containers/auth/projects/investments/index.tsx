import { useState } from 'react';

import { useParams, usePathname } from 'next/navigation';

import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { SortingState } from '@tanstack/react-table';
import { useSession } from 'next-auth/react';

import InvestmentsTable from '@/containers/auth/investments/table';
import InvestmentsNotFound from '@/containers/auth/projects/investments/not-found';
import { NEW_PROJECT_QUERY_KEY } from '@/containers/auth/projects/new';
import { myInvestmentsQueryOptions } from '@/pages/auth/investments';
import { Project } from '@/types/project';

export default function InvestmentsStep() {
  const pathname = usePathname();
  const { id } = useParams<{ id: string }>();
  const isCreatePage = pathname.includes('/auth/projects/new');
  const { data: session } = useSession();
  const [sort, setSort] = useState<SortingState>([
    {
      id: 'project_name',
      desc: false,
    },
  ]);

  const { data, isFetched } = useQuery({
    ...myInvestmentsQueryOptions(session, {
      'filter[project_id]': id,
      ...(sort[0]
        ? {
            'sort[attribute]': sort[0].id,
            'sort[direction]': sort[0].desc ? 'desc' : 'asc',
          }
        : {}),
    }),
    enabled: !!session,
    select: (d) => d.data,
    placeholderData: keepPreviousData,
  });

  const queryClient = useQueryClient();
  const mutationCache = queryClient.getMutationCache();
  const newProjectMutationState = mutationCache.find<{ data: { data: Project } }>({
    mutationKey: NEW_PROJECT_QUERY_KEY,
  })?.state;

  const projectId = isCreatePage ? newProjectMutationState?.data?.data?.data?.id : id;

  if (isCreatePage || (isFetched && !data?.length)) {
    return <InvestmentsNotFound id={projectId} />;
  }

  return (
    <div className="flex h-full flex-col gap-10 pb-10">
      <h2 className="font-display text-2.5xl">
        There are <span className="font-semibold">{data?.length ?? '-'}</span> investments for this
        project
      </h2>
      <InvestmentsTable
        data={data}
        sorting={sort}
        onSorting={(sortingState) => setSort(sortingState)}
      />
    </div>
  );
}
