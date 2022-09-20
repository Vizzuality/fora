import MetaTags from 'containers/meta-tags';
import PrivacyPolicy from 'containers/privacy-policy';

const DESCRIPTION_TEXT =
  'FORA (Funders for Regenerative Agriculture) is a network of funders and funder initiatives aimed at informing, educating, organizing, providing collaborative opportunities, and recruiting new members in support of regenerative agricultural systems. ';
const TITLE_TEXT = 'Privacy Policy - Funders for Regenerative Agriculture';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div>
      <MetaTags title={TITLE_TEXT} description={DESCRIPTION_TEXT} type="website" />

      <PrivacyPolicy />
    </div>
  );
};

export default PrivacyPolicyPage;
