import { FC } from 'react';

import { dehydrate, DehydratedState, queryOptions } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import safeJsonStringify from 'safe-json-stringify';

import MyInvestmentsOverview from 'containers/auth/investments/overview';
import MetaTags from 'containers/meta-tags';

import { getQueryClient } from '@/lib/queryclient';
import { auth } from '@/pages/api/auth/[...nextauth]';
import API from '@/services/api';
import { Investment } from '@/types/api/investment';

const TITLE_TEXT = 'FORA My investments | An initiative in support of regenerative agriculture';
// @todo: update description
const DESCRIPTION_TEXT =
  'Explore FORA (Funders for Regenerative Agriculture), a network of funders and funder initiatives supporting regenerative agricultural systems.';
// @todo: update image
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/home.jpg`;

export const fetchMyInvestments = async (session: Session, params = {}) => {
  const response = await API.request<{ data: Investment[] }>({
    method: 'GET',
    url: 'members/investments',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    params: {
      includes: 'project',
      ...params,
    },
  });

  return response.data;
};

export const myInvestmentsQueryOptions = (session: Session, params = {}) =>
  queryOptions({
    queryKey: ['my-investments', params],
    queryFn: () => fetchMyInvestments(session, params),
  });

export const getServerSideProps = (async (context) => {
  const session = await auth(context.req, context.res);
  const queryClient = getQueryClient();
  const x = myInvestmentsQueryOptions(session, {
    'sort[attribute]': 'project_name',
    'sort[direction]': 'asc',
  });
  await queryClient.prefetchQuery(x);

  return {
    props: {
      dehydratedState: JSON.parse(safeJsonStringify(dehydrate(queryClient))) || null,
    },
  };
  // eslint-disable-next-line prettier/prettier
}) satisfies GetServerSideProps<{ dehydratedState: DehydratedState }>;

const MyInvestmentsOverviewPage: FC = () => {
  return (
    <>
      <MetaTags
        title={TITLE_TEXT}
        description={DESCRIPTION_TEXT}
        type="website"
        imageURL={IMAGE_URL}
      />

      <MyInvestmentsOverview />
    </>
  );
};

export default MyInvestmentsOverviewPage;
