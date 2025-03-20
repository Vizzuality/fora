import React from 'react';

import Button from 'components/button';

const Page404: React.FC = () => {
  return (
    <div className="flex grow flex-col items-center justify-center space-y-11 py-20">
      <div className="py-20">
        <h2 className="font-display text-[200px] font-normal text-green-0">404</h2>
      </div>

      <div className="flex flex-col items-center justify-center space-y-3">
        <p className="font-display text-3xl">Page not found</p>
        <p className="underline">It looks like the link is broken or the page has been removed.</p>
      </div>

      <Button href="/" type="button" size="xl" theme="black">
        Go to Homepage
      </Button>
    </div>
  );
};

export default Page404;
