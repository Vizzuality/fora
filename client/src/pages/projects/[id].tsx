import { dehydrate, QueryClient } from '@tanstack/react-query';

import MetaTags from 'containers/meta-tags';
import Project from 'containers/project';

import API_FAKE from 'services/api-fake';

const DESCRIPTION_TEXT =
  'FORA (Funders for Regenerative Agriculture) is a network of funders and funder initiatives aimed at informing, educating, organizing, providing collaborative opportunities, and recruiting new members in support of regenerative agricultural systems. ';
const TITLE_TEXT = 'Project detail - Funders for Regenerative Agriculture';

const ProjectsDetailPage: React.FC = () => {
  return (
    <div>
      <MetaTags title={TITLE_TEXT} description={DESCRIPTION_TEXT} type="website" />
      <Project />
    </div>
  );
};

export async function getStaticPaths() {
  const response = await API_FAKE.request({
    method: 'GET',
    url: '/todos',
  }).then((r) => r.data);

  const paths = response.map((p) => ({
    params: { id: `${p.id}` },
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

  await queryClient.prefetchQuery(['project', id], () => {
    return API_FAKE.request({
      method: 'GET',
      url: `/todos/${id}`,
    }).then((r) => r.data);
  });

  // console.log(queryClient.getQueriesData(['project', id]));

  // Props returned will be passed to the page component
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default ProjectsDetailPage;
