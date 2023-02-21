import { STORE_WRAPPER } from 'store';

import { setFilters } from 'store/dashboards/general-report';

import { dehydrate, QueryClient } from '@tanstack/react-query';
import safeJsonStringify from 'safe-json-stringify';

import { ReportYears } from 'types/dashboards';

import { fetchWidgets, fetchYears } from 'hooks/widgets';

import GeneralReport from 'containers/dashboards/general-report';
import MetaTags from 'containers/meta-tags';

const TITLE_TEXT = 'FORA Dashboards | General Report';
const DESCRIPTION_TEXT =
  'Review graphs, charts, and other visualizations in order to get a higher level and comprehensive analysis of FORA member’s collective work.';
const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/dashboards.jpg`;

export const getStaticProps = STORE_WRAPPER.getStaticProps((store) => async () => {
  const queryClient = new QueryClient();

  const { filters } = store.getState()['/dashboards/general-report'];

  // Prefetch years
  const fYears = () => fetchYears();
  await queryClient.prefetchQuery(['report-years'], fYears);
  const { data } = queryClient.getQueryData<{ data: any[] }>(['report-years']);

  // loop through years and set filter reportYear with the last year
  const lastYear = data[data.length - 1];
  store.dispatch(
    setFilters({
      ...filters,
      reportYear: lastYear.name as ReportYears,
    })
  );

  // Prefetch widgets
  const params = {
    filters,
  };
  const fetch = () => fetchWidgets(params);
  await queryClient.prefetchQuery(['widgets', JSON.stringify(params)], fetch);

  // Props returned will be passed to the page component
  return {
    props: {
      revalidate: 30 * 60, // 30 minutees
      dehydratedState: JSON.parse(safeJsonStringify(dehydrate(queryClient))) || null,
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
