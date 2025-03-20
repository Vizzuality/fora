import React, { useCallback, useMemo } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from 'lib/utils';

import { NAV, NAV_AUTH } from 'constants/nav';

import { isPrivatePath } from 'middleware';

import LOGO_SVG from 'svgs/logo.svg';

import UserMenu from '@/containers/header/user-menu';
import Wrapper from '@/containers/wrapper';

const Header = () => {
  const pathname = usePathname();
  const isAuthPath = isPrivatePath(pathname);

  const NAV_ITEMS = useMemo(() => {
    if (isAuthPath) return NAV_AUTH;
    return NAV.filter((n) => !n.footer);
  }, [isAuthPath]);

  const isActiveNavItem = useCallback(
    (href: string) => {
      return pathname.includes(href) && pathname !== '/';
    },
    [pathname],
  );

  return (
    <header
      className={cn({
        'py-10': true,
        'bg-white': !isAuthPath,
        'bg-grey-60': isAuthPath,
      })}
    >
      <Wrapper>
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link href="/">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH}${LOGO_SVG}`}
              alt="Logo"
              width={pathname === '/' ? 156 : 156 - 156 * 0.2}
              height={pathname === '/' ? 72 : 72 - 72 * 0.2}
              priority
            />
          </Link>

          {/* NAV */}
          <nav className="flex items-center justify-between">
            <ul className="flex items-center justify-between space-x-3">
              {NAV_ITEMS.map((item) => {
                const { href, label, target, rel, className } = item;

                const buttonClass = cn(
                  'text-base font-semibold p-2 relative after:bottom-0 after:h-0.5 after:w-full after:block after:absolute after:bg-transparent after:hover:bg-green-0',
                  {
                    'after:bg-green-0': isActiveNavItem(href),
                  },
                  className,
                );

                return (
                  <li key={href}>
                    {target === '_blank' && (
                      <a href={href} target={target} rel={rel} className={buttonClass}>
                        {label}
                      </a>
                    )}
                    {!target && (
                      <Link href={href} className={buttonClass}>
                        {label}
                      </Link>
                    )}
                  </li>
                );
              })}
              <UserMenu />
            </ul>
          </nav>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
