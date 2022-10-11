import { useRouter } from 'next/router';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import { fetchFunder, useFunder } from 'hooks/funders';

import Funder from 'containers/funder';
import MetaTags from 'containers/meta-tags';

import API_FAKE from 'services/api-fake';

const DESCRIPTION_TEXT =
  'FORA (Funders for Regenerative Agriculture) is a network of funders and funder initiatives aimed at informing, educating, organizing, providing collaborative opportunities, and recruiting new members in support of regenerative agricultural systems. ';

const FundersDetailPage: React.FC = () => {
  const { query } = useRouter();
  const { id: funderId } = query;
  const { data: funderData } = useFunder(`${funderId}`);

  return (
    <div>
      <MetaTags
        title={`${funderData.title} - Funders for Regenerative Agriculture`}
        description={DESCRIPTION_TEXT}
        type="website"
      />
      <Funder />
    </div>
  );
};

export async function getStaticPaths() {
  const response = await API_FAKE.request({
    method: 'GET',
    url: '/posts',
  }).then((r) => r.data);

  const paths = response.map((f) => ({
    params: { id: `${f.id}` },
  }));

  // console.log('paths', paths);

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(ctx) {
  const { id } = ctx.params;
  const queryClient = new QueryClient();

  const fetch = () => fetchFunder(id);

  await queryClient.prefetchQuery(['funder', id], fetch);

  // console.log(queryClient.getQueriesData(['funder', id]));

  // Props returned will be passed to the page component
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
export default FundersDetailPage;
