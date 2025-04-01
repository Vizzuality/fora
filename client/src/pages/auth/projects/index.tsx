import { FC } from 'react';

import { dehydrate, DehydratedState, infiniteQueryOptions } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import safeJsonStringify from 'safe-json-stringify';

import MyProjectsOverview from 'containers/auth/projects/overview';
import MetaTags from 'containers/meta-tags';

import { getQueryClient } from '@/lib/queryclient';
import { auth } from '@/pages/api/auth/[...nextauth]';
import API from '@/services/api';
import { InifiniteProject } from '@/types/api/project';

const TITLE_TEXT = 'FORA My projects | An initiative in support of regenerative agriculture';
// @todo: update description
const DESCRIPTION_TEXT =
  'Explore FORA (Funders for Regenerative Agriculture), a network of funders and funder initiatives supporting regenerative agricultural systems.';
// @todo: update image
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/home.jpg`;

const fetchMyProjects = async (session: Session, { pageParam = 1 }, params = {}) => {
  const response = await API.request<InifiniteProject>({
    method: 'GET',
    url: 'members/projects',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    params: {
      'page[number]': pageParam,
      'page[size]': 9,
      includes: 'state,country,investments',
      ...params,
    },
  });

  return response.data;
};

export const myProjectsQueryOptions = (session: Session, params = {}) =>
  infiniteQueryOptions({
    queryKey: ['my-projects', params],
    queryFn: (paginationParams) => fetchMyProjects(session, paginationParams, params),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const {
        meta: { page, pages },
      } = lastPage;
      return page + 1 > pages ? undefined : page + 1;
    },
  });

export const getServerSideProps = (async (context) => {
  const session = await auth(context.req, context.res);
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(
    myProjectsQueryOptions(session, {
      'sort[attribute]': 'name',
      'sort[direction]': 'asc',
    }),
  );

  return {
    props: {
      dehydratedState: JSON.parse(safeJsonStringify(dehydrate(queryClient))) || null,
    },
  };
  // eslint-disable-next-line prettier/prettier
}) satisfies GetServerSideProps<{ dehydratedState: DehydratedState }>;

const MyProjectsOverviewPage: FC = () => {
  return (
    <>
      <MetaTags
        title={TITLE_TEXT}
        description={DESCRIPTION_TEXT}
        type="website"
        imageURL={IMAGE_URL}
      />

      <MyProjectsOverview />
    </>
  );
};

export default MyProjectsOverviewPage;
