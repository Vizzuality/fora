import { fetchFunders } from 'hooks/funders';

async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Revalidate all pages
  if (!req.query.id) {
    try {
      // fetch all funders
      const { data } = await fetchFunders({
        disablePagination: true,
      });

      // revalidate each funder
      data.forEach(async (funder) => {
        await res.revalidate(`/funders/${funder.id}`);
      });

      return res.json({ revalidated: true });
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      console.error(err);
      return res.status(500).send(err.toString());
    }
  }

  if (req.query.id) {
    try {
      // this should be the actual path not a rewritten path
      // e.g. for "/funders/[slug]" this should be "/funders/post-1"
      await res.revalidate(`${process.env.NEXT_PUBLIC_BASE_PATH}/funders/${req.query.id}`);
      return res.json({ revalidated: true });
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      console.error(err);
      return res.status(500).send('Error revalidating');
    }
  }
}

export default handler;
