import { STORE_WRAPPER } from 'store';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import { fetchWidgets } from 'hooks/widgets';

import GeneralReport from 'containers/dashboards/general-report';
import MetaTags from 'containers/meta-tags';

const TITLE_TEXT = 'FORA Dashboards | General Report';
const DESCRIPTION_TEXT =
  'Review graphs, charts, and other visualizations in order to get a higher level and comprehensive analysis of FORA member’s collective work.';
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/dashboards.jpg`;

export const getStaticProps = STORE_WRAPPER.getStaticProps((store) => async () => {
  const queryClient = new QueryClient();

  const { filters } = store.getState()['/dashboards/general-report'];

  const fetch = () =>
    fetchWidgets({
      filters,
    });

  await queryClient.prefetchQuery(['widgets'], fetch);

  // Props returned will be passed to the page component
  return {
    props: {
      dehydratedState: dehydrate(queryClient) || null,
    },
  };
});

const DashboardsGeneralReportPage: React.FC = () => {
  return (
    <>
      <MetaTags
        title={TITLE_TEXT}
        description={DESCRIPTION_TEXT}
        type="website"
        imageURL={IMAGE_URL}
      />

      <GeneralReport />
    </>
  );
};

export default DashboardsGeneralReportPage;
