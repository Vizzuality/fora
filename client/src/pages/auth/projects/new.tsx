import { FC } from 'react';

import NewProject from 'containers/auth/projects/new';
import MetaTags from 'containers/meta-tags';

import FormModal from '@/containers/auth/form-modal';

const TITLE_TEXT = 'FORA My projects | An initiative in support of regenerative agriculture';
// @todo: update description
const DESCRIPTION_TEXT =
  'Explore FORA (Funders for Regenerative Agriculture), a network of funders and funder initiatives supporting regenerative agricultural systems.';
// @todo: update image
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/home.jpg`;

const NewProjectPage: FC = () => {
  return (
    <>
      <MetaTags
        title={TITLE_TEXT}
        description={DESCRIPTION_TEXT}
        type="website"
        imageURL={IMAGE_URL}
      />

      <>
        <FormModal />
        <NewProject />
      </>
    </>
  );
};

export default NewProjectPage;
