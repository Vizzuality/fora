import { getReduxStateFromQuery, setQueryFromReduxState } from 'store/action-map';
import { useAppSelector } from 'store/hooks';

import ActionMap from 'containers/action-map';
import MetaTags from 'containers/meta-tags';
import Url from 'containers/url';

export const getServerSideProps = getReduxStateFromQuery();

const TITLE_TEXT = 'FORA Action Map | An interactive and user-friendly tool';
const DESCRIPTION_TEXT =
  'View and interact with various areas of interest across geographies, exploring where FORA members are funding.';
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/action-map.jpg`;

const ActionMapPage: React.FC = () => {
  const actionMapState = useAppSelector((state) => state['/action-map']);

  return (
    <div>
      <MetaTags
        title={TITLE_TEXT}
        description={DESCRIPTION_TEXT}
        type="website"
        imageURL={IMAGE_URL}
      />

      <ActionMap />

      <Url pathname="/action-map" state={actionMapState} sync={setQueryFromReduxState} />
    </div>
  );
};

export default ActionMapPage;
