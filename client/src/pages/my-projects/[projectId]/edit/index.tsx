import { useMyProject } from 'hooks/my-projects';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import MetaTags from 'containers/meta-tags';
import ProtectedRoute from 'hoc/protectedRoute';
import NewProjectLayout from 'pages/my-projects/new/layout';
import ProjectForm from 'containers/my-projects/sidebar/form';

// export const getServerSideProps = getReduxStateFromQuery();

const TITLE_TEXT = 'FORA Projects | FORA supported regenerative agriculture projects';
const DESCRIPTION_TEXT =
  'Stay up-to-date on the what, who, and where of the funding and strategies of FORA members for synergistic collaboration in support of your work.';
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/projects.jpg`;

const EditProject: NextPage = () => {
  const { query } = useRouter();
  const { id: projectId } = query;
  const { data: myProjectData } = useMyProject(`${projectId}`);

  return (
    <ProtectedRoute>
      <div>
        <MetaTags
          title={TITLE_TEXT}
          description={DESCRIPTION_TEXT}
          type="website"
          imageURL={IMAGE_URL}
        />
        <NewProjectLayout>
          <ProjectForm mode="create" initialData={myProjectData} projectId={projectId as string} />
        </NewProjectLayout>
      </div>
    </ProtectedRoute>
  );
};

export default EditProject;
