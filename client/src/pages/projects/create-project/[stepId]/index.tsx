// import React from 'react'
'use client';

import { useRouter } from 'next/router';

import { getReduxStateFromQuery } from 'store/projects';

import MetaTags from 'containers/meta-tags';
import NewProj from 'containers/project/new';
import ContactDetails from 'containers/projects/sidebar/contactDetails';
import FocusAreas from 'containers/projects/sidebar/focusArea';
import Funding from 'containers/projects/sidebar/funding';

import NewProjectLayout from './layout';

export const getServerSideProps = getReduxStateFromQuery();

const TITLE_TEXT = 'FORA New Project | Submit your regenerative agriculture project idea';

const DESCRIPTION_TEXT =
  'Submit your regenerative agriculture project idea to FORA for funding and support.';

const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/projectS.jpg`;

const steps = ['project-details', 'contact-details', 'focus-area', 'funding'];

const NewProject: React.FC = () => {
  const { query } = useRouter();
  const { stepId: stepId } = query;
  const currentStep = steps.indexOf(`${stepId}`);

  return (
    <div>
      <MetaTags
        title={TITLE_TEXT}
        description={DESCRIPTION_TEXT}
        type="website"
        imageURL={IMAGE_URL}
      />
      {/* <Wrapper> */}
      <NewProjectLayout>
        {currentStep === 0 && <NewProj />}
        {currentStep === 1 && <ContactDetails />}
        {currentStep === 2 && <FocusAreas />}
        {currentStep === 3 && <Funding />}
        {/* <NewProj/>
      <ContactDetails/> */}
      </NewProjectLayout>

      {/* </Wrapper> */}
    </div>
  );
};

export default NewProject;
