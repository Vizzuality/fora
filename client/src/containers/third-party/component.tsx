import React, { useEffect, useMemo } from 'react';

import useCookie from 'react-use-cookie';

import Script from 'next/script';

import { GA_TRACKING_ID } from 'lib/analytics/ga';

const ThirdParty: React.FC = () => {
  return (
    <>
      {/* Third Party Script needing cookies */}
      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script id="gtm-config-script" strategy="afterInteractive">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `}
      </Script>
    </>
  );
};

export default ThirdParty;
