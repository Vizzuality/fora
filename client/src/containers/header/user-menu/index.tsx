import React from 'react';

import { signOut, useSession } from 'next-auth/react';
import { LuLogOut } from 'react-icons/lu';

import { Button } from '@/components/button/component';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function UserMenu() {
  const { data: session } = useSession();
  const { user } = session;
  const initials = user?.name
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

  return (
    <div className="flex items-center gap-7">
      <Avatar>
        <AvatarFallback className="bg-[#724CBC] text-white">{initials}</AvatarFallback>
      </Avatar>
      <Button
        onClick={handleLogout}
        className="flex items-center gap-2 p-0 hover:underline"
        theme="transparent"
      >
        <LuLogOut className="w-4 h-4" />
        <span>Sign out</span>
      </Button>
    </div>
  );
}
