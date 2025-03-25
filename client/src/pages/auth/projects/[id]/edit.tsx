import { FC } from 'react';

import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import safeJsonStringify from 'safe-json-stringify';

import MetaTags from 'containers/meta-tags';

import EditProject from '@/containers/auth/projects/edit';
import { fetchProject } from '@/hooks/projects';
import { getQueryClient } from '@/lib/queryclient';

const TITLE_TEXT = 'FORA Edit project | An initiative in support of regenerative agriculture';
// @todo: update description
const DESCRIPTION_TEXT =
  'Explore FORA (Funders for Regenerative Agriculture), a network of funders and funder initiatives supporting regenerative agricultural systems.';
// @todo: update image
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/home.jpg`;

export const getServerSideProps = (async (context) => {
  const {
    query: { id },
  } = context;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['project', id],
    queryFn: () => fetchProject(id as string),
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

      <EditProject />
    </>
  );
};

export default EditProjectPage;
