import React, { useMemo } from 'react';

import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

import { NAV, POLICIES } from 'constants/nav';

import Wrapper from 'containers/wrapper';

import Icon from 'components/icon';

import LOGO_MONOCHROME_SVG from 'svgs/logo-monochrome.svg';
import LINKEDIN_SVG from 'svgs/social/linkedin.svg?sprite';
import TWITTER_SVG from 'svgs/social/twitter.svg?sprite';

const Footer = () => {
  const { pathname } = useRouter();
  const { data: session } = useSession();
  const hideNav = useMemo(() => {
    return pathname.includes('/auth');
  }, [pathname]);
  const NAV_ITEMS = useMemo(() => {
    return NAV.filter((n) => !(session && n.auth));
  }, [session]);

  return (
    <footer>
      {!hideNav && (
        <div className="bg-blue-0/5 py-14">
          <Wrapper>
            <div className="flex flex-col justify-between space-y-10 md:flex-row md:space-y-0">
              <div className="flex flex-col items-center justify-between space-y-10 md:flex-row md:items-start md:space-y-0 md:space-x-20">
                <Link href="/">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}${LOGO_MONOCHROME_SVG}`}
                    alt="Logo"
                    width={122}
                    height={56}
                    priority
                  />
                </Link>

                <nav className="flex">
                  <ul className="gap-10 space-y-3 text-center md:columns-2 md:text-left">
                    {NAV_ITEMS.map((item) => {
                      const { href, label, target, rel } = item;

                      return (
                        <li key={href}>
                          {target === '_blank' && (
                            <a
                              href={href}
                              target={target}
                              rel={rel}
                              className="py-2 text-base font-semibold hover:opacity-75"
                            >
                              {label}
                            </a>
                          )}
                          {!target && (
                            <Link
                              href={href}
                              className="py-2 text-base font-semibold hover:opacity-75"
                            >
                              {label}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>

              <div className="flex flex-col items-center space-y-2.5">
                <h3 className="text-sm font-bold text-grey-0">Follow us on:</h3>
                <ul className="flex items-center space-x-2.5">
                  <li>
                    <a
                      href="https://www.linkedin.com/company/funders-for-regenerative-agriculture/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon icon={LINKEDIN_SVG} className="h-6 w-6" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/FORAFunders"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon icon={TWITTER_SVG} className="h-6 w-6" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Wrapper>
        </div>
      )}
      <div className="w-full bg-blue-0 py-5 text-sm text-white">
        <Wrapper>
          <div className="flex flex-col items-center justify-between space-y-5 md:flex-row md:space-y-0">
            <div className="text-center">© Funders for Regenerative Agriculture 2022</div>
            <ul className="flex flex-col items-center divide-y divide-white/20 md:flex-row md:divide-y-0 md:divide-x">
              {POLICIES.map(({ href, label }, i) => (
                <li
                  key={href}
                  className={cx({
                    'py-2 md:py-0': true,
                    'md:pl-5': i !== 0,
                    'md:pr-5': i !== POLICIES.length - 1,
                  })}
                >
                  <Link href={href} className="hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Wrapper>
      </div>
    </footer>
  );
};

export default Footer;
