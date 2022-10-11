import { useRouter } from 'next/router';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import { fetchProject, useProject } from 'hooks/projects';

import MetaTags from 'containers/meta-tags';
import Project from 'containers/project';

import API_FAKE from 'services/api-fake';

const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/projects.jpg`;

const ProjectsDetailPage: React.FC = () => {
  const { query } = useRouter();
  const { id: projectId } = query;
  const { data: projectData } = useProject(`${projectId}`);

  return (
    <div>
      <MetaTags
        title={`FORA Projects | ${projectData.title}`}
        description={projectData.description}
        type="website"
        imageURL={IMAGE_URL}
      />
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

  const fetch = () => fetchProject(id);

  await queryClient.prefetchQuery(['project', id], fetch);

  // console.log(queryClient.getQueriesData(['project', id]));

  // Props returned will be passed to the page component
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default ProjectsDetailPage;
