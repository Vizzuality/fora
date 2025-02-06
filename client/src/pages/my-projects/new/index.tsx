// import React, { useEffect } from 'react'
// import { useRouter } from 'next/router';
// const NewProjectIndex = () => {
//   const router = useRouter();
//   useEffect(() => {
//     router.replace('/projects/new/project-details');
//   }, [])
//   return null;
// }

// export default NewProjectIndex

import React from 'react'

const TITLE_TEXT = 'FORA Projects | FORA supported regenerative agriculture projects';
const DESCRIPTION_TEXT =
  'Stay up-to-date on the what, who, and where of the funding and strategies of FORA members for synergistic collaboration in support of your work.';
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/projects.jpg`;
import MetaTags from 'containers/meta-tags';
import ProjectForm from 'containers/projects/sidebar/new/form';
import NewProjectLayout from './layout';
import ProtectedRoute from 'hoc/protectedRoute';
import { NextPage } from 'next';

const NewProjectPage: NextPage = () => {
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
      <ProjectForm mode='create' />
     </NewProjectLayout>
    </div>
    </ProtectedRoute>
  )
}

export default NewProjectPage
