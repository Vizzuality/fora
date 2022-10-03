import React, { useCallback } from 'react';

import Router from 'next/router';

import Button from 'components/button';

const Page500: React.FC = () => {
  const handleGoBack = useCallback(() => Router.back(), []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen py-10 space-y-11">
      <div className="py-20">
        <h2 className="text-green-0 text-[200px] font-display font-normal">500</h2>
      </div>

      <div className="flex flex-col items-center justify-center space-y-3">
        <p className="text-3xl font-display">Internal server error</p>
        <p className="underline">Something went wrong. We are working on to fix the problem.</p>
      </div>

      <Button type="button" size="xl" theme="black" onClick={handleGoBack}>
        Go to Homepage
      </Button>
    </div>
  );
};

export default Page500;
