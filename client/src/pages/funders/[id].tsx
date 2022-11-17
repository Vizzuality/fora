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

  const paths = response.data.map((f) => ({
    params: { id: `${f.id}` },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
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
      dehydratedState: JSON.parse(safeJsonStringify(dehydrate(queryClient))) || null,
    },
  };
}
export default FundersDetailPage;
