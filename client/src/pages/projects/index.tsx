import { useAppSelector } from 'store/hooks';
import { getReduxStateFromQuery, setQueryFromReduxState } from 'store/projects';

import MetaTags from 'containers/meta-tags';
import Projects from 'containers/projects';
import Url from 'containers/url';

export const getServerSideProps = getReduxStateFromQuery();

const TITLE_TEXT = 'FORA Projects | FORA supported regenerative agriculture projects';
const DESCRIPTION_TEXT =
  'Stay up-to-date on the what, who, and where of the funding and strategies of FORA members for synergistic collaboration in support of your work.';
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/projects.jpg`;

const ProjectsPage: React.FC = () => {
  const projectsState = useAppSelector((state) => state['/projects']);

  return (
    <div>
      <MetaTags
        title={TITLE_TEXT}
        description={DESCRIPTION_TEXT}
        type="website"
        imageURL={IMAGE_URL}
      />

      <Projects />

      <Url pathname="/projects" state={projectsState} sync={setQueryFromReduxState} />
    </div>
  );
};

export default ProjectsPage;
