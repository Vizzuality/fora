import { getReduxStateFromQuery, setQueryFromReduxState } from 'store/action-map';
import { useAppSelector } from 'store/hooks';

import ActionMap from 'containers/action-map';
import MetaTags from 'containers/meta-tags';
import Url from 'containers/url';

export const getServerSideProps = getReduxStateFromQuery();

const DESCRIPTION_TEXT =
  'FORA (Funders for Regenerative Agriculture) is a network of funders and funder initiatives aimed at informing, educating, organizing, providing collaborative opportunities, and recruiting new members in support of regenerative agricultural systems. ';
const TITLE_TEXT = 'Action Map - Funders for Regenerative Agriculture';

const ActionMapPage: React.FC = () => {
  const actionMapState = useAppSelector((state) => state['/action-map']);

  return (
    <div>
      <MetaTags title={TITLE_TEXT} description={DESCRIPTION_TEXT} type="website" />

      <ActionMap />

      <Url pathname="/action-map" state={actionMapState} sync={setQueryFromReduxState} />
    </div>
  );
};

export default ActionMapPage;
