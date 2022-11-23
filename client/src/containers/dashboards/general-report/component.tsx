import React from 'react';

import Funding from './funding';
import Header from './header';
import Overview from './overview';
import Totals from './totals';

const GeneralReport = () => {
  return (
    <>
      <Header />

      <Overview />

      <Funding />

      <Totals />
    </>
  );
};

export default GeneralReport;
