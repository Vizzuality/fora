import { useRouter } from 'next/router';

import { dehydrate, QueryClient } from '@tanstack/react-query';
import safeJsonStringify from 'safe-json-stringify';

import { fetchFunder, fetchFunders, useFunder } from 'hooks/funders';

import Funder from 'containers/funder';
import MetaTags from 'containers/meta-tags';

const IMAGE_URL = `${process.env.NEXT_PUBLIC_BASE_PATH}images/meta/funders.jpg`;

const FundersDetailPage: React.FC = () => {
  const { query } = useRouter();
  const { id: funderId } = query;
  const { data: funderData } = useFunder(`${funderId}`);

  return (
    <div>
      <MetaTags
        title={`FORA Funders | ${funderData.name}`}
        description={funderData.description}
        type="website"
        imageURL={IMAGE_URL}
      />
      <Funder />
    </div>
  );
};

export async function getStaticPaths() {
  const response = await fetchFunders({
    disablePagination: true,
  });

  // Get the paths we want to pre-render based on funders
  const paths = response.data.map((f) => ({
    params: { id: `${f.id}` },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return {
    paths,
    fallback: 'blocking', // can also be true or 'blocking'
  };
}

export async function getStaticProps(ctx) {
  const { id } = ctx.params;
  const queryClient = new QueryClient();

  const fetch = () => fetchFunder(id);

  await queryClient.prefetchQuery(['funder', id], fetch);

  // Props returned will be passed to the page component
  return {
    props: {
      revalidate: 30 * 60, // 30 minutees
      dehydratedState: JSON.parse(safeJsonStringify(dehydrate(queryClient))) || null,
    },
  };
}
export default FundersDetailPage;
