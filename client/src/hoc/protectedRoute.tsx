import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  return <> {children} </>;
}
