import { useCallback, useEffect, useState } from 'react';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { STORE_WRAPPER } from 'store';

import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';

import ApplicationLayout from 'layouts/application';

import MetaIcons from 'containers/meta-icons';
import RouteLoading from 'containers/route-loading';

import { MediaContextProvider } from 'components/media-query';

import 'styles/globals.css';
import 'styles/flicking.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            keepPreviousData: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            structuralSharing: false,
            select: (data: any) => {
              return data.data;
            },
          },
        },
      })
  );
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
    [asPath]
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
      <Hydrate state={pageProps.dehydratedState}>
        {/* <SessionProvider
            session={pageProps.session}
            refetchInterval={10 * 60}
            refetchOnWindowFocus
          > */}
        {/* @ts-ignore: https://github.com/artsy/fresnel/issues/281 */}
        <MediaContextProvider>
          <MetaIcons />

          {/* <ThirdParty /> */}

          <RouteLoading {...routeLoading} />

          <ApplicationLayout>
            <Component {...pageProps} />
          </ApplicationLayout>
        </MediaContextProvider>
        {/* </SessionProvider> */}
      </Hydrate>
    </QueryClientProvider>
  );
};

export default STORE_WRAPPER.withRedux(MyApp);
