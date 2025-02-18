import React from 'react';

import { useRouter } from 'next/router';

import ProtectedRoute from 'hoc/protectedRoute';

import MetaTags from 'containers/meta-tags';
import ProjectForm from 'containers/my-projects/sidebar/form';

import NewProjectLayout from './new/layout';

const TITLE_TEXT = 'Edit Project | FORA';
const DESCRIPTION_TEXT = 'Modify your existing FORA-supported regenerative agriculture project.';
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/projects.jpg`;

const EditProjectPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get project ID from URL

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
          <ProjectForm mode="edit" projectId={id as string} />
        </NewProjectLayout>
      </div>
    </ProtectedRoute>
  );
};

export default EditProjectPage;
