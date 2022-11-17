import Dashboards from 'containers/dashboards';
import MetaTags from 'containers/meta-tags';

const TITLE_TEXT = 'FORA Dashboards | A display of aggregations of collective data';
const DESCRIPTION_TEXT =
  'Review graphs, charts, and other visualizations in order to get a higher level and comprehensive analysis of FORA member’s collective work.';
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/dashboards.jpg`;

export function getStaticProps() {
  return {
    redirect: {
      destination: '/dashboards/general-report',
      permanent: false,
    },
  };
}

const DashboardsPage: React.FC = () => {
  return (
    <div>
      <MetaTags
        title={TITLE_TEXT}
        description={DESCRIPTION_TEXT}
        type="website"
        imageURL={IMAGE_URL}
      />

      <Dashboards />
    </div>
  );
};

export default DashboardsPage;
