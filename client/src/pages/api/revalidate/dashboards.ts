async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Revalidate all dashboards
  // ? if we add more dashboards with `getStaticProps` be sure you add them here
  try {
    // revalidate each dashboard page
    await res.revalidate(`/dashboards/general-report`);
    // await res.revalidate(`/dashboards/disparities-report`);
    // await res.revalidate(`/dashboards/interacive-report`);

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.error(err);
    return res.status(500).send('Error revalidating');
  }
}

export default handler;
