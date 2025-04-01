import { FC } from 'react';

import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import safeJsonStringify from 'safe-json-stringify';

import MetaTags from 'containers/meta-tags';

import EditInvestment from '@/containers/auth/investments/edit';
import { getQueryClient } from '@/lib/queryclient';
import API from '@/services/api';
import { SubGeographic } from '@/types/api/geographics';
import { Investment } from '@/types/api/investment';
import { auth } from 'pages/api/auth/[...nextauth]';

const TITLE_TEXT = 'FORA Edit investment | An initiative in support of regenerative agriculture';
// @todo: update description
const DESCRIPTION_TEXT =
  'Explore FORA (Funders for Regenerative Agriculture), a network of funders and funder initiatives supporting regenerative agricultural systems.';
// @todo: update image
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/home.jpg`;

export const getServerSideProps = (async (context) => {
  const {
    query: { id },
  } = context;
  const session = await auth(context.req, context.res);

  const queryClient = getQueryClient();

  const investment = await API.request<{ data: Investment }>({
    method: 'GET',
    url: `/members/investments/${id}`,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  }).then((response) => response.data.data);

  await queryClient.prefetchQuery({
    queryKey: ['subgeographics'],
    queryFn: () =>
      API.request<{ data: SubGeographic[] }>({
        method: 'GET',
        url: '/subgeographics',
      }).then((response) => response.data),
  });

  return {
    props: {
      investment,
      dehydratedState: JSON.parse(safeJsonStringify(dehydrate(queryClient))) || null,
    },
  };
  // eslint-disable-next-line prettier/prettier
}) satisfies GetServerSideProps<{ investment: Investment }>;

const EditInvestmentPage: FC = ({
  investment,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <MetaTags
        title={TITLE_TEXT}
        description={DESCRIPTION_TEXT}
        type="website"
        imageURL={IMAGE_URL}
      />

      <EditInvestment investment={investment} />
    </>
  );
};

export default EditInvestmentPage;
