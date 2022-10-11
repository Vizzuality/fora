import Home from 'containers/home';
import MetaTags from 'containers/meta-tags';

const TITLE_TEXT = 'FORA | An initiative in support of regenerative agriculture';
const DESCRIPTION_TEXT =
  'Explore FORA (Funders for Regenerative Agriculture), a network of funders and funder initiatives supporting regenerative agricultural systems.';
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/home.jpg`;

const HomePage: React.FC = () => {
  return (
    <div>
      <MetaTags
        title={TITLE_TEXT}
        description={DESCRIPTION_TEXT}
        type="website"
        imageURL={IMAGE_URL}
      />

      <Home />
    </div>
  );
};

export default HomePage;
