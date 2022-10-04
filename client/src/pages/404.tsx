import React, { useCallback } from 'react';

import Router from 'next/router';

import Button from 'components/button';

const Page404: React.FC = () => {
  const handleGoBack = useCallback(() => Router.back(), []);

  return (
    <div className="flex flex-col items-center justify-center w-screen grow space-y-11">
      <div className="py-20">
        <h2 className="text-green-0 text-[200px] font-display font-normal">404</h2>
      </div>

      <div className="flex flex-col items-center justify-center space-y-3">
        <p className="text-3xl font-display">Page not found</p>
        <p className="underline">It looks like the link is broken or the pages has been removed.</p>
      </div>

      <Button href="/" type="button" size="xl" theme="black">
        Go to Homepage
      </Button>
    </div>
  );
};

export default Page404;
