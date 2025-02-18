import React from 'react';

import { useAppSelector } from 'store/hooks';
import { getReduxStateFromQuery, setQueryFromReduxState } from 'store/myProjects';

import ProtectedRoute from 'hoc/protectedRoute';

import MetaTags from 'containers/meta-tags';
import MyProjectList from 'containers/my-projects/list';
import Url from 'containers/url';

export const getServerSideProps = getReduxStateFromQuery();

const TITLE_TEXT = 'FORA Projects | FORA supported regenerative agriculture projects';
const DESCRIPTION_TEXT =
  'Stay up-to-date on the what, who, and where of the funding and strategies of FORA members for synergistic collaboration in support of your work.';
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/projects.jpg`;

const MyProjects: React.FC = () => {
  const myProjectState = useAppSelector((state) => state['/myProjects']);
  return (
    <ProtectedRoute>
      <div>
        <MetaTags
          title={TITLE_TEXT}
          description={DESCRIPTION_TEXT}
          type="website"
          imageURL={IMAGE_URL}
        />
        <MyProjectList />

        <Url pathname="/my-projects" state={myProjectState} sync={setQueryFromReduxState} />
      </div>
    </ProtectedRoute>
  );
};

// export const getServerSideProps = withAuth();

export default MyProjects;
