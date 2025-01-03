import React, { useCallback, useMemo } from 'react';

import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

import { NAV } from 'constants/nav';

import Wrapper from 'containers/wrapper';

import { Button } from 'components/button/component';
import CircleUserIcon from 'components/icons/circle-user';

import LOGO_SVG from 'svgs/logo.svg';

const Header = () => {
  const { pathname } = useRouter();
  const { data: session } = useSession();
  const isAuthPath = useMemo(() => pathname.includes('/auth'), [pathname]);
  const NAV_ITEMS = useMemo(() => {
    return NAV.filter((n) => !n.footer && !(session && n.auth));
  }, [session]);

  const isActiveNavItem = useCallback(
    (href: string) => {
      if (isAuthPath) return false;

      return pathname.includes(href) && pathname !== '/';
    },
    [pathname, isAuthPath]
  );

  return (
    <header
      className={cx({
        'py-6': true,
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
                const { href, label, filled, target, rel, className } = item;

                return (
                  <li key={href}>
                    {target === '_blank' && (
                      <a
                        href={href}
                        target={target}
                        rel={rel}
                        className={cx({
                          'text-base font-semibold py-2 px-7': true,
                          'hover:rounded-lg hover:bg-grey-60/75': pathname !== href,
                          'rounded-lg bg-green-0': isActiveNavItem(href),
                          'text-grey-0 hover:underline': !filled,
                        })}
                      >
                        {label}
                      </a>
                    )}
                    {!target && (
                      <Link
                        href={href}
                        className={cx(
                          'text-base font-semibold py-2 px-7',
                          {
                            'hover:rounded-lg hover:bg-grey-60/75': !pathname.includes(href),
                            'rounded-lg bg-green-0': isActiveNavItem(href),
                            'pointer-events-none select-none':
                              pathname.includes(href) && pathname !== '/',
                          },
                          className
                        )}
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                );
              })}
              {session && (
                <Button type="button" theme="transparent">
                  <CircleUserIcon />
                </Button>
              )}
            </ul>
          </nav>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
