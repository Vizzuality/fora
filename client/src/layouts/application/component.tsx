import { PropsWithChildren } from 'react';

import { usePathname } from 'next/navigation';

import { cn } from 'lib/utils';

import Footer from '@/containers/footer';
import Header from '@/containers/header';

export default function ApplicationLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isAuthRoute = pathname.includes('/auth');

  return (
    <div
      className={cn({
        'flex min-h-screen flex-col': true,
        'bg-grey-60': isAuthRoute,
      })}
    >
      <Header />
      <main
        className={cn({
          'flex grow flex-col': true,
          'bg-grey-60': isAuthRoute,
        })}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
