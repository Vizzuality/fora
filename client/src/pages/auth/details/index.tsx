import { FC } from 'react';

import { dehydrate, DehydratedState, queryOptions } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import safeJsonStringify from 'safe-json-stringify';

import Mydetails from 'containers/auth/details/edit';
import MetaTags from 'containers/meta-tags';

import { getQueryClient } from '@/lib/queryclient';
import { auth } from '@/pages/api/auth/[...nextauth]';
import API from '@/services/api';
import { Funder } from '@/types/api/funder';

const TITLE_TEXT = 'FORA My details | An initiative in support of regenerative agriculture';
// @todo: update description
const DESCRIPTION_TEXT =
  'Explore FORA (Funders for Regenerative Agriculture), a network of funders and funder initiatives supporting regenerative agricultural systems.';
// @todo: update image
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/home.jpg`;

const fetchMyProjects = async (session: Session) => {
  const response = await API.request<Funder>({
    method: 'GET',
    url: 'members/funder',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return response.data;
};

export const myDetailsQueryOptions = (session: Session) =>
  queryOptions({
    queryKey: ['my-details'],
    queryFn: () => fetchMyProjects(session),
    enabled: !!session,
  });

export const getServerSideProps = (async (context) => {
  const session = await auth(context.req, context.res);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(myDetailsQueryOptions(session));

  return {
    props: {
      dehydratedState: JSON.parse(safeJsonStringify(dehydrate(queryClient))) || null,
    },
  };
  // eslint-disable-next-line prettier/prettier
}) satisfies GetServerSideProps<{ dehydratedState: DehydratedState }>;

const MyDetailsPage: FC = () => {
  return (
    <>
      <MetaTags
        title={TITLE_TEXT}
        description={DESCRIPTION_TEXT}
        type="website"
        imageURL={IMAGE_URL}
      />

      <Mydetails />
    </>
  );
};

export default MyDetailsPage;
