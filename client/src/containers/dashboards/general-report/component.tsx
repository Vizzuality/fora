import React from 'react';

import Fund from './fund';
import Header from './header';
import Overview from './overview';
import Totals from './totals';

const GeneralReport = () => {
  return (
    <>
      <Header />

      <Overview />

      <Fund />

      <Totals />
    </>
  );
};

export default GeneralReport;
