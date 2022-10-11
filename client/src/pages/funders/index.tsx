import { getReduxStateFromQuery, setQueryFromReduxState } from 'store/funders';
import { useAppSelector } from 'store/hooks';

import Funders from 'containers/funders';
import MetaTags from 'containers/meta-tags';
import Url from 'containers/url';

export const getServerSideProps = getReduxStateFromQuery();

const TITLE_TEXT = 'FORA Funders | A diverse community supporting regenerative agriculture';
const DESCRIPTION_TEXT =
  'Discover diverse funders, investors, and partners deploying capital across varying issue and focus areas, strategies, and geographic scopes.';
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/funders.jpg`;

const FundersPage: React.FC = () => {
  const fundersState = useAppSelector((state) => state['/funders']);

  return (
    <div>
      <MetaTags
        title={TITLE_TEXT}
        description={DESCRIPTION_TEXT}
        type="website"
        imageURL={IMAGE_URL}
      />

      <Funders />

      <Url pathname="/funders" state={fundersState} sync={setQueryFromReduxState} />
    </div>
  );
};

export default FundersPage;
