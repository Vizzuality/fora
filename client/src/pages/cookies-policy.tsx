import CookiesPolicy from 'containers/cookies-policy';
import MetaTags from 'containers/meta-tags';

const DESCRIPTION_TEXT =
  'FORA (Funders for Regenerative Agriculture) is a network of funders and funder initiatives aimed at informing, educating, organizing, providing collaborative opportunities, and recruiting new members in support of regenerative agricultural systems. ';
const TITLE_TEXT = 'Cookies Policy - Funders for Regenerative Agriculture';

const CookiesPolicyPage: React.FC = () => (
  <div>
    <MetaTags title={TITLE_TEXT} description={DESCRIPTION_TEXT} type="website" />

    <CookiesPolicy />
  </div>
);

export default CookiesPolicyPage;
