import MetaTags from 'containers/meta-tags';
// import PrivacyPolicy from 'containers/privacy-policy';

const TITLE_TEXT = 'FORA | Privacy Policy';
const DESCRIPTION_TEXT =
  'FORA (Funders for Regenerative Agriculture) is a network of funders and funder initiatives aimed at informing, educating, organizing, providing collaborative opportunities, and recruiting new members in support of regenerative agricultural systems. ';
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/home.jpg`;

const PrivacyPolicyPage: React.FC = () => (
  <div className="flex flex-col grow">
    <MetaTags
      title={TITLE_TEXT}
      description={DESCRIPTION_TEXT}
      type="website"
      imageURL={IMAGE_URL}
    />

    <div className="flex flex-col items-center justify-center grow space-y-10 font-display text-3xl">
      Coming soon
    </div>
    {/* <PrivacyPolicy /> */}
  </div>
);

export default PrivacyPolicyPage;
