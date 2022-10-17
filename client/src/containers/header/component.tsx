import React, { useMemo } from 'react';

import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { NAV } from 'constants/nav';

import Wrapper from 'containers/wrapper';

import LOGO_SVG from 'svgs/logo.svg';

const Header = () => {
  const { pathname } = useRouter();

  const NAV_ITEMS = useMemo(() => {
    return NAV.filter((n) => !n.footer);
  }, []);

  return (
    <header
      className={cx({
        'py-6 bg-white': true,
      })}
    >
      <Wrapper>
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link href="/">
            <a>
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}${LOGO_SVG}`}
                alt="Logo"
                layout="fixed"
                width={156}
                height={72}
                priority
              />
            </a>
          </Link>

          {/* NAV */}
          <nav className="flex items-center justify-between">
            <ul className="flex items-center justify-between space-x-3">
              {NAV_ITEMS.map((item) => {
                const { href, label, filled, target, rel } = item;

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
                          'rounded-lg bg-green-0': pathname.includes(href) && pathname !== '/',
                          'text-grey-0 hover:underline': !filled,
                        })}
                      >
                        {label}
                      </a>
                    )}

                    {!target && (
                      <Link href={href}>
                        <a
                          className={cx({
                            'text-base font-semibold py-2 px-7': true,
                            'hover:rounded-lg hover:bg-grey-60/75': !pathname.includes(href),
                            'rounded-lg bg-green-0': pathname.includes(href) && pathname !== '/',
                          })}
                        >
                          {label}
                        </a>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
