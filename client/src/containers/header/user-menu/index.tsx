import React from 'react';

import { signOut, useSession } from 'next-auth/react';
import { LuUser, LuLogOut } from 'react-icons/lu';

import { Button, LinkButton } from '@/components/button/component';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function UserMenu() {
  const { data: session } = useSession();
  const initials = session?.user?.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: '/',
    });
  };

  if (!session) {
    return (
      <LinkButton href="/auth/signin" className="flex items-center gap-2 p-0" theme="transparent">
        <LuUser className="h-5 w-5" />
        <span>Log in</span>
      </LinkButton>
    );
  }

  return (
    <div className="flex items-center gap-7 !ml-7">
      <Avatar>
        <AvatarFallback className="bg-[#724CBC] text-white">{initials}</AvatarFallback>
      </Avatar>
      <Button onClick={handleLogout} className="flex items-center gap-2 p-0" theme="transparent">
        <LuLogOut className="h-5 w-5" />
        <span>Sign out</span>
      </Button>
    </div>
  );
}
