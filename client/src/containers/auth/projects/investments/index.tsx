import { useParams, usePathname } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import InvestmentsNotFound from '@/containers/auth/projects/investments/not-found';
import { NEW_PROJECT_QUERY_KEY } from '@/containers/auth/projects/new';
import { Project } from '@/types/project';

export default function InvestmentsStep() {
  const pathname = usePathname();
  const { id } = useParams<{ id: string }>();
  const isCreatePage = pathname.includes('/auth/projects/new');

  const queryClient = useQueryClient();
  const mutationCache = queryClient.getMutationCache();
  const newProjectMutationState = mutationCache.find<{ data: { data: Project } }>({
    mutationKey: NEW_PROJECT_QUERY_KEY,
  })?.state;

  const projectId = isCreatePage ? newProjectMutationState?.data?.data?.data?.id : id;

  return <>{isCreatePage && <InvestmentsNotFound id={projectId} />}</>;
}
