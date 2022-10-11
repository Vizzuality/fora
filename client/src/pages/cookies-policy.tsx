import CookiesPolicy from 'containers/cookies-policy';
import MetaTags from 'containers/meta-tags';

const TITLE_TEXT = 'FORA | Cookies Policy';
const DESCRIPTION_TEXT =
  'FORA (Funders for Regenerative Agriculture) is a network of funders and funder initiatives aimed at informing, educating, organizing, providing collaborative opportunities, and recruiting new members in support of regenerative agricultural systems. ';
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/home.jpg`;

const CookiesPolicyPage: React.FC = () => (
  <div>
    <MetaTags
      title={TITLE_TEXT}
      description={DESCRIPTION_TEXT}
      type="website"
      imageURL={IMAGE_URL}
    />

    <CookiesPolicy />
  </div>
);

export default CookiesPolicyPage;
