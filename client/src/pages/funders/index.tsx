import { getReduxStateFromQuery, setQueryFromReduxState } from 'store/funders';
import { useAppSelector } from 'store/hooks';

import Funders from 'containers/funders';
import MetaTags from 'containers/meta-tags';
import Url from 'containers/url';

export const getServerSideProps = getReduxStateFromQuery();

const DESCRIPTION_TEXT =
  'FORA (Funders for Regenerative Agriculture) is a network of funders and funder initiatives aimed at informing, educating, organizing, providing collaborative opportunities, and recruiting new members in support of regenerative agricultural systems. ';
const TITLE_TEXT = 'Funders - Funders for Regenerative Agriculture';

const FundersPage: React.FC = () => {
  const fundersState = useAppSelector((state) => state['/funders']);

  return (
    <div>
      <MetaTags title={TITLE_TEXT} description={DESCRIPTION_TEXT} type="website" />

      <Funders />

      <Url pathname="/funders" state={fundersState} sync={setQueryFromReduxState} />
    </div>
  );
};

export default FundersPage;
