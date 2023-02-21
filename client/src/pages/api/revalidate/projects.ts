import { fetchProjects } from 'hooks/projects';

async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Revalidate all pages
  if (!req.query.id) {
    try {
      // fetch all projects
      const { data } = await fetchProjects({
        disablePagination: true,
      });

      // revalidate each project
      data.forEach(async (project) => {
        await res.revalidate(`${process.env.NEXT_PUBLIC_BASE_PATH}/projects/${project.id}`);
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
      // e.g. for "/projects/[slug]" this should be "/projects/post-1"
      await res.revalidate(`/projects/${req.query.id}`);
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
