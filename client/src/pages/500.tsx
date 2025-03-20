import React from 'react';

import Button from 'components/button';

const Page500: React.FC = () => {
  return (
    <div className="flex grow flex-col items-center justify-center space-y-11 py-20">
      <div className="py-20">
        <h2 className="font-display text-[200px] font-normal text-green-0">500</h2>
      </div>

      <div className="flex flex-col items-center justify-center space-y-3">
        <p className="font-display text-3xl">Internal server error</p>
        <p className="underline">Something went wrong. We are working on to fix the problem.</p>
      </div>

      <Button href="/" type="button" size="xl" theme="black">
        Go to Homepage
      </Button>
    </div>
  );
};

export default Page500;
