import { useAppSelector } from 'store/hooks';
import { getReduxStateFromQuery, setQueryFromReduxState } from 'store/projects';

import MetaTags from 'containers/meta-tags';
import Projects from 'containers/projects';
import Url from 'containers/url';

export const getServerSideProps = getReduxStateFromQuery();

const DESCRIPTION_TEXT =
  'FORA (Funders for Regenerative Agriculture) is a network of funders and funder initiatives aimed at informing, educating, organizing, providing collaborative opportunities, and recruiting new members in support of regenerative agricultural systems. ';
const TITLE_TEXT = 'Projects - Funders for Regenerative Agriculture';

const ProjectsPage: React.FC = () => {
  const projectsState = useAppSelector((state) => state['/projects']);

  return (
    <div>
      <MetaTags title={TITLE_TEXT} description={DESCRIPTION_TEXT} type="website" />

      <Projects />

      <Url pathname="/projects" state={projectsState} sync={setQueryFromReduxState} />
    </div>
  );
};

export default ProjectsPage;
