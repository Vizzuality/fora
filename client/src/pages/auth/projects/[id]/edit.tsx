import { FC } from 'react';

import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import safeJsonStringify from 'safe-json-stringify';

import MetaTags from 'containers/meta-tags';

import FormModal from '@/containers/auth/form-modal';
import EditProject from '@/containers/auth/projects/edit';
import { fetchProject } from '@/hooks/projects';
import { getQueryClient } from '@/lib/queryclient';
import { auth } from '@/pages/api/auth/[...nextauth]';
import { myInvestmentsQueryOptions } from '@/pages/auth/investments';

const TITLE_TEXT = 'FORA Edit project | An initiative in support of regenerative agriculture';
// @todo: update description
const DESCRIPTION_TEXT =
  'Explore FORA (Funders for Regenerative Agriculture), a network of funders and funder initiatives supporting regenerative agricultural systems.';
// @todo: update image
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/home.jpg`;

export const getServerSideProps = (async (context) => {
  const session = await auth(context.req, context.res);
  const {
    query: { id },
  } = context;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['project', id],
    queryFn: () => fetchProject(id as string),
  });

  await queryClient.prefetchQuery({
    ...myInvestmentsQueryOptions(session, {
      'filter[project_id]': id,
      'sort[attribute]': 'project_name',
      'sort[direction]': 'asc',
    }),
  });

  return {
    props: {
      dehydratedState: JSON.parse(safeJsonStringify(dehydrate(queryClient))) || null,
    },
  };
  // eslint-disable-next-line prettier/prettier
}) satisfies GetServerSideProps;

const EditProjectPage: FC = () => {
  return (
    <>
      <MetaTags
        title={TITLE_TEXT}
        description={DESCRIPTION_TEXT}
        type="website"
        imageURL={IMAGE_URL}
      />

      <>
        <FormModal />
        <EditProject />
      </>
    </>
  );
};

export default EditProjectPage;
