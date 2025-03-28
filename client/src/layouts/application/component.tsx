import { PropsWithChildren } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import { cn } from 'lib/utils';

import Footer from '@/containers/footer';
import Header from '@/containers/header';

export default function ApplicationLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isAuthRoute = pathname.includes('/auth');
  const searchParams = useSearchParams();
  const isInvestments =
    pathname === '/auth/investments' ||
    (pathname.includes('/auth/projects') && searchParams.get('step') === 'investments');

  return (
    <div
      className={cn({
        'flex min-h-screen flex-col': true,
        'bg-grey-60': isAuthRoute,
        'h-screen': isInvestments,
      })}
    >
      <Header />
      <main
        className={cn({
          'flex grow flex-col': true,
          'bg-grey-60': isAuthRoute,
          'h-full overflow-hidden': isInvestments,
        })}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
