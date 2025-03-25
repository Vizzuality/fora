import { useState } from 'react';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { SortingState } from '@tanstack/react-table';
import { useSession } from 'next-auth/react';

import LinkButton from '@/components/button';
import InvestmentsTable from '@/containers/auth/investments/table';
import Wrapper from '@/containers/wrapper';
import { myInvestmentsQueryOptions } from '@/pages/auth/investments';

export default function MyInvestmentsOverview() {
  const [sort, setSort] = useState<SortingState>([
    {
      id: 'project_name',
      desc: false,
    },
  ]);
  const { data: session } = useSession();

  const { data } = useQuery({
    ...myInvestmentsQueryOptions(session, {
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

  return (
    <Wrapper className="flex w-full grow flex-col gap-6">
      <header className="flex items-center justify-between">
        <h2 className="font-display text-3xl">
          You have <span className="font-semibold">{data?.length}</span> investments
        </h2>
        <LinkButton href="/auth/investments/new" theme="green">
          Report new investment
        </LinkButton>
      </header>

      <InvestmentsTable
        data={data || []}
        sorting={sort}
        onSorting={(sortingState) => setSort(sortingState)}
      />
    </Wrapper>
  );
}
