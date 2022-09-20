import Head from 'next/head';

import MetaTags from 'containers/meta-tags';

const DESCRIPTION_TEXT =
  'FORA (Funders for Regenerative Agriculture) is a network of funders and funder initiatives aimed at informing, educating, organizing, providing collaborative opportunities, and recruiting new members in support of regenerative agricultural systems. ';
const TITLE_TEXT = 'Project detail - Funders for Regenerative Agriculture';

const ProjectsDetailPage: React.FC = () => {
  return (
    <div>
      <MetaTags title={TITLE_TEXT} description={DESCRIPTION_TEXT} type="website" />
      <Head>
        <title>Projects detail</title>
      </Head>
      Projects detail
    </div>
  );
};

export default ProjectsDetailPage;
