import MetaTags from 'containers/meta-tags';
import TermsOfUse from 'containers/terms-of-use';

const DESCRIPTION_TEXT =
  'FORA (Funders for Regenerative Agriculture) is a network of funders and funder initiatives aimed at informing, educating, organizing, providing collaborative opportunities, and recruiting new members in support of regenerative agricultural systems. ';
const TITLE_TEXT = 'Terms of use - Funders for Regenerative Agriculture';

const TermsOfUsePage: React.FC = () => (
  <div>
    <MetaTags title={TITLE_TEXT} description={DESCRIPTION_TEXT} type="website" />

    <TermsOfUse />
  </div>
);

export default TermsOfUsePage;
