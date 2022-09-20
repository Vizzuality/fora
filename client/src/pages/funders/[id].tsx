import Head from 'next/head';

import MetaTags from 'containers/meta-tags';

const DESCRIPTION_TEXT =
  'FORA (Funders for Regenerative Agriculture) is a network of funders and funder initiatives aimed at informing, educating, organizing, providing collaborative opportunities, and recruiting new members in support of regenerative agricultural systems. ';
const TITLE_TEXT = 'Funder detail - Funders for Regenerative Agriculture';

const FundersDetailPage: React.FC = () => {
  return (
    <div>
      <MetaTags title={TITLE_TEXT} description={DESCRIPTION_TEXT} type="website" />
      <Head>
        <title>Funders detail</title>
      </Head>
      Funders detail
    </div>
  );
};

export default FundersDetailPage;
