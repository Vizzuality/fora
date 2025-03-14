import { FC } from 'react';

import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import MetaTags from 'containers/meta-tags';

import { auth } from 'pages/api/auth/[...nextauth]';

import EditProject from '@/containers/auth/projects/edit';
import API from '@/services/api';
import { Project } from '@/types/project';

const TITLE_TEXT = 'FORA Edit project | An initiative in support of regenerative agriculture';
// @todo: update description
const DESCRIPTION_TEXT =
  'Explore FORA (Funders for Regenerative Agriculture), a network of funders and funder initiatives supporting regenerative agricultural systems.';
// @todo: update image
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/home.jpg`;

export const getServerSideProps = (async (context) => {
  const { query: { id } } = context;
  const session = await auth(context.req, context.res);

  const project = await API.request<{ data: Project}>({
    method: 'GET',
    url: `/members/projects/${id}`,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    }
  }).then((response) => response.data.data);

  return { props: { project } }
// eslint-disable-next-line prettier/prettier
}) satisfies GetServerSideProps<{ project: Project }>


const EditProjectPage: FC = ({ project }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <MetaTags
        title={TITLE_TEXT}
        description={DESCRIPTION_TEXT}
        type="website"
        imageURL={IMAGE_URL}
      />

      <EditProject project={project} />
    </>
  );
};

export default EditProjectPage;
