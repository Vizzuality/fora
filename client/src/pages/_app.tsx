import { useCallback, useEffect, useState } from 'react';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { STORE_WRAPPER } from 'store';

import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import PlausibleProvider from 'next-plausible';

import { MediaContextProvider } from '@/components/media-query';
import { Toaster } from '@/components/ui/toaster';
import MetaIcons from '@/containers/meta-icons';
import RouteLoading from '@/containers/route-loading';
import ApplicationLayout from '@/layouts/application';
import 'styles/globals.css';
import 'styles/flicking.css';
import 'styles/react-international-phone.css';
import { getQueryClient } from '@/lib/queryclient';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => getQueryClient());
  const router = useRouter();
  const { asPath } = router;
  const [routeLoading, setRouteLoading] = useState({
    loading: false,
    key: 0,
  }); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRouteChangeStart = useCallback(
    (path) => {
      const prevPath = asPath.split('?')[0];
      const nextPath = path.split('?')[0];

      // Prevent the route loading indicator from flashing when navigating to the same page.
      if (prevPath === nextPath) return;

      setRouteLoading((prevState) => ({
        ...prevState,
        loading: true,
        key: prevState.key + 1,
      }));
    },
    [asPath],
  );

  const handleRouteChangeCompleted = useCallback(() => {
    setRouteLoading((prevState) => ({
      ...prevState,
      loading: false,
    }));
  }, []);

  const handleRouteChangeError = useCallback(() => {
    setRouteLoading((prevState) => ({
      ...prevState,
      loading: false,
    }));
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeCompleted);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeCompleted);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router.events, handleRouteChangeStart, handleRouteChangeCompleted, handleRouteChangeError]);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <SessionProvider
          session={pageProps.session}
          basePath={`${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth`}
        >
          {/* @ts-ignore: https://github.com/artsy/fresnel/issues/281 */}
          <MediaContextProvider>
            <PlausibleProvider domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}>
              <MetaIcons />

              {/* <ThirdParty /> */}

              <RouteLoading key={routeLoading.key} loading={routeLoading.loading} />
              <Toaster />

              <ApplicationLayout>
                <Component {...pageProps} />
              </ApplicationLayout>
            </PlausibleProvider>
          </MediaContextProvider>
        </SessionProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

export default STORE_WRAPPER.withRedux(MyApp);
