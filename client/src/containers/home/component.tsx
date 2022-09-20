import React from 'react';

import Hero from './hero';
import How from './how';
import Invest from './invest';
import Join from './join';
import What from './what';
import Why from './why';

const Home = () => {
  return (
    <>
      <Hero />
      <div className="py-32 space-y-32">
        <What />
        <Why />
        <How />
        <Invest />
        <Join />
      </div>
    </>
  );
};

export default Home;
